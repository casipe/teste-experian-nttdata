import styled from 'styled-components';


export const Container = styled.div`
    height: 40px;
    line-height: 40px;
    display: flex;
`;

export const Content = styled.a<{ disabled?: boolean }>`
    background-color: ${(props) => props.theme.colors.primary};  
    padding: 0 20px;
    border-radius: 4px;
    cursor: ${(props) => props.disabled !== true ? 'pointer' : 'default'}; ;
    text-align:center;
    :hover    {
        background:  ${(props) => props.theme.colors.primaryHover};
    }

`

export const Icon = styled.i`
    display: inline-block;
    justify-content: center;
    margin-right: 10px;
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 25px;
    background: #ffffff33;
    font-size: 15px;
    font-weight: bold;
    color:#fff;
    *padding-left:6px
`;

export const Text = styled.span<{ disabled?: boolean }>`
        font-weight: bold;
        color: ${(props) => props.disabled === true ? props.theme.colors.disabled : props.theme.colors.white}; 
`;
