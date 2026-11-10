# Junghyun Bae: academic website

A no-build site for GitHub Pages (`https://scratcho.github.io/`). Plain HTML, CSS, and JavaScript: edit a file, commit, push, and the site updates.

## Preview locally

Open `index.html` directly in a browser, or start a small local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Files

- `index.html`: the academic page (hero, about, projects, publications, experience, news, contact)
- `life.html`: the personal page (photos and interests)
- `styles.css`: layout, light and dark themes, responsive rules, print styling
- `script.js`: menu, theme switch, scroll effects, project filter, project details dialog
- `assets/images/`: portrait, project figures, personal photos, favicon
- `assets/documents/junghyun-bae-cv.pdf`: the CV the site links to
- `assets/documents/*.pdf`: course project documents recovered from the old site

## Common updates

### Replace the CV

Save the new CV as `assets/documents/junghyun-bae-cv.pdf` (same file name), so every CV link keeps working.

### Add a news item

In `index.html`, find `<ol class="news-list">` and add a block at the top:

```html
<li class="news reveal"><time>Jan 2027</time>
  <div><span class="kind">Paper</span>
    <h3>Title of the update</h3>
    <p>One sentence of detail.</p>
  </div>
</li>
```

Also update the "Now" card near the top (`<aside class="now-card">`) and its "Updated" line.

### Add a publication

In `index.html`, find `<ol class="pub-list">` and add a block (newest first):

```html
<li class="pub reveal">
  <span class="pub-year">2027</span>
  <div>
    <p class="pub-venue">Venue name</p>
    <h3><a href="https://doi.org/..." rel="noopener">Paper title</a></h3>
    <p class="pub-authors">First Author, <strong>Junghyun Bae</strong>, Last Author</p>
  </div>
  <span class="pub-type">Journal</span>
</li>
```

Then update the publication count in the hero (`data-count` and the number inside the same `<span>`).

### Add a project

Copy one `<article class="project reveal" ...>` block inside `<div class="project-grid">`.

- `data-cat` sets which filter buttons show the card. Use one or more of `wearable`, `actuation`, `medical`, `sensing`, `coursework`, separated by spaces.
- The text inside `<div class="project-detail" hidden>` appears in the pop-up when the card is selected. Images inside `<div class="gallery">` become a scrollable strip.
- Put the image in `assets/images/` at about 1200 px wide. Use `class="project-media contain"` for drawings on a white background and plain `class="project-media"` for photos.
- Adding `wide` to the article class makes the card span two columns. Keep the number of grid cells a multiple of three so the last row stays full.

### Add a photo to the Life page

Copy one `<article class="story reveal">` block in `life.html` and point it at a new image in `assets/images/`.

## Publishing

The repository deploys from the `main` branch (Settings, Pages, Deploy from a branch, `main`, `/ (root)`).

```bash
git add .
git commit -m "Update publications"
git push
```

## Notes

- Fonts load from Google Fonts. The CSS has local fallbacks if they are unavailable.
- The theme follows the visitor's system setting, and the button in the header overrides it on that device.
- The CV PDF is public. Check it for anything you do not want on the open web (for example a phone number) before replacing it.
