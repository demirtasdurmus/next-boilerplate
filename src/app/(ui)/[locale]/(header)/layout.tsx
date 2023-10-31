'use client';

import Footer from '@/components/footer';
import Header from '@/components/header';
import { I18nProviderClient } from '@/locales/utils/client';
import { ReactElement } from 'react';
import Loading from '../loading';

export default function SubLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return (
    <I18nProviderClient locale={locale} fallback={<Loading />}>
      <Header />
      {children}
      <Footer />
    </I18nProviderClient>
  );
}
