import * as React from 'react';
import {
  Button,
  ContainerForSecond,
  CarouselNav,
  CarouselNavBtn,
  CarouselWrapper,
  CheckMark,
  ItemColor,
  ItemBtn,
  ItemContent,
  ItemImg,
  ItemWrapper,
  ItemSpanTitle,
  ItemSpanDesc,
} from './styled';

type Props = {
  childHandler?: (i: number) => void;
  childItems: {
    color?: string;
    description?: string;
    title: string;
    thumb?: string;
  }[];
  itemNumber: number;
  handleOnClick: (i: number) => void;
  horizontal?: boolean;
  show: boolean;
  title: string;
  secondData?: {
    title: string;
    items: any[];
    handler?: (i: number) => void;
    horizontal?: boolean;
  };
};

type CarouselProps = {
  show: boolean;
  height?: boolean;
  horizontal?: boolean;
  items?: any;
  childHandler?: (i: number) => void;
};

function Carousel(props: CarouselProps) {
  const containerRef = React.useRef(null);
  const { show, height, horizontal, items, childHandler } = props;

  const [state, setState] = React.useState({
    scroller: null,
    itemWidth: 0,
    isPrevHidden: false,
    isNextHidden: false,
    selected: 0,
  });

  React.useEffect(() => {
    const scroller = containerRef.current;
    const itemWidth = containerRef.current.firstElementChild.clientWidth;

    scroller.scroll({
      left: state.itemWidth * state.selected,
      top: 0,
      behavior: 'smooth',
    });

    setState({ ...state, scroller, itemWidth });

    return () => {};
  }, [show, state.itemWidth]);

  const next = () => {
    state.scroller.scrollBy({
      left: state.itemWidth * 1,
      top: 0,
      behavior: 'smooth',
    });
  };

  const prev = () => {
    state.scroller.scrollBy({
      left: -state.itemWidth * 1,
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleSelect: (n: number) => void = (n) => {
    setState({
      ...state,
      selected: n,
    });
  };

  return (
    <CarouselWrapper show={show} second moreHeight={height}>
      <ItemContent show={show} horizontal={horizontal} ref={containerRef}>
        {items.map(({ color, description, title, thumb }, i: number) => {
          let parsedTitle = title;

          if (title.indexOf('_') > -1) {
            parsedTitle = title.replace('_', ' ');
          }

          // ItemBtn
          return (
            <ItemBtn
              onClick={() => {
                if (typeof childHandler === 'function') {
                  childHandler(i);
                }
                handleSelect(i);
              }}
            >
              <CheckMark selected={state.selected === i}>
                <ItemSpanTitle>{parsedTitle}</ItemSpanTitle>
                {color ? (
                  <ItemColor color={color} />
                ) : (
                  <ItemImg src={thumb} single={description === undefined} />
                )}
                {description && <ItemSpanDesc>{description}</ItemSpanDesc>}
              </CheckMark>
            </ItemBtn>
          );
        })}
      </ItemContent>
      <CarouselNav>
        <CarouselNavBtn
          left
          className="btn prev"
          onClick={() => prev()}
          hidden={state.isPrevHidden}
        >
          &lt;
        </CarouselNavBtn>
        <CarouselNavBtn
          className="btn next"
          onClick={() => next()}
          hidden={state.isNextHidden}
        >
          &gt;
        </CarouselNavBtn>
      </CarouselNav>
    </CarouselWrapper>
  );
}

const Item: (props: Props) => JSX.Element = ({
  childHandler,
  childItems,
  handleOnClick,
  horizontal,
  itemNumber,
  show,
  title,
  secondData,
}) => {
  return (
    <ItemWrapper key={`${title}-${itemNumber}`} show={show}>
      <Button
        onClick={() => handleOnClick(itemNumber)}
        show={show}
        horizontal={horizontal}
      >
        <strong>{title}</strong>
      </Button>
      {secondData ? (
        <ContainerForSecond
          show={show}
          second={secondData !== undefined}
          moreHeight={secondData !== undefined}
        >
          <Carousel
            items={childItems}
            show={show}
            height
            childHandler={childHandler}
          />
          {''}
          {secondData && (
            <React.Fragment>
              <h5>{` ${secondData.title}`}</h5>
              <Carousel
                show={show}
                horizontal={horizontal}
                items={secondData.items}
                childHandler={secondData.handler}
              />
            </React.Fragment>
          )}
        </ContainerForSecond>
      ) : (
        <Carousel
          show={show}
          horizontal={horizontal}
          items={childItems}
          childHandler={childHandler}
        />
      )}
    </ItemWrapper>
  );
};

export default Item;
