import { useMemo, useState } from 'react';
import useStore from './useStore';
import { t } from '@lingui/macro';

type Keyable = { [key: string]: any };

export default function useNavData(): [
  any[] | undefined,
  (_data: Keyable, _locale: 'cs' | 'en' | 'sk') => void
] {
  const [{ bedIdx }] = useStore();
  const [data, setData] = useState<Keyable | undefined>(undefined);
  const [locale, setLocale] = useState('en');
  const navTitles = ['Model', 'Head', 'Cover', 'Mattress Stitches', 'Legs', 'Leg Material'];

  const nav = useMemo(() => {
    if (!data) {
      return undefined;
    }

    return navTitles.map((item) => {
      switch(item) {
        case 'Model':
          return {
            action: 'BED_IDX',
            title: t`Model`,
            data: data.bed.map((_item: Keyable, _i: number) => ({
              description: data.description[_i][locale],
              image: _item.thumbnail,
              title: _item.title
            }))
          };
        case 'Head':
          return {
            action: 'HEAD_IDX',
            title: t`Head`,
            data: data.head.map((_item: Keyable) => ({
              image: _item.thumbnail,
              title: _item.title.replace(/_/g, ' ')
            }))
          };
        case 'Cover':
          return {
            action: 'MAT_IDX',
            title: t`Cover`,
            data: data.textures.thumbnail.material.map(((_item: Keyable) => ({
              image: _item.thumbnail,
              title: _item.title
            })))
          };
        case 'Mattress Stitches':
          return {
            action: 'TUFT_IDX',
            title: t`Mattress Stitches`,
            data: data.textures.thumbnail.tuft.map(((_item: Keyable) => ({
              image: _item.thumbnail,
              title: _item.title
            })))
          };
        case 'Legs':
          return {
            action: 'LEG_IDX',
            title: t`Legs`,
            data: bedIdx !== 0
              ? (
                data.leg.map(((_item: Keyable) => ({
                  image: _item.thumbnail,
                  title: _item.title
                }))).slice(1)
              ) : (
                data.leg.map(((_item: Keyable) => ({
                  image: _item.thumbnail,
                  title: _item.title
                })))
              )
          };
        case 'Leg Material':
          return {
            action: 'LEG_MAT_IDX',
            title: t`Legs Material`,
            data: data.textures.thumbnail.leg.map(((_item: Keyable) => ({
              image: _item?.thumbnail,
              title: _item?.title[locale]
            })))
          };
        default: undefined;
      }
    });
  }, [data, bedIdx]);

  function handleSetData(_data: Object, _locale: 'cs' | 'en' | 'sk'): void {
    setLocale(_locale);
    setData(_data);
  }

  return [
    nav,
    handleSetData
  ];
}