/**
 * Simple PDF Parser using PDF.js
 * Alternative implementation with better error handling
 */

/**
 * Parse PDF file and extract text
 * This version loads PDF.js dynamically
 */
export async function parsePDF(file) {
  try {
    // Dynamically import PDF.js
    const pdfjsLib = await import('pdfjs-dist');

    // Set worker from CDN
    const pdfjsVersion = '3.11.174';
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsVersion}/pdf.worker.min.js`;

    // Read file as array buffer
    const arrayBuffer = await file.arrayBuffer();

    // Load PDF document
    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdf = await loadingTask.promise;

    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      // Combine text items
      const pageText = textContent.items
        .map(item => item.str)
        .join(' ');

      fullText += `\n--- Page ${pageNum} ---\n${pageText}\n`;
    }

    return fullText.trim();
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Parse DOCX file using mammoth
 */
export async function parseDOCX(file) {
  try {
    const mammoth = await import('mammoth');
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error(`Failed to parse DOCX: ${error.message}`);
  }
}

/**
 * Parse TXT file
 */
export async function parseTXT(file) {
  try {
    const text = await file.text();
    return text.trim();
  } catch (error) {
    console.error('TXT parsing error:', error);
    throw new Error(`Failed to parse TXT: ${error.message}`);
  }
}

/**
 * Universal document parser
 */
export async function parseDocument(file) {
  const fileName = file.name;
  const fileExtension = fileName.split('.').pop().toLowerCase();
  const fileSize = file.size;

  try {
    let text = '';

    if (fileExtension === 'pdf') {
      text = await parsePDF(file);
    } else if (fileExtension === 'docx' || fileExtension === 'doc') {
      text = await parseDOCX(file);
    } else if (fileExtension === 'txt') {
      text = await parseTXT(file);
    } else {
      throw new Error(`Unsupported file type: .${fileExtension}`);
    }

    return {
      fileName,
      fileType: fileExtension,
      fileSize,
      text,
      success: true
    };
  } catch (error) {
    console.error(`Error parsing ${fileName}:`, error);
    return {
      fileName,
      fileType: fileExtension,
      fileSize,
      text: null,
      error: error.message,
      success: false
    };
  }
}

/**
 * Parse multiple documents with progress tracking
 */
export async function parseDocumentsBatch(files, onProgress) {
  const results = [];

  for (let i = 0; i < files.length; i++) {
    if (onProgress) {
      onProgress(i + 1, files.length);
    }

    const result = await parseDocument(files[i]);
    results.push(result);

    // Small delay to prevent UI blocking
    await new Promise(resolve => setTimeout(resolve, 10));
  }

  return results;
}

/**
 * Extract medical data from parsed text
 */
export function extractMedicalData(text) {
  const medicalData = {
    rawText: text,
    extracted: {}
  };

  // Age extraction
  const ageMatch = text.match(/\b(\d{2})\s*(years?|y\/o|yo)\s*(old)?\b/i);
  if (ageMatch) {
    medicalData.extracted.age = parseInt(ageMatch[1]);
  }

  // Gravida/Para extraction
  const gravidaMatch = text.match(/G(\d+)P(\d+)/i);
  if (gravidaMatch) {
    medicalData.extracted.gravida = parseInt(gravidaMatch[1]);
    medicalData.extracted.para = parseInt(gravidaMatch[2]);
  }

  // BMI extraction
  const bmiMatch = text.match(/BMI[:\s]*(\d+\.?\d*)/i);
  if (bmiMatch) {
    medicalData.extracted.bmi = parseFloat(bmiMatch[1]);
  }

  // Cesarean sections
  const csectionMatch = text.match(/(\d+)\s*(c\/s|c-section|cesarean)/i);
  if (csectionMatch) {
    medicalData.extracted.cesareans = parseInt(csectionMatch[1]);
  }

  // Blood pressure
  const bpMatch = text.match(/BP[:\s]*(\d+)\/(\d+)/i);
  if (bpMatch) {
    medicalData.extracted.bloodPressure = {
      systolic: parseInt(bpMatch[1]),
      diastolic: parseInt(bpMatch[2])
    };
  }

  return medicalData;
}
