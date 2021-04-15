import * as React from 'react';
import { appWrapperId, renderer } from '../../../utils/constants';
import { useStore } from '../../../utils/store';
import {
  changeBedMaterial,
  changeHead,
  changeLeg,
  changeLegMaterial,
} from '../../../utils';
import {
  MenuCenter,
  MenuWrapper,
  MenuWrapperNarrow,
  MenuWrapCont,
  MenuWrapperFlex,
  MenuItemWrap,
  MenuTitleP,
  MenuItem,
  MenuTitle,
  MenuBtnsWrapper,
  MenuButtonComponent,
  MenuCloseBtn,
} from './styled';

export default function ({
  show,
  items,
  second,
  title,
}: {
  show: boolean;
  items: any[];
  second?: boolean;
  title?: string | boolean;
}): JSX.Element {
  const [disableBtn, toggleDisable] = React.useState([true, false]);
  const { state, dispatch } = useStore();
  const {
    dimensions: { width },
    menuItem,
  } = state;

  const doChange: (i: number) => void = (i) => {
    const { menuItem } = state;

    if (second) {
      if (menuItem === 0) {
        changeBedMaterial(i, true);
      }
      if (menuItem === 2) {
        changeLegMaterial(i);
      }
    } else {
      if (menuItem === 0) {
        changeBedMaterial(i);
      }
      if (menuItem === 1) {
        changeHead(items, i);
      }
      if (menuItem === 2) {
        changeLeg(items, i);
      }
    }
  };

  const handleSwitchMaterialSet: () => void = () => {
    const { legIdx, models, objIdx } = state;

    if (menuItem === 0) {
      if (second) {
        const currentMenuItems = models[objIdx].matThumbs;

        dispatch({ type: 'SET_TUFTS', payload: false });
        dispatch({ type: 'SET_MENU_ITEM', payload: 0 });
        dispatch({ type: 'SET_MENU_ITEMS', payload: currentMenuItems });
      } else {
        const currentMenuItems = models[objIdx].textures.tuft;

        dispatch({ type: 'SET_TUFTS', payload: true });
        dispatch({ type: 'SET_MENU_ITEMS', payload: currentMenuItems });
      }
    } else if (menuItem === 2) {
      if (second) {
        const currentMenuItems = models[objIdx].legThumbs;

        dispatch({ type: 'SET_TUFTS', payload: false });
        dispatch({ type: 'SET_MENU_ITEM', payload: 2 });
        dispatch({ type: 'SET_MENU_ITEMS', payload: currentMenuItems });
      } else {
        const currentMenuItems = models[objIdx].textures.leg[legIdx].thumbs;

        dispatch({ type: 'SET_TUFTS', payload: true });
        dispatch({ type: 'SET_MENU_ITEMS', payload: currentMenuItems });
      }
    }
  };

  const handleCloseMenu: () => void = () => {
    dispatch({ type: 'TOGGLE_MENU', payload: false });
  };

  const menuItems: JSX.Element[] = setMenuItems(items, width || 0, doChange);

  return (
    <MenuCenter second={second} show={show}>
      <MenuWrapCont>
        <MenuWrapper show={show}>
          <MenuBtnsWrapper>
            {menuItem === 0 && [
              <MenuButtonComponent
                disabled={disableBtn[0]}
                onClick={() => {
                  toggleDisable([true, false]);
                  handleSwitchMaterialSet();
                }}
                key={0}
              >
                Látky
              </MenuButtonComponent>,
              <MenuButtonComponent
                disabled={disableBtn[1]}
                onClick={() => {
                  toggleDisable([false, true]);
                  handleSwitchMaterialSet();
                }}
                key={1}
              >
                Prešitie
              </MenuButtonComponent>,
            ]}
            {menuItem === 2 && [
              <MenuButtonComponent
                disabled={disableBtn[0]}
                onClick={() => {
                  toggleDisable([true, false]);
                  handleSwitchMaterialSet();
                }}
                key={0}
              >
                Typ nôh
              </MenuButtonComponent>,
              <MenuButtonComponent
                disabled={disableBtn[1]}
                onClick={() => {
                  toggleDisable([false, true]);
                  handleSwitchMaterialSet();
                }}
                key={1}
              >
                Materiál
              </MenuButtonComponent>,
            ]}
            <MenuCloseBtn onClick={handleCloseMenu}>&times;</MenuCloseBtn>
          </MenuBtnsWrapper>
          <MenuWrapperNarrow bed={menuItem > 0}>
            {typeof title === 'string' && (
              <MenuTitleP bed={menuItem > 0}>
                <MenuTitle left>
                  {title.indexOf('_') > -1 ? title.replace('_', ' ') : title}
                </MenuTitle>
              </MenuTitleP>
            )}
            <MenuWrapperFlex center={menuItem > 1 && !second}>
              {menuItems}
            </MenuWrapperFlex>
          </MenuWrapperNarrow>
        </MenuWrapper>
      </MenuWrapCont>
    </MenuCenter>
  );
}

function setMenuItems(
  items: any[],
  width: number,
  callback: (i: number) => void
): JSX.Element[] {
  const itemsResult: JSX.Element[] =
    items && items.length > 0
      ? items.map((item: any, i: number) => {
          let result: JSX.Element;
          let title: string = item.title
            ? item.title.indexOf('_') > -1
              ? item.title.replace('_', ' ')
              : item.title
            : '';

          if (item.color) {
            result = (
              <MenuItemWrap>
                <MenuItem
                  colorItem={true}
                  img={item.color}
                  key={i}
                  onClick={() => callback(i)}
                  width={width}
                />
                {title && <MenuTitle>{title}</MenuTitle>}
              </MenuItemWrap>
            );
          } else {
            result = (
              <MenuItemWrap>
                <MenuItem
                  img={item.thumb}
                  key={i}
                  onClick={() => callback(i)}
                  width={width}
                />
                {title && <MenuTitle>{title}</MenuTitle>}
              </MenuItemWrap>
            );
          }

          return result;
        })
      : null;

  return itemsResult;
}
