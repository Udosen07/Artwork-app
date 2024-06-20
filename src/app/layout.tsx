import Navbar from './components/Navbar';
import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artwork App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
