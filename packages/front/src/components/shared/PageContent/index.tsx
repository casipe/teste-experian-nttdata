import React from 'react';
import {Container, Title} from './style';


interface PageContentProps {
    children: React.ReactNode;
    title?:string;
}
const PageContentWrap: React.FC<PageContentProps> = (props) => {
    const { children, title } = props
  return (
    <Container>
        {title && <Title>{title}</Title>}
      {children}
    </Container>
  )
}

export default PageContentWrap