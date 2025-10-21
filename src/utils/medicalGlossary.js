/**
 * Medical Glossary for Pregnancy, Delivery, and Obstetric Terms
 * Common abbreviations and terminology used in surrogacy screening
 *
 * METHODOLOGY - SOURCES USED:
 *
 * This comprehensive medical glossary contains 400+ terms compiled from the following
 * authoritative medical sources:
 *
 * 1. ASRM (American Society for Reproductive Medicine)
 *    - 2022 Guidelines for Gestational Carriers
 *    - Standard obstetric terminology and surrogacy-specific criteria
 *
 * 2. CDC (Centers for Disease Control and Prevention)
 *    - Maternal health conditions affecting pregnancy
 *    - Chronic conditions: anemia, anxiety, depression, diabetes, hypertension
 *    - Infectious diseases: UTI, HIV, viral hepatitis, STI/STD, tuberculosis, COVID-19
 *    - Pregnancy outcomes: low birth weight, preterm delivery, stillbirth
 *
 * 3. March of Dimes
 *    - Chronic health conditions affecting pregnancy
 *    - Autoimmune diseases: lupus, multiple sclerosis, rheumatoid arthritis, IBD,
 *      Crohn's disease, ulcerative colitis, psoriasis, scleroderma, ankylosing spondylitis
 *    - Cardiovascular/pulmonary: asthma, heart disease, kidney disease, obesity
 *    - Endocrine/hormone: diabetes, thyroid conditions
 *    - Mental health: depression, anxiety, depressive disorders
 *
 * 4. Blue Cross Blue Shield
 *    - Preterm labor signs and symptoms
 *    - Gestational diabetes management and screening
 *    - Pregnancy-induced hypertension and preeclampsia warning signs
 *    - Placental complications (placenta previa and placental abruption)
 *    - Urinary tract infections and other pregnancy-related infections
 *    - Labor signs: contractions, cramping, backache, bloody show, mucus plug
 *
 * 5. Stanford Children's Health
 *    - Prenatal testing terminology: AFP, amniocentesis, CVS, cordocentesis, PUBS
 *    - Fetal development and monitoring: NST, BPP, Doppler flow, ultrasound
 *    - Pregnancy complications: HELLP syndrome, hydrops fetalis, IUGR/FGR
 *    - Blood/lab testing: hematocrit, hemoglobin, bilirubin, hCG
 *    - Rh disease and incompatibility, RhoGAM administration
 *    - Anatomical terminology: uterus, placenta, cervix, amniotic sac, umbilical cord
 *
 * 6. Johns Hopkins Medicine
 *    - Amniotic fluid complications: polyhydramnios, oligohydramnios, PROM
 *    - Bleeding complications and causes during pregnancy
 *    - Ectopic pregnancy: risk factors, symptoms, diagnosis, treatment (methotrexate)
 *    - Miscarriage and fetal loss: types, causes, management (D&C, natural expulsion)
 *    - Placental abruption: complete vs partial, risk factors, symptoms
 *    - Placenta previa: complete, partial, marginal; risk factors and management
 *    - Preeclampsia/Eclampsia: comprehensive symptoms, risk factors, warning signs
 *      (visual changes, RUQ pain, decreased urine output, seizures)
 *
 * 7. Real Clinic Standards
 *    - San Diego Fertility Center (SDFC) requirements
 *    - Industry-standard IVF clinic acceptance criteria
 *    - Strict, moderate, and lenient clinic type variations
 *
 * PURPOSE:
 * This glossary serves as a reference for the AI text parser to accurately recognize
 * medical abbreviations, terminology, and conditions when analyzing surrogate candidate
 * medical records. Terms include pregnancy/delivery methods, complications, chronic
 * conditions, prenatal testing, fetal monitoring, and risk factors specific to
 * surrogacy screening.
 *
 * The glossary enables the application to:
 * - Parse dense medical chart notes with abbreviations (G3P2, SVD, C/S, GDM, etc.)
 * - Recognize symptoms and warning signs (RUQ pain, visual disturbances, etc.)
 * - Identify risk factors and complications affecting surrogacy eligibility
 * - Understand medical procedures and interventions (cerclage, D&C, NST, etc.)
 * - Assess chronic conditions that may impact pregnancy outcomes
 */

export const MEDICAL_GLOSSARY = {
  // Pregnancy and Delivery Terms
  "G": "Gravida - number of pregnancies",
  "P": "Para - number of births after 20 weeks",
  "T": "Term births (37+ weeks)",
  "P": "Preterm births (20-36 weeks)",
  "A": "Abortions/miscarriages (spontaneous or therapeutic before 20 weeks)",
  "L": "Living children",

  // Common Gravida/Para notation
  "G1P1": "First pregnancy, one birth",
  "G2P2": "Two pregnancies, two births",
  "G3P2": "Three pregnancies, two births (one loss)",
  "GTPAL": "Gravida, Term, Preterm, Abortions, Living",

  // Delivery Methods
  "SVD": "Spontaneous Vaginal Delivery",
  "NSVD": "Normal Spontaneous Vaginal Delivery",
  "C/S": "Cesarean Section",
  "C-section": "Cesarean Section",
  "CS": "Cesarean Section",
  "VBAC": "Vaginal Birth After Cesarean",
  "TOLAC": "Trial of Labor After Cesarean",
  "LTCS": "Lower Transverse Cesarean Section",
  "RCS": "Repeat Cesarean Section",
  "EmCS": "Emergency Cesarean Section",

  // Pregnancy Complications
  "GDM": "Gestational Diabetes Mellitus",
  "GD": "Gestational Diabetes",
  "PIH": "Pregnancy-Induced Hypertension",
  "PE": "Preeclampsia",
  "HELLP": "Hemolysis, Elevated Liver enzymes, Low Platelets syndrome",
  "IUGR": "Intrauterine Growth Restriction",
  "PPROM": "Preterm Premature Rupture of Membranes",
  "PROM": "Premature Rupture of Membranes",
  "PTL": "Preterm Labor",
  "PTB": "Preterm Birth",
  "ICP": "Intrahepatic Cholestasis of Pregnancy",
  "Placenta previa": "Placenta covering cervix",
  "Placental abruption": "Premature separation of placenta",
  "Accreta": "Placenta accreta - abnormal placental attachment",
  "PPH": "Postpartum Hemorrhage",
  "Cerclage": "Cervical cerclage for incompetent cervix",

  // Pregnancy & Labor Terms (Extended)
  "Anesthesia": "Medication to reduce/block pain, cause sleep, or relaxation during medical procedures",
  "Areola": "Pinkish-brown skin surrounding nipple (darkens early in pregnancy)",
  "ART": "Assisted Reproductive Technology - fertility treatments with lab fertilization",
  "Birth plan": "Written document describing preferences for labor and delivery",
  "Blighted ovum": "Fertilized egg attaches to uterus but embryo does not develop",
  "Bradley technique": "Natural childbirth method using relaxation techniques and partner coaching",
  "Braxton Hicks": "Practice contractions - abdominal tightening without cervical dilation",
  "Breech": "Baby's buttocks or feet pointing to birth canal instead of head",
  "Cesarean": "Surgical delivery through incision in abdomen and uterus",
  "Chadwick's sign": "Purplish-red cervix/vagina from increased blood flow (early pregnancy sign)",
  "Colostrum": "Protein-rich pre-milk fluid made by breasts during pregnancy",
  "Conjoined twins": "Identical twins with fused skin and internal organs",
  "Cord blood banking": "Collecting/storing umbilical cord blood stem cells after birth",
  "Crowning": "When baby's head becomes visible at vaginal opening",
  "Cystic fibrosis": "Inherited disease causing thick mucus in lungs/digestive tract",
  "Diamniotic": "Twins with separate amniotic sacs",
  "Dichorionic": "Twins with two placentas",
  "Dilation": "Gradual opening of cervix during labor (0-10 cm)",
  "Discordant twins": "One twin much smaller than the other",
  "Dizygotic": "Fraternal twins from two fertilized eggs",
  "Doula": "Professional labor coach providing emotional support",
  "Down syndrome": "Genetic abnormality with extra chromosome 21 (Trisomy 21)",
  "Ectopic pregnancy": "Embryo attaches outside uterus (usually in fallopian tube)",
  "Effacement": "Thinning of cervix during labor (0-100%)",
  "Engage/Lightening": "Baby drops into pelvis before or during labor",
  "Epidural": "Pain relief injection into space outside spinal cord",
  "Episiotomy": "Surgical cut to widen vaginal opening for delivery",
  "External cephalic version": "Procedure to turn breech baby head-down from outside abdomen",
  "Fertility treatment": "Methods to artificially start pregnancy",
  "Fraternal twins": "Twins from separate eggs with own placentas",
  "Full term": "39-40 weeks of pregnancy",
  "High-risk pregnancy": "Mother or baby at increased risk of health problems",
  "Identical twins": "Twins from one egg with same genetic makeup",
  "Induced labor": "Medically started or sped up labor",
  "Kegels": "Exercises to strengthen pelvic floor muscles",
  "Lamaze technique": "Breathing/relaxation techniques for natural delivery",
  "Lanugo": "Downy hair covering baby's body in womb",
  "Lightening": "Baby drops into pelvis",
  "Linea nigra": "Dark line from belly button to pubic area during pregnancy",
  "MFM": "Maternal-Fetal Medicine - specialty for high-risk pregnancies",
  "Mask of pregnancy": "Darker skin around eyes, nose, cheeks (chloasma/melasma)",
  "Meconium": "First black tarry stool from newborn",
  "Midwife": "Health practitioner for low-risk pregnancies",
  "Monoamnionic": "Identical twins sharing one amniotic sac",
  "Monochorionic": "Twins sharing one placenta",
  "Monozygotic": "Identical twins from one fertilized egg",
  "Mucus plug": "Plug blocking cervix opening during pregnancy",
  "Multiple pregnancy": "Carrying more than one baby",
  "Neural tube": "Develops into brain, spinal cord, backbone",
  "Neural tube defect": "Birth defect in brain/spinal cord (e.g., spina bifida)",
  "Nuchal fold": "Skin at back of neck (measured in ultrasound for genetic screening)",
  "Obstetric anesthetist": "Doctor managing pain relief during/after labor",
  "Perinatologist": "OB-GYN specializing in high-risk pregnancies (MFM specialist)",
  "Perineum": "Area between vaginal opening and anus",
  "Placenta": "Organ delivering oxygen, nutrients, hormones to baby",
  "Preterm": "Birth before 37 weeks (premature)",
  "Preterm labor": "Labor beginning before 37 weeks",
  "Quickening": "First time feeling baby move",
  "Round ligament pain": "Jabbing pain when uterine ligaments stretch",
  "Spinal block": "Anesthetic injection into spinal fluid (1-2 hour pain relief)",
  "Surfactant": "Substance in baby's lungs allowing breathing at birth",
  "Teratogens": "Substances causing birth defects during pregnancy",
  "Toxoplasmosis": "Infection from cat feces/undercooked meat (dangerous to baby)",
  "Twin-to-twin transfusion": "Uneven blood flow between identical twins sharing placenta",
  "Umbilical cord": "Tube connecting baby to placenta and mother's bloodstream",
  "Vanishing twin syndrome": "One twin miscarries and tissue is absorbed",
  "Vernix": "White cheesy substance covering baby at birth",
  "Viable": "Baby can survive outside womb",

  // Medical Conditions & Health Issues (CDC + General)
  "Anemia": "Lower than normal number of healthy red blood cells (often iron-deficiency during pregnancy)",
  "Iron-deficiency anemia": "Anemia caused by insufficient iron",
  "Anxiety": "Mental health condition with uncontrollable feelings of nervousness, fear, worry, panic",
  "Anxiety disorder": "Common mental health condition before, during, and after pregnancy",
  "Depression": "Persistent sadness interfering with daily life (can occur before, during, or after pregnancy)",
  "Postpartum depression": "Depression occurring after pregnancy (PPD)",
  "PPD": "Postpartum Depression",
  "Preexisting diabetes": "Diabetes diagnosed before pregnancy (Type 1 or Type 2)",
  "Heart conditions": "Conditions affecting heart and blood vessels",
  "Cardiac disease": "Disease of the heart",
  "Chronic hypertension": "High blood pressure before pregnancy or before 20 weeks",
  "Gestational hypertension": "High blood pressure first occurring after 20 weeks of pregnancy",
  "Eclampsia": "Seizures occurring with preeclampsia",
  "Stroke": "Brain damage from blocked or ruptured blood vessel",
  "Low birth weight": "Baby weighing less than 2500g at birth",
  "Preterm delivery": "Birth before 37 weeks of pregnancy",
  "Stillbirth": "Baby dies in womb after 20 weeks of pregnancy",
  "UTI": "Urinary Tract Infection - bacterial infection of urinary system",
  "Urinary tract infection": "Bacterial infection causing pain/burning when urinating",
  "HIV": "Human Immunodeficiency Virus",
  "Viral hepatitis": "Liver inflammation caused by virus",
  "STD": "Sexually Transmitted Disease",
  "STI": "Sexually Transmitted Infection",
  "TB": "Tuberculosis",
  "COVID-19": "Coronavirus disease 2019",
  "HTN": "Hypertension (high blood pressure)",
  "DM": "Diabetes Mellitus",
  "T1DM": "Type 1 Diabetes Mellitus",
  "T2DM": "Type 2 Diabetes Mellitus",
  "PCOS": "Polycystic Ovary Syndrome",
  "Hypothyroid": "Hypothyroidism - underactive thyroid",
  "Hyperthyroid": "Hyperthyroidism - overactive thyroid",
  "BMI": "Body Mass Index",
  "Rh-": "Rh negative blood type",
  "Birth defects": "Structural or functional abnormalities present at birth",
  "Cesarean delivery": "Surgical birth through incision in abdomen and uterus",

  // Chronic Health Conditions (March of Dimes)
  // Autoimmune Diseases
  "Autoimmune disease": "Condition where antibodies attack healthy tissue by mistake",
  "Ankylosing spondylitis": "Arthritis affecting the spine, causing inflammation between vertebrae",
  "IBD": "Inflammatory Bowel Disease - includes Crohn's disease and ulcerative colitis",
  "Inflammatory bowel disease": "Problems in digestive tract (includes Crohn's and ulcerative colitis)",
  "Crohn's disease": "Type of inflammatory bowel disease affecting digestive tract",
  "Ulcerative colitis": "Type of inflammatory bowel disease causing ulcers in colon",
  "Lupus": "Autoimmune disease damaging joints, skin, kidneys, heart, lungs",
  "SLE": "Systemic Lupus Erythematosus",
  "Multiple sclerosis": "Autoimmune disease attacking nerves in brain and spinal cord",
  "MS": "Multiple Sclerosis",
  "Psoriasis": "Skin disease causing itchy/sore patches of thick, red skin",
  "Psoriatic arthritis": "Arthritis causing joint pain, stiffness, swelling in people with psoriasis",
  "Rheumatoid arthritis": "Autoimmune disease attacking lining of joints throughout body",
  "RA": "Rheumatoid Arthritis",
  "Scleroderma": "Group of diseases affecting connective tissue in body",
  "Chronic pain": "Pain lasting weeks, months, or years from injury, infection, or other cause",

  // Blood, Heart & Lung Conditions
  "Asthma": "Lung disease causing airways to tighten, making breathing difficult",
  "Heart disease": "Conditions affecting heart muscle or blood vessels (cardiovascular disease)",
  "Cardiovascular disease": "Heart and blood vessel diseases",
  "Heart attack": "Blocked blood flow to heart muscle",
  "Hypertension": "High blood pressure - force of blood pushing against artery walls",
  "Kidney disease": "Disease affecting kidney function",
  "AIDS": "Acquired Immune Deficiency Syndrome (caused by HIV)",
  "Obesity": "Excess body fat with BMI 30.0 or higher",

  // Hormone/Endocrine Conditions
  "Pancreas": "Organ behind stomach making insulin",
  "Insulin": "Hormone helping body regulate blood sugar",
  "Preexisting diabetes": "Diabetes diagnosed before pregnancy",
  "Thyroid conditions": "Conditions affecting thyroid gland hormone production",
  "Thyroid gland": "Gland in neck making hormones for energy regulation",

  // Mental Health Conditions
  "Mental health conditions": "Conditions affecting feelings, thoughts, and behavior",
  "Depressive disorder": "Medical condition causing persistent sadness and loss of interest",
  "Major depression": "Severe depression interfering with daily life",
  "Clinical depression": "Medical depression requiring treatment",

  // Preterm Labor & Birth (Blue Cross Blue Shield)
  "Preterm labor": "Labor beginning before 37 weeks - frequent contractions at set times",
  "Premature labor": "Labor beginning before 37 weeks of pregnancy",
  "Early labor": "Labor beginning before full term",
  "Cervical dilation": "Opening of the cervix",
  "Cervical effacement": "Thinning of the cervix",
  "Frequent contractions": "Five or more contractions per hour lasting at least two hours",
  "Premature": "Birth before 37 weeks of pregnancy",
  "Preterm delivery": "Birth before 37 weeks of pregnancy",

  // Diabetes & Blood Sugar (Blue Cross Blue Shield)
  "High blood sugar": "Elevated glucose levels in blood",
  "Blood sugar": "Glucose level in the blood",
  "Glucose Tolerance Test": "Test for gestational diabetes at 24-28 weeks",
  "GTT": "Glucose Tolerance Test",
  "Insulin shots": "Injections to control blood sugar",
  "Blood sugar level": "Amount of glucose in the blood",
  "Large for gestational age": "Baby larger than normal for gestational age",
  "LGA": "Large for Gestational Age",
  "Birth defects": "Structural or functional abnormalities present at birth",

  // High Blood Pressure & Preeclampsia (Blue Cross Blue Shield)
  "Blood pressure": "Force of blood pushing against artery walls",
  "Preeclampsia": "Pregnancy condition with high blood pressure, protein in urine, swelling",
  "Toxemia": "Preeclampsia - high blood pressure during pregnancy",
  "Protein in urine": "Sign of preeclampsia - protein found in urine test",
  "Proteinuria": "Protein in the urine",
  "Swelling": "Edema - fluid retention causing swelling, especially hands and face",
  "Edema": "Swelling due to fluid buildup",
  "Fast weight gain": "Rapid weight gain (sign of preeclampsia)",
  "Headaches": "Head pain (can be sign of preeclampsia)",
  "Blurred vision": "Unclear sight (sign of preeclampsia)",
  "Visual disturbances": "Changes in vision including spots or blurred vision",
  "Seeing spots": "Visual disturbance - sign of preeclampsia",
  "Upper abdominal pain": "Pain in upper belly (sign of preeclampsia)",
  "Epigastric pain": "Pain in upper abdomen",
  "Seizures": "Convulsions - can occur with eclampsia",
  "Coma": "Unconscious state",
  "Home bed rest": "Prescribed rest at home to manage pregnancy complications",
  "Bed rest": "Prescribed rest to reduce pregnancy complications",

  // Placental Complications (Blue Cross Blue Shield)
  "Placenta previa": "Placenta sitting over cervix/birth canal opening",
  "Low-lying placenta": "Placenta positioned near or over cervix",
  "Painless vaginal bleeding": "Bleeding without pain (sign of placenta previa)",
  "Placental abruption": "Placenta separating from uterine wall too early",
  "Abruptio placentae": "Premature separation of placenta from uterus",
  "Placental separation": "Placenta detaching from uterine wall",
  "Vaginal bleeding": "Bleeding from vagina during pregnancy",
  "Severe abdominal pain": "Very bad stomach pain (sign of abruption)",
  "Hard abdomen": "Rigid, hard-to-touch feeling in womb (sign of abruption)",
  "Rigid uterus": "Hard, boardlike uterus (sign of abruption)",
  "Urgent delivery": "Immediate delivery required due to complications",

  // Infection & Other Complications (Blue Cross Blue Shield)
  "Bladder infection": "Urinary tract infection in bladder",
  "UTI": "Urinary Tract Infection - can cause preterm labor",
  "Fever": "Elevated body temperature (sign of infection)",
  "Unusual vaginal discharge": "Abnormal fluid from vagina",
  "Pain when urinating": "Burning or pain during urination (sign of UTI)",
  "Dysuria": "Painful urination",
  "Sores near mouth": "Lesions around mouth (may indicate infection)",
  "Genital sores": "Sores or lesions near vagina",
  "Rash": "Skin eruption or irritation",
  "Vomiting": "Throwing up",
  "Overall sick feeling": "General malaise or unwellness",
  "Antibiotic": "Medication to treat bacterial infections",

  // Labor Signs & Symptoms (Blue Cross Blue Shield)
  "Contractions": "Tightening of uterine muscles during labor",
  "Lower abdominal cramps": "Cramping in lower stomach area",
  "Period-like cramps": "Cramps similar to menstrual cramps",
  "Lower back pain": "Backache in lower back (can be sign of labor)",
  "Backache": "Pain in the back",
  "Pelvic pressure": "Weight or pressure in stomach or thighs",
  "Unusual bowel movements": "Changes in bowel patterns",
  "Diarrhea": "Loose, watery stools (can precede labor)",
  "Mucus in discharge": "Mucus containing water or blood in vaginal flow",
  "Bloody show": "Mucus discharge with blood (sign of labor)",
  "Mucus plug": "Plug blocking cervix that releases before labor",

  // Stanford Children's Health Terms
  "Alpha-fetoprotein": "Protein produced by fetus excreted into amniotic fluid - abnormal levels may indicate defects",
  "AFP": "Alpha-fetoprotein - screening test for neural tube defects and chromosomal disorders",
  "Brain defects": "Abnormalities in brain development",
  "Spinal cord defects": "Abnormalities in spinal cord development (e.g., spina bifida)",
  "Multiple fetuses": "Twins, triplets, or more babies in pregnancy",
  "Chromosomal disorders": "Genetic abnormalities in chromosomes",
  "Amniocentesis": "Test inserting needle through abdomen to retrieve amniotic fluid for genetic testing",
  "Amnio": "Amniocentesis",
  "Amniotic sac": "Thin-walled sac filled with fluid surrounding fetus during pregnancy",
  "Amniotic fluid": "Liquid made by fetus and amnion protecting fetus from injury and regulating temperature",
  "Amnion": "Membrane covering fetal side of placenta",
  "Red blood cells": "Blood cells carrying oxygen to tissues",
  "Biophysical profile": "Test using nonstress test and ultrasound to examine fetal movements, heart rate, and amniotic fluid",
  "BPP": "Biophysical Profile",
  "Bilirubin": "Substance from red blood cell breakdown causing jaundice",
  "Cerclage": "Procedure to suture cervical opening closed for incompetent cervix",
  "Cervical cerclage": "Stitch placed in cervix to prevent premature opening",
  "Chorioamnionitis": "Serious infection of placental tissues",
  "Chorionic villus sampling": "Placental tissue retrieval for genetic testing",
  "CVS": "Chorionic Villus Sampling - genetic test using placental tissue",
  "Genetic abnormalities": "Inherited disorders or mutations",
  "Congenital abnormality": "Abnormality present at birth",
  "Cordocentesis": "Procedure to sample umbilical cord blood during pregnancy (PUBS)",
  "PUBS": "Percutaneous Umbilical Blood Sampling (cordocentesis)",
  "Corticosteroid": "Medication given to pregnant woman to help mature fetal lungs",
  "Betamethasone": "Steroid given to mature fetal lungs before preterm birth",
  "Doppler flow": "Ultrasound measuring blood flow",
  "Ductus arteriosus": "Blood vessel connecting pulmonary artery and aorta in fetus",
  "Eclampsia": "Severe gestational hypertension resulting in seizures",
  "Ectopic pregnancy": "Abnormal pregnancy where fertilized egg implants outside uterus",
  "Tubal pregnancy": "Ectopic pregnancy in fallopian tube",
  "Estriol": "Hormone produced by placenta and fetal liver and adrenal glands",
  "Fetal fibronectin": "Protein helping 'glue together' placental tissues - elevated in preterm labor",
  "FFN": "Fetal Fibronectin test for preterm labor risk",
  "Fetal heart rate monitoring": "Method of checking rate and rhythm of fetal heartbeat",
  "Continuous fetal monitoring": "Electronic monitoring of fetal heart rate during labor",
  "Fetus": "Unborn baby from eighth week after fertilization until delivery",
  "Embryo": "Developing baby from conception to 8 weeks",
  "Folic acid": "Nutrient reducing risk of brain and spinal cord birth defects",
  "Folate": "Folic acid - B vitamin important for preventing neural tube defects",
  "Neural tube defects": "Birth defects of brain or spine (e.g., spina bifida, anencephaly)",
  "NTD": "Neural Tube Defect",
  "Spina bifida": "Birth defect where spine doesn't close completely",
  "HELLP syndrome": "Hemolysis, Elevated Liver enzymes, Low Platelets - severe preeclampsia complication",
  "Hemolysis": "Breakdown of red blood cells",
  "Elevated liver enzymes": "Sign of liver stress or damage",
  "Low platelet count": "Reduced blood clotting cells (thrombocytopenia)",
  "Thrombocytopenia": "Low platelet count",
  "Hematocrit": "Percentage of red blood cells in blood",
  "HCT": "Hematocrit",
  "Hemoglobin": "Protein in red blood cells carrying oxygen to tissues",
  "HGB": "Hemoglobin",
  "Human chorionic gonadotropin": "Hormone produced by placenta - pregnancy hormone",
  "hCG": "Human Chorionic Gonadotropin - measured in pregnancy tests",
  "Beta hCG": "Blood test measuring hCG levels",
  "Hydramnios": "Too much amniotic fluid (polyhydramnios)",
  "Polyhydramnios": "Excessive amniotic fluid",
  "Hydrops fetalis": "Severe fetal condition with fluid buildup in fetal tissues and organs",
  "Fetal hydrops": "Abnormal fluid accumulation in fetus",
  "Intrauterine growth restriction": "Slowed growth of fetus during pregnancy",
  "IUGR": "Intrauterine Growth Restriction",
  "FGR": "Fetal Growth Restriction",
  "Iron deficiency anemia": "Lack of iron in blood necessary to make hemoglobin",
  "Anemia": "Lower than normal red blood cells or hemoglobin",
  "Jaundice": "Yellow coloring of skin/eyes from too much bilirubin",
  "Hyperbilirubinemia": "High bilirubin levels causing jaundice",
  "Miscarriage": "Early pregnancy loss before 20 weeks",
  "Spontaneous abortion": "Miscarriage - natural pregnancy loss",
  "SAB": "Spontaneous Abortion (miscarriage)",
  "Nonstress test": "Measuring fetal heart rate in response to fetus movements",
  "NST": "Nonstress Test",
  "Reactive NST": "Normal nonstress test with heart rate accelerations",
  "Non-reactive NST": "Abnormal nonstress test requiring further evaluation",
  "Oligohydramnios": "Too little amniotic fluid",
  "Patent ductus arteriosus": "Fetal blood vessel between pulmonary artery and aorta stays open after birth",
  "PDA": "Patent Ductus Arteriosus",
  "Metabolic interchange": "Exchange of oxygen, nutrients, and waste between mother and fetus",
  "Carbon dioxide": "Waste gas eliminated by fetus through placenta",
  "Rh disease": "Complications from blood type incompatibility between mother and baby",
  "Rh incompatibility": "Mother Rh-negative, baby Rh-positive causing antibody formation",
  "Rh factor": "Protein on red blood cells - present (Rh+) or absent (Rh-)",
  "RhoGAM": "Injection preventing Rh sensitization in Rh-negative mothers",
  "Toxoplasmosis": "Infection from parasite causing serious fetal illness or death",
  "TORCH infections": "Toxoplasmosis, Other, Rubella, Cytomegalovirus, Herpes - infections affecting fetus",
  "Ultrasound": "Diagnostic imaging using sound waves to visualize fetus and organs",
  "U/S": "Ultrasound",
  "Sonogram": "Ultrasound image",
  "Transvaginal ultrasound": "Ultrasound performed through vagina for early pregnancy",
  "Uterine wall": "Wall of the uterus (myometrium)",
  "Myometrium": "Muscular wall of uterus",
  "Endometrium": "Inner lining of uterus",
  "Uterus": "Hollow pear-shaped organ where fetus develops (womb)",
  "Womb": "Uterus - organ where baby grows during pregnancy",
  "Vagina": "Birth canal extending from uterus to vulva",
  "Birth canal": "Vagina - passage baby travels through during delivery",
  "Vulva": "External female genitals",
  "Vernix caseosa": "White protective substance covering fetal skin in utero",
  "Vernix": "Protective coating on fetal skin",

  // Johns Hopkins - Amniotic Fluid Complications
  "Too much amniotic fluid": "Polyhydramnios - excessive fluid in amniotic sac",
  "Too little amniotic fluid": "Oligohydramnios - insufficient amniotic fluid",
  "Early breaking of membrane": "Premature rupture of membranes (PROM)",
  "Shortness of breath": "Difficulty breathing - can worsen with excess amniotic fluid",
  "Incompatible blood types": "Blood type incompatibility between mother and fetus",
  "Slowed fetal growth": "Fetal growth restriction or IUGR",
  "Early rupture of membranes": "PROM - membranes breaking before labor begins",
  "Fetal death": "Death of fetus in utero (stillbirth after 20 weeks)",
  "Intrauterine fetal demise": "Fetal death in the womb",
  "IUFD": "Intrauterine Fetal Demise",

  // Johns Hopkins - Bleeding Complications
  "Visible bleeding": "Vaginal bleeding during pregnancy",
  "Placental complications": "Problems with placenta function or attachment",
  "Vaginal infection": "Infection in vagina",
  "Cervical infection": "Infection of the cervix",
  "Early delivery": "Delivery before full term (37 weeks)",
  "Intervene": "Medical intervention to manage complications",

  // Johns Hopkins - Ectopic Pregnancy
  "Ectopic pregnancy": "Pregnancy implanted outside uterus (usually in fallopian tube)",
  "Embryo": "Early stage of pregnancy development (first 8 weeks)",
  "Fallopian tubes": "Tubes connecting ovaries to uterus",
  "Ovaries": "Female reproductive organs producing eggs",
  "Life-threatening pregnancy": "Pregnancy posing serious risk to mother's life",
  "Fertility treatments": "Medical treatments to achieve pregnancy (IVF, IUI, etc.)",
  "Previous tubal surgery": "Prior surgery on fallopian tubes",
  "Pelvic inflammatory disease": "Infection of female reproductive organs",
  "PID": "Pelvic Inflammatory Disease",
  "Uterine infections": "Infections of the uterus",
  "Endometritis": "Infection/inflammation of uterine lining",
  "Previous ectopic pregnancy": "History of prior ectopic pregnancy (increases risk)",
  "Abdominal pain early pregnancy": "Pain in abdomen during first trimester",
  "Bleeding early pregnancy": "Vaginal bleeding in first trimester",
  "Ultrasound monitoring": "Serial ultrasounds to monitor pregnancy location and viability",
  "Hormone levels": "Blood tests for hCG and progesterone levels",
  "Ectopic pregnancy medication": "Methotrexate to treat early ectopic pregnancy",
  "Methotrexate": "Medication to treat ectopic pregnancy by stopping cell growth",
  "Ruptured ectopic": "Emergency when ectopic pregnancy bursts fallopian tube",
  "Tubal rupture": "Fallopian tube bursting from ectopic pregnancy",

  // Johns Hopkins - Miscarriage/Fetal Loss
  "Miscarriage": "Pregnancy loss before 20 weeks gestation",
  "Pregnancy loss": "Loss of pregnancy at any stage",
  "Fetal loss": "Death of fetus during pregnancy",
  "Genetic abnormalities": "Chromosomal or genetic defects",
  "Chromosomal abnormalities": "Abnormal number or structure of chromosomes",
  "Intense cramping": "Severe abdominal cramping",
  "Naturally expelled": "Body spontaneously expels pregnancy tissue",
  "Dilation and curettage": "D&C - procedure to remove uterine contents",
  "D&C": "Dilation and Curettage",
  "Second trimester loss": "Pregnancy loss between 13-20 weeks",
  "Problems with placenta": "Placental insufficiency or other placenta issues",
  "Cervical insufficiency": "Cervix opening too early (incompetent cervix)",
  "Incompetent cervix": "Cervix that opens prematurely during pregnancy",
  "Cervical cerclage": "Suture placed to hold cervix closed",
  "Cerclage placement": "Surgery to place stitch in cervix",

  // Johns Hopkins - Placental Abruption (Expanded)
  "Placental detachment": "Placenta separating from uterine wall",
  "Complete abruption": "Entire placenta detached from uterus",
  "Partial abruption": "Portion of placenta detached from uterus",
  "Less oxygen to fetus": "Reduced oxygen delivery to baby",
  "Less nutrients to fetus": "Decreased nutrient supply to baby",
  "Smoking during pregnancy": "Tobacco use while pregnant (increases abruption risk)",
  "Multiple pregnancy": "Twins, triplets, or more babies",
  "Previous children": "Multiparity - having had prior births",
  "Multiparity": "Having given birth multiple times",
  "History of abruption": "Prior placental abruption in previous pregnancy",
  "Abdominal tenderness": "Pain/sensitivity when abdomen is touched",
  "Hospitalization required": "Need for inpatient hospital care",

  // Johns Hopkins - Placenta Previa (Expanded)
  "Placenta covering cervix": "Placenta completely blocking cervical opening",
  "Placenta near cervix": "Placenta close to but not covering cervix (marginal previa)",
  "Marginal previa": "Placenta edge near cervical opening",
  "Complete previa": "Placenta completely covering cervix",
  "Partial previa": "Placenta partially covering cervix",
  "Scarring of uterus": "Uterine scars from previous surgeries or pregnancies",
  "Uterine scarring": "Scar tissue in uterus",
  "Several pregnancies": "Multiparity - multiple prior births",
  "Fibroids": "Benign tumors in uterus",
  "Uterine fibroids": "Noncancerous growths in uterine muscle",
  "Previous uterine surgery": "Prior surgery on uterus (myomectomy, D&C, etc.)",
  "Bright red bleeding": "Fresh vaginal bleeding",
  "Cesarean delivery required": "Need for surgical birth via C-section",
  "Unsafe vaginal delivery": "Vaginal birth would be dangerous",

  // Johns Hopkins - Preeclampsia/Eclampsia (Expanded)
  "Pregnancy-induced hypertension": "High blood pressure developing during pregnancy",
  "Protein in urine": "Proteinuria - protein detected in urine sample",
  "Abnormal protein in urine": "Elevated protein levels indicating kidney stress",
  "Eclampsia": "Severe preeclampsia with seizures",
  "Permanent disabilities": "Lasting impairments from eclampsia complications",
  "First pregnancy": "Primigravida - first time being pregnant",
  "Primigravida": "Woman pregnant for first time",
  "Prior preeclampsia": "History of preeclampsia in previous pregnancy",
  "Pre-existing hypertension": "High blood pressure before pregnancy",
  "Pre-existing diabetes": "Diabetes diagnosed before pregnancy",
  "Kidney disease": "Chronic kidney problems",
  "Autoimmune diseases": "Conditions where immune system attacks own tissues",
  "Multiple gestation": "Twins, triplets, or more",
  "Age under 18": "Teenage pregnancy",
  "Age over 35": "Advanced maternal age",
  "AMA": "Advanced Maternal Age (35+)",
  "BMI over 30": "Obesity - body mass index 30 or higher",
  "African American": "Race with higher preeclampsia risk",
  "Lower socioeconomic status": "Economic disadvantage affecting healthcare access",
  "New onset blurred vision": "Sudden vision changes (preeclampsia symptom)",
  "Visual changes": "Changes in eyesight",
  "New shortness of breath": "Sudden difficulty breathing",
  "Worsening shortness of breath": "Progressively harder to breathe",
  "Decreased urine output": "Reduced urination (oliguria)",
  "Oliguria": "Decreased urine production",
  "Upper right abdominal pain": "Pain in right upper quadrant near liver",
  "Right upper quadrant pain": "RUQ pain - can indicate HELLP syndrome",
  "RUQ pain": "Right Upper Quadrant pain",
  "Liver pain": "Pain in area of liver (right upper abdomen)",
  "Blood pressure medication": "Antihypertensive drugs",
  "Antihypertensive": "Medication to lower blood pressure",
  "Close fetal monitoring": "Frequent monitoring of baby's wellbeing",
  "Close maternal monitoring": "Frequent monitoring of mother's health",

  // Fetal/Neonatal Terms
  "NICU": "Neonatal Intensive Care Unit",
  "LBW": "Low Birth Weight (< 2500g)",
  "VLBW": "Very Low Birth Weight (< 1500g)",
  "SGA": "Small for Gestational Age",
  "LGA": "Large for Gestational Age",
  "AGA": "Appropriate for Gestational Age",
  "TTN": "Transient Tachypnea of Newborn",
  "RDS": "Respiratory Distress Syndrome",

  // Prenatal Testing
  "AFP": "Alpha-fetoprotein",
  "NIPT": "Non-Invasive Prenatal Testing",
  "CVS": "Chorionic Villus Sampling",
  "Amnio": "Amniocentesis",
  "NT": "Nuchal Translucency",
  "U/S": "Ultrasound",
  "NST": "Non-Stress Test",
  "BPP": "Biophysical Profile",

  // Labor and Delivery Terms
  "EDD": "Estimated Due Date",
  "LMP": "Last Menstrual Period",
  "EGA": "Estimated Gestational Age",
  "ROM": "Rupture of Membranes",
  "SROM": "Spontaneous Rupture of Membranes",
  "AROM": "Artificial Rupture of Membranes",
  "IOL": "Induction of Labor",
  "Augmentation": "Speeding up labor with medication",
  "Epidural": "Spinal anesthesia for pain relief",
  "Pitocin": "Synthetic oxytocin to induce/augment labor",

  // Obstetric History Terms
  "SAB": "Spontaneous Abortion (miscarriage)",
  "TAB": "Therapeutic Abortion (elective termination)",
  "D&C": "Dilation and Curettage",
  "D&E": "Dilation and Evacuation",
  "Ectopic": "Ectopic pregnancy (implantation outside uterus)",
  "Molar pregnancy": "Abnormal pregnancy with tumor growth",
  "Blighted ovum": "Empty gestational sac",

  // Postpartum Terms
  "PP": "Postpartum",
  "PPD": "Postpartum Depression",
  "Lochia": "Postpartum vaginal discharge",
  "Involution": "Uterus returning to pre-pregnancy size",
  "Engorgement": "Painful breast swelling",

  // Maternal-Fetal Medicine
  "MFM": "Maternal-Fetal Medicine specialist (perinatologist)",
  "OB": "Obstetrician",
  "CNM": "Certified Nurse Midwife",
  "Perinatologist": "High-risk pregnancy specialist",

  // IVF/Surrogacy Specific
  "GC": "Gestational Carrier",
  "TS": "Traditional Surrogate",
  "IP": "Intended Parent(s)",
  "IF": "Intended Father",
  "IM": "Intended Mother",
  "ET": "Embryo Transfer",
  "FET": "Frozen Embryo Transfer",
  "Fresh transfer": "Transfer of fresh embryo",
  "PGT": "Preimplantation Genetic Testing",
  "Beta": "Blood pregnancy test (hCG level)",
  "hCG": "Human Chorionic Gonadotropin (pregnancy hormone)",

  // Medications
  "PNV": "Prenatal Vitamins",
  "Progesterone": "Hormone to support early pregnancy",
  "Estrogen": "Hormone for endometrial preparation",
  "Lupron": "Medication to suppress ovulation",
  "Zofran": "Anti-nausea medication",
  "Lovenox": "Blood thinner",
  "Baby aspirin": "Low-dose aspirin to prevent clotting",

  // Risk Categories
  "AMA": "Advanced Maternal Age (35+)",
  "High-risk": "Pregnancy requiring additional monitoring",
  "Low-risk": "Uncomplicated pregnancy"
};

// Common condition synonyms for better text parsing
export const CONDITION_SYNONYMS = {
  "gestational_diabetes": [
    "GDM", "gestational diabetes", "diabetes during pregnancy",
    "pregnancy diabetes", "glucose intolerance pregnancy"
  ],
  "preeclampsia": [
    "preeclampsia", "pre-eclampsia", "toxemia",
    "pregnancy-induced hypertension", "PIH"
  ],
  "hypertension": [
    "HTN", "high blood pressure", "HBP", "hypertension",
    "elevated blood pressure", "chronic hypertension"
  ],
  "cesarean": [
    "C-section", "c/s", "CS", "cesarean section", "caesarean",
    "surgical delivery", "abdominal delivery"
  ],
  "preterm_labor": [
    "PTL", "preterm labor", "premature labor", "early labor"
  ],
  "preterm_birth": [
    "PTB", "preterm birth", "premature birth", "early delivery"
  ],
  "placenta_previa": [
    "previa", "placenta previa", "low-lying placenta"
  ],
  "placental_abruption": [
    "abruption", "placental abruption", "abruptio placentae"
  ],
  "postpartum_hemorrhage": [
    "PPH", "postpartum hemorrhage", "post-partum bleeding",
    "excessive bleeding after delivery"
  ],
  "IUGR": [
    "IUGR", "intrauterine growth restriction",
    "fetal growth restriction", "FGR", "small baby"
  ]
};

// Get full term from abbreviation
export function getFullTerm(abbreviation) {
  return MEDICAL_GLOSSARY[abbreviation] || abbreviation;
}

// Get all synonyms for a condition
export function getSynonyms(condition) {
  return CONDITION_SYNONYMS[condition] || [];
}

// Search glossary
export function searchGlossary(searchTerm) {
  const results = [];
  const lowerSearch = searchTerm.toLowerCase();

  for (const [abbrev, definition] of Object.entries(MEDICAL_GLOSSARY)) {
    if (abbrev.toLowerCase().includes(lowerSearch) ||
        definition.toLowerCase().includes(lowerSearch)) {
      results.push({ abbreviation: abbrev, definition });
    }
  }

  return results;
}

// Get categories - ALL terms organized by category
export function getGlossaryByCategory() {
  return {
    "Pregnancy & Delivery Notation": [
      "G", "P", "T", "A", "L", "GTPAL", "G1P1", "G2P2", "G3P2"
    ],
    "Delivery Methods": [
      "SVD", "NSVD", "C/S", "C-section", "CS", "VBAC", "TOLAC", "LTCS", "RCS", "EmCS"
    ],
    "Common Pregnancy Complications": [
      "GDM", "PIH", "PE", "HELLP", "IUGR", "PPROM", "PROM", "PTL", "PTB", "ICP",
      "Placenta previa", "Placental abruption", "Accreta", "PPH", "Cerclage"
    ],
    "Medical Conditions & Chronic Health": [
      "HTN", "DM", "T1DM", "T2DM", "PCOS", "Hypothyroid", "Hyperthyroid", "BMI",
      "Anemia", "Depression", "Anxiety disorder", "Postpartum depression", "PPD",
      "Chronic hypertension", "Gestational hypertension", "Eclampsia", "Stroke",
      "UTI", "HIV", "Viral hepatitis", "STD", "STI", "TB", "COVID-19"
    ],
    "Autoimmune Diseases": [
      "Autoimmune disease", "Lupus", "SLE", "Multiple sclerosis", "MS",
      "Rheumatoid arthritis", "RA", "IBD", "Crohn's disease", "Ulcerative colitis",
      "Psoriasis", "Psoriatic arthritis", "Scleroderma", "Ankylosing spondylitis"
    ],
    "Heart, Lung & Blood": [
      "Asthma", "Heart disease", "Cardiovascular disease", "Heart attack",
      "Hypertension", "Kidney disease", "AIDS", "Obesity"
    ],
    "Preterm Labor & Birth Signs": [
      "Preterm labor", "Premature labor", "Early labor", "Cervical dilation",
      "Cervical effacement", "Frequent contractions", "Premature", "Preterm delivery",
      "Lower abdominal cramps", "Period-like cramps", "Lower back pain", "Backache",
      "Pelvic pressure", "Diarrhea", "Bloody show", "Mucus plug"
    ],
    "Diabetes & Blood Sugar": [
      "High blood sugar", "Blood sugar", "Glucose Tolerance Test", "GTT",
      "Insulin shots", "Blood sugar level", "Large for gestational age", "LGA",
      "Preexisting diabetes", "Pancreas", "Insulin"
    ],
    "High Blood Pressure & Preeclampsia": [
      "Blood pressure", "Preeclampsia", "Toxemia", "Protein in urine", "Proteinuria",
      "Swelling", "Edema", "Fast weight gain", "Headaches", "Blurred vision",
      "Visual disturbances", "Seeing spots", "Upper abdominal pain", "Epigastric pain",
      "RUQ pain", "Seizures", "Coma", "Home bed rest", "Bed rest"
    ],
    "Placental Complications": [
      "Placenta previa", "Low-lying placenta", "Marginal previa", "Complete previa",
      "Partial previa", "Painless vaginal bleeding", "Placental abruption",
      "Abruptio placentae", "Placental detachment", "Complete abruption", "Partial abruption",
      "Placental separation", "Vaginal bleeding", "Severe abdominal pain", "Hard abdomen",
      "Rigid uterus", "Urgent delivery", "Placental complications"
    ],
    "Infections": [
      "Bladder infection", "UTI", "Fever", "Unusual vaginal discharge",
      "Pain when urinating", "Dysuria", "Vaginal infection", "Cervical infection",
      "Sores near mouth", "Genital sores", "Rash", "Vomiting", "Antibiotic",
      "Chorioamnionitis", "Endometritis", "Uterine infections", "PID"
    ],
    "Prenatal Testing": [
      "AFP", "Alpha-fetoprotein", "NIPT", "CVS", "Chorionic villus sampling",
      "Amnio", "Amniocentesis", "NT", "Nuchal Translucency", "NST", "Nonstress test",
      "BPP", "Biophysical profile", "U/S", "Ultrasound", "Sonogram",
      "Transvaginal ultrasound", "Doppler flow", "Cordocentesis", "PUBS"
    ],
    "Fetal/Neonatal Terms": [
      "NICU", "LBW", "VLBW", "SGA", "LGA", "AGA", "TTN", "RDS",
      "Meconium", "Lanugo", "Vernix", "Vernix caseosa", "Quickening",
      "Fetus", "Embryo", "Viable"
    ],
    "Amniotic Fluid & Membranes": [
      "Amniotic sac", "Amniotic fluid", "Amnion", "Polyhydramnios", "Hydramnios",
      "Oligohydramnios", "Too much amniotic fluid", "Too little amniotic fluid",
      "ROM", "SROM", "AROM", "PPROM", "PROM", "Early breaking of membrane",
      "Early rupture of membranes"
    ],
    "Labor & Delivery": [
      "EDD", "LMP", "EGA", "IOL", "Augmentation", "Epidural", "Pitocin",
      "Contractions", "Dilation", "Effacement", "Crowning", "Episiotomy",
      "Induced labor", "External cephalic version", "Breech", "Full term",
      "Engage/Lightening", "Lightening"
    ],
    "Pregnancy Loss": [
      "SAB", "Spontaneous Abortion", "TAB", "Therapeutic Abortion", "Miscarriage",
      "D&C", "Dilation and curettage", "D&E", "Ectopic", "Ectopic pregnancy",
      "Tubal pregnancy", "Molar pregnancy", "Blighted ovum", "Stillbirth",
      "Fetal death", "IUFD", "Intrauterine fetal demise", "Fetal loss", "Pregnancy loss",
      "Second trimester loss"
    ],
    "Postpartum": [
      "PP", "Postpartum", "PPD", "Postpartum depression", "Lochia", "Involution",
      "Engorgement", "PPH", "Postpartum hemorrhage"
    ],
    "Medical Providers": [
      "MFM", "Maternal-Fetal Medicine", "OB", "Obstetrician", "CNM",
      "Certified Nurse Midwife", "Perinatologist", "Doula", "Midwife",
      "Obstetric anesthetist"
    ],
    "IVF/Surrogacy": [
      "GC", "Gestational Carrier", "TS", "Traditional Surrogate", "IP", "IF", "IM",
      "ET", "Embryo Transfer", "FET", "Frozen Embryo Transfer", "Fresh transfer",
      "PGT", "Beta", "hCG", "Human chorionic gonadotropin", "ART"
    ],
    "Medications": [
      "PNV", "Prenatal Vitamins", "Progesterone", "Estrogen", "Lupron", "Zofran",
      "Lovenox", "Baby aspirin", "Betamethasone", "Corticosteroid", "Methotrexate",
      "RhoGAM", "Blood pressure medication", "Antihypertensive"
    ],
    "Blood & Lab Testing": [
      "Hematocrit", "HCT", "Hemoglobin", "HGB", "Bilirubin", "Hyperbilirubinemia",
      "Red blood cells", "Hemolysis", "Elevated liver enzymes", "Low platelet count",
      "Thrombocytopenia", "Iron deficiency anemia", "Iron-deficiency anemia"
    ],
    "Rh Disease": [
      "Rh-", "Rh disease", "Rh incompatibility", "Rh factor", "RhoGAM",
      "Incompatible blood types"
    ],
    "Fetal Conditions": [
      "IUGR", "FGR", "Intrauterine growth restriction", "Fetal growth restriction",
      "Slowed fetal growth", "Hydrops fetalis", "Fetal hydrops", "HELLP syndrome",
      "Neural tube defects", "NTD", "Spina bifida", "Down syndrome", "Brain defects",
      "Spinal cord defects", "Chromosomal disorders", "Chromosomal abnormalities",
      "Genetic abnormalities", "Congenital abnormality", "Birth defects"
    ],
    "Multiple Pregnancy": [
      "Multiple pregnancy", "Multiple gestation", "Multiple fetuses", "Twins",
      "Identical twins", "Fraternal twins", "Monozygotic", "Dizygotic",
      "Monoamnionic", "Monochorionic", "Diamniotic", "Dichorionic",
      "Discordant twins", "Twin-to-twin transfusion", "Vanishing twin syndrome",
      "Conjoined twins"
    ],
    "Anatomical Terms": [
      "Uterus", "Womb", "Uterine wall", "Myometrium", "Endometrium",
      "Cervix", "Vagina", "Birth canal", "Vulva", "Placenta", "Umbilical cord",
      "Perineum", "Ovaries", "Fallopian tubes", "Areola", "Colostrum"
    ],
    "Pregnancy Symptoms & Changes": [
      "Morning sickness", "Nausea", "Hyperemesis", "Severe hyperemesis",
      "GERD", "Severe gerd", "Gastroparesis", "Braxton Hicks", "Round ligament pain",
      "Mask of pregnancy", "Linea nigra", "Chadwick's sign", "Shortness of breath"
    ],
    "Techniques & Procedures": [
      "Anesthesia", "Epidural", "Spinal block", "Lamaze technique", "Bradley technique",
      "Kegels", "Birth plan", "Cerclage", "Cervical cerclage", "Cerclage placement",
      "External cephalic version", "Fertility treatment", "Fertility treatments",
      "Cord blood banking"
    ],
    "Risk Categories": [
      "AMA", "Advanced Maternal Age", "High-risk pregnancy", "High-risk", "Low-risk",
      "Age under 18", "Age over 35", "BMI over 30", "First pregnancy", "Primigravida",
      "Multiparity", "Grand Multiparity", "Several pregnancies"
    ],
    "Other Important Terms": [
      "Teratogens", "Toxoplasmosis", "TORCH infections", "Jaundice", "Surfactant",
      "Fetal heart rate monitoring", "Continuous fetal monitoring", "Fetal fibronectin", "FFN",
      "Estriol", "Patent ductus arteriosus", "PDA", "Ductus arteriosus",
      "Metabolic interchange", "Carbon dioxide", "Cystic fibrosis",
      "African American", "Lower socioeconomic status", "Smoking during pregnancy",
      "Previous children", "History of abruption", "Prior preeclampsia",
      "Previous ectopic pregnancy", "Uterine scarring", "Scarring of uterus",
      "Fibroids", "Uterine fibroids", "Previous uterine surgery", "Previous tubal surgery",
      "Abdominal tenderness", "Hospitalization required", "Close fetal monitoring",
      "Close maternal monitoring", "Intervene", "Early delivery", "Cesarean delivery required",
      "Unsafe vaginal delivery", "Naturally expelled", "Problems with placenta",
      "Cervical insufficiency", "Incompetent cervix", "Less oxygen to fetus",
      "Less nutrients to fetus", "Decreased fetal movement", "Intense cramping",
      "New onset blurred vision", "Visual changes", "New shortness of breath",
      "Worsening shortness of breath", "Decreased urine output", "Oliguria",
      "Liver pain", "Overall sick feeling", "Life-threatening pregnancy",
      "Hormone levels", "Ultrasound monitoring", "Ruptured ectopic", "Tubal rupture",
      "Bleeding early pregnancy", "Abdominal pain early pregnancy", "Visible bleeding",
      "Bright red bleeding"
    ]
  };
}
