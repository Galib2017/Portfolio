import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/instrument-sans';
import './globals.css';
import { profile } from '../data/work';

export const metadata = { title: `${profile.name} | Portfolio`, description: profile.tagline };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
