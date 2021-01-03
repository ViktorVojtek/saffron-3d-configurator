import * as React from 'react';
import { AccordionWrapper } from './styled';
import Item from './components/Item';

const { useEffect, useState } = React;

type Props = {
  defaultActive?: number;
  data: {
    title: string;
    items: any[];
    handler?: (i: number) => void;
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

  const accordions = data.map(({ items, title, handler }, i) => (
    <Item
      title={title}
      childItems={items}
      itemNumber={i}
      handleOnClick={handleSetActive}
      childHandler={handler}
      show={i === active}
    />
  ));

  return <AccordionWrapper>{accordions}</AccordionWrapper>;
};

export default Accordion;
