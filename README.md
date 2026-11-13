# ON-Q25 Client Website Starter

Eleventy static site + Decap CMS, code on GitHub, hosted on Netlify.
Clients edit **content** (business info, hours, services, gallery) at `/admin`. Layout and design stay with ON-Q25.

---

## What's included

- One-page site: hero, services/menu, about, gallery, hours + map link, contact form
- Netlify Forms contact form with spam honeypot. Submissions appear in Netlify → Forms.
- LocalBusiness schema (JSON-LD), sitemap, robots.txt, Open Graph tags
- Decap CMS at `/admin` with an editorial workflow: every edit becomes a PR with a free Deploy Preview
- Brand colors set per client in one file

## File map

| File | Who edits | What it controls |
|---|---|---|
| `src/_data/site.json` | Client (CMS) | Name, tagline, about, phone, address, images, social, booking link |
| `src/_data/hours.json` | Client (CMS) | Weekly hours |
| `src/_data/gallery.json` | Client (CMS) | Photo gallery (section hides when empty) |
| `src/services/*.md` | Client (CMS) | Services / menu items |
| `src/_data/settings.json` | **ON-Q25 only** | Domain URL, schema type, price range, brand colors |
| `src/index.njk`, `src/_includes/*`, `src/css/*` | **ON-Q25 only** | Layout and design |
| `src/admin/config.yml` | **ON-Q25 only** | What the client can edit |

---

## New client setup (about 30 min)

### 1. Create the repo
1. On GitHub, open this template repo and click **Use this template → Create a new repository**.
   - Owner: `on-q25` org. Name: `clientname-site`. Visibility: **Private**.
2. Clone it locally, or have Claude edit it directly.

### 2. Configure (ON-Q25)
1. `src/_data/settings.json`:
   - `url`: the client's live domain, e.g. `https://tasteofky.com`. No trailing slash.
   - `schemaType`: the most specific schema.org type, e.g. `BarberShop`, `Restaurant`, `FoodEstablishment`, `HairSalon`, `Plumber`, `HVACBusiness`.
   - `theme`: the client's brand colors.
2. `src/_data/site.json`, `hours.json`, `services/*.md`: fill in the real content. Claude can draft this from the intake form.
3. `src/admin/config.yml`: set `repo: on-q25/clientname-site`, plus `site_url` and `display_url`.
4. Commit and push to `main`.

### 3. Connect Netlify
1. In Netlify (ON-Q25 Pro team), go to **Add new project → Import from Git → GitHub** and pick the repo.
2. Build settings are read from `netlify.toml` automatically (`npm run build` → `_site`).
3. Deploy, then confirm the `*.netlify.app` URL works.
4. Under **Domain management**, add the client's custom domain. SSL is issued automatically.
5. Under **Forms → Form notifications**, add an email notification to the client and ON-Q25.

### 4. Enable CMS login (GitHub OAuth)
One-time, shared across all clients:
1. In GitHub, go to `on-q25` org → **Settings → Developer settings → OAuth Apps → New OAuth App**.
   - Homepage URL: `https://on-q25.com`
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Save the **Client ID** and generate a **Client Secret**.

For each client site:
2. In Netlify, open the site → **Access & security → OAuth → Install provider → GitHub** and paste the Client ID and Secret.
   (Menu names may differ slightly. Search Netlify docs for "OAuth provider tokens" if the location has changed.)

### 5. Give the client access
1. The client creates a free GitHub account.
2. Add them to the repo: **Settings → Collaborators → Add people**. Choose the permission level:
   - **Write**: the client can publish their own edits.
   - **Triage/Read + ON-Q25 publishes**: see "Approval mode" below.
3. The client logs in at `https://theirdomain.com/admin` → **Login with GitHub**.

---

## How edits work

**Client edits through the CMS**
1. Client opens `/admin`, edits, and clicks **Save**. This creates a draft PR.
2. Netlify builds a **Deploy Preview**. Free, no credits used.
3. The client (or ON-Q25) moves it to **Ready** and clicks **Publish**. This merges to `main` and the site goes live.
   - Each publish is one production deploy (15 Netlify credits).

**ON-Q25 edits (layout, design, bigger changes)**
1. Create a branch, make the changes (Claude can do this), push, and open a PR.
2. Send the client the Deploy Preview link.
3. Once approved, merge to `main` and it goes live.
4. If something breaks, go to Netlify → Deploys → pick the previous deploy → **Publish deploy**. Rollbacks are free.

**Approval mode (recommended for higher retainer tiers)**
Give the client Read/Triage access instead of Write. They can't merge, so you review and publish their drafts. Use GitHub branch protection on `main` to enforce it. You get quality control and can batch deploys to save credits.

---

## Local development

```bash
npm install
npm run dev          # site at http://localhost:8080
npm run cms          # (second terminal) local CMS backend, then open http://localhost:8080/admin/
```

`local_backend: true` in `config.yml` lets you test the CMS locally without GitHub login. It's ignored in production.

---

## Pre-launch checklist

- [ ] `settings.json` url, schemaType and theme set
- [ ] `config.yml` repo, site_url and display_url set
- [ ] Real content, logo and hero image added. Compress images first, under 300 KB each (squoosh.app).
- [ ] Contact form test submission received
- [ ] Custom domain and SSL active
- [ ] Schema validated at https://validator.schema.org
- [ ] Sitemap submitted in Google Search Console
- [ ] Website URL added to the client's Google Business Profile
- [ ] Client CMS login tested
