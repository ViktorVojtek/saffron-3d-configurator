import React, { useEffect } from 'react';
import { isMobileOnly } from 'react-device-detect';
import { ActionType } from '../../@types';
import {
  useLoading,
  useLocale,
  useNavData,
  useNavigation,
  useStore
} from '../../hooks';
import Carousel from '../Carousel';
import NavigationItem from './NavigationItem';
import {
  StyledWrapper, StyledUl, StyledLi, StyledButton
} from './Navigation.styled';

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
  const [_isLoading, loading] = useLoading();
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
      switch(item.action as ActionType) {
        case 'BED_IDX':
          return bedIdx;
        case 'HEAD_IDX':
          return headIdx || 0;
        case 'MAT_IDX':
          return matIdx;
        case 'TUFT_IDX':
          return tuftIdx;
        case 'LEG_IDX':
          return legIdx;
        case 'LEG_MAT_IDX':
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
    <StyledWrapper border={!isMobileOnly}>
      <StyledUl>
        {navigation}
      </StyledUl>
    </StyledWrapper>
  );
}

export default Navigation;
