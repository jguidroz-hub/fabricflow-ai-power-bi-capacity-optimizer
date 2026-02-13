import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FabricFlow AI - Power BI Capacity Optimizer',
  description: 'Value Proposition: Helps Power BI and Microsoft Fabric users proactively monitor, predict, and optimize their capacity usage to prevent throttling, improve performance, and reduce costs.

Target Customer: Data teams, BI managers, and IT departments in companies heavily using Microsoft Power BI and Fabric, especially those experiencing performance issues.

---
Category: Micro-SaaS
Target Market: Data teams, BI managers, and IT departments in companies heavily using Microsoft Power BI and Fabric, especially those experiencing performance issues.
Source Hypothesis ID: a9ad96c6-0533-4269-b741-988328e042f6
Promotion Type: automatic',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <nav className="border-b">
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
              <a href="/" className="font-bold text-lg">FabricFlow AI - Power BI Capacity Optimizer</a>
              <div className="flex items-center gap-4">
                <a href="/dashboard" className="text-sm hover:text-blue-600">Dashboard</a>
                <a href="/pricing" className="text-sm hover:text-blue-600">Pricing</a>
              </div>
            </div>
          </nav>
          <main>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
