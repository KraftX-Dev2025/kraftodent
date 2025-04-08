import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const manrope = localFont({
  src: '../../public/fonts/Manrope-VariableFont.ttf',
  variable: '--font-manrope',
  display: 'swap',
});

const inter = localFont({
  src: '../../public/fonts/Inter-VariableFont.ttf',
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arini | The leading AI receptionist for dentists',
  description: 'Hire Arini to answer your calls and manage your appointments 24/7. Trusted by hundreds of DSO, Dental Groups, and Solo Practices across the US and Canada.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="min-h-screen font-manrope antialiased">
        {children}
      </body>
    </html>
  );
}
