type Locale = 'cs' | 'en' | 'sk';

export default function useLocale(locale?: Locale): Locale {
  if (locale) {
    return locale;
  }

  const uri: string = window.location.href.toLowerCase();

  if (uri.indexOf('/en/') > -1) {
    return 'en';
  } else if (uri.indexOf('/sk/') > -1) {
    return 'sk';
  } else if (uri.indexOf('/cs/') > -1) {
    return 'cs';
  } else {
    return 'en';
  }
}