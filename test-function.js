// Direct test of the AI processor function
// Run with: node test-function.js

import { config } from 'dotenv';

// Load environment variables
config();

// Sample gold star application data
const testApplicationText = `SURROGATE APPLICATION

PERSONAL INFORMATION:
Name: Jane Test Smith
Goes By: Jane
Preferred Pronouns: She/Her
Date of Birth: 01/15/1993
Age: 30
Height: 5'6"
Weight: 145
BMI: 23.4
Relationship Status: Married
Employment Status: Employed
Job Title: Teacher
Street Address: 123 Main St
City: San Diego
State: California
ZIP: 92101
Previous Surrogate: No

PREGNANCY HISTORY:
Number of Pregnancies: 2
Number of Live Births: 2
Number of Miscarriages: 0
Number of Abortions: 0
Pregnancy Details/Complications: Both pregnancies were full-term, vaginal deliveries with no complications. First baby: 39 weeks, 7 lbs 2 oz. Second baby: 40 weeks, 7 lbs 8 oz.

MEDICAL HISTORY:
Current Medical Conditions: None
Current Medications: Prenatal vitamins
Allergies: None
Previous Surgeries: None
Mental Health History: None
Smoking Status: Non-smoker
Vaping Status: Non-vaper
Alcohol Use: Social drinker (1-2 drinks per month)
Drug Use: None
Dietary Restrictions: None

HOUSEHOLD INFORMATION:
Type of Home: Single-family home
Home Ownership: Own
Number of Adults in Home: 2
Number of Children in Home: 2
Children Ages: 5 and 8
Smoke-Free Home: Yes
Pets: Yes
Pet Details: One golden retriever, well-behaved
Firearms in Home: No

OB/GYN INFORMATION:
Current Birth Control: IUD
Birth Control Details: Mirena IUD, can be removed when ready
Currently Breastfeeding: No

BACKGROUND INFORMATION:
Criminal History (Self): No
Criminal History (Partner): No
`;

// Mock request and response objects
const mockRequest = {
  method: 'POST',
  body: {
    application_text: testApplicationText,
    application_id: 'TEST-001',
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

      console.log('\n⭐ GOLD STAR:', data.is_gold_star ? '✨ YES - Email sent!' : 'No');

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
  console.log('\n🧪 Testing AI Application Processor...\n');
  console.log('📝 Processing application for: Jane Test Smith');
  console.log('🎯 Expected Result: Gold Star Applicant (Age 30, BMI 23.4)\n');

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
