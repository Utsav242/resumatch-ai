import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SettingsPage from "../page";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ApiService } from "@/services/api";

// Mock Clerk Auth and User
const mockUpdateUser = jest.fn().mockResolvedValue({});
jest.mock("@clerk/nextjs", () => ({
  useUser: () => ({
    isLoaded: true,
    isSignedIn: true,
    user: {
      id: "user_123",
      firstName: "Test",
      lastName: "User",
      primaryEmailAddress: { emailAddress: "candidate@example.com" },
      update: mockUpdateUser,
    },
  }),
  useAuth: () => ({
    userId: "user_123",
    getToken: jest.fn().mockResolvedValue("mock-token"),
  }),
  UserButton: () => <div data-testid="user-button">UserButton</div>,
}));

// Mock Next.js Navigation
jest.mock("next/navigation", () => ({
  usePathname: () => "/settings",
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock API service calls
jest.mock("@/services/api", () => ({
  ApiService: {
    fetchCurrentUser: jest.fn(),
    updateCurrentUser: jest.fn(),
  },
}));

const mockFetchCurrentUser = ApiService.fetchCurrentUser as jest.Mock;
const mockUpdateCurrentUser = ApiService.updateCurrentUser as jest.Mock;

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderSettingsPage = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SettingsPage />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("SettingsPage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("a) Renders circular progress loading indicator on fetch", () => {
    mockFetchCurrentUser.mockImplementation(() => new Promise(() => {})); // Never resolves
    renderSettingsPage();
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  test("b) Loads profile preferences from backend and renders form fields", async () => {
    mockFetchCurrentUser.mockResolvedValue({
      id: "db_user_id",
      clerk_id: "user_123",
      email: "candidate@example.com",
      first_name: "John",
      last_name: "Doe",
      avatar_url: null,
      target_role: "Staff Engineer",
      target_industry: "Artificial Intelligence",
      enable_rag: true,
      strict_ats: false,
      email_notifications: true,
    });

    renderSettingsPage();

    await waitFor(() => {
      expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    });

    // Form inputs should contain loaded values
    expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last Name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Default Target Role/i)).toHaveValue("Staff Engineer");
    expect(screen.getByLabelText(/Target Industry \/ Domain/i)).toHaveValue("Artificial Intelligence");

    // Switches should reflect correct values
    const strictModeSwitch = screen.getByLabelText(/Strict Enterprise ATS Audit Mode/i);
    expect(strictModeSwitch).not.toBeChecked();
  });

  test("c) Triggers API call and Clerk profile update upon clicking Save", async () => {
    mockFetchCurrentUser.mockResolvedValue({
      id: "db_user_id",
      clerk_id: "user_123",
      email: "candidate@example.com",
      first_name: "John",
      last_name: "Doe",
      avatar_url: null,
      target_role: "Staff Engineer",
      target_industry: "Artificial Intelligence",
      enable_rag: true,
      strict_ats: true,
      email_notifications: true,
    });
    mockUpdateCurrentUser.mockResolvedValue({ success: true });

    renderSettingsPage();

    await waitFor(() => {
      expect(screen.getByLabelText(/First Name/i)).toHaveValue("John");
    });

    // Change first name
    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: "Johnny" } });

    // Save preferences
    fireEvent.click(screen.getByRole("button", { name: /Save Preferences/i }));

    await waitFor(() => {
      // Backend should be called with correct data
      expect(mockUpdateCurrentUser).toHaveBeenCalledWith("mock-token", {
        first_name: "Johnny",
        last_name: "Doe",
        target_role: "Staff Engineer",
        target_industry: "Artificial Intelligence",
        enable_rag: true,
        strict_ats: true,
        email_notifications: true,
      });

      // Clerk user update should be triggered
      expect(mockUpdateUser).toHaveBeenCalledWith({
        firstName: "Johnny",
        lastName: "Doe",
      });
    });

    // Success Snackbar should be shown
    expect(screen.getByText("Preferences saved successfully!")).toBeInTheDocument();
  });
});
