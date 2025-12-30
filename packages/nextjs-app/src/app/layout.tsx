import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js App - Framework Agnostic Demo',
  description: 'Demonstrating framework-agnostic component design',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
