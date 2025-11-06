// Test with an imperfect but not disqualified applicant
// Run with: node test-imperfect.js

import { config } from 'dotenv';

// Load environment variables
config();

// Sample imperfect applicant - has some flags but not disqualifying
const testApplicationText = `SURROGATE APPLICATION

PERSONAL INFORMATION:
Name: Sarah Johnson
Goes By: Sarah
Preferred Pronouns: She/Her
Date of Birth: 06/12/1990
Age: 34
Height: 5'4"
Weight: 165
BMI: 28.3
Relationship Status: Married
Employment Status: Employed
Job Title: Retail Manager
Street Address: 456 Oak Avenue
City: Austin
State: Texas
ZIP: 78701
Previous Surrogate: Yes
Number of Previous Journeys: 1
Previous Journey Details: One successful journey in 2022, delivered healthy twins at 38 weeks via scheduled C-section due to breech presentation. Great relationship with intended parents, smooth journey overall.

PREGNANCY HISTORY:
Number of Pregnancies: 4
Number of Live Births: 3
Number of Miscarriages: 1
Miscarriage Details: One early miscarriage at 8 weeks in 2018, no complications
Number of Abortions: 0
Pregnancy Details/Complications: First pregnancy (2015): Full-term vaginal delivery, 7 lb baby, no complications. Second pregnancy (2017): Full-term vaginal delivery, 6 lb 12 oz baby, developed mild gestational diabetes managed with diet. Third pregnancy (2018): Miscarriage at 8 weeks. Fourth pregnancy (2022, surrogacy): Twin pregnancy, scheduled C-section at 38 weeks due to Baby A being breech, both babies healthy at 6 lbs 2 oz and 5 lbs 14 oz.

MEDICAL HISTORY:
Current Medical Conditions: Hypothyroidism (well-controlled), Seasonal allergies
Current Medications: Levothyroxine 75mcg daily, Zyrtec as needed for allergies
Allergies: Penicillin (hives), seasonal pollen allergies
Previous Surgeries: Cesarean section (2022), Appendectomy (2019)
Mental Health History: Treated for postpartum depression after first baby in 2015, resolved with therapy, no medications, no issues since
Smoking Status: Non-smoker
Vaping Status: Non-vaper
Alcohol Use: Social drinker (1-2 glasses of wine per week)
Drug Use: None
Dietary Restrictions: None

HOUSEHOLD INFORMATION:
Type of Home: Townhouse
Home Ownership: Rent
Number of Adults in Home: 2
Number of Children in Home: 2
Children Ages: 9 and 7
Smoke-Free Home: Yes
Pets: Yes
Pet Details: Two cats, indoor only, litter box kept clean
Firearms in Home: Yes
Firearm Storage/Licensing: Husband owns one hunting rifle, stored unloaded in locked gun safe, ammunition stored separately, husband has hunting license

OB/GYN INFORMATION:
Current Birth Control: Nexplanon implant
Birth Control Details: Nexplanon arm implant, can be removed when ready to start journey
Currently Breastfeeding: No

BACKGROUND INFORMATION:
Criminal History (Self): No
Criminal History (Partner): Yes
Criminal History Details (Partner): Husband had one DUI in 2014 (10 years ago), completed all court requirements, probation completed, has not had any issues since, maintains clean record
`;

// Mock request and response objects
const mockRequest = {
  method: 'POST',
  body: {
    application_text: testApplicationText,
    application_id: 'TEST-002',
    submitted_date: new Date().toISOString()
  }
};

const mockResponse = {
  status: function(code) {
    this.statusCode = code;
    return this;
  },
  json: function(data) {
    console.log('\n' + '='.repeat(80));
    console.log('RESPONSE STATUS:', this.statusCode);
    console.log('='.repeat(80));

    if (data.success) {
      console.log('\n✅ SUCCESS!\n');

      console.log('FORMATTED SUMMARY:');
      console.log('-'.repeat(80));
      console.log(data.summary);
      console.log('-'.repeat(80));

      console.log('\n📊 EXTRACTED FIELDS:');
      console.log(JSON.stringify(data.fields, null, 2));

      console.log('\n⭐ GOLD STAR:', data.is_gold_star ? '✨ YES - Email sent!' : '❌ No (does not meet all criteria)');

      if (!data.is_gold_star) {
        console.log('\n📋 Why not gold star:');
        console.log('   • BMI 28.3 (outside 19-28 range)');
        console.log('   • Has 1 C-section (experienced surrogate, so acceptable)');
        console.log('   • Has medical flags (hypothyroidism, past GD)');
        console.log('   • Has background flag (partner DUI)');
      }

      console.log('\n🕐 Generated at:', data.generated_at);
    } else {
      console.log('\n❌ ERROR\n');
      console.log('Error:', data.error);
      console.log('Message:', data.message);
    }

    console.log('\n' + '='.repeat(80));
  }
};

// Load and run the handler
async function test() {
  console.log('\n🧪 Testing AI Application Processor - IMPERFECT APPLICANT...\n');
  console.log('📝 Processing application for: Sarah Johnson');
  console.log('🎯 Expected Result: NOT Gold Star (BMI 28.3, has medical conditions, 1 C-section, partner background)');
  console.log('✓  Should still process successfully - just flagged, not DQ\'d\n');

  try {
    // Import the handler
    const handlerModule = await import('./api-functions/process-surrogate-application.js');
    const handler = handlerModule.default;

    // Run the test
    await handler(mockRequest, mockResponse);

  } catch (error) {
    console.error('\n❌ Test Failed:\n');
    console.error('Error:', error.message);
    console.error('\nStack trace:');
    console.error(error.stack);

    if (error.message.includes('ANTHROPIC_API_KEY')) {
      console.error('\n⚠️  Make sure you have set ANTHROPIC_API_KEY in your .env file');
      console.error('   Or run: export ANTHROPIC_API_KEY=your_key_here');
    }
  }
}

// Run the test
test();
