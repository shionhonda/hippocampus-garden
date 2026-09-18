# Hippocampus's Garden

Astro-based source for [hippocampus-garden.com](https://hippocampus-garden.com).

## Development

Install dependencies from the repository root:

```sh
npm install
```

Run the Astro commands from the repository root:

```sh
npm run dev
npm run build
npm run preview
npm run check
```

## Deployment

Netlify is configured through [`netlify.toml`](/Users/shionhonda/Projects/hippocampus-garden/netlify.toml) to build the Astro app from the repository root.

When the repository is connected to Netlify, opening or updating a pull request
creates a Netlify Deploy Preview automatically. Ensure that Deploy Previews are
enabled in Netlify's **Project configuration → Developer settings → Continuous
deployment → Branches and deploy contexts**.

The **Netlify Deploy** GitHub Actions workflow triggers a production build every
day at 08:00 UTC and can be run on demand from the Actions tab. Before using the
workflow, add the Netlify build hook URL as the `NETLIFY_BUILD_HOOK` repository
secret. Select **Run workflow** and enter the branch that Netlify should build;
use `main` for production.

## License

Source code in this repository is licensed under the [MIT License](/Users/shionhonda/Projects/hippocampus-garden/LICENSE).

Unless otherwise noted, blog post text and original images are licensed under
[CC BY 4.0](/Users/shionhonda/Projects/hippocampus-garden/CONTENT_LICENSE.md).
