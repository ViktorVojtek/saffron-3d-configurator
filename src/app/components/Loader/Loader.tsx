import React, { useRef, ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import useRadians from '../../hooks/useRadians';
import { StyledCircle, StyledWrapper } from './Loader.styled';
// import LoaderSVGIcon from './LoaderSVGIcon';
import Text from '../styled/Text';

type Props = {
  children?: ReactNode;
  progress?: number;
}

export default function Loader(props: Props): JSX.Element {
  const { children, progress } = props;
  const circleRef = useRef(null);
  const [circumference, offset] = useRadians(progress as number, circleRef);

  return (
    <StyledWrapper>
      <svg width='100' height='100'>
        <StyledCircle
          ref={circleRef}
          fill='transparent'
          r='40'
          cx='50'
          cy='50'
          circumference={circumference}
          offset={offset}
        />
      </svg>
      {children ? (
        children
      ) : (
        <Text><Trans>Loading</Trans></Text>
      )}
    </StyledWrapper>
  );
}

Loader.defaultProps = {
  progress: 99
};