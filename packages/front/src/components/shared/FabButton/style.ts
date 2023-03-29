

import styled from 'styled-components';

export const Container = styled.div<{isAction?:boolean; color?:string}>`
    width: 45px;
    height: 45px;
    background-color: ${(props) => props.color || props.theme.colors.primary};
    border-radius: 50%;
    box-shadow: 0 6px 10px 0 #666;
    transition: all 0.1s ease-in-out;

    font-size: 30px;
    color: white;
    text-align: center;
    line-height: 70px;
    position: relative; 
    float:right;
    right: 10px;
    top: 10px;
    
    :hover {
        box-shadow: 0 6px 14px 0 #666;
        transform: scale(1.05);
    }

    cursor:${({ isAction }) => isAction ? 'pointer' : 'default'}; 
`;

export const Content = styled.div`
    display:flex;
    margin-top:-3px;
    align-items:center;
    justify-content:center;
    height: 100%;
    color:white;
`
