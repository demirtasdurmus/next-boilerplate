import clsx from 'clsx';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

type Props = {
  children: ReactNode;
};

const fontNunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Next.js + Tailwind CSS + TypeScript Starter',
  description: 'Boilerplate code for Next.js + Tailwind CSS + TypeScript',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={clsx(fontNunito.variable, 'font-sans')}>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
