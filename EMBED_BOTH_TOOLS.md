# Risk Ranger & NeoNearBy - Side by Side Embed

## Copy-Paste Embed Code

Add this to your website to display Risk Ranger and NeoNearBy side by side:

```html
<!-- Risk Ranger & NeoNearBy Side-by-Side -->
<style>
  .surrogacy-tools-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 2000px;
    margin: 20px auto;
  }

  .tool-wrapper {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .tool-header {
    color: white;
    padding: 15px 20px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .tool-header.risk-ranger {
    background: #7d2431; /* Ruby Red */
  }

  .tool-header.neonearby {
    background: #217045; /* Dark Green - adjust to match your branding */
  }

  .tool-wrapper iframe {
    width: 100%;
    height: 800px;
    border: none;
    display: block;
  }

  /* Mobile: Stack vertically */
  @media (max-width: 1024px) {
    .surrogacy-tools-container {
      grid-template-columns: 1fr;
    }

    .tool-wrapper iframe {
      height: 600px;
    }
  }
</style>

<div class="surrogacy-tools-container">
  <!-- Risk Ranger -->
  <div class="tool-wrapper">
    <div class="tool-header risk-ranger">Risk Ranger</div>
    <iframe
      src="https://risk-ranger.pages.dev/"
      title="Risk Ranger - Medical Risk Assessment"
      loading="lazy"
    ></iframe>
  </div>

  <!-- NeoNearBy -->
  <div class="tool-wrapper">
    <div class="tool-header neonearby">NeoNearBy</div>
    <iframe
      src="https://neonearby.vercel.app/"
      title="NeoNearBy - NICU Distance Calculator"
      loading="lazy"
    ></iframe>
  </div>
</div>
```

---

## Customization

### Change Header Colors

Update the background colors to match your branding:

```css
.tool-header.risk-ranger {
  background: #7d2431; /* Your Risk Ranger color */
}

.tool-header.neonearby {
  background: #217045; /* Your NeoNearBy color */
}
```

### Change Header Text

```html
<div class="tool-header risk-ranger">Medical Risk Assessment</div>
<div class="tool-header neonearby">NICU Distance Finder</div>
```

### Remove Headers

Delete the header divs:

```html
<div class="tool-wrapper">
  <!-- Remove this: <div class="tool-header risk-ranger">Risk Ranger</div> -->
  <iframe src="https://risk-ranger.pages.dev/" ...></iframe>
</div>
```

### Adjust Height

```css
.tool-wrapper iframe {
  height: 1000px; /* Increase for taller frames */
}

@media (max-width: 1024px) {
  .tool-wrapper iframe {
    height: 700px; /* Mobile height */
  }
}
```

### Change Order (NeoNearBy first, Risk Ranger second)

Just swap the two `<div class="tool-wrapper">` sections in the HTML.

---

## WordPress Instructions

1. **Edit your page** in WordPress
2. **Add a Custom HTML block**
3. **Paste the entire code** (including `<style>` and `<div>` sections)
4. **Preview** to see side-by-side layout
5. **Publish**

---

## Responsive Behavior

- **Desktop (>1024px)**: Side-by-side layout
- **Tablet/Mobile (≤1024px)**: Stacked vertically (Risk Ranger on top, NeoNearBy below)

---

## Full Page Demo

Open [embed-risk-ranger-neonearby.html](embed-risk-ranger-neonearby.html) to see a complete standalone page with:
- Professional title
- Side-by-side responsive layout
- Clean styling

---

## Notes

- Both tools load independently
- Users can interact with both simultaneously
- Each tool maintains its own state (API keys, form data, etc.)
- `loading="lazy"` improves page performance
- Adjust iframe heights based on your page layout needs
