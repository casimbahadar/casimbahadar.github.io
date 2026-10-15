# casimbahadar.github.io

Personal freelance site: Home, Work, Services, About and Contact. Plain HTML, CSS and JavaScript in one flat folder, no build step.

## Before publishing

Open `script.js` and edit the `CONFIG` block at the top:

- `email`: the address the contact form and every email link use.
- `linkedin`: your full profile URL, or leave it empty to hide LinkedIn.

## Publish on GitHub Pages

1. Create a public repository named `casimbahadar.github.io`.
2. Upload every file in this folder to the root of the repository.
3. In Settings, then Pages, set Source to "Deploy from a branch", choose `main` and `/ (root)`, and save.
4. The site goes live at https://casimbahadar.github.io/ within a few minutes.

If you publish under a different repository name, update the `og:image` URL in each page's `<head>` so link previews still find `og-image.png`.

## Brand files

- `favicon.svg` is the Phoenix icon. It is used for the browser tab and next to your name in the header.
- `favicon-32.png` is the tab icon for browsers that don't support SVG icons.
- `apple-touch-icon.png` is the icon shown when someone saves the site to an iPhone home screen.
- `og-image.png` is the preview card shown when the site link is shared on LinkedIn or in messages.
- The full logo set (stacked, horizontal, one-colour and reverse versions) lives in the separate phoenix-logo folder.

## Editing

- Project entries live in `work.html`. The home page features three of them, and the phone preview on the home page reads from the `FEATURED` list in `script.js`.
- Each project illustration is drawn in code in the `SCENES` object in `script.js`, keyed by the `data-scene` attribute.
- Colours and type are set at the top of `styles.css`.
