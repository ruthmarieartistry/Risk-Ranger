/**
 * Report Generator for Medical Assessments
 * Creates downloadable PDF reports of risk assessments
 */

import { jsPDF } from 'jspdf';

/**
 * Generate a comprehensive PDF report for a candidate assessment
 * @param {Object} assessmentData - Complete assessment results
 * @param {Object} candidateInfo - Candidate information
 * @returns {jsPDF} PDF document
 */
export function generateAssessmentReport(assessmentData, candidateInfo = {}) {
  const doc = new jsPDF();
  let yPosition = 20;
  const pageWidth = doc.internal.pageSize.width;
  const margin = 20;
  const contentWidth = pageWidth - 2 * margin;

  // Helper function to add text with word wrap
  const addText = (text, x, y, maxWidth = contentWidth) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y);
    return y + lines.length * 7;
  };

  // Helper function to check if we need a new page
  const checkNewPage = (neededSpace = 30) => {
    if (yPosition + neededSpace > 280) {
      doc.addPage();
      yPosition = 20;
      return true;
    }
    return false;
  };

  // Header
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('RISK RANGER', margin, yPosition);

  doc.setFontSize(16);
  yPosition += 8;
  doc.text('Preliminary Assessment Report', margin, yPosition);

  doc.setFontSize(11);
  yPosition += 7;
  doc.setFont('helvetica', 'normal');
  doc.text('Gestational Carrier Candidate Screening Review', margin, yPosition);

  // Date and Candidate Info
  doc.setFontSize(10);
  yPosition += 10;
  doc.text(`Report Generated: ${new Date().toLocaleDateString()}`, margin, yPosition);

  if (candidateInfo.name || candidateInfo.caseNumber) {
    yPosition += 6;
    if (candidateInfo.name) {
      doc.text(`Candidate: ${candidateInfo.name}`, margin, yPosition);
    }
    yPosition += 6;
    if (candidateInfo.caseNumber) {
      doc.text(`Case Number: ${candidateInfo.caseNumber}`, margin, yPosition);
    }
  }

  // Disclaimer Box
  yPosition += 15;
  checkNewPage(40);
  doc.setFillColor(255, 243, 205);
  doc.rect(margin, yPosition, contentWidth, 35, 'F');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  yPosition += 8;
  doc.text('IMPORTANT NOTICE', margin + 5, yPosition);
  doc.setFont('helvetica', 'normal');
  yPosition += 5;
  const disclaimerText = 'This is a PRELIMINARY SCREENING REPORT for informational purposes only, based on ASRM guidelines. This is NOT a medical diagnosis or clearance. All final surrogacy decisions must be made by qualified medical professionals including reproductive endocrinologists, Maternal-Fetal Medicine (MFM) specialists, and licensed mental health professionals.';
  yPosition = addText(disclaimerText, margin + 5, yPosition, contentWidth - 10);
  yPosition += 10;

  // Overall Risk Assessment
  if (assessmentData.summary) {
    checkNewPage(50);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    yPosition += 5;
    doc.text('OVERALL RISK ASSESSMENT', margin, yPosition);

    doc.setFontSize(10);
    yPosition += 8;
    doc.setFont('helvetica', 'bold');
    doc.text(`Risk Level: ${assessmentData.summary.overallRisk || 'Not Assessed'}`, margin, yPosition);
    doc.setFont('helvetica', 'normal');
  }

  // Clinic Type Analysis
  if (assessmentData.clinicTypeAnalysis) {
    checkNewPage(80);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    yPosition += 12;
    doc.text('ACCEPTANCE ODDS BY CLINIC TYPE', margin, yPosition);

    const clinicTypes = ['strict', 'moderate', 'lenient'];
    const clinicLabels = {
      strict: 'Strict/Premium Clinics',
      moderate: 'Moderate/Average Clinics',
      lenient: 'Lenient Clinics'
    };

    clinicTypes.forEach(type => {
      const analysis = assessmentData.clinicTypeAnalysis[type];
      if (analysis) {
        checkNewPage(40);
        yPosition += 10;

        // Clinic type header with score
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text(`${clinicLabels[type]}: ${analysis.score}%`, margin, yPosition);

        // Acceptance level
        doc.setFontSize(9);
        doc.setFont('helvetica', 'italic');
        yPosition += 5;
        doc.text(`Level: ${analysis.acceptanceLevel}`, margin + 5, yPosition);

        // Summary
        doc.setFont('helvetica', 'normal');
        yPosition += 5;
        if (analysis.summary) {
          yPosition = addText(analysis.summary, margin + 5, yPosition);
        }

        // Issues
        if (analysis.issues && analysis.issues.length > 0) {
          yPosition += 5;
          doc.setFont('helvetica', 'bold');
          doc.text('Concerns:', margin + 5, yPosition);
          doc.setFont('helvetica', 'normal');

          analysis.issues.forEach(issue => {
            checkNewPage(15);
            yPosition += 5;
            const issueText = `• ${issue.severity.toUpperCase()}: ${issue.message}`;
            yPosition = addText(issueText, margin + 10, yPosition, contentWidth - 15);
          });
        }
      }
    });
  }

  // MFM Considerations - What an MFM would focus on
  if (assessmentData.mfmAssessment) {
    checkNewPage(60);
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('MFM SPECIALIST CONSIDERATIONS', margin, yPosition);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'italic');
    yPosition += 6;
    yPosition = addText('This section identifies areas that a Maternal-Fetal Medicine (MFM) specialist would likely focus on during medical clearance evaluation.', margin, yPosition);

    doc.setFontSize(10);
    yPosition += 10;
    doc.setFont('helvetica', 'bold');
    doc.text(`MFM Consultation Recommended: ${assessmentData.mfmAssessment.consultationNeeded ? 'YES' : 'No'}`, margin, yPosition);

    if (assessmentData.mfmAssessment.reviewLevel) {
      yPosition += 6;
      doc.text(`Suggested Review Level: ${assessmentData.mfmAssessment.reviewLevel}`, margin, yPosition);
    }

    if (assessmentData.mfmAssessment.likelihood) {
      yPosition += 6;
      doc.text(`Predicted MFM Focus: ${assessmentData.mfmAssessment.likelihood.description}`, margin, yPosition);
      yPosition += 6;
      doc.text(`Estimated Clearance Likelihood: ${assessmentData.mfmAssessment.likelihood.percentage}`, margin, yPosition);
    }

    // MFM Summary
    if (assessmentData.mfmAssessment.summary) {
      doc.setFont('helvetica', 'normal');
      yPosition += 8;
      yPosition = addText(assessmentData.mfmAssessment.summary, margin, yPosition);
    }

    // Areas MFM Would Likely Focus On
    if (assessmentData.mfmAssessment.findings && assessmentData.mfmAssessment.findings.length > 0) {
      yPosition += 10;
      doc.setFont('helvetica', 'bold');
      doc.text('Areas an MFM Would Likely Focus On:', margin, yPosition);
      doc.setFont('helvetica', 'normal');

      assessmentData.mfmAssessment.findings.forEach(finding => {
        checkNewPage(30);
        yPosition += 8;

        doc.setFont('helvetica', 'bold');
        doc.text(`${finding.category}`, margin + 5, yPosition);
        doc.setFont('helvetica', 'normal');

        yPosition += 5;
        yPosition = addText(`Issue Identified: ${finding.concern}`, margin + 10, yPosition, contentWidth - 15);

        yPosition += 3;
        yPosition = addText(`What MFM Would Evaluate: ${finding.mfmView}`, margin + 10, yPosition, contentWidth - 15);

        yPosition += 3;
        yPosition = addText(`Typical MFM Perspective: ${finding.approvability}`, margin + 10, yPosition, contentWidth - 15);
      });
    }
  }

  // Detailed Assessments by Category
  if (assessmentData.summary && assessmentData.summary.categorySummaries) {
    checkNewPage();
    doc.addPage();
    yPosition = 20;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('DETAILED ASSESSMENT BY CATEGORY', margin, yPosition);

    Object.entries(assessmentData.summary.categorySummaries).forEach(([category, assessments]) => {
      checkNewPage(40);
      yPosition += 12;

      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(category, margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);

      assessments.forEach(assessment => {
        checkNewPage(20);
        yPosition += 6;
        doc.text(`• ${assessment.status}: ${assessment.message}`, margin + 5, yPosition);

        if (assessment.guideline) {
          yPosition += 4;
          doc.setFont('helvetica', 'italic');
          yPosition = addText(`  Guideline: ${assessment.guideline}`, margin + 8, yPosition, contentWidth - 13);
          doc.setFont('helvetica', 'normal');
        }
      });
    });
  }

  // Recommendations
  if (assessmentData.recommendations && assessmentData.recommendations.length > 0) {
    checkNewPage(50);
    yPosition += 15;

    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('RECOMMENDATIONS', margin, yPosition);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');

    assessmentData.recommendations.forEach((rec, index) => {
      checkNewPage(15);
      yPosition += 8;
      yPosition = addText(`${index + 1}. ${rec}`, margin, yPosition);
    });
  }

  // Footer on each page
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.text(
      `Risk Ranger Report - Page ${i} of ${pageCount} - Generated with Claude Code`,
      margin,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      'Based on ASRM 2022 Guidelines for Gestational Carriers',
      pageWidth - margin - 80,
      doc.internal.pageSize.height - 10
    );
  }

  return doc;
}

/**
 * Generate and download a PDF report
 * @param {Object} assessmentData - Assessment results
 * @param {Object} candidateInfo - Candidate information
 * @param {string} filename - Output filename (optional)
 */
export function downloadAssessmentReport(assessmentData, candidateInfo = {}, filename) {
  const doc = generateAssessmentReport(assessmentData, candidateInfo);

  const defaultFilename = `risk_ranger_report_${candidateInfo.caseNumber || 'candidate'}_${new Date().toISOString().split('T')[0]}.pdf`;

  doc.save(filename || defaultFilename);
}

/**
 * Generate batch report for multiple candidates
 * @param {Array} assessments - Array of assessment objects {candidateInfo, assessmentData}
 * @returns {jsPDF} Combined PDF document
 */
export function generateBatchReport(assessments) {
  const doc = new jsPDF();
  let isFirstPage = true;

  assessments.forEach((assessment, index) => {
    if (!isFirstPage) {
      doc.addPage();
    }

    const tempDoc = generateAssessmentReport(
      assessment.assessmentData,
      assessment.candidateInfo
    );

    // Copy pages from temp doc (simplified - in production you'd use a proper merge)
    // For now, we'll add a separator
    if (!isFirstPage) {
      doc.text(`--- Assessment ${index + 1} ---`, 20, 20);
    }

    isFirstPage = false;
  });

  return doc;
}
