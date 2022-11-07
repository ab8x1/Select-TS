import styled from "styled-components"
import {ListContainerProps, ListItemProps} from '../types/customTypes'

export const ListContainer = styled.ul<ListContainerProps>`
    display: block;
    position: absolute;
    top: 100%;
    transform: translateY(-5px);
    left: 0;
    right: 0;
    max-height: 250px;
    background-color: ${({darkTheme}) => darkTheme ? '#35373c' : 'white'};
    color: ${({darkTheme}) => darkTheme ? 'white' : 'black'};
    overflow: auto;
    padding: 20px 0;
    list-style: none;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    border-radius: 5px;
    ::-webkit-scrollbar-thumb {
        background: #9E9E9E;
        border-radius: 5px;
    }
    ::-webkit-scrollbar {
        width: 7px;
    }
    ::-webkit-scrollbar-track {
        background: #FAFAFA;
    }
`;

export const ListItem = styled.li<ListItemProps>`
    cursor: pointer;
    ${({hovered}) => hovered && `
        background-color: #E3F2FD;
        color: black;
    `}
    ${({selected}) => selected && `
        background-color: #1E88E5!important;
        color: white!important;
    `}
    &:hover{
        background-color: #E3F2FD;
        color: black;
    }
`;

export const ItemText = styled.span`
    display: block;
    font-size: 1rem;
    padding: 10px 15px;
    pointer-events: none;
`;