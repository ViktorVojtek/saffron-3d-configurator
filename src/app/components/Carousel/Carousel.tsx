import React, { memo, useRef, useState, useEffect } from 'react';
import {
  StyledControllWrapper,
  StyledWrapper,
  StyledImage,
  StyledItem,
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

type Props = {
  data: Data[];
  onItemPress: (i: number) => void;
  selected: number;
};

function Carousel(props: Props) {
  const { data, onItemPress, selected } = props;
  const container = useRef<HTMLDivElement | null>(null);

  const [active, _setActive] = useState(0);
  const [attitude, _setAttitude] = useState(0);

  const activeRef = useRef(active);
  const attitudeRef = useRef(attitude);
  const requestRef = useRef(0);

  const setActive = (stateData: number) => {
    activeRef.current = stateData;

    _setActive(stateData);
  };
  const setAttitude = (stateData: number) => {
    attitudeRef.current = stateData;

    _setAttitude(stateData);
  };

  useEffect(() => {
    function checkScrollEnd() {
      const x = container.current?.getBoundingClientRect().left as number;

      if ((container.current?.scrollLeft as number) < x) {
        requestRef.current = window.requestAnimationFrame(checkScrollEnd);
      } else {
        // console.log('End of scroll');
        // console.log(container.current?.scrollLeft);
      }
    }

    requestRef.current = window.requestAnimationFrame(checkScrollEnd);

    return () => {
      window.cancelAnimationFrame(requestRef.current);
    }
  }, []);

  useEffect(() => {
    container?.current?.scroll({
      left: container?.current?.offsetWidth * selected,
      top: 0,
      behavior: 'smooth'
    });
  }, [selected]);

  function handleScrollBy(direction?: 'left' | 'right'): void {
    const carousel = container.current;
    const attitude = direction === 'left' ? -1 : 1;
    setAttitude(attitude);

    const left: number = (carousel?.children[selected]?.clientWidth as number) * attitude;

    carousel?.scrollBy({
      left,
      top: 0,
      behavior: 'smooth',
    });

    if (selected > 0 || selected < data.length - 1) {
      setActive((direction === 'left' ? active - 1 : active + 1));
    }
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

  // console.log(selected);

  return (
    <StyledWrapper>
      <StyledContainer ref={container}>
        {data.map((item, i) => {
          const { description, image, title } = item;

          return (
            <StyledItem
              onClick={() => handleOnItemClick(i)}
              key={title}
              selected={i === selected}
            >
              <StyledImage src={image} alt={title} />
              <StyledH3>{title}</StyledH3>
              {description && (<StyledP>{description}</StyledP>)}
            </StyledItem>
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

export default memo(Carousel);
