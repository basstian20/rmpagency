# Tech Stack Recommendation

## Current fit

Project ini saat ini paling cocok tetap sebagai static website: HTML, CSS, dan JavaScript ringan yang dideploy ke Vercel. Untuk landing page agency dengan dua halaman, pendekatan ini cepat, murah, dan minim maintenance.

## Recommended next stack

Kalau website mulai bertambah halaman, studi kasus, blog, atau butuh komponen yang dipakai ulang, migrasi bertahap yang paling masuk akal adalah:

- Astro untuk static site generation dan komponen per section.
- Vite sebagai dev/build tool bawaan Astro.
- Plain CSS atau CSS Modules untuk menjaga style tetap dekat dengan desain saat ini.
- Vercel untuk deployment, tetap menggunakan clean URLs.
- Sharp atau pipeline image Astro untuk optimasi gambar.
- FFmpeg untuk membuat versi video WebM/MP4 yang lebih kecil.

## When to choose another stack

Gunakan Next.js hanya kalau nanti butuh dashboard, auth, form kompleks, API route, atau personalisasi konten. Untuk website company profile/agency biasa, Next.js akan menambah kompleksitas yang belum perlu.

Gunakan CMS seperti Sanity, Contentful, atau Decap CMS kalau tim non-teknis perlu mengubah project, artikel, atau copywriting tanpa edit file HTML.

## Immediate technical priorities

- Kompres `assets/hero_video.mp4` dan `assets/about_video.mp4`.
- Konversi gambar besar ke WebP/AVIF.
- Pisahkan CSS shared dan page-specific jika halaman bertambah.
- Tambahkan nomor WhatsApp asli jika kanal WhatsApp ingin dipakai lagi.
