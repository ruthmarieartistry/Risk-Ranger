import { useState } from 'react';
import { parseDocument } from '../utils/simplePdfParser.js';
import { parseWithClaude } from '../utils/claudeParser.js';

function MFMemo() {
  const [candidateName, setCandidateName] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mfmReport, setMfmReport] = useState(null);
  const [error, setError] = useState('');

  // Brand colors
  const rubyRed = '#7d2431';
  const darkGreen = '#217045';
  const mustardYellow = '#e1b321';
  const darkTeal = '#005567';

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setError('');
    setIsAnalyzing(true);
    setMfmReport(null);

    try {
      console.log('📄 Parsing MFM document:', file.name);

      // Parse the PDF
      let extractedText = '';
      if (file.type === 'application/pdf') {
        extractedText = await parseDocument(file);
      } else if (file.type === 'text/plain') {
        extractedText = await file.text();
      } else {
        throw new Error('Please upload a PDF or TXT file');
      }

      console.log('✅ Document parsed, analyzing with Claude...');

      // Create MFMemo-specific prompt
      const mfmPrompt = `You are analyzing a Maternal-Fetal Medicine (MFM) consultation report for a gestational carrier candidate.

IMPORTANT INSTRUCTIONS:
1. Extract ALL red flags (risk factors) and green flags (positive factors)
2. Provide a comprehensive overview
3. Assess clinic clearance likelihood (Lax, Moderate, Strict)
4. Include specific medical details, numbers, and measurements

Medical Record:
${extractedText}

Generate a detailed MFM analysis in this EXACT JSON format:
{
  "overview": "Detailed overview paragraph describing the candidate, key risk factors, and MFM conclusion",
  "redFlags": [
    "Specific risk factor with details (e.g., BMI of 33.3, which exceeds strict clinic cutoffs)",
    "Another risk factor with medical details"
  ],
  "greenFlags": [
    "Positive factor with details",
    "Another positive factor"
  ],
  "notes": "Additional important notes, recommendations, or clarifications from the MFM",
  "clinicClearance": {
    "lax": {
      "likelihood": "High Likelihood|Medium Likelihood|Low Likelihood|Very Low Likelihood",
      "assessment": "Detailed explanation of why lax clinics would accept or decline"
    },
    "moderate": {
      "likelihood": "High Likelihood|Medium Likelihood|Low Likelihood|Very Low Likelihood",
      "assessment": "Detailed explanation for moderate clinics"
    },
    "strict": {
      "likelihood": "High Likelihood|Medium Likelihood|Low Likelihood|Very Low Likelihood",
      "assessment": "Detailed explanation for strict clinics, mention specific thresholds (e.g., BMI >32)"
    }
  }
}

Be thorough and specific. Include actual numbers, measurements, and medical terminology from the report.`;

      const analysisResult = await parseWithClaude(extractedText, mfmPrompt);

      if (analysisResult.error) {
        throw new Error(analysisResult.error);
      }

      console.log('✅ Analysis complete');

      // Parse the JSON response
      let reportData;
      try {
        reportData = JSON.parse(analysisResult.parsedData || analysisResult);
      } catch (parseError) {
        console.error('Failed to parse JSON:', parseError);
        throw new Error('Failed to parse analysis results');
      }

      setMfmReport({
        ...reportData,
        candidateName: candidateName || 'Unknown Candidate',
        originalFile: file.name,
        dateGenerated: new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
      });

    } catch (err) {
      console.error('❌ Error:', err);
      setError(err.message || 'Failed to analyze document');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getLikelihoodColor = (likelihood) => {
    if (likelihood.includes('High')) return darkGreen;
    if (likelihood.includes('Medium')) return mustardYellow;
    if (likelihood.includes('Low')) return rubyRed;
    return '#666';
  };

  const printReport = () => {
    window.print();
  };

  const startNewAnalysis = () => {
    setMfmReport(null);
    setCandidateName('');
    setUploadedFileName('');
    setError('');
  };

  return (
    <div style={{
      padding: '20px',
      maxWidth: '900px',
      margin: '0 auto',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <img
          src="/mfmemo-logo.png"
          alt="MFMemo"
          style={{ height: '60px', marginBottom: '10px' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <h1 style={{
          color: darkTeal,
          fontSize: '36px',
          fontWeight: '300',
          margin: '0 0 10px 0'
        }}>
          MFMemo
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#666',
          fontWeight: '300',
          margin: 0
        }}>
          AI-Powered MFM Report Analysis
        </p>
      </div>

      {/* Upload Form */}
      {!mfmReport && (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '30px',
          marginBottom: '20px'
        }}>
          <h2 style={{
            color: darkTeal,
            fontSize: '24px',
            fontWeight: '300',
            marginTop: 0
          }}>
            Upload MFM Consultation Report
          </h2>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              Candidate Name (Optional)
            </label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Enter candidate name"
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: '500',
              color: '#333'
            }}>
              MFM Report (PDF or TXT)
            </label>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              disabled={isAnalyzing}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                border: '2px solid #e0e0e0',
                borderRadius: '4px',
                boxSizing: 'border-box',
                cursor: isAnalyzing ? 'not-allowed' : 'pointer'
              }}
            />
            {uploadedFileName && (
              <p style={{ marginTop: '8px', color: '#666', fontSize: '14px' }}>
                📄 {uploadedFileName}
              </p>
            )}
          </div>

          {isAnalyzing && (
            <div style={{
              padding: '20px',
              background: '#f0f7ff',
              borderRadius: '4px',
              textAlign: 'center',
              color: darkTeal,
              fontSize: '16px'
            }}>
              🔄 Analyzing MFM report with Claude AI...
            </div>
          )}

          {error && (
            <div style={{
              padding: '15px',
              background: '#fee',
              border: `2px solid ${rubyRed}`,
              borderRadius: '4px',
              color: rubyRed,
              marginTop: '15px'
            }}>
              ⚠️ {error}
            </div>
          )}

          <div style={{
            marginTop: '30px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '4px',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            <strong>How it works:</strong>
            <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
              <li>Upload an MFM consultation report (PDF or text)</li>
              <li>AI analyzes the medical record for risk factors</li>
              <li>Generates a structured report with clearance assessments</li>
              <li>Evaluates likelihood for Lax, Moderate, and Strict clinics</li>
            </ul>
          </div>
        </div>
      )}

      {/* MFMemo Report */}
      {mfmReport && (
        <div className="mfmemo-report" style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '40px',
          marginBottom: '20px'
        }}>
          {/* Report Header */}
          <div style={{
            borderBottom: '4px solid ' + mustardYellow,
            paddingBottom: '20px',
            marginBottom: '30px'
          }}>
            <h1 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#000',
              margin: '0 0 15px 0'
            }}>
              MFMemo AI Report
            </h1>
            <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
              <div><strong>Surrogate:</strong> {mfmReport.candidateName}</div>
              <div><strong>Original File:</strong> {mfmReport.originalFile}</div>
              <div><strong>Date Generated:</strong> {mfmReport.dateGenerated}</div>
            </div>
          </div>

          {/* Overview */}
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: darkTeal,
              marginBottom: '15px'
            }}>
              Overview
            </h2>
            <p style={{
              fontSize: '15px',
              lineHeight: '1.7',
              color: '#333',
              margin: 0
            }}>
              {mfmReport.overview}
            </p>
          </div>

          {/* Red Flags and Green Flags - Side by Side */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '30px',
            marginBottom: '30px'
          }}>
            {/* Red Flags */}
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: rubyRed,
                marginBottom: '15px'
              }}>
                Red Flags
              </h2>
              <ul style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#333',
                margin: 0,
                paddingLeft: '20px'
              }}>
                {mfmReport.redFlags && mfmReport.redFlags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '12px' }}>{flag}</li>
                ))}
              </ul>
            </div>

            {/* Green Flags */}
            <div>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: darkGreen,
                marginBottom: '15px'
              }}>
                Green Flags
              </h2>
              <ul style={{
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#333',
                margin: 0,
                paddingLeft: '20px'
              }}>
                {mfmReport.greenFlags && mfmReport.greenFlags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '12px' }}>{flag}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Notes */}
          {mfmReport.notes && (
            <div style={{ marginBottom: '30px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '600',
                color: darkTeal,
                marginBottom: '15px'
              }}>
                Notes
              </h2>
              <p style={{
                fontSize: '14px',
                lineHeight: '1.7',
                color: '#333',
                margin: 0
              }}>
                {mfmReport.notes}
              </p>
            </div>
          )}

          {/* Clinic Clearance Assessment */}
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '600',
              color: darkTeal,
              marginBottom: '20px'
            }}>
              Clinic Clearance Assessment
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px'
            }}>
              {/* Lax Clinic */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                background: '#fafafa'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#4A90E2',
                  margin: '0 0 10px 0'
                }}>
                  Lax Clinic
                </h3>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: getLikelihoodColor(mfmReport.clinicClearance?.lax?.likelihood || ''),
                  marginBottom: '12px'
                }}>
                  {mfmReport.clinicClearance?.lax?.likelihood || 'Not assessed'}
                </div>
                <p style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#555',
                  margin: 0
                }}>
                  {mfmReport.clinicClearance?.lax?.assessment || ''}
                </p>
              </div>

              {/* Moderate Clinic */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                background: '#fafafa'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#E89C31',
                  margin: '0 0 10px 0'
                }}>
                  Moderate Clinic
                </h3>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: getLikelihoodColor(mfmReport.clinicClearance?.moderate?.likelihood || ''),
                  marginBottom: '12px'
                }}>
                  {mfmReport.clinicClearance?.moderate?.likelihood || 'Not assessed'}
                </div>
                <p style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#555',
                  margin: 0
                }}>
                  {mfmReport.clinicClearance?.moderate?.assessment || ''}
                </p>
              </div>

              {/* Strict Clinic */}
              <div style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                background: '#fafafa'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: rubyRed,
                  margin: '0 0 10px 0'
                }}>
                  Strict Clinic
                </h3>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: getLikelihoodColor(mfmReport.clinicClearance?.strict?.likelihood || ''),
                  marginBottom: '12px'
                }}>
                  {mfmReport.clinicClearance?.strict?.likelihood || 'Not assessed'}
                </div>
                <p style={{
                  fontSize: '13px',
                  lineHeight: '1.6',
                  color: '#555',
                  margin: 0
                }}>
                  {mfmReport.clinicClearance?.strict?.assessment || ''}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: '40px',
            display: 'flex',
            gap: '15px',
            justifyContent: 'center',
            paddingTop: '30px',
            borderTop: '2px solid #e0e0e0'
          }}>
            <button
              onClick={printReport}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                fontWeight: '500',
                color: 'white',
                background: darkGreen,
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              🖨️ Print Report
            </button>
            <button
              onClick={startNewAnalysis}
              style={{
                padding: '12px 30px',
                fontSize: '16px',
                fontWeight: '500',
                color: darkTeal,
                background: 'white',
                border: `2px solid ${darkTeal}`,
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              ➕ New Analysis
            </button>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .mfmemo-report {
            box-shadow: none;
            padding: 20px;
          }
          button {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default MFMemo;
