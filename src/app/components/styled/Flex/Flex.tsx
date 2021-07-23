import React, { ReactNode, Children, Fragment } from 'react';
import styled from 'styled-components';
import { getRemUnit } from '../../../utils';
import { space } from '../../../constants';

export enum Gap {
  XXXS = 'xxxs',
  XXS = 'xxs',
  XS = 'xs',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
  XXL = 'xxl',
  XXXL = 'xxxl',
}

function getGap(gap?: Gap): string {
  switch (gap) {
    case Gap.XXXS:
      return space.spaceXXXSmall;
    case Gap.XXS:
      return space.spaceXXSmall;
    case Gap.XS:
      return space.spaceXSmall;
    case Gap.SM:
      return space.spaceSmall;
    case Gap.MD:
      return space.spaceMedium;
    case Gap.LG:
      return space.spaceLarge;
    case Gap.XL:
      return space.spaceXLarge;
    case Gap.XXL:
      return space.spaceXXLarge;
    case Gap.XXXL:
      return space.spaceXXXLarge;
    default:
      return space.spaceSmall;
  }
}

function prepareGap(gap: Gap | number) {
  if (typeof gap === 'number') {
    return getRemUnit(gap);
  }

  return getGap(gap);
}

type Props = {
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'normal'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  alignSelf?: 
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  flexBasis?: string | number;
  flexShrink?: string | number;
  grow?: number;
  children?: ReactNode;
  gap?: Gap | number;
};

const StyledFlex = styled.div<Props>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  flex-direction: ${({ flexDirection }) => flexDirection};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  align-self: ${({ alignSelf }) => alignSelf};
  flex-wrap: ${({ wrap }) => wrap};
  flex-grow: ${({ grow }) => grow};
`;

type GapProps = Pick<Props, 'gap' | 'flexDirection'> & {
  isLast?: boolean;
};

const StyledGap = styled.div<GapProps>`
  height: ${({ gap, isLast, flexDirection }) =>
    isLast || flexDirection === 'row'
      ? '0'
      : prepareGap(gap as Gap | number)};
  width: ${({ gap, isLast, flexDirection }) =>
    isLast || flexDirection === 'column'
      ? '0'
      : prepareGap(gap as Gap | number)};
`;

export default function Flex(props: Props) {
  const {
    justifyContent,
    alignItems,
    alignContent,
    alignSelf,
    flexDirection,
    gap,
    wrap,
    grow,
    children,
    flexShrink,
    ...rest
  } = props;

  const visibleChildren = Children
    .toArray(children)
    .filter((child) => !!child);

  const total = visibleChildren.length;

  return (
    <StyledFlex
      alignItems={alignItems}
      alignContent={alignContent}
      alignSelf={alignSelf}
      justifyContent={justifyContent}
      flexDirection={flexDirection}
      flexShrink={flexShrink}
      wrap={wrap}
      grow={grow}
      {...rest}
    >
      {visibleChildren.map((child, i) => (
        <Fragment key={`${i}-fragment`}>
          {child}
          {child && gap && i < total - 1 ? (
            <StyledGap gap={gap} flexDirection={flexDirection} />
          ) : null}
        </Fragment>
      ))}
    </StyledFlex>
  );
}

Flex.defaultProps = {
  alignItems: 'stretch',
  alignContent: 'stretch',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignSelf: 'auto',
  wrap: 'nowrap',
  gap: 0,
  grow: 0,
  children: undefined,
  flexBasis: 'auto',
  flexShrink: 1,
};
