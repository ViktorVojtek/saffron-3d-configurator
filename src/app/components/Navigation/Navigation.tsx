import React, { useEffect } from 'react';
import Carousel from '../Carousel';
import {
  StyledWrapper, StyledUl, StyledLi, StyledButton
} from './Navigation.styled';
import { useIsLoading, useLocale, useNavData, useNavigation, useStore } from '../../hooks';
import { ActionEnumType } from '../../@types';
import NavigationItem from './NavigationItem';

interface keyable {
  [key: string]: any  
}

type Props = {
  data: keyable;
};

function Navigation(props: Props): JSX.Element {
  const { data } = props;
  const [{ bedIdx, headIdx, matIdx, legIdx, legMatIdx, tuftIdx }, dispatch] = useStore();
  const locale = useLocale();
  const [_isLoading, loading] = useIsLoading();
  const [navdata, setData] = useNavData();
  const [active, setActive] = useNavigation();

  useEffect(() => {
    setData(data, locale);
  }, []);

  const navigation = navdata?.map((item, i) => {
    if(!item) {
      return null;
    }

    const idx = getIdx();

    function getIdx(): number {
      switch(item.action) {
        case ActionEnumType.BED_IDX:
          return bedIdx;
        case ActionEnumType.HEAD_IDX:
          return headIdx || 0;
        case ActionEnumType.MAT_IDX:
          return matIdx;
        case ActionEnumType.TUFT_IDX:
          return tuftIdx;
        case ActionEnumType.LEG_IDX:
          return legIdx;
        case ActionEnumType.LEG_MAT_IDX:
          return legMatIdx;
        default:
          return 0;
      }
    }

    function onClick(n: number): void {
      if (idx === n) {
        return;
      }

      loading(true);
      dispatch({ type: item.action, payload: n });
    }

    function handleOnButtonPress(n: number): void {
      if (active === n) {
        return;
      }

      setActive(n);
    }

    return (
      <StyledLi active={active === i} key={item.title.toLowerCase()}>
        <StyledButton active={active === i} onClick={() => handleOnButtonPress(i)}>{item.title}</StyledButton>
        <NavigationItem active={active === i}>
          <Carousel
            data={item.data}
            onItemPress={onClick}
            selected={idx}
            visible={active === i}
          />
        </NavigationItem>
      </StyledLi>
    );
  });

  return (
    <StyledWrapper>
      <StyledUl>
        {navigation}
      </StyledUl>
    </StyledWrapper>
  );
}

export default Navigation;
