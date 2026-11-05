import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';
import './globals.css';
import { profile } from '../data/work';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--display' });
const body = Instrument_Sans({ subsets: ['latin'], variable: '--body' });

export const metadata = { title: `${profile.name} | Portfolio`, description: profile.tagline };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
