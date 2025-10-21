import { jsPDF } from 'jspdf';
import { getAcceptanceProbabilityDescription } from '../assessments/clinicTypeAssessment.js';

/**
 * Generate a professional PDF report from assessment results
 */
export function generatePDFReport(candidateData, assessmentResults, candidateName = '') {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPos = margin;

  // Helper function to add text with word wrap
  const addText = (text, size = 12, style = 'normal', color = [0, 0, 0]) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', style);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);

    // Check if we need a new page
    if (yPos + (lines.length * size * 0.35) > pageHeight - margin) {
      doc.addPage();
      yPos = margin;
    }

    doc.text(lines, margin, yPos);
    yPos += lines.length * size * 0.35 + 5;
  };

  const addSpace = (space = 10) => {
    yPos += space;
  };

  const addLine = () => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 10;
  };

  // Header
  doc.setFillColor(125, 36, 49); // Ruby red
  doc.rect(0, 0, pageWidth, 30, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Risk Ranger Assessment Report', pageWidth / 2, 20, { align: 'center' });

  yPos = 45;

  // Candidate Name
  if (candidateName) {
    addText(`Candidate: ${candidateName}`, 14, 'bold');
    addSpace(5);
  }

  // Date
  addText(`Report Generated: ${new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}`, 10, 'normal', [100, 100, 100]);

  addSpace(10);
  addLine();

  // Medical Records Summary
  addText('Medical Records Summary', 16, 'bold', [125, 36, 49]);
  addSpace(5);

  if (!candidateData) {
    addText('No candidate data available', 11, 'italic', [200, 0, 0]);
  } else {
    if (candidateData.age) {
      addText(`Age: ${candidateData.age} years old`, 11);
    }

    if (candidateData.height && candidateData.weight) {
      addText(`Height/Weight: ${candidateData.height}, ${candidateData.weight} lbs`, 11);
      if (candidateData.bmi) {
        addText(`BMI: ${candidateData.bmi.toFixed(1)}`, 11);
      }
    }

    if (candidateData.pregnancyHistory?.numberOfTermPregnancies) {
      const numPreg = candidateData.pregnancyHistory.numberOfTermPregnancies;
      addText(`Previous Pregnancies: ${numPreg} term pregnanc${numPreg > 1 ? 'ies' : 'y'}`, 11);

      if (candidateData.pregnancyHistory.numberOfCesareans > 0) {
        const numCS = candidateData.pregnancyHistory.numberOfCesareans;
        addText(`C-sections: ${numCS}`, 11);
      }

      if (candidateData.pregnancyHistory.numberOfComplications > 0) {
        const numComp = candidateData.pregnancyHistory.numberOfComplications;
        addText(`Pregnancy Complications: ${numComp}`, 11, 'bold', [200, 0, 0]);
      }
    }

    if (candidateData.medicalConditions && candidateData.medicalConditions.length > 0) {
      addSpace(5);
      addText('Medical History:', 11, 'bold');
      candidateData.medicalConditions.forEach(condition => {
        let conditionName = condition.replace(/_/g, ' ');
        if (condition === 'pregnancy_hypertension') conditionName = 'Pregnancy-Induced Hypertension (PIH)';
        if (condition === 'gestational_diabetes') conditionName = 'Gestational Diabetes';
        if (condition === 'hypertension') conditionName = 'Chronic Hypertension';
        if (condition === 'bariatric_surgery') conditionName = 'Gastric Bypass / Bariatric Surgery';
        addText(`  • ${conditionName}`, 10);
      });
    }
  }

  addSpace(10);
  addLine();

  // Acceptance Odds by Clinic Type
  addText('Acceptance Odds by Clinic Type', 16, 'bold', [125, 36, 49]);
  addSpace(10);

  const clinicTypes = [
    {
      name: 'Strict/Premium Clinics',
      data: assessmentResults.clinicTypeAnalysis.strict,
      icon: '⭐',
      description: 'Strictest standards - BMI under 30, max 1-2 C-sections, minimal risk factors'
    },
    {
      name: 'Moderate/Average Clinics',
      data: assessmentResults.clinicTypeAnalysis.moderate,
      icon: '✓',
      description: 'Real-world moderate standards - BMI max 32, max 3 C-sections, case-by-case review'
    },
    {
      name: 'Lenient Clinics',
      data: assessmentResults.clinicTypeAnalysis.lenient,
      icon: '→',
      description: 'More flexible standards - BMI up to 32-35, case-by-case common sense approach'
    }
  ];

  clinicTypes.forEach(clinic => {
    // Clinic header with colored box
    const acceptanceDesc = getAcceptanceProbabilityDescription(clinic.data.acceptanceLevel);
    const probability = acceptanceDesc.split(' - ')[0];

    // Color code based on acceptance level
    let color = [107, 114, 128]; // gray
    if (clinic.data.acceptanceLevel === 'HIGHLY_LIKELY') color = [16, 185, 129]; // green
    else if (clinic.data.acceptanceLevel === 'LIKELY') color = [132, 204, 22]; // light green
    else if (clinic.data.acceptanceLevel === 'POSSIBLE') color = [245, 158, 11]; // orange
    else if (clinic.data.acceptanceLevel === 'UNLIKELY') color = [239, 68, 68]; // red
    else if (clinic.data.acceptanceLevel === 'VERY_UNLIKELY') color = [127, 29, 29]; // dark red

    addText(`${clinic.icon} ${clinic.name}`, 13, 'bold');
    addText(clinic.description, 9, 'normal', [100, 100, 100]);
    addSpace(3);

    doc.setFillColor(...color);
    doc.roundedRect(margin, yPos, 80, 12, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(probability, margin + 40, yPos + 8, { align: 'center' });
    yPos += 15;

    doc.setTextColor(0, 0, 0);
    addText('(depending on clinic)', 8, 'italic', [100, 100, 100]);

    // Issues
    if (clinic.data.issues && clinic.data.issues.length > 0) {
      addSpace(3);
      addText(`Concerns:`, 10, 'bold');
      clinic.data.issues.slice(0, 5).forEach(issue => { // Limit to 5 issues to save space
        addText(`  • ${issue.message}`, 9);
      });
    }

    addSpace(8);
  });

  addLine();

  // Footer/Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.setFont('helvetica', 'italic');
  const disclaimer = 'IMPORTANT: This is an informational assessment only. All surrogacy decisions must be made in consultation with qualified medical professionals, reproductive endocrinologists, and mental health specialists. Based on ASRM 2022 guidelines for gestational carriers.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, pageWidth - 2 * margin);

  // Add disclaimer at bottom of page
  const disclaimerY = pageHeight - margin - (disclaimerLines.length * 3);
  doc.text(disclaimerLines, margin, disclaimerY);

  // Footer
  doc.setFontSize(8);
  doc.text('Generated with Risk Ranger - © RME 2025', pageWidth / 2, pageHeight - 10, { align: 'center' });

  // Generate filename
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = candidateName
    ? `RiskRanger_${candidateName.replace(/\s+/g, '_')}_${timestamp}.pdf`
    : `RiskRanger_Report_${timestamp}.pdf`;

  // Save the PDF
  doc.save(filename);
}
