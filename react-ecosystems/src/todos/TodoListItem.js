import React from 'react';
import styled from 'styled-components';

const Content = styled.div`
    width: 60%;
`;

const TodoItemCont = styled.div`
    background: #fff;
    border-radius: 8px;
    margin-top: 8px;
    padding: 16px;
    display: flex;
    box-shadow: 0 4px 8px grey;
`;

export const getBorderStyleForDate = (startingDate, currentDate) =>
    {
        return (startingDate > new Date(currentDate - 86400000 * 5)
        ? 'none'
        : '2px solid red')
    }

const TodoItemContainerWithWarning = styled(TodoItemCont)`
    border-bottom: ${props => getBorderStyleForDate(new Date(props.createdAt), Date.now())};
`

const ButtonCont = styled.div`
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: flex-end;
`;

export const Button = styled.button`
    font-size: 16px;
    padding: 8px;
    border: none;
    border-radius: 8px;
    outline: none;
    cursor: pointer;
    margin-left: 8px;
`;

export const CompleteButton = styled(Button)`
    width: 60%;
    background-color: #22ee22;
`;

export const RemoveButton = styled(Button)`
    background-color: #ee2222;
    width: 34%
`;

const TodoListItem = ({todo, onRemovePressed, onCompletedPressed}) => 
    {
        const Container = todo.isCompleted ? TodoItemCont : TodoItemContainerWithWarning;

        return(
            <Container createdAt={todo.createdAt}>
                <Content>
                    <h3>{todo.text}</h3>
                    <p>
                        Created at:&nbsp;
                        {(new Date(todo.createdAt)).toLocaleDateString()}
                    </p>
                </Content>
                <ButtonCont>
                    {todo.isCompleted 
                    ? null 
                    : <CompleteButton
                        onClick={() => {
                            onCompletedPressed(todo.id);
                        }}>Mark As Complete</CompleteButton>}
                    <RemoveButton 
                        onClick={ () => {
                            onRemovePressed(todo.id);
                        }}>Remove</RemoveButton>
                </ButtonCont>
            </Container>
        );
    }

export default TodoListItem