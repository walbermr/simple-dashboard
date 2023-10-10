import styled from "styled-components";

export const Container = styled.div`
  margin-top: 56px;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      text-align: left;
      padding: 16px 32px;
    }

    td {
      background-color: var(--background-header);
      color: #fff;
      border: 0;
      padding: 16px 32px;
      width: 100%;

      &:first-child {
        width: 55%;
        font-weight: 700;
      }

      &.td-icons {
        display: flex;
        align-items: center;
        gap: 24px;

        & > img {
          cursor: pointer;
          width: 24px;
          transition: filter 0.2s;

          &:hover {
            filter: brightness(0.5);
          }
        }
      }
    }

  }
`;
