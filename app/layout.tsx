import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AEIT — Global Agricultural Trade Intelligence & Business Connectivity',
  description: 'Global agricultural trade intelligence, B2B agribusiness matching, event discovery, and trade-readiness platform connecting suppliers, producers, and buyers worldwide.',
  openGraph: {
    title: 'AEIT — Global Agricultural Trade Intelligence & Business Connectivity',
    description: 'Global agricultural trade intelligence, B2B agribusiness matching, event discovery, and trade-readiness platform connecting suppliers, producers, and buyers worldwide.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AEIT — Global Agricultural Trade Intelligence & Business Connectivity',
    description: 'Global agricultural trade intelligence, B2B agribusiness matching, event discovery, and trade-readiness platform connecting suppliers, producers, and buyers worldwide.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-slate-950 font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
