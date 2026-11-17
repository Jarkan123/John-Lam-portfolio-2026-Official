# John Lam — Hệ thống Dẫn Đầu Ngách

Bilingual (Vietnamese / English) website for John Lam: Marketing + AI Automation lead systems for service businesses.

Built with React, Vite and Tailwind CSS. Hosted on Netlify: every push to `main` is built and published automatically (settings in `netlify.toml`).

## Editing content

- **All website text** (both languages): `content.ts`
- **Portfolio projects**: `constants.ts` — copy a project block to add a new one
- **Testimonials**: `components/Testimonials.tsx`
- **Client logos**: `components/Brands.tsx`
- **Contact form endpoint** (Formspree): `FORM_ENDPOINT` in `components/Contact.tsx`

## Pages

- Home: `/`
- Portfolio: `/#/du-an`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # output in dist/
```
