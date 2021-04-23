import * as React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../../utils/store';
// import { domainUri } from '../../../utils/constants';
import {
  // Container,
  CloseBtn,
  Form,
  FormControl,
  H2,
  H3,
  HR,
  Input,
  Img,
  ImagesContainer,
  P,
  SubmitBtn,
  TextArea,
  Wrapper,
} from './styled';
import TextInput from './TextInput';

const { Fragment, useState } = React;

export default function ({
  show,
  data,
  images,
}: {
  show: boolean;
  data: any;
  images: string[];
}): JSX.Element {
  const {
    dispatch,
    state: { headTitle, legMatTitle, legTitle, matTitle, tuftTitle },
  } = useStore();
  const [state, setState] = useState({
    formData: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: '',
    },
    seller: false,
    gdpr: false,
  });
  const htmlTimes = '&times;';

  /* const handleCloseOrderForm = () => {
    dispatch({ type: 'TOGGLE_FORM', payload: false });
  }; */
  const { gdpr, seller } = state;

  const handleToggleGdpr: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    const gdpr: boolean = event.currentTarget.checked;

    setState({ ...state, gdpr });
  };
  const handleToggleSeller: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void = (event) => {
    const seller: boolean = event.currentTarget.checked;

    setState({ ...state, seller });
  };

  const handleSubmitForm: (
    event: React.FormEvent<HTMLFormElement>
  ) => Promise<void> = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const firstName = (form.firstname as HTMLInputElement).value;
    const lastName = (form.surname as HTMLInputElement).value;
    const email = (form.email as HTMLInputElement).value;
    const phone = (form.phone as HTMLInputElement).value;
    const message = (form.message as HTMLInputElement).value;

    let valid: boolean = true;

    if (!firstName) {
      valid = false;
    } else if (!lastName) {
      valid = false;
    } else if (!email) {
      valid = false;
    } else if (!gdpr) {
      valid = false;
    }

    const formData: string = JSON.stringify({
      firstName,
      lastName,
      message,
      email,
      images,
      phone,
      seller,
    });

    // console.log(formData);

    if (valid) {
      // TODO: Replace hardcoded url by the real one from server
      const url: string = `http://localhost:3224/send-mail`;

      const resp: Response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: formData,
      });

      if (resp.status === 200) {
        const mailResp = await resp.json();

        console.log(mailResp);
      }
    }
  };

  return (
    <Fragment>
      <Link to="/">
        <CloseBtn dangerouslySetInnerHTML={{ __html: htmlTimes }} />
      </Link>
      <Wrapper>
        <Form onSubmit={handleSubmitForm}>
          <H2>Zhrnutie</H2>
          <HR />
          <H3>Objednaný produkt:</H3>
          {data ? (
            <React.Fragment>
              <P key="op-0">
                Typ postele <strong>{data.title}</strong>, typ materiálu postele{' '}
                <strong>{matTitle.toLowerCase()}</strong>.
              </P>
              <P
                key="op-1"
                dangerouslySetInnerHTML={{
                  __html:
                    headTitle.toLowerCase() !== 'frame'
                      ? `Typ čela <strong>${headTitle}</strong>.`
                      : `Typ čela <strong>${headTitle}</strong> materiál rámu <strong>${legMatTitle.toLowerCase()}</strong>.`,
                }}
              />
              <P key="op-2">
                Typ farby prešitia <strong>{tuftTitle.toLowerCase()}</strong>.
              </P>
              <P key="op-3">
                Typ nôh <strong>{legTitle}</strong>, typ materiálu nôh{' '}
                <strong>{legMatTitle.toLowerCase()}</strong>.
              </P>
              <HR key="div-0" />
            </React.Fragment>
          ) : null}
          <TextInput
            id="firstname"
            name="firstName"
            placeholder="Zadajte svoje meno"
            errorText="Nezadali ste meno"
            validate
          />
          <TextInput
            id="lastname"
            name="lastName"
            placeholder="Zadajte priezvisko"
            errorText="Nezadali ste priezvisko"
            validate
          />
          <TextInput
            type="email"
            id="email"
            name="Email"
            placeholder="Zadajte email"
            errorText="Email nie je v správnom tvare"
            validate
          />
          <TextInput
            type="phone"
            id="phone"
            name="Číslo"
            placeholder="Zadajte tel. číslo"
          />
          <FormControl marginOff>
            <TextArea
              id="message"
              placeholder="Napíšte nám správu..."
              rows={3}
            />
          </FormControl>
          <ImagesContainer>
            {images && images.length > 0
              ? images.map((item: string, i: number) => (
                  <Img src={item} key={`img-${i}`} />
                ))
              : null}
          </ImagesContainer>
          <FormControl>
            <input type="checkbox" onChange={handleToggleGdpr} /> Súhlas so
            spracovaním osobných údajov.
          </FormControl>
          <FormControl>
            <input type="checkbox" onChange={handleToggleSeller} /> Chcem aby sa
            mi ozval predajca Saffronu.
          </FormControl>
          {/* !gdpr */}
          <SubmitBtn type="submit" disabled={true}>
            Poslať zhrnutie na môj email
          </SubmitBtn>
        </Form>
      </Wrapper>
    </Fragment>
  );
}
