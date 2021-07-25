import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { t, Trans } from '@lingui/macro';
import { z } from 'zod';
import { isMobile } from 'react-device-detect';
import { useLocale, useScreeshot, useStore } from '../../hooks';
import Button from '../../components/Button';
import ButtonClose from '../../components/Button/ButtonClose';
import Checkbox from '../../components/Checkbox';
import Flex, { Gap } from '../../components/styled/Flex';
import Form from '../../components/Form';
import Hr from '../../components/styled/Hr';
import Input from '../../components/Input';
import Text from '../../components/styled/Text';
import { StyledImg, StyledSubmitWrapper, StyledWrapper } from './Summary.styled';
import * as data from '../../../assets/data.json';

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
  const history = useHistory();
  const locale = useLocale();
  const { screenshots, deleteScreenshots } = useScreeshot();
  const [state] = useStore();

  function handleSubmit(values: any): void {
    console.log('Submit');
    console.log(values);
  }

  function handleGoBack(): void {
    const path = '/';

    deleteScreenshots();
    history.push(path);
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

  const { bedIdx, headIdx, legIdx, legMatIdx, matIdx, tuftIdx } = state;

  return(
    <StyledWrapper>
      <Flex justifyContent="flex-end">
        <ButtonClose onClick={handleGoBack} />  
      </Flex>
      <Flex flexDirection={isMobile ? 'column-reverse' : 'row'}>
        <Flex grow={1} flexBasis={0} flexDirection="column">
          <Flex flexDirection="column" alignItems="center">
            {screenshots && screenshots.length > 0 && (screenshots.map((item) => {
              return (
                <StyledImg src={item} alt={t`Configured bed`} key={`img-${new Date().getTime()}`} />
              );
            }))}
          </Flex>
        </Flex>
        <Flex
          grow={1}
          flexBasis={0}
          flexDirection="column"
          gap={Gap.MD}
        >
          <h2>
            <Trans>Summary</Trans>
          </h2>
          <Hr />
          <h3>
            <Trans>Ordered Product</Trans>
          </h3>
          <Text>
            <Trans>Bed type: {data?.bed[bedIdx].title}</Trans>
          </Text>
          <Text>
            <Trans>Bed material type: {data?.textures.thumbnail.material[matIdx].title}</Trans>
          </Text>
          <Text>
            <Trans>Head type: {data?.head[headIdx as number].title}</Trans>
          </Text>
          <Text>
            <Trans>Stitching color type: {data?.textures.thumbnail.tuft[tuftIdx].title}</Trans>
          </Text>
          <Text>
            <Trans>Leg type: {data?.leg[legIdx]}</Trans>
          </Text>
          <Text>
            <Trans>Leg material type: {data?.textures.thumbnail.leg[legMatIdx].title[locale]}</Trans>
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
      </Flex>
    </StyledWrapper>
  );
}
