import { I18nProviderClient } from '@/locales/utils/client';
import { ReactElement } from 'react';

export default function SubLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  return (
    <I18nProviderClient
      locale={locale}
      fallback={<div>Fallback For Localization</div>}
    >
      {children}
    </I18nProviderClient>
  );
}
