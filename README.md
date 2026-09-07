# Jung Hyun Bae — Academic Website

A no-build, GitHub Pages-ready academic portfolio. The content was drafted from the included CV and organized around research projects, publications, education, teaching, and technical skills.

## Preview locally

Open `index.html` directly, or start a small local server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Personalize it

1. Replace the four labeled project placeholders in `index.html` with `<img>` elements pointing to your images in `assets/images/`.
2. Add paper, code, project-page, Google Scholar, GitHub, and LinkedIn links once you have the exact URLs.
3. Review the short research summary and project descriptions for preferred terminology.
4. Replace `assets/documents/jung-hyun-bae-cv.pdf` whenever the CV changes, keeping the same filename so the website link stays current.

Suggested project image markup:

```html
<div class="project-visual">
  <img src="assets/images/my-project.jpg" alt="Brief description of the project prototype">
</div>
```

Add this rule to `styles.css` if using photos:

```css
.project-visual img { width: 100%; height: 100%; object-fit: cover; }
```

## Publish at `username.github.io`

1. Create a public GitHub repository named exactly `YOUR-USERNAME.github.io`.
2. In this folder, initialize Git and publish the files:

```bash
git init
git add .
git commit -m "Launch academic website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-USERNAME.github.io.git
git push -u origin main
```

3. In the repository on GitHub, open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After GitHub finishes deploying, the site will be available at `https://YOUR-USERNAME.github.io`.

Later updates are simply:

```bash
git add .
git commit -m "Update publications"
git push
```

## Files

- `index.html` — all website content and semantic structure
- `styles.css` — layout, responsive design, dark mode, and print styling
- `script.js` — navigation, theme, animation, and publication filtering
- `assets/images/research-hero.png` — generated placeholder hero artwork
- `assets/documents/jung-hyun-bae-cv.pdf` — web-friendly CV copy

## Notes

- The site intentionally omits the phone number from the public page.
- Publication URLs were not guessed. Add the canonical DOI/publisher links when confirmed.
- The Google Fonts dependency can be removed if you prefer a fully offline site; the CSS includes local fallbacks.
