

import styled from 'styled-components';

const Container = styled.div`
        margin-top:90px;
`;

const Title = styled.div`
    border-bottom:2px solid #eee;
    padding: 2px 4px;
    color:${(props) => props.theme.colors.medium};
    
`;

export {
    Container,
    Title
}