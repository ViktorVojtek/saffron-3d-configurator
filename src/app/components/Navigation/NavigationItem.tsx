import React from 'react';

import { StyledAccordionItem } from './Navigation.styled';

type Props = {
  active?: boolean;
  children: JSX.Element;
};

export default function NavigationItem(props: Props): JSX.Element {
  const { active, children } = props;

  return (
    <StyledAccordionItem active={active}>
      {children}
    </StyledAccordionItem>
  );
}

NavigationItem.defaultProps = {
  active: false
};
