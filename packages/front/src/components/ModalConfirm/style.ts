

import styled from 'styled-components';

const ContainerAction = styled.div`
    color: ${(props) => props.color || props.theme.colors.white};
    margin-top:50px;
    display: inline-block;
    width:100%;
    .Button{
        float:right;
        margin-left:10px;
        font-size:13px;
    }
`;

const Content = styled.div`
    margin-top:20px;
`;


export {
    ContainerAction,
    Content
}