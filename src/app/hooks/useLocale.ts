export default function useLocale(locale?: string): 'cs' | 'en' | 'sk' {
  const uri: string = window.location.href.toLowerCase();

  if (locale || uri.indexOf('/en/') > -1) {
    return 'en';
  }

  if (uri.indexOf('/sk/') > -1) {
    return 'sk';
  } else {
    return 'cs';
  }
}