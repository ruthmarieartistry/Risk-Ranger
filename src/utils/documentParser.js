/**
 * Document Parser for Medical Records
 * Handles PDF, DOC, DOCX file parsing
 */

import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Parse PDF file and extract text
 * @param {File} file - PDF file to parse
 * @returns {Promise<string>} Extracted text content
 */
export async function parsePDF(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let fullText = '';

    // Extract text from each page
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error(`Failed to parse PDF: ${error.message}`);
  }
}

/**
 * Parse DOC/DOCX file and extract text
 * @param {File} file - DOC/DOCX file to parse
 * @returns {Promise<string>} Extracted text content
 */
export async function parseDOCX(file) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  } catch (error) {
    console.error('Error parsing DOCX:', error);
    throw new Error(`Failed to parse DOC/DOCX: ${error.message}`);
  }
}

/**
 * Parse any supported document type
 * @param {File} file - File to parse
 * @returns {Promise<{text: string, fileName: string, fileType: string}>}
 */
export async function parseDocument(file) {
  const fileExtension = file.name.split('.').pop().toLowerCase();
  let text = '';

  try {
    if (fileExtension === 'pdf') {
      text = await parsePDF(file);
    } else if (fileExtension === 'docx' || fileExtension === 'doc') {
      text = await parseDOCX(file);
    } else if (fileExtension === 'txt') {
      text = await file.text();
    } else {
      throw new Error(`Unsupported file type: ${fileExtension}`);
    }

    return {
      text,
      fileName: file.name,
      fileType: fileExtension,
      fileSize: file.size,
      success: true
    };
  } catch (error) {
    return {
      text: null,
      fileName: file.name,
      fileType: fileExtension,
      fileSize: file.size,
      success: false,
      error: error.message
    };
  }
}

/**
 * Parse multiple documents in batch
 * @param {File[]} files - Array of files to parse
 * @param {Function} onProgress - Progress callback (current, total)
 * @returns {Promise<Array>} Array of parsed results
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
 * Extract medical information from parsed text
 * Uses regex patterns to identify key medical data points
 * @param {string} text - Extracted text from document
 * @returns {Object} Structured medical data
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
