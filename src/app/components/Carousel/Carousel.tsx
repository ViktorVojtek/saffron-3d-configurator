import React, { memo, useRef, useState, useEffect } from 'react';
import {
  StyledControllWrapper,
  StyledWrapper,
  StyledImage,
  StyledItem,
  StyledItemWrapper,
  StyledH3,
  StyledP,
  StyledContainer,
  StyledControllButton
} from './Carousel.styled';

export type Data = {
  description?: string;
  image: string;
  title: string;
};

type Direction = 'left' | 'right';

type Props = {
  data: Data[];
  onItemPress: (i: number) => void;
  selected: number;
  visible?: boolean;
};

function Carousel(props: Props) {
  const { data, onItemPress, selected, visible } = props;

  const [active, _setActive] = useState(selected || 0);
  const [direction, _setDirection] = useState<Direction>('right');

  const container = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(active);
  const directionRef = useRef(direction);

  function setActive(stateData: number): void {
    activeRef.current = stateData;

    _setActive(stateData);
  }

  function setDirection(stateData: Direction): void {
    directionRef.current = stateData;

    _setDirection(stateData);
  }

  useEffect(() => {
    if (!visible) {
      return;
    }

    container.current?.scroll({
      left: container.current?.getBoundingClientRect().width * selected,
      top: 0,
      behavior: 'smooth'
    });

    setActive(selected);
  }, [visible]);

  function handleScrollBy(_direction: Direction): void {
    const carousel = container.current;
    const item = carousel?.children[selected] as HTMLDivElement;
    const style = (item as any)?.currentStyle || window?.getComputedStyle(item);

    const itemWidth = item.getBoundingClientRect().width;
    const margin = parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    const border = parseFloat(style.borderLeft) + parseFloat(style.borderRight);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const negative = _direction === 'left' ? -1 : 1;

    const left = ((itemWidth + margin - border - padding) + 1) * negative;
 
    carousel?.scrollBy({
      left,
      top: 0,
      behavior: 'smooth',
    });

    setDirection(_direction);
    setActive(active + negative);
  }

  function handleScrollLeft(): void {
    handleScrollBy('left');
  }

  function handleScrollRight(): void {
    handleScrollBy('right');
  }

  function handleOnItemClick(n: number): void {
    onItemPress(n);
  }

  return (
    <StyledWrapper>
      <StyledContainer ref={container}>
        {data.map((item, i) => {
          const { description, image, title } = item;

          return (
            <StyledItemWrapper key={`${title}-${i}`}>
              <StyledItem
                onClick={() => handleOnItemClick(i)}
                selected={i === selected}
              >
                <StyledImage src={image} alt={title} />
                <StyledH3>{title}</StyledH3>
                {description && (<StyledP>{description}</StyledP>)}
              </StyledItem>
            </StyledItemWrapper>
          );
        })}
      </StyledContainer>
      <StyledControllWrapper>
        {active > 0 && (
          <StyledControllButton left onClick={handleScrollLeft}>&lt;</StyledControllButton>
        )}
        {active < data.length - 1 && (
          <StyledControllButton onClick={handleScrollRight}>&gt;</StyledControllButton>
        )}
      </StyledControllWrapper>
    </StyledWrapper>
  );
}

Carousel.defaultProps = {
  visible: false
};

export default memo(Carousel);
