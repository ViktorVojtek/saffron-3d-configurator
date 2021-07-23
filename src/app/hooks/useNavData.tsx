import { useMemo, useState } from 'react';
import { ActionEnumType } from '../@types';
import { t } from '@lingui/macro';

type Keyable = { [key: string]: any };

export default function useNavData(): [
  any[] | undefined,
  (_data: Keyable, _locale: 'cs' | 'en' | 'sk') => void
] {
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
            action: ActionEnumType.BED_IDX,
            title: t`Model`,
            data: data.bed.map((_item: Keyable, _i: number) => ({
              description: data.description[_i][locale],
              image: _item.thumbnail,
              title: _item.title
            }))
          };
        case 'Head':
          return {
            action: ActionEnumType.HEAD_IDX,
            title: t`Head`,
            data: data.head.map((_item: Keyable) => ({
              image: _item.thumbnail,
              title: _item.title
            }))
          };
        case 'Cover':
          return {
            action: ActionEnumType.MAT_IDX,
            id: 'COVER',
            title: t`Cover`,
            data: data.textures.thumbnail.material.map(((_item: Keyable) => ({
              image: _item.thumbnail,
              title: _item.title
            })))
          };
        case 'Mattress Stitches':
          return {
            action: ActionEnumType.TUFT_IDX,
            title: t`Mattress Stitches`,
            data: data.textures.thumbnail.tuft.map(((_item: Keyable) => ({
              image: _item.thumbnail,
              title: _item.title
            })))
          };
        case 'Legs':
          return {
            action: ActionEnumType.LEG_IDX,
            title: t`Legs`,
            data: data.textures.thumbnail.tuft.map(((_item: Keyable) => ({
              image: _item?.thumbnail,
              title: _item?.title
            })))
          };
        case 'Leg Material':
          return {
            action: ActionEnumType.LEG_IDX,
            title: t`Legs Material`,
            data: data.textures.thumbnail.tuft.map(((_item: Keyable) => ({
              image: _item?.thumbnail,
              title: _item?.title
            })))
          };
        default: undefined;
      }
    });
  }, [data]);

  function handleSetData(_data: Object, _locale: 'cs' | 'en' | 'sk'): void {
    setLocale(_locale);
    setData(_data);
  }

  return [
    nav,
    handleSetData
  ];
}