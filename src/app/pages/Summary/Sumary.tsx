import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { t, Trans } from '@lingui/macro';
import { z } from 'zod';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Flex, { Gap } from '../../components/styled/Flex';
import Form from '../../components/Form';
import Hr from '../../components/styled/Hr';
import Input from '../../components/Input';
import Text from '../../components/styled/Text';
import { StyledSubmitWrapper, StyledWrapper } from './Summary.styled';


const schema = z.object({
  name: z.string().nonempty({ message: t`What's your name?` }),
  surname: z.string().nonempty({ message: t`What's your surname?` }),
  email: z.string().email({ message: t`Email is required` }),
  phone: z.optional(z.string()),
  message: z.optional(z.string()),
  consent: z.boolean().refine((value) => !!value, {
    message: t`Must consent the processing of, personal data`
  }),
  dealer: z.boolean(),
});

type FormData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
  consentAccepted: boolean;
  dealerAccepted: boolean;
}

export default function Summary(): JSX.Element {
  function handleSubmit(values: any): void {
    console.log('Submit');
    console.log(values);
  }

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      message: '',
      consentAccepted: false,
      dealerAccepted: false
    },
  });

  return(
    <StyledWrapper>
      <Flex grow={1}></Flex>
      <Flex grow={1} flexDirection="column" gap={Gap.MD}>
        <h2>
          <Trans>Summary</Trans>
        </h2>
        <Hr />
        <h3>
          <Trans>Ordered Product:</Trans>
        </h3>
        <Text>
          <Trans>Bed type:</Trans>
        </Text>
        <Text>
          <Trans>Bed material type:</Trans>
        </Text>
        <Text>
          <Trans>Head type:</Trans>
        </Text>
        <Text>
          <Trans>Stitching color type:</Trans>
        </Text>
        <Text>
          <Trans>Leg type:</Trans>
        </Text>
        <Text>
          <Trans>Leg material type:</Trans>
        </Text>

        <Hr />

        <Form methods={methods} onSubmit={handleSubmit}>
          <Flex gap={Gap.MD} flexDirection="column">
            <Flex gap={Gap.SM} flexDirection="column">
              <Input
                name="name"
                placeholder={t`Fill in your name`}
              />
              <Input
                name="surname"
                placeholder={t`Fill in your surname`}
              />
              <Input
                name="email"
                placeholder={t`Fill in your surname`}
              />
              <Input
                name="phone"
                placeholder={t`Fill in your phone number`}
              />
              <Input
                name="message"
                multiline
                placeholder={t`Fill in your message`}
              />

              <Checkbox
                name="consentAccepted"
                label={<Trans>I consent to the processing of personal data.</Trans>}
              />
              <Checkbox
                name="dealerAccepted"
                label={<Trans>I want a Saffron dealer to contact me.</Trans>}
              />
            </Flex>
            <Flex flexDirection="row">
              <StyledSubmitWrapper>
                <Button type="submit">
                  <Trans>Send summary</Trans>
                </Button>
              </StyledSubmitWrapper>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </StyledWrapper>
  );
}
