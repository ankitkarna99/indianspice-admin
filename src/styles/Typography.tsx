import { createGlobalStyle } from "styled-components";

const Typography = createGlobalStyle`
  html {
    font-family: Poppins, 'Poppins', sans-serif;
    color: var(--black);
  }

  p, li {
    letter-spacing: 0.5px;
    margin: 0;
  }

  h1,h2,h3,h4,h5,h6 {
    margin: 0;
  }
  
  a {
    color: var(--black);
    text-decoration: none;
    text-decoration-skip-ink: none;
  }

  .sidebar-link-active > div {
    border-left: 3px solid var(--primary);
  }
`;

export default Typography;
