import styled from 'styled-components';


interface IContainerProps {
  show?: boolean;
}

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Container = styled.div`
  position: absolute;
  padding: 0.75rem;
  width: calc(100% - 1.5rem);
  height: calc(100% - 1.5rem);
  top: 0;
  left: 0;
  background-color: #fff;
  display: ${({ show }: IContainerProps) => (show ? 'block' : 'none')};
`;

export const CloseBtn = styled.button`
  border: 0 none;
  padding: 0;
  background: transparent;
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  font-size: 1.25rem;
  outline: none;
  z-index: 10;
`;

export const H2 = styled.h2`
  font-family: "Josefin Sans", Sans-serif;
  font-weight: 300;
`;

export const H3 = styled.h3`
  font-family: "Josefin Sans", Sans-serif;
  font-weight: 200;
`;

export const H4 = styled.h4`
  font-family: "Josefin Sans", Sans-serif;
  color: #000;
  font-weight: 700;
  padding-left: 1rem;
  position: absolute;
`;

export const HR = styled.hr`
  margin: 1.5rem 0;
`;

export const P = styled.p`
  font-family: "Josefin Sans", Sans-serif;
  font-weight: 200;
`;

export const Img = styled.img`
  width: calc(100vh / 1.8);
  display: block;
  margin: 0 auto;

  @media only screen and (max-width: 770px) {
    max-width: 95%;
    margin-bottom: 1.25rem;
    margin-top: -1.25rem;
  }
`;

export const ImagesContainer = styled.div`
  border-right: 1px solid #ededed;
  width: calc(50% - 2px);
  position: fixed;
  top: 0;
  left: 0;

  @media only screen and (max-width: 770px) {
    width: 100%;
    position: static;
    border-right: 0;
  }
`;

export const Form = styled.form`
  width: 50%;
  margin-left: 50%;
  padding: 0 2.5rem;
  overflow-x: hidden;

  @media only screen and (max-width: 770px) {
    width: 100%;
    margin-left: 0;
  }
`;
export const FormControl = styled.div<{ marginOff?: boolean }>`
  margin-bottom: 1.25rem;

  @media only screen and (max-width: 770px) {
    ${({ marginOff }) => marginOff && 'margin-bottom: 0;'}
  }
`;

export const Input = styled.input`
  padding: 0.75rem 0.5rem;
  width: calc((100% - 1rem) - 4px);
`;

export const TextArea = styled.textarea`
  padding: 0.75rem 0.5rem;
  width: calc((100% - 1rem) - 4px);
`;

export const SubmitBtn = styled.button`
  width: 100%;
  text-align: center;
  background-color: #3498db;
  border: 0 none;
  padding: 1rem;
  border-radius: 0.25rem;
  color: #fff;
  outline: none;
  margin-bottom: 1rem;

  &:disabled {
    background-color: #1c608e;
    color: #dadada;
  }
`;