import * as React from 'react';
import { Button, ItemBtn, ItemContent, ItemImg, ItemWrapper } from './styled';

type Props = {
  childHandler?: (i: number) => void;
  childItems: { title: string; thumb?: string }[];
  itemNumber: number;
  handleOnClick: (i: number) => void;
  horizontal?: boolean;
  show: boolean;
  title: string;
};

const Item: (props: Props) => JSX.Element = ({
  childHandler,
  childItems,
  handleOnClick,
  horizontal,
  itemNumber,
  show,
  title,
}) => (
  <ItemWrapper key={`${title}-${itemNumber}`} show={show}>
    <Button
      onClick={() => handleOnClick(itemNumber)}
      show={show}
      horizontal={horizontal}
    >
      <p>
        <strong>{title}</strong>
      </p>
    </Button>
    <ItemContent show={show} horizontal={horizontal}>
      {childItems.map(({ title, thumb }, i) => {
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
            }}
          >
            <ItemImg src={thumb} />
            {parsedTitle}
          </ItemBtn>
        );
      })}
    </ItemContent>
  </ItemWrapper>
);

export default Item;
