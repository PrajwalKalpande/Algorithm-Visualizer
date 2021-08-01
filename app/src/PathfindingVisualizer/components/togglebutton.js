import styled from 'styled-components';

const Toggle = styled.button`
    cursor: pointer;
    height: 50px;
    width: 50px;   
    border-radius: 50%;
    border: none;
    
    &:focus {
        outline: none;
    }
    transition: all .5s ease;
`;

export default Toggle;
