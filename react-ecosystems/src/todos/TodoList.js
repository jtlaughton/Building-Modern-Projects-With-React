import React, {useEffect} from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import {
    getTodosLoading,
    getComplteTodos,
    getIncompleteTodos } from './selectors';
import {connect} from 'react-redux';
import { loadTodos, removeTodoRequest, markTodoAsCompletedRequest } from './thunks';
import styled from 'styled-components';

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const TodoList = ({completedTodos, incompleteTodos, onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, [])

    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <ListWrapper>
            <NewTodoForm/>
            <h3>Incomplete: </h3>
            {incompleteTodos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
            <h3>Completed: </h3>
            {completedTodos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
        </ListWrapper>
    );

    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    completedTodos: getComplteTodos(state),
    incompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state)
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletedPressed: id => dispatch(markTodoAsCompletedRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);