import styled from 'styled-components';

export const Container = styled.table`
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    width: 100%;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15); 

    th,
    td {
        padding: 12px 15px;

        &.action{
          float:right;
          margin-right:5px;
          min-width:50px
        }
    }
`

export const Thead = styled.thead`
  tr {
    background-color: ${(props) => props.theme.colors.primary};
    color: #ffffff;
    text-align: left;
  }
`;

export const Tbody = styled.tbody`
  tr {
    border-bottom: 1px solid #dddddd;
  }

  tr:nth-of-type(even) {
    background-color: ${(props) => props.theme.colors.disbled}; ;
  }

  tr:last-of-type {
    border-bottom: 2px solid ${(props) => props.theme.colors.primary};
  }
  tr.active-row {
    font-weight: bold;
    color: ${(props) => props.theme.colors.primary};
}
`;
