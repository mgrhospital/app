# MGR Hospital — SEO action guide

The website has been optimised on-page (structured data, FAQ schema, keywords, sitemap, meta tags).
**But most of the ranking for competitive searches like "best hernia surgeon in Vizag" is won OFF the
website.** Do the steps below in order — they matter far more than any further code change.

## What to realistically expect
- **Brand searches** ("MGR Hospital", "MGR Hospital Vizag", "MGR Hospital Pedawaltair") → should reach
  the top quickly once the site is live + indexed + the Google Business Profile exists. Low competition.
- **"Best X surgeon in Vizag"** (hernia, gall stones, appendix, hysterectomy, piles, fissure, fistula,
  thyroid, laparoscopic) → competitive. Needs the Google Business Profile + genuine patient reviews +
  time (weeks to months). The website makes you *eligible*; reviews + profile push you *up*.

---

## Step 1 — Put the site live on your domain  *(nothing ranks until this is done)*
The repo already contains a `CNAME` file for `mgrhospitalvizag.com`. You still need to point DNS:
1. In your domain registrar's DNS settings, add these **A records** for the root domain (`@`) to
   GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
2. Add a **CNAME record** for `www` → `<your-github-username>.github.io`.
3. In the GitHub repo → **Settings → Pages**, set the custom domain to `mgrhospitalvizag.com` and tick
   **Enforce HTTPS** (may take a few hours to issue the certificate).
4. Visit `https://mgrhospitalvizag.com` and confirm it loads.

## Step 2 — Create & verify a Google Business Profile  ⭐ BIGGEST IMPACT (you don't have one yet)
This is the #1 factor for "best surgeon in Vizag" and for showing on Google Maps.
1. Go to **business.google.com** → Add your business.
2. Name: **MGR Hospital** (exactly as on the site). Category: **Surgeon** (add secondary: Hospital,
   General surgeon).
3. Address: **8-4-32, Doctors Colony, Near Visakha Eye Hospital, Pedawaltair, Visakhapatnam 530017**.
4. Phone: **0891-2755908** and **+91 95732 47590**. Website: **https://mgrhospitalvizag.com**.
5. Hours: Mon–Sat 9:00 AM–2:00 PM and 5:00 PM–8:00 PM; note 24×7 emergencies.
6. **Verify** the listing (postcard/phone/video as Google offers). Unverified profiles rank poorly.
7. After verifying: add real **photos** (exterior, reception, OT, doctor), list every **service**
   (gall bladder / hernia / appendix / hysterectomy / piles / fissure / fistula / thyroid / breast /
   laparoscopic surgery), and write a description using those words + "Visakhapatnam / Vizag".

## Step 3 — Get indexed (Google Search Console + Bing)
1. **search.google.com/search-console** → add property `mgrhospitalvizag.com` → verify (DNS TXT record
   is easiest).
2. Submit the sitemap: enter `sitemap.xml` under **Sitemaps**.
3. Use **URL Inspection** on `https://mgrhospitalvizag.com/` → **Request indexing**.
4. Repeat at **Bing Webmaster Tools** (bing.com/webmasters) — you can import from Search Console.

## Step 4 — Collect Google reviews  (drives "best surgeon" ranking + trust)
- Ask satisfied patients to leave a **Google review** on the Business Profile. Aim for 20–50+ over
  time, with a steady trickle (not all at once).
- Get your Google review short-link from the Business Profile and share it via WhatsApp/SMS after
  discharge. Reply politely to every review.
- *(Once you have a real average rating + count, tell the developer and it can be added to the site's
  structured data as star ratings.)*

## Step 5 — List on directories with identical Name/Address/Phone (NAP)
Use the **exact** same name, address and phone everywhere (consistency is what Google checks):
- Practo, Justdial, Lybrate, Sulekha, Google Maps, Apollo/hospital directories, IMA/medical
  association listings, and your Facebook page.

## Step 6 — Backlinks & ongoing content (longer term)
- Get links from local news, the medical college / KGH alumni pages, and reputable health directories.
- Publish simple patient-education content per condition (e.g. "Gall bladder stone surgery in Vizag —
  what to expect"). When you're ready, dedicated per-procedure pages are the strongest next upgrade
  for the competitive "best X surgeon" terms — ask the developer to add them as phase 2.

---

### Already done on the website
- `Hospital` + `Physician` + `MedicalProcedure` structured data (all surgeries listed)
- `FAQPage` structured data + a visible FAQ section targeting patient searches
- Title / description / keywords tuned for "Vizag" + each procedure
- `sitemap.xml`, `robots.txt`, canonical URL, Open Graph & Twitter cards, social profile links
- Google Maps, WhatsApp and click-to-call already wired

_Keep this file for reference. It is not linked from the site and won't appear in search results._
