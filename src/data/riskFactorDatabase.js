/**
 * Risk Factor Educational Database
 * Based on ASRM guidelines and clinical best practices
 * Each factor includes educational content explaining what it is, why it matters, and risk level
 */

export const riskFactorDatabase = {
  // PREGNANCY COMPLICATIONS
  postpartum_hemorrhage: {
    name: "Postpartum Hemorrhage",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "An excessive loss of blood (more than 500ml for vaginal delivery or 1000ml for cesarean) following childbirth, which can be life-threatening.",
      whatCauses: "Uterine atony (failure of the uterus to contract), retained placenta, lacerations, or blood clotting disorders.",
      whyItMatters: "PPH indicates increased risk for the same complication in future pregnancies and may require emergency interventions. Clinics must ensure immediate access to blood products and surgical backup.",
      combinedRisk: "Severity of hemorrhage and number of units transfused directly influence future pregnancy risk. Recurrence risk increases with multiple episodes."
    }
  },

  preeclampsia: {
    name: "Preeclampsia",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "A pregnancy complication characterized by high blood pressure and signs of damage to organ systems, most often the liver and kidneys, typically occurring after 20 weeks of pregnancy.",
      whatCauses: "Exact cause unknown, but involves abnormal placental development and blood vessel problems. Risk factors include first pregnancy, obesity, advanced maternal age, and chronic hypertension.",
      whyItMatters: "Preeclampsia can progress to life-threatening seizures (eclampsia) or organ damage. Women with history of preeclampsia have 15-25% recurrence risk in subsequent pregnancies and require intensive monitoring.",
      combinedRisk: "When combined with chronic hypertension, diabetes, or kidney disease, preeclampsia risk increases significantly and may necessitate automatic disqualification."
    }
  },

  pregnancy_hypertension: {
    name: "Pregnancy-Induced Hypertension (PIH)",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "High blood pressure that develops during pregnancy (after 20 weeks) without protein in the urine or other signs of preeclampsia, and resolves after delivery.",
      whatCauses: "Similar to preeclampsia but less severe - involves vascular changes during pregnancy that affect blood pressure regulation.",
      whyItMatters: "While less severe than preeclampsia, PIH still requires careful monitoring and indicates cardiovascular stress during pregnancy. May progress to preeclampsia in 15-25% of cases.",
      combinedRisk: "Risk increases with obesity, multiple gestations, or pre-existing cardiovascular conditions. Can complicate labor and delivery planning."
    }
  },

  gestational_diabetes: {
    name: "Gestational Diabetes",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "High blood sugar levels that develop during pregnancy in women who didn't previously have diabetes, typically diagnosed between 24-28 weeks.",
      whatCauses: "Pregnancy hormones block insulin's action, causing glucose to build up in the blood. Risk factors include obesity, family history, and advanced maternal age.",
      whyItMatters: "Gestational diabetes increases risk of large babies, birth injuries, cesarean delivery, and can progress to Type 2 diabetes later. Requires careful glucose monitoring and may require insulin.",
      combinedRisk: "Combined with obesity or PCOS, recurrence risk is very high (up to 50-70%). May indicate underlying insulin resistance."
    }
  },

  placenta_previa: {
    name: "Placenta Previa",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "A condition where the placenta partially or completely covers the cervix, blocking the baby's exit path and causing bleeding risk.",
      whatCauses: "Abnormal implantation of the embryo, often associated with previous cesarean deliveries, uterine surgery, or multiparity.",
      whyItMatters: "Requires cesarean delivery and carries high risk of severe hemorrhage. Risk increases dramatically with previous cesarean (placenta accreta risk).",
      combinedRisk: "With prior cesarean sections, risk of placenta accreta (invasive placenta) increases exponentially - potentially life-threatening and requiring hysterectomy."
    }
  },

  placental_abruption: {
    name: "Placental Abruption",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "The premature separation of the placenta from the uterine wall before delivery, cutting off oxygen and nutrients to the baby.",
      whatCauses: "Trauma, hypertension, smoking, cocaine use, or previous abruption. Often occurs suddenly and unpredictably.",
      whyItMatters: "Life-threatening emergency requiring immediate delivery. Can cause severe bleeding, fetal distress, and maternal shock. Recurrence risk is 10-15%.",
      combinedRisk: "Risk increases significantly with hypertension, smoking, or history of multiple abruptions. May indicate underlying vascular problems."
    }
  },

  hyperemesis_gravidarum: {
    name: "Hyperemesis Gravidarum",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "Severe, persistent nausea and vomiting during pregnancy leading to weight loss, dehydration, and electrolyte imbalances requiring hospitalization.",
      whatCauses: "Related to pregnancy hormones (especially hCG), but exact cause unknown. More common with multiple gestations and molar pregnancies.",
      whyItMatters: "Can require IV fluids, hospitalization, PICC line placement, and TPN (total parenteral nutrition). Affects maternal nutrition and quality of life.",
      combinedRisk: "When requiring PICC line, TPN, or multiple hospitalizations, indicates severe case with high recurrence risk (up to 80%)."
    }
  },

  preterm_labor: {
    name: "Preterm Labor",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Pregnancy Complications",
    education: {
      whatItIs: "Labor that begins before 37 weeks of pregnancy, potentially leading to premature birth and associated complications.",
      whatCauses: "Infection, cervical insufficiency, multiple gestations, uterine abnormalities, or unknown causes.",
      whyItMatters: "Premature babies face respiratory, developmental, and health challenges. History of preterm labor increases recurrence risk to 15-30%.",
      combinedRisk: "With cervical insufficiency, short cervix, or previous very early preterm birth (<28 weeks), risk is substantially higher."
    }
  },

  // MEDICAL CONDITIONS
  hypertension: {
    name: "Chronic Hypertension",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Medical Conditions",
    education: {
      whatItIs: "High blood pressure that exists before pregnancy or develops before 20 weeks of pregnancy, as opposed to pregnancy-induced hypertension.",
      whatCauses: "Essential hypertension (no known cause) or secondary to kidney disease, endocrine disorders, or vascular problems.",
      whyItMatters: "Dramatically increases risk of preeclampsia (25-50%), placental abruption, preterm birth, and fetal growth restriction. Requires medication management and intensive monitoring.",
      combinedRisk: "Combined with obesity, diabetes, or kidney disease, maternal and fetal risks become very high and may preclude safe surrogacy."
    }
  },

  diabetes: {
    name: "Diabetes (Type 1 or Type 2)",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Medical Conditions",
    education: {
      whatItIs: "Pre-existing diabetes (Type 1 or Type 2) before pregnancy, requiring careful glucose management throughout pregnancy.",
      whatCauses: "Type 1: autoimmune destruction of insulin-producing cells. Type 2: insulin resistance, often related to obesity and genetics.",
      whyItMatters: "Increases risk of birth defects, preeclampsia, large babies, stillbirth, and neonatal complications. Requires intensive glucose monitoring and medication adjustment.",
      combinedRisk: "With poor glucose control (HbA1c >7%), obesity, or vascular complications, pregnancy risks are substantially elevated."
    }
  },

  thyroid_disorder: {
    name: "Thyroid Disorder",
    riskLevel: "LOW",
    isStandalone: false,
    category: "Medical Conditions",
    education: {
      whatItIs: "Dysfunction of the thyroid gland causing either excessive (hyperthyroidism) or insufficient (hypothyroidism) thyroid hormone production.",
      whatCauses: "Autoimmune disorders (Hashimoto's, Graves'), iodine deficiency, or thyroid nodules/tumors.",
      whyItMatters: "Untreated thyroid disorders can affect fetal brain development and increase miscarriage risk. However, well-controlled thyroid disease with stable medication usually poses minimal risk.",
      combinedRisk: "Well-controlled thyroid disorder is generally low risk. Uncontrolled or requiring frequent medication adjustments is concerning."
    }
  },

  obesity: {
    name: "Obesity (BMI ≥30)",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Medical Conditions",
    education: {
      whatItIs: "Body Mass Index (BMI) of 30 or higher, indicating excess body fat that may affect health.",
      whatCauses: "Complex combination of genetic, environmental, behavioral, and metabolic factors.",
      whyItMatters: "Increases risk of gestational diabetes (2-4x), preeclampsia (2-3x), cesarean delivery, blood clots, and anesthesia complications. Higher BMI correlates with higher risk.",
      combinedRisk: "BMI >35 (Class II obesity) or >40 (Class III obesity) substantially increases all pregnancy risks. Combined with diabetes or hypertension, may be disqualifying."
    }
  },

  asthma: {
    name: "Asthma",
    riskLevel: "LOW",
    isStandalone: false,
    category: "Medical Conditions",
    education: {
      whatItIs: "A chronic respiratory condition causing inflammation and narrowing of airways, leading to breathing difficulty, wheezing, and coughing.",
      whatCauses: "Genetic predisposition combined with environmental triggers (allergens, smoke, cold air, exercise, stress).",
      whyItMatters: "Well-controlled asthma poses minimal risk. Poorly controlled asthma can lead to low oxygen levels affecting the baby, preterm birth, and preeclampsia.",
      combinedRisk: "Severity matters more than diagnosis. Frequent exacerbations, hospitalizations, or oral steroid dependence indicates higher risk."
    }
  },

  mental_health: {
    name: "Mental Health History",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Psychological",
    education: {
      whatItIs: "History of mental health conditions such as depression, anxiety, bipolar disorder, or past psychiatric hospitalization.",
      whatCauses: "Complex interplay of genetic, biological, environmental, and psychological factors.",
      whyItMatters: "Pregnancy hormones can affect mental health medication effectiveness and symptom stability. Postpartum period carries increased risk of relapse, especially for mood disorders.",
      combinedRisk: "Recent hospitalization, multiple medications, or severe diagnoses (bipolar, schizophrenia) require careful psychological evaluation and clearance."
    }
  },

  // SURGICAL HISTORY
  multiple_cesareans: {
    name: "Multiple Cesarean Deliveries (3+)",
    riskLevel: "HIGH",
    isStandalone: true,
    category: "Surgical History",
    education: {
      whatItIs: "Three or more previous deliveries by cesarean section, resulting in multiple uterine scars.",
      whatCauses: "Previous cesarean delivery, breech presentation, fetal distress, or other obstetric indications requiring surgical delivery.",
      whyItMatters: "Each cesarean increases risk of placenta accreta (invasive placenta), uterine rupture, and severe hemorrhage. Three or more cesareans significantly elevates these risks.",
      combinedRisk: "With placenta previa or anterior placenta, risk of life-threatening placenta accreta is extremely high and may require hysterectomy."
    }
  },

  myomectomy: {
    name: "Myomectomy (Fibroid Removal)",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Surgical History",
    education: {
      whatItIs: "Surgical removal of uterine fibroids (benign tumors), potentially weakening the uterine wall.",
      whatCauses: "Surgery performed to treat symptomatic fibroids causing bleeding, pain, or fertility issues.",
      whyItMatters: "Depending on depth and location of incisions, may increase risk of uterine rupture during pregnancy or labor. May require cesarean delivery.",
      combinedRisk: "Multiple myomectomies, transmural incisions (through full uterine wall), or multiple fibroids removed increases rupture risk."
    }
  },

  // AGE-RELATED
  advanced_maternal_age: {
    name: "Advanced Maternal Age (≥35)",
    riskLevel: "MODERATE",
    isStandalone: false,
    category: "Demographic",
    education: {
      whatItIs: "Maternal age of 35 years or older at time of delivery.",
      whatCauses: "Natural aging process affecting egg quality, chromosomal health, and physiological resilience.",
      whyItMatters: "Age ≥35 increases risk of chromosomal abnormalities, gestational diabetes, hypertension, preeclampsia, and cesarean delivery. Risk increases with each year over 35.",
      combinedRisk: "Age >40 substantially increases risks. Combined with medical conditions like hypertension or diabetes, risks compound significantly."
    }
  },

  young_maternal_age: {
    name: "Young Maternal Age (<21)",
    riskLevel: "LOW",
    isStandalone: false,
    category: "Demographic",
    education: {
      whatItIs: "Maternal age under 21 years at time of delivery.",
      whatCauses: "ASRM guidelines recommend minimum age 21 for gestational carriers to ensure physical maturity and informed consent capacity.",
      whyItMatters: "Younger women may have less mature decision-making capacity and may face higher social/emotional risks. ASRM guidelines exist to protect young women from coercion.",
      combinedRisk: "Age <21 is typically an automatic disqualifier per ASRM guidelines, regardless of medical history."
    }
  }
};

/**
 * Get risk factor information by key
 */
export function getRiskFactorInfo(factorKey) {
  return riskFactorDatabase[factorKey] || null;
}

/**
 * Get all risk factors in a category
 */
export function getRiskFactorsByCategory(category) {
  return Object.entries(riskFactorDatabase)
    .filter(([_, factor]) => factor.category === category)
    .map(([key, factor]) => ({ key, ...factor }));
}

/**
 * Get all standalone (automatic disqualifier) risk factors
 */
export function getStandaloneRiskFactors() {
  return Object.entries(riskFactorDatabase)
    .filter(([_, factor]) => factor.isStandalone)
    .map(([key, factor]) => ({ key, ...factor }));
}

/**
 * Format risk level for display
 */
export function getRiskLevelColor(riskLevel) {
  switch (riskLevel) {
    case 'HIGH':
      return '#dc2626'; // red-600
    case 'MODERATE':
      return '#f59e0b'; // amber-500
    case 'LOW':
      return '#10b981'; // emerald-500
    default:
      return '#6b7280'; // gray-500
  }
}

/**
 * Format risk level badge
 */
export function getRiskLevelBadge(riskLevel) {
  const colors = {
    HIGH: { bg: '#fee2e2', text: '#991b1b' },
    MODERATE: { bg: '#fef3c7', text: '#92400e' },
    LOW: { bg: '#d1fae5', text: '#065f46' }
  };
  return colors[riskLevel] || { bg: '#f3f4f6', text: '#374151' };
}
