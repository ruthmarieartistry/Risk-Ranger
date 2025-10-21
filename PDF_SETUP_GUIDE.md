# PDF Parsing Setup & Testing Guide

## Current Status

✅ **Code is ready** - PDF/DOC parsing code is written
⚠️ **Dependencies need to be installed** - Run npm install

The BulkUpload component now uses `simplePdfParser.js` which:
- Dynamically imports PDF.js
- Loads worker from CDN
- Parses PDF, DOCX, and TXT files
- Better error handling

---

## Installation Steps

### 1. Install Dependencies

```bash
cd ~/surrogacy-risk-assessment
npm install
```

This will install:
- `pdfjs-dist` - PDF parsing library
- `mammoth` - DOCX parsing library
- `jspdf` - PDF generation library
- `html2canvas` - HTML to image library

### 2. Start the Server

```bash
npm run dev
```

Server should start at http://localhost:5174/

---

## How PDF Parsing Works

### The Simple PDF Parser (`simplePdfParser.js`)

```javascript
import { parseDocument } from './utils/simplePdfParser';

// Automatically detects file type and parses
const result = await parseDocument(pdfFile);

if (result.success) {
  console.log(result.text);  // Extracted text from PDF!
}
```

### What It Does:

1. **Detects file type** (.pdf, .docx, .doc, .txt)
2. **PDF Files**:
   - Loads PDF.js dynamically
   - Extracts text from all pages
   - Returns combined text with page markers
3. **DOCX Files**:
   - Uses mammoth library
   - Extracts raw text
4. **TXT Files**:
   - Direct text read

---

## Testing

### Test 1: Create a Sample PDF

Create a test PDF with this content:

```
Patient Name: Jane Doe
Age: 32 years old
BMI: 24.5

Obstetric History: G3P2
- 2019: SVD, full term, no complications
- 2021: SVD, full term, no complications

Blood Pressure: 118/72
No history of GDM or preeclampsia
```

Save as PDF (use Word/Google Docs -> Export as PDF)

### Test 2: Upload via Bulk Upload

1. Navigate to the bulk upload section
2. Drag and drop the PDF
3. Click "Process All Files"
4. Should see: "PDF successfully parsed"
5. Text should be extracted

### Test 3: Verify in Console

Open browser console (F12) and check:

```javascript
// You should see the extracted text in the upload results
{
  fileName: "medical_record.pdf",
  fileType: "pdf",
  text: "Patient Name: Jane Doe\nAge: 32 years old...",
  success: true
}
```

---

## Troubleshooting

### If PDF Parsing Fails:

**Error: "Cannot find module 'pdfjs-dist'"**
```bash
npm install pdfjs-dist mammoth
```

**Error: "Worker not loaded"**
- The simplePdfParser loads worker from CDN
- Check internet connection
- Worker URL: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`

**Error: "Failed to parse PDF"**
- Check if file is actually a PDF
- Try a different PDF file
- Check browser console for detailed error

### Debug Mode

Add console logging to see what's happening:

```javascript
// In simplePdfParser.js, the parser already logs errors:
console.error('PDF parsing error:', error);
```

---

## Alternative: Test Without PDFs First

If PDF parsing isn't working yet, you can still test with TXT files:

1. Create `test_record.txt`:
```txt
Patient: Jane Doe
Age: 32
G3P2
BMI: 24.5
BP: 118/72
No complications
```

2. Upload the TXT file
3. Should parse immediately (no PDF.js needed)
4. Use this to test the rest of your app

---

## File Structure

```
src/
├── components/
│   ├── BulkUpload.jsx          ← Uses simplePdfParser
│   └── BulkUpload.css
├── utils/
│   ├── simplePdfParser.js      ← Main PDF parser (USE THIS)
│   ├── documentParser.js       ← Alternative version
│   └── reportGenerator.js
```

---

## Integration Example

Here's how to use it in your App:

```jsx
import { useState } from 'react';
import BulkUpload from './components/BulkUpload';

function App() {
  const [parsedRecords, setParsedRecords] = useState([]);

  const handleUploadComplete = (results) => {
    console.log('Parsed files:', results);

    // Filter successful parses
    const successfulParses = results.filter(r => r.success);

    successfulParses.forEach(record => {
      console.log(`File: ${record.fileName}`);
      console.log(`Type: ${record.fileType}`);
      console.log(`Text length: ${record.text.length} characters`);

      // Now analyze this text
      // analyzeRecord(record.text);
    });

    setParsedRecords(results);
  };

  return (
    <div>
      <h1>Risk Ranger</h1>
      <BulkUpload onUploadComplete={handleUploadComplete} />

      {/* Show results */}
      {parsedRecords.map((record, i) => (
        <div key={i}>
          <h3>{record.fileName}</h3>
          {record.success ? (
            <pre>{record.text.substring(0, 200)}...</pre>
          ) : (
            <p style={{color: 'red'}}>{record.error}</p>
          )}
        </div>
      ))}
    </div>
  );
}
```

---

## What to Expect

### Successful PDF Parse:

```
✓ Uploading: medical_record.pdf
✓ Processing...
✓ PDF successfully parsed
✓ Extracted 1,245 characters
```

### Successful DOCX Parse:

```
✓ Uploading: patient_info.docx
✓ Processing...
✓ DOCX successfully parsed
✓ Extracted 892 characters
```

### Failed Parse:

```
✗ Uploading: corrupted.pdf
✗ Failed to parse PDF: Invalid PDF structure
```

---

## Next Steps

1. ✅ Run `npm install` to get dependencies
2. ✅ Run `npm run dev` to start server
3. ✅ Test with a TXT file first (easiest)
4. ✅ Test with a PDF file
5. ✅ Check browser console for any errors
6. ✅ If it works, integrate with your assessment logic!

---

## Support

If you get stuck:

1. **Check package.json** - Verify dependencies are listed
2. **Check browser console** - Look for error messages
3. **Try TXT files first** - Eliminate PDF.js as variable
4. **Check network tab** - See if worker loads from CDN

The parser has extensive error handling and logging, so errors should be clear!

**Good luck!** 🚀
