import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useFormContext, useController } from 'react-hook-form';
// import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import Flex, { Gap } from '../styled/Flex';
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
    <Flex flexDirection="row" gap={Gap.SM} alignItems="center">
      <input
        ref={field.ref}
        value={field.value}
        onChange={field.onChange}
        type="checkbox"
        {...rest}
      />
      <Flex flexDirection="column" gap={0} alignSelf="center">
        {label && (
          <p style={{margin: 0}}>{label}</p>
        )}
        <ErrorMessage name={name} />
      </Flex>
    </Flex>
  );
}

Checkbox.defaultProps = {
  rules: undefined,
  defaultValue: undefined,
  label: undefined,
};
