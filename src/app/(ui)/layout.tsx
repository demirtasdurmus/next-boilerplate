import clsx from 'clsx';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { ReactNode } from 'react';
import Toast from '@/components/toast';
import './globals.css';
import Context from '@/context';

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
        <Context>{children}</Context>
        <Toast />
      </body>
    </html>
  );
}
