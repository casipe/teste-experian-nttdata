/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import styled, { keyframes } from 'styled-components';

interface IModal {
  open: boolean;
}

const opacityIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const opacityOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const slideInTop = keyframes`
  0% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 1;
  }
`;

const slideOutTop = keyframes`
  0% {
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(-500px);
    transform: translateY(-500px);
    opacity: 0;
  }
`;

export const Container = styled.div<IModal>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 50;
  animation: ${({ open }) => (open ? opacityIn : opacityOut)} 0.6s
    ${({ open }) => (open ? 'ease-in' : 'ease-out')} both;
  opacity: ${({ open }) => (open ? 1 : 0)};
  visibility: ${({ open }) => (open ? 'open' : 'hidden')};
  transition: opacity 0.6s linear, visibility 1.5s linear;

  > div {
    animation: ${({ open }) => (open ? slideInTop : slideOutTop)} 0.5s
      ${({ open }) =>
        open
          ? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
          : 'cubic-bezier(0.550, 0.085, 0.680, 0.530)'}
      both;
  }
`;

export const Content = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  max-width: 650px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid rgba(0, 65, 134, 0.25);
  box-sizing: border-box;
  border-radius: 5px;

  margin: 0 auto;
  padding: 35px 41px 10px 41px;

  .closeButton {
    background-color: transparent;
    border: none;

    position: absolute;
    top: 10px;
    right: 15px;

    svg > path {
      stroke: ${({ theme }) => theme.colors.primary};
      stroke-width: 2px;
    }

    
  }

  .ModalHeader{
      margin-top:10px;
      margin-bottom:10px;
      border-bottom:1px #eee solid;
  }

  .ModalTitle{
    font-size: 18px;
  }

  .ModalContentCenter{

  }



  @media (max-width: 414px) {
    width: auto;
    margin: 0 20px;
    padding: 35px 22px 45px 22px;
  } 
  
  @media (max-width: 640px) {
    width: 70% !important;
    max-height: 250px !important;
    .ModalContentCenter{
      display: inline;
      max-height: 250px !important;
    }
  }
`;

export const Header = styled.div`
  > h3 {
    margin-bottom: 25px;
  }
`;

export const Text = styled.span`
  > h3 {
    margin-bottom: 25px;
  }
`;
