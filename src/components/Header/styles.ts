import styled from "styled-components";

export const Container = styled.header`
  background-color: var(--background-header);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  padding: 64px 32px 128px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 32px;

    h1{
      color: #fff;
    }
  }

  button {
    font-weight: 700;
    font-size: 16px;

    color: #fff;
    background-color: var(--purple);
    border-radius: 0.4rem;

    height: 56px;
    padding: 0 64px;

    border: 0;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`;
