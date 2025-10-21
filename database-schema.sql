-- Risk Ranger Database Schema for Supabase
-- This schema stores medical record reviews, candidate data, and assessment results

-- Candidates table - stores basic surrogate candidate information
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Basic Information
  candidate_name TEXT,
  candidate_initials TEXT,
  date_of_birth DATE,
  age INTEGER,

  -- Contact & Identification
  email TEXT,
  phone TEXT,
  case_number TEXT UNIQUE,

  -- Status
  status TEXT DEFAULT 'pending', -- pending, reviewed, approved, declined

  CONSTRAINT candidates_age_check CHECK (age >= 18 AND age <= 50)
);

-- Medical Records table - stores uploaded medical records
CREATE TABLE IF NOT EXISTS medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,

  -- File Information
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- txt, pdf, doc, docx
  file_size INTEGER,
  file_url TEXT, -- Supabase storage URL

  -- Extracted Text
  raw_text TEXT,
  parsed_data JSONB, -- Structured medical data extracted from text

  -- Processing Status
  processing_status TEXT DEFAULT 'pending', -- pending, processing, completed, error
  processing_error TEXT
);

-- Risk Assessments table - stores complete assessment results
CREATE TABLE IF NOT EXISTS risk_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
  medical_record_id UUID REFERENCES medical_records(id) ON DELETE SET NULL,

  -- Assessment Data (full JSON results from analysis)
  assessment_data JSONB NOT NULL,

  -- Quick reference fields for filtering/searching
  overall_risk_level TEXT, -- ELIGIBLE, REQUIRES_COUNSELING, HIGH_RISK, DISQUALIFIED

  -- Clinic Type Scores
  strict_clinic_score INTEGER,
  moderate_clinic_score INTEGER,
  lenient_clinic_score INTEGER,

  -- MFM Assessment
  mfm_consultation_needed BOOLEAN,
  mfm_review_level TEXT, -- NOT_REQUIRED, RECOMMENDED, STRONGLY_RECOMMENDED, REQUIRED
  mfm_likelihood TEXT, -- LIKELY_APPROVE, POSSIBLY_APPROVE, UNLIKELY_APPROVE, LIKELY_DENY
  mfm_likelihood_percentage TEXT,

  -- Key flags for quick filtering
  has_high_risk_factors BOOLEAN DEFAULT FALSE,
  requires_medical_clearance BOOLEAN DEFAULT FALSE,

  -- Reviewer information
  reviewed_by TEXT,
  review_notes TEXT
);

-- Assessment Findings table - individual findings from assessments
CREATE TABLE IF NOT EXISTS assessment_findings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  assessment_id UUID REFERENCES risk_assessments(id) ON DELETE CASCADE,

  -- Finding details
  category TEXT NOT NULL, -- Age, Cesarean History, BMI, Medical Conditions, etc.
  concern TEXT NOT NULL,
  severity TEXT NOT NULL, -- low, moderate, high

  -- MFM perspective
  mfm_view TEXT,
  approvability TEXT,

  -- Guideline reference
  guideline_source TEXT, -- ASRM, CDC, Blue Cross Blue Shield, etc.
  guideline_text TEXT
);

-- Audit log - track all actions for compliance
CREATE TABLE IF NOT EXISTS audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- User/action information
  user_id TEXT,
  action TEXT NOT NULL, -- upload, review, update, delete, etc.

  -- Related records
  candidate_id UUID REFERENCES candidates(id) ON DELETE SET NULL,
  assessment_id UUID REFERENCES risk_assessments(id) ON DELETE SET NULL,

  -- Action details
  details JSONB,

  -- Audit trail
  ip_address INET,
  user_agent TEXT
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
CREATE INDEX IF NOT EXISTS idx_candidates_case_number ON candidates(case_number);
CREATE INDEX IF NOT EXISTS idx_medical_records_candidate ON medical_records(candidate_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_candidate ON risk_assessments(candidate_id);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_risk_level ON risk_assessments(overall_risk_level);
CREATE INDEX IF NOT EXISTS idx_risk_assessments_mfm_needed ON risk_assessments(mfm_consultation_needed);
CREATE INDEX IF NOT EXISTS idx_assessment_findings_assessment ON assessment_findings(assessment_id);
CREATE INDEX IF NOT EXISTS idx_assessment_findings_severity ON assessment_findings(severity);
CREATE INDEX IF NOT EXISTS idx_audit_log_candidate ON audit_log(candidate_id);

-- Row Level Security (RLS) - Enable for security
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_findings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies (you'll need to customize based on your auth setup)
-- For now, allowing all authenticated users to read/write
-- You should restrict this based on your actual user roles

CREATE POLICY "Enable read access for authenticated users" ON candidates
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON candidates
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update access for authenticated users" ON candidates
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Similar policies for other tables
CREATE POLICY "Enable read access for authenticated users" ON medical_records
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON medical_records
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON risk_assessments
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON risk_assessments
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON assessment_findings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON assessment_findings
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable read access for authenticated users" ON audit_log
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for authenticated users" ON audit_log
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Functions
-- Updated timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_candidates_updated_at
  BEFORE UPDATE ON candidates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Audit log trigger
CREATE OR REPLACE FUNCTION create_audit_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (action, candidate_id, details)
  VALUES (
    TG_OP,
    NEW.id,
    row_to_json(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER audit_candidates
  AFTER INSERT OR UPDATE ON candidates
  FOR EACH ROW
  EXECUTE FUNCTION create_audit_log();
