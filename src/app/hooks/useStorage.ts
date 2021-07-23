export default function useStorage(): Storage {
  const { localStorage: storage } = window;

  return storage;
}
