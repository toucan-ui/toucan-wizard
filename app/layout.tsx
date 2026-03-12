import type { Metadata } from 'next';
import { Page } from '@toucan-ui/core';
import './globals.css';

export const metadata: Metadata = {
  title: "Theme Wiz'rd — Design System Factory",
  description: 'Create custom themes for the factory design system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Page>{children}</Page>
      </body>
    </html>
  );
}
