import React, {useState, useRef, useEffect} from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./styles.css";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, todos, setTodos }: Props) => {

  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit])

  // handle function for editing the task
  const handleEdit = (e: React.FormEvent, id: Number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === id ? {...todo, todo: editTodo} : todo))
    );
    setEdit(false);
  };

  // handle function for deleting the task
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo)=> todo.id !== id));
  };

  // handle function for striking through the task
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
        value={editTodo}
        onChange={(e) => setEditTodo(e.target.value)}
        className="todos__single--text"
        ref={inputRef}
        />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span className="todos__single--text">{todo.todo}</span>
        )
      }

      <div>
        <span className="icon" onClick={()=> {
          if (!edit && !todo.isDone) {
            setEdit(!edit);
          };
        }} tabIndex={0}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)} tabIndex={0}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)} tabIndex={0}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default TodoItem;
