import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VideoHub - YouTube Content Discovery Platform',
  description: 'Discover, organize, and enjoy YouTube content like never before. Search, filter, and create custom playlists with advanced tools.',
  keywords: 'YouTube, videos, search, discovery, playlists, content, streaming',
  authors: [{ name: 'VideoHub Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'VideoHub - YouTube Content Discovery Platform',
    description: 'Discover, organize, and enjoy YouTube content like never before.',
    type: 'website',
    url: 'https://videohub.app',
    siteName: 'VideoHub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VideoHub - YouTube Content Discovery Platform',
    description: 'Discover, organize, and enjoy YouTube content like never before.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}