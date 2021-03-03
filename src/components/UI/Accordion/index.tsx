import * as React from 'react';
import { AccordionWrapper } from './styled';
import Item from './components/Item';

const { useEffect, useState, Fragment } = React;

type Props = {
  defaultActive?: number;
  data: {
    title: string;
    items: any[];
    handler?: (i: number) => void;
    horizontal?: boolean;
    secondData?: {
      title: string;
      items: any[];
      handler?: (i: number) => void;
      horizontal?: boolean;
    };
  }[];
};

const Accordion: (props: Props) => JSX.Element = ({ defaultActive, data }) => {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    setActive(defaultActive || 0);
  }, []);

  const handleSetActive: (n: number) => void = (n) => {
    setActive(n);
  };

  // let secondAccItems: JSX.Element[] | undefined;

  const accordionItems = data.map(
    ({ items, title, handler, horizontal, secondData }, i) => (
      <Item
        title={title}
        childItems={items}
        itemNumber={i}
        handleOnClick={handleSetActive}
        horizontal={horizontal}
        childHandler={handler}
        show={i === active}
        secondData={secondData}
      />
    )
  );

  return <AccordionWrapper>{accordionItems}</AccordionWrapper>;
};

export default Accordion;
