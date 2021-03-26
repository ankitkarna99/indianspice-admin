import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary:#06476f;
    --accent:#da7e2b;
    --red: #FF4949;
    --black: #2E2E2E;
    --yellow: #ffc600;
    --white: #fff;
    --grey: #ebebf5;
    --light-grey: #f4f4fc;
    --dark-grey: #14121f;
  }

  /* Custom Scrollbar */
  .custom-scrollbar > div:last-of-type div {
    background-color: var(--primary) !important;
  }
  /* Custom Scrollbar Ends */

  
  * {
      box-sizing: border-box;
      outline: none;
  }
  
  html {
    background-attachment: fixed;
    font-size: 10px;
  }
  
  body {
    font-size: 1.6rem;
    background: var(--grey);
  }

  .flex {
    display: flex;
  }

  .jcsb {
    justify-content:space-between;
  }
`;

export default GlobalStyles;
