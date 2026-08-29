import re
from typing import Dict, List


def segment_resume(text: str) -> Dict[str, str]:
    """Segment a normalized resume text into structured sections.

    Expected sections: summary, experience, education, skills, certifications, other.
    """
    sections = {
        "summary": "",
        "experience": "",
        "education": "",
        "skills": "",
        "certifications": "",
        "other": "",
    }

    # Define regex patterns for typical section headings
    headers_map = {
        "summary": [
            r"^summary$",
            r"^professional summary$",
            r"^profile$",
            r"^career objective$",
            r"^about me$",
            r"^professional profile$",
            r"^executive summary$",
        ],
        "experience": [
            r"^experience$",
            r"^work experience$",
            r"^employment history$",
            r"^professional experience$",
            r"^work history$",
            r"^career history$",
            r"^employment$",
            r"^professional background$",
        ],
        "education": [
            r"^education$",
            r"^academic background$",
            r"^academic history$",
            r"^academic credentials$",
            r"^education history$",
        ],
        "skills": [
            r"^skills$",
            r"^technical skills$",
            r"^core competencies$",
            r"^expertise$",
            r"^technologies$",
            r"^key skills$",
            r"^core skills$",
            r"^areas of expertise$",
            r"^skills & expertise$",
            r"^skills and technologies$",
        ],
        "certifications": [
            r"^certifications$",
            r"^certificates$",
            r"^licenses$",
            r"^training$",
            r"^awards$",
            r"^professional certifications$",
            r"^certifications & licenses$",
            r"^certifications and licenses$",
        ],
    }

    lines = text.split("\n")
    current_section = "other"
    section_lines: Dict[str, List[str]] = {k: [] for k in sections.keys()}

    for line in lines:
        stripped = line.strip()
        if not stripped:
            section_lines[current_section].append(line)
            continue

        # Clean punctuation and markers for section heading checks
        # (e.g. "1. EXPERIENCE" or "Skills:")
        cleaned = stripped.lower()
        cleaned = re.sub(r"^[0-9.\-\s•]+", "", cleaned).strip().rstrip(":")

        # Check if this line is a heading
        matched_header = False
        for sec, patterns in headers_map.items():
            for pattern in patterns:
                if re.match(pattern, cleaned):
                    current_section = sec
                    matched_header = True
                    break
            if matched_header:
                break

        # If it matched a section header, we don't include the header text
        # itself in the section body
        if not matched_header:
            section_lines[current_section].append(line)

    for sec in sections.keys():
        sections[sec] = "\n".join(section_lines[sec]).strip()

    # If the 'other' section contains text before any section was found, keep it there.
    # Otherwise, sections that didn't match anything will remain empty strings.
    return sections
