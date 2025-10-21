# Side-by-Side Embed Code for Risk Ranger

## Simple Copy-Paste Version

Add this code to your website where you want the side-by-side Risk Ranger tools to appear:

```html
<!-- Risk Ranger Side-by-Side Embed -->
<style>
  .risk-ranger-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    max-width: 2000px;
    margin: 20px auto;
  }

  .risk-ranger-wrapper {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .risk-ranger-header {
    background: #7d2431;
    color: white;
    padding: 15px 20px;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
  }

  .risk-ranger-wrapper iframe {
    width: 100%;
    height: 800px;
    border: none;
    display: block;
  }

  /* Mobile: Stack vertically */
  @media (max-width: 1024px) {
    .risk-ranger-container {
      grid-template-columns: 1fr;
    }

    .risk-ranger-wrapper iframe {
      height: 600px;
    }
  }
</style>

<div class="risk-ranger-container">
  <!-- Left Instance -->
  <div class="risk-ranger-wrapper">
    <div class="risk-ranger-header">Candidate A</div>
    <iframe
      src="https://riskranger.netlify.app/"
      title="Risk Ranger - Candidate A"
      loading="lazy"
    ></iframe>
  </div>

  <!-- Right Instance -->
  <div class="risk-ranger-wrapper">
    <div class="risk-ranger-header">Candidate B</div>
    <iframe
      src="https://riskranger.netlify.app/"
      title="Risk Ranger - Candidate B"
      loading="lazy"
    ></iframe>
  </div>
</div>
```

---

## Customization Options

### Change Header Text
Edit the `<div class="risk-ranger-header">` text:
```html
<div class="risk-ranger-header">Your Custom Title</div>
```

### Remove Headers
Delete the header divs entirely:
```html
<div class="risk-ranger-wrapper">
  <!-- Remove this line: <div class="risk-ranger-header">Candidate A</div> -->
  <iframe src="https://riskranger.netlify.app/" ...></iframe>
</div>
```

### Adjust Height
Change the `height` value in the CSS:
```css
.risk-ranger-wrapper iframe {
  height: 1000px; /* Increase for taller frames */
}
```

### Change Colors
Edit the header background color:
```css
.risk-ranger-header {
  background: #your-color-here;
}
```

### Add More Instances (3-way comparison)
```html
<style>
  .risk-ranger-container {
    grid-template-columns: 1fr 1fr 1fr; /* 3 columns */
  }
</style>

<div class="risk-ranger-container">
  <div class="risk-ranger-wrapper">...</div>
  <div class="risk-ranger-wrapper">...</div>
  <div class="risk-ranger-wrapper">...</div> <!-- Add 3rd -->
</div>
```

---

## Full Page Version

Use [embed-side-by-side.html](embed-side-by-side.html) as a standalone page with:
- Page title
- Responsive layout
- Professional styling
- Auto-resize support (future enhancement)

---

## Responsive Breakpoints

- **Desktop (>1024px)**: Side-by-side layout
- **Tablet/Mobile (≤1024px)**: Stacked vertically

Adjust the breakpoint by changing `@media (max-width: 1024px)` to your preferred width.

---

## Notes

- Each iframe is independent - users can interact with both simultaneously
- Claude API keys are stored per-browser (localStorage), so each instance shares the same key
- Use `loading="lazy"` for better page performance
- Iframes are 800px tall by default (600px on mobile)
