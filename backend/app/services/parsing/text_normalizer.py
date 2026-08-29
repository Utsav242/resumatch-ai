import re
import unicodedata


def normalize_text(text: str) -> str:
    """Normalize extracted text to standard formatting.

    Normalizes unicode forms, cleans smart quotes/dashes, standardizes line endings,
    and removes duplicate spacing/newlines.
    """
    if not text:
        return ""

    # Standardize Unicode (NFKC normalizes characters like ligature and compatibility chars)
    text = unicodedata.normalize("NFKC", text)

    # Standardize curly quotes and dashes to ascii representation
    text = text.replace("“", '"').replace("”", '"').replace("‘", "'").replace("’", "'")
    text = text.replace("–", "-").replace("—", "-")

    # Standardize carriage returns
    text = text.replace("\r\n", "\n").replace("\r", "\n")

    # Filter out control characters, preserving newlines and tabs
    text = "".join(
        ch
        for ch in text
        if ch == "\n" or ch == "\t" or not unicodedata.category(ch).startswith("C")
    )

    # Collapse multiple consecutive horizontal whitespaces to a single space
    text = re.sub(r"[ \t]+", " ", text)

    # Collapse excessive vertical newlines to at most a double newline
    text = re.sub(r"\n{3,}", "\n\n", text)

    return text.strip()
