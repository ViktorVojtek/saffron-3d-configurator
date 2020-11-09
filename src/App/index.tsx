import * as React from 'react';
import { useState } from 'react';
import { useEffect, Fragment } from 'react';
import { useStore } from '../utils/store';
import { useModels, handleScreenshots } from '../utils';
import { appWrapperId } from '../utils/constants';

import { AppWrapper, OrderBtn, EditBtn } from './styled';
import Menu from '../components/UI/Menu';
import Button from '../components/UI/Button';
import FSButton from '..//components/UI/FullScreenBtn';
import Loader from '../components/UI/Loader';
import Title from '../components/UI/Title';
import OrderForm from '../components/UI/OrderForm';

import initScene from './init';

export default function (): JSX.Element {
  const [edit, toggleEdit] = useState(false);
  const [title, setTitle] = useState('');
  const { state, dispatch } = useStore();
  const {
    menuItem,
    menuItems,
    objIdx,
    showMenu,
    showForm,
    models,
    progress,
    orderImages,
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
  useModels(models, objIdx, tuftIdx, edit, menuItem);

  const handleToggleForm: () => void = () => {
    dispatch({ type: 'TOGGLE_FORM', payload: true });
    handleScreenshots();
  };

  const handleToggleEdit: () => void = () => {
    toggleEdit(!edit);
  };

  const { search } = window.location;

  return (
    <AppWrapper id={appWrapperId}>
      {loaded ? (
        <Fragment>
          <Title title={models[objIdx].title} />
          {objIdx > 0 && search.length === 0 && <Button />}
          {objIdx < models.length - 1 && search.length === 0 && (
            <Button direction='right' />
          )}
          <EditBtn style={{ left: '50%!important' }} onClick={handleToggleEdit}>
            Úpravy
          </EditBtn>
          <OrderBtn onClick={handleToggleForm}>Dopyt</OrderBtn>
          <OrderForm
            show={showForm}
            data={models[objIdx]}
            images={orderImages}
          />
          {!showForm && <FSButton />}
        </Fragment>
      ) : null}
      <Loader
        show={progress < 100}
        progress={progress}
        label={loadingContent}
      />
      {!showForm && (
        <Menu
          show={showMenu}
          items={menuItems}
          second={tufts}
          title={title ? title : false}
        />
      )}
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
