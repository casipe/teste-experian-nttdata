import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  body{
    font-family: Open-Sans, Helvetica, Sans-Serif;
    background: #d5f4ea6e !important;
  }

  .MuiAppBar-root{
    background-color: #338a78 !important;
  }

  .Modal,.ModalDialog{
    z-index: 1200 !important;
  }

  .ModalDialog .MuiPaper-root{
    max-width: 630px !important;
  }

  @media (max-width: 640px) {
    .MuiTextField-root, .MuiFormControl-root, .MuiDialog-container {
      width: 90% !important;
    }
     .MuiDialog-container {
      width: 100% !important;
    }
  }

  @media (max-width: 440px) {
    .MuiDialog-container{
      width: 85% !important;
    }
  }
`;
