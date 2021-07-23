import { i18n } from '@lingui/core';
import { en, cs, sk } from 'make-plural/plurals';

i18n.loadLocaleData({
  en: { plurals: en },
  cs: { plurals: cs },
  sk: { plurals: sk }
});

export default async function useDynamicLangActivate(locale: string): Promise<void> {
  const { messages } = await import(`../../locales/${locale}/messages`);

  i18n.load(locale, messages);
  i18n.activate(locale);
}
