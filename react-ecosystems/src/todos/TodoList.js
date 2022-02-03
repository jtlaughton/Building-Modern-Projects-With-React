import React, {useEffect} from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import {connect} from 'react-redux';
import { markTodoAsCompleted, removeTodo } from './actions';
import { displayAlert, loadTodos } from './thunks';
import './TodoList.css';

const TodoList = ({todos = [], onRemovePressed, onCompletedPressed, isLoading, startLoadingTodos}) => {
    useEffect(() => {
        startLoadingTodos();
    }, [])

    const loadingMessage = <div>Loading todos...</div>;

    const content = (
        <div className="list-wrapper">
            <NewTodoForm/>
            {todos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletedPressed={onCompletedPressed}/>)}
        </div>
    );

    return isLoading ? loadingMessage : content;
}

const mapStateToProps = state => ({
    todos: state.todos,
    isLoading: state.isLoading
})

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: text => dispatch(removeTodo(text)),
    onCompletedPressed: text => dispatch(markTodoAsCompleted(text)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);