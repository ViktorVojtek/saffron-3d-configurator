import * as data from '../../assets/data.json';

export default function useSetBedHead(idx: number): number {
  const defaultHead: string = data.headDefault[idx].toLowerCase();

  return data.head.findIndex((item) => item.title.toLowerCase() === defaultHead);
}
