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
  changeLegMaterial,
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

export default function Main(): JSX.Element {
  // const [edit, toggleEdit] = useState(false);
  const [title, setTitle] = useState('');
  const { state, dispatch } = useStore();

  // console.log(state);

  const {
    menuItem,
    menuItems,
    objIdx,
    // showMenu,
    showForm,
    models,
    progress,
    // orderImages,
    loaded,
    loadingContent,
    tuftIdx,
    legIdx,
    legIsSet,
    headIsSet,
    // tufts,
  } = state;

  // Set initial scene
  useEffect(() => initScene(), []);

  // Set title for menu
  useMenuTitle(menuItem, setTitle);

  // Load 3D model according to objIdx
  useModels(models, objIdx, tuftIdx, legIdx, false, menuItem);

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
      const { title, thumb, description } = bed;
      return { description, title, thumb };
    });
    const materialsData = data[i].matThumbs;
    const tuftData = data[i].tufThumbs;
    const legsData = data[i].legThumbs;

    const returnData = [
      {
        title: 'Model',
        items: bedsData,
        handler: (n: number) => {
          // dispatch({ type: 'SET_MAT_IDX', payload: 0 });
          dispatch({ type: 'SET_OBJ_IDX', payload: n });

          if (n > 0) {
            if (legIdx === 1) {
              dispatch({ type: 'SET_LEG_IDX', payload: 0 });
            }
            if (legIdx === 2) {
              dispatch({ type: 'SET_LEG_IDX', payload: 1 });
            }
          }
          // dispatch({ type: 'SET_LEG_IDX', payload: 0 });
        },
        horizontal: true,
      },
      {
        title: 'Čelo',
        items: headsData,
        handler: (n: number) => {
          changeHead(headsData, n);
          if (!headIsSet) {
            dispatch({ type: 'SET_HEAD_ISSET' });
          }
          console.log('GOING TO SET HEAD TO: ', headsData[n].title);
          dispatch({ type: 'SET_HEAD_TITLE', payload: headsData[n].title });
          dispatch({ type: 'SET_HEAD_IDX', payload: n });
        },
        horizontal: true,
      },
      {
        title: 'Poťah',
        items: materialsData,
        handler: (n: number) => {
          changeBedMaterial(n);
          dispatch({ type: 'SET_MAT_IDX', payload: n });
          dispatch({
            type: 'SET_MAT_TITLE',
            payload: models[objIdx].matThumbs[n].title,
          });
          console.log('MATERIAL: ', models[objIdx].matThumbs[n].title);
        },
        horizontal: true,
      },
      {
        title: 'Prešitie matraca',
        items: tuftData,
        handler: (n: number) => {
          changeBedMaterial(n, true);
          dispatch({ type: 'SET_TUFT_IDX', payload: n });
        },
        horizontal: true,
      },
      {
        title: 'Nohy',
        items: legsData,
        handler: (n: number) => {
          changeLeg(legsData, n);
          if (!legIsSet) {
            dispatch({ type: 'SET_LEG_ISSET' });
          }
          dispatch({ type: 'SET_LEG_IDX', payload: n });
          dispatch({ type: 'SET_LEG_TITLE', payload: legsData[n].title });
        },
        horizontal: true,
        secondData: {
          title: 'Materiály nôh',
          items: data[i].textures.leg[legIdx].thumbs,
          handler: (n: number) => {
            changeLegMaterial(n);
            dispatch({ type: 'SET_LEG_MAT_IDX', payload: n });
          },
          horizontal: true,
        },
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
      {loaded && menuData && menuData.length > 0 && <Menu items={menuData} />}
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
      <CanvasWrapper
        id={canvasWrapperId}
        style={
          loaded && menuData && menuData.length > 0
            ? { height: '100vh!important' }
            : {}
        }
      >
        {loaded && (
          <Fragment>
            <Title title={models[objIdx].title} />
            <Link to="/order">
              <OrderBtn onClick={handleToggleForm}>Zhrnutie</OrderBtn>
            </Link>
            {!showForm && <FSButton />}
          </Fragment>
        )}
      </CanvasWrapper>
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
