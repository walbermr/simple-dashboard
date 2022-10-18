import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`

    :root{   
        --background-header: #1c1c1f; 
        --purple: #8B5CF6;
      
        --text-title: #363f5f;
        --text-body: #969cb3;
        --color-icon: #c1c1c1;
        --input-background: #E7E9EE;
        --background-modal: #F0F2F5;
        --input-border: #D7D7D7;
      
        --background: #121214;
        --shape: #FFFFFF;
    }

  * {
    margin:0;
    padding:0;
    box-sizing: border-box;
    outline: none;
  }

  body{
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button{
    font-family: 'Inter', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 700;
  } 

  button{
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0,0,0,0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  } 

  .react-modal-content {
    width: 100%;
    max-width: 507px;
    background: var(--background-modal);
    padding: 40px;
    position: relative;
    border-radius: 4px;
  }

  .react-modal-close{
    position:absolute;
    right: 24px;
    top: 24px;
    border: 0;
    
    background: transparent;

    transition: filter 0.2s;

    &:hover{
      filter: brightness(0.9);
    }
  }

`;
