#!/bin/bash

# Quick test of the AI processor
echo "Testing AI Application Processor..."
echo ""

# Test with curl to your local or deployed endpoint
curl -X POST http://localhost:3000/api/process-application \
  -H "Content-Type: application/json" \
  -d '{
    "application_text": "SURROGATE APPLICATION\n\nPERSONAL INFORMATION:\nName: Jane Test Smith\nAge: 30\nBMI: 23.4\nState: California\nRelationship Status: Married\nEmployment Status: Teacher\nPrevious Surrogate: No\n\nPREGNANCY HISTORY:\nNumber of Pregnancies: 2\nNumber of Live Births: 2\nNumber of Miscarriages: 0\nNumber of Abortions: 0\nPregnancy Details: Both pregnancies were full-term vaginal deliveries with no complications. First baby: 39 weeks, 7 lbs 2 oz. Second baby: 40 weeks, 7 lbs 8 oz.\n\nMEDICAL HISTORY:\nCurrent Medical Conditions: None\nCurrent Medications: Prenatal vitamins only\nSmoking Status: Non-smoker\nVaping Status: Non-vaper\nAlcohol Use: Social drinker\nDrug Use: None\n\nHOUSEHOLD INFORMATION:\nType of Home: Single-family home\nNumber of Adults in Home: 2\nNumber of Children in Home: 2\nChildren Ages: 5 and 8\nSmoke-Free Home: Yes\nPets: Yes\nPet Details: One dog\nFirearms in Home: No\n\nOB/GYN INFORMATION:\nCurrent Birth Control: IUD\nCurrently Breastfeeding: No\n\nBACKGROUND INFORMATION:\nCriminal History (Self): No\nCriminal History (Partner): No",
    "application_id": "TEST-001"
  }' | jq .

echo ""
echo "✅ Test complete!"
