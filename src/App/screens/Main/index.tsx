import * as React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect, Fragment } from 'react';
import { useStore } from '../../../utils/store';
import {
  changeBedMaterial,
  changeHead,
  useModels,
  changeLeg,
  handleScreenshots,
} from '../../../utils';
// import { useSaffronData } from '../utils/fn/hooks';
import { appWrapperId, canvasWrapperId } from '../../../utils/constants';

import { AppWrapper, CanvasWrapper, OrderBtn } from './styled';
// import OldMenu from '../../../components/UI/_old_Menu';

import Menu from '../../../components/UI/Menu';

// import Button from '../components/UI/Button';
import FSButton from '../../../components/UI/FullScreenBtn';
import Loader from '../../../components/UI/Loader';
import Title from '../../../components/UI/Title';
// import OrderForm from '../../../components/UI/OrderForm';

import initScene from './init';

export default function (): JSX.Element {
  // const [edit, toggleEdit] = useState(false);
  const [title, setTitle] = useState('');
  const { state, dispatch } = useStore();

  // console.log(state);

  const {
    menuItem,
    menuItems,
    objIdx,
    showMenu,
    showForm,
    models,
    progress,
    // orderImages,
    loaded,
    loadingContent,
    tuftIdx,
    tufts,
  } = state;

  // Set initial scene
  useEffect(() => initScene(), []);

  // Set title for menu
  useMenuTitle(menuItem, setTitle);

  // Load 3D model according to objIdx
  useModels(models, objIdx, tuftIdx, false, menuItem);

  const handleToggleForm: () => void = () => {
    dispatch({ type: 'TOGGLE_FORM', payload: true });
    handleScreenshots();
  };

  /* const handleToggleEdit: () => void = () => {
    toggleEdit(!edit);
  }; */

  const handleSetMenu = (data: any, i: number) => {
    const headsData = data[i].headThumbs;
    const bedsData = data.map((bed) => {
      const { title } = bed;
      return { title };
    });
    const materialsData = data[i].matThumbs;
    const tuftData = data[i].textures.tuft;
    const legsData = data[i].legThumbs;

    const returnData = [
      {
        title: 'Postel',
        items: bedsData,
        handler: (n: number) => {
          dispatch({ type: 'SET_OBJ_IDX', payload: n });
        },
        horizontal: true,
      },
      {
        title: 'Čelo',
        items: headsData,
        handler: (n: number) => {
          changeHead(headsData, n);
        },
        horizontal: true,
      },
      {
        title: 'Poťah',
        items: materialsData,
        handler: (n: number) => {
          changeBedMaterial(n);
        },
        horizontal: true,
      },
      {
        title: 'Prešitie matraca',
        items: tuftData,
        handler: (n: number) => {
          changeBedMaterial(n, true);
        },
        horizontal: true,
      },
      {
        title: 'Nohy',
        items: legsData,
        handler: (n: number) => {
          changeLeg(legsData, n);
        },
        horizontal: true,
      },
    ];

    return returnData;
  };

  // const { search } = window.location;

  // console.log(models);
  /* const computedHeadsItems = models[objIdx || 0]?.headThumbs?.map(
    (cMenuItem, i) => {
      const { thumb, title } = cMenuItem;

      return {
        title,
        thumb,
      };
    }
  ); */
  let menuData = [];

  if (models && models.length > 0) {
    menuData = handleSetMenu(models, objIdx);

    // console.log(menuData);
  }

  return (
    <AppWrapper id={appWrapperId}>
      {loaded ? (
        <Fragment>
          {menuData && menuData.length > 0 && <Menu items={menuData} />}
          <Title title={models[objIdx].title} />
          <Link to='/order'>
            <OrderBtn onClick={handleToggleForm}>Dopyt</OrderBtn>
          </Link>
          {!showForm && <FSButton />}
        </Fragment>
      ) : null}
      <Loader
        show={progress < 100}
        progress={progress}
        label={loadingContent}
      />
      {/* !showForm && (
        <OldMenu
          show={showMenu}
          items={menuItems}
          second={tufts}
          title={title ? title : false}
        />
      ) */}
      <CanvasWrapper id={canvasWrapperId} />
    </AppWrapper>
  );
}

function useMenuTitle(
  num: number,
  dispatch: React.Dispatch<React.SetStateAction<string>>
): void {
  useEffect(() => {
    if (num > 0) {
      if (num > 1) {
        dispatch('Nôžky');
      } else {
        dispatch('Čelá');
      }
    } else {
      dispatch('Materiály postele');
    }
  }, [num]);
}
