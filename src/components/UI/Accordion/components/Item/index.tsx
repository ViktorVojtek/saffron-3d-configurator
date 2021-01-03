import * as React from 'react';
import { Button, ItemBtn, ItemContent, ItemWrapper } from './styled';

type Props = {
  childHandler?: (i: number) => void;
  childItems: { title: string }[];
  itemNumber: number;
  handleOnClick: (i: number) => void;
  show: boolean;
  title: string;
};

const Item: (props: Props) => JSX.Element = ({
  childHandler,
  childItems,
  handleOnClick,
  itemNumber,
  show,
  title,
}) => (
  <ItemWrapper key={`${title}-${itemNumber}`} show={show}>
    <Button onClick={() => handleOnClick(itemNumber)} show={show}>
      <h5>{title}</h5>
    </Button>
    <ItemContent show={show}>
      {childItems.map(({ title }, i) => {
        let parsedTitle = title;

        if (title.indexOf('_') > -1) {
          parsedTitle = title.replace('_', ' ');
        }

        return (
          <ItemBtn
            onClick={() => {
              if (typeof childHandler === 'function') {
                childHandler(i);
              }
            }}
          >
            {parsedTitle}
          </ItemBtn>
        );
      })}
    </ItemContent>
  </ItemWrapper>
);

export default Item;
