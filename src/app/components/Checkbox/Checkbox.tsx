import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useFormContext, useController } from 'react-hook-form';
// import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
// import Flex, { Gap } from '../styled/Flex';
import { Row, Col } from 'react-awesome-styled-grid';
import Text from '../styled/Text';
import ErrorMessage from '../ErrorMessage';

type CheckboProps = ComponentPropsWithoutRef<'input'> & {
  name: string;
  defaultValue?: string;
  rules?: Object;
  label?: ReactNode;
};

export default function Checkbox(props: CheckboProps) {
  const { name, rules, defaultValue, label, ...rest } = props;
  const { control } = useFormContext();
  const { field } = useController({
    name,
    control,
    defaultValue,
  });

  return (
    <Row justify="start">
      <Col xs={1} sm={1} md={1} lg={1}>
        <input
          ref={field.ref}
          value={field.value}
          onChange={field.onChange}
          type="checkbox"
          {...rest}
        />
      </Col>
      {label && (
        <Col>
          <Text>{label}</Text>
          <ErrorMessage message={name} />
        </Col>
      )}  
    </Row>
  );
}

Checkbox.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  label: undefined,
};
