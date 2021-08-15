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
  const [isLoading, loading] = useLoading();
  const [navdata, setData] = useNavData();
  const [active, setActive] = useNavigation();

  useEffect(() => {
    setData(data, locale);
  }, []);

  const navigation = navdata?.map((item, i) => {
    if(!item) {
      return null;
    }

    function getIdx(): number {
      switch(item.action as ActionType) {
        case 'BED_IDX':
          return bedIdx;
        case 'HEAD_IDX':
          return headIdx || data.headDefault[bedIdx].value;
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

    const idx = getIdx();

    function onClick(n: number): void {
      const m = item.action === 'LEG_IDX' ? (bedIdx === 0 ? n : n + 1) : n;

      if (idx === m || isLoading) {
        return;
      }

      loading(true);
      
      if (item.action === 'BED_IDX' && m > 0 && legIdx === 0) {
        dispatch({ type: 'LEG_IDX', payload: 1 });
      }

      dispatch({ type: item.action, payload: m });
    }

    function handleOnButtonPress(n: number): void {
      if (active === n) {
        return;
      }

      setActive(n);
    }

    const selected = (
      item.action === 'LEG_IDX'
        ? (
          bedIdx !== 0 && idx > 1
          ? idx - 1
          : (bedIdx !== 0 && legIdx === 1 ? 0 : legIdx)
        )
        : idx
    );

    return (
      <StyledLi active={active === i} key={item.title.toLowerCase()}>
        <StyledButton active={active === i} onClick={() => handleOnButtonPress(i)}>{item.title}</StyledButton>
        <NavigationItem active={active === i}>
          <Carousel
            data={item.data}
            onItemPress={onClick}
            selected={selected} // idx
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
