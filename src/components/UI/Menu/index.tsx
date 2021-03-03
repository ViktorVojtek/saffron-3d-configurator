import * as React from 'react';
import { MenuWrapper, MenuToggleBtn } from './styled';
import Accordion from '../Accordion';

const { useState } = React;

type Props = {
  items: any[];
};

const Menu: ({ items }: Props) => JSX.Element = ({ items }) => {
  const [show, toggle] = useState(false);

  const handleToggle = () => {
    // console.log('clicked');
    toggle(!show);
  };

  return (
    <MenuWrapper show>
      {/* <MenuToggleBtn onClick={handleToggle} show={show} /> */}
      <Accordion defaultActive={0} data={items} />
    </MenuWrapper>
  );
};

export default Menu;
