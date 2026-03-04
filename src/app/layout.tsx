import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Git Commit Tool - Automated GitHub Commits',
  description: 'Generate educational commits to your GitHub repository with customizable categories and commit messages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-pattern">
        {children}
      </body>
    </html>
  );
}
