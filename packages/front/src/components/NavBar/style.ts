

import styled from 'styled-components';
import Box from "@mui/material/Box";

export const Container = styled(Box)`
  display: flex;
  .menuMobile{
    display:none
  }
  @media (max-width: 768px) {
    .menuDesktop{
      display:none
    }

    .menuMobile{
      display:block;
    }
  }
`;
