export default function useStorage(): Storage {
  if (!window?.localStorage) {
    throw new Error('Local storage is not accessible!');
  }

  const { localStorage } = window;

  return localStorage;
}
