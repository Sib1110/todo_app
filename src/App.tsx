import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Title from "./components/title/Title";
import TodoForm from "./components/todo/TodoForm";
import TodoList from "./components/todo/TodoList";
import { Todo } from "./todomodel";

const DUMMY_ARRAY: Todo[] = [
  {
    id: uuidv4(),
    task: "초기화 버튼을 누르고 시작하세요",
    done: false,
    isDummy: true,
  },
  {
    id: uuidv4(),
    task: "목록 작성에 오늘의 할 일을 입력해주세요",
    done: false,
    isDummy: true,
  },
  { id: uuidv4(), task: "오늘의 할 일", done: false, isDummy: true },
];

function App() {
  const [todos, setTodos] = useState<Todo[]>(DUMMY_ARRAY);

  const addTodoHandler = (todo: string) => {
    setTodos((prev) => [...prev, { id: uuidv4(), task: todo, done: false }]);
  };

  const taskDoneHandler = (done: boolean, id: string) => {
    const newTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, done };
      } else {
        return todo;
      }
    });

    setTodos(newTodo);
  };

  const deleteTodoHandler = (id: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };

  const updateTodoHandler = (id: string, task: string) => {
    const updatedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodo);
  };

  const deleteAllTodosHandler = () => {
    setTodos([]);
  };

  return (
    <div className="flex flex-col items-center">
      <Title />
      <TodoForm onAddTodos={addTodoHandler} />
      <TodoList
        todoData={todos}
        onTaskDone={taskDoneHandler}
        onDeleteTodo={deleteTodoHandler}
        onDeleteAllTodos={deleteAllTodosHandler}
        onUpdateTodo={updateTodoHandler}
      />
    </div>
  );
}

export default App;
