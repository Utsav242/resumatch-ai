from typing import Any, Dict, Tuple

import fitz  # PyMuPDF
from fastapi import HTTPException, status

from app.core.logging import logger
from app.services.parsing.text_normalizer import normalize_text


def parse_pdf(file_bytes: bytes) -> Tuple[str, Dict[str, Any]]:
    """Parse a PDF document using PyMuPDF and extract text and document metadata.

    Returns:
        A tuple of (normalized_text, metadata_dict)
    """
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
    except Exception as e:
        logger.error("Failed to open PDF document", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to parse PDF document. The file might be corrupted or invalid.",
        ) from e

    text_parts = []
    metadata = {}

    try:
        # Extract metadata
        metadata = dict(doc.metadata) if doc.metadata else {}
        metadata["page_count"] = doc.page_count

        # Extract text page-by-page
        for page_num in range(doc.page_count):
            page = doc.load_page(page_num)
            page_text = page.get_text()
            if page_text:
                text_parts.append(page_text)
    except Exception as e:
        logger.error("Error occurred while extracting text from PDF", error=str(e))
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Failed to extract text from the PDF file.",
        ) from e
    finally:
        doc.close()

    raw_extracted_text = "\n".join(text_parts)
    normalized_text = normalize_text(raw_extracted_text)

    if not normalized_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded PDF file does not contain any readable text.",
        )

    return normalized_text, metadata
