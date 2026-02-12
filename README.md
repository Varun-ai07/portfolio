This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## ⚡ Performance Optimizations

This portfolio has been optimized for smooth performance across all devices:

- **Reduced particle animations** from 40 to 20 for better GPU performance
- **Throttled mouse tracking** to 60fps max update rate
- **Optimized spring animations** with reduced stiffness values
- **Passive event listeners** for improved scroll performance
- **GPU optimization hints** using will-change CSS property

For detailed information about the performance optimizations, see [PERFORMANCE-OPTIMIZATION.md](./PERFORMANCE-OPTIMIZATION.md).

## 📦 Caching & HTTP Request Optimization

This portfolio implements aggressive caching to **avoid unnecessary HTTP requests** on subsequent page views:

- **Service Worker** with offline-first caching strategy
- **Static asset caching** for 1 year (images, fonts, CSS, JS)
- **Intelligent resource prefetching** on link hover
- **PWA support** - installable as standalone app
- **80-90% reduction** in HTTP requests on repeat visits

For detailed information about caching strategies, see [CACHING-OPTIMIZATION.md](./CACHING-OPTIMIZATION.md).


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
