# Men Cave frontend handoff

## Strapi model and API integration

The Strapi CMS was refactored from separate legacy endpoints to:

- `pages` with a `Sectional_Content` Dynamic Zone
- `products` Collection Type
- `navmenu` single type
- `footer` single type

The frontend renders `page-components.page-sections` content from the Dynamic Zone.

## Product catalogue

Products load from `/api/products` with server-side:

- Search
- Category filtering
- Sorting
- Pagination

Categories load from `/api/categories?sort=name`.

## Navigation and footer

The navbar and footer are rendered from the root app shell.

- Navigation endpoint: `/api/navmenu?populate=brand_logo%2Cnavlinks`
  - Link label: `menu_name`
  - Link URL: `url`
  - External-link flag: `external`
  - Logo: `brand_logo.url`
- Footer endpoint: `/api/footer?populate=brand_logo`
  - Text field: `footer_content`
  - Logo: `brand_logo.url`

## Styling

- Navbar is sticky.
- Footer has a grey background.
- Footer logo aligns with the navbar gutter; footer text is centered.
- Gradient effects were removed from global, Home, and Products styles.
- The favicon uses `src/assets/images/manCave.png`.

## Page slugs

Page requests no longer hardcode Strapi document IDs.

- Home requests the `home` slug.
- Products page layout requests the `products` slug.

Both use `/api/pages` with `fields=slug`, the Dynamic Zone fragment populates, and a `filters[slug][$eq]` filter. Ensure these UID values exist in Strapi, or update the frontend constants to match the generated values.

## Verification

- App and spec TypeScript checks pass.
- Full Angular browser suite was run in a disposable Chrome-capable container: 16 tests passing.
