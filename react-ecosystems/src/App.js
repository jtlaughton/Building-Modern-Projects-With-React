import React from 'react';
import {hot} from 'react-hot-loader';
import TodoList from './todos/TodoList';
import styled from 'styled-components';

const AppCont = styled.div`
    margin: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;
    width: 100vw;
    height: 100vh;
`

const App = () => (
    <AppCont>
        <TodoList/>
    </AppCont>
);

export default hot(module)(App);