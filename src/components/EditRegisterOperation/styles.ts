import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    margin-bottom: 48px;
  }

  input {
    width: 100%;
    padding: 0 24px;
    height: 56px;
    border-radius: 4px;

    border: 1px solid var(--input-border);
    background: var(--input-background);

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 16px;
    }
  }

  button {
    width: 100%;
    margin-top: 32px;
    border: 0;
    border-radius: 4px;

    background-color: var(--purple);
    color: #fff;
    font-weight: 700;
    font-size: 17px;

    padding: 18px;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
