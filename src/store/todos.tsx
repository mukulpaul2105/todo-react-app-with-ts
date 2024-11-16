import { createContext, ReactNode, useContext, useState } from "react";

export type TodosProviderProps = {
   children: ReactNode; //? ReactNode means it can be anything(component, html, string or anything)
}

export type Todo = {
   id: string;
   task: string;
   completed: boolean;
   createdAt: Date;
}

export type TodosContext = {
   todos: Todo[];
   handleAddToDo: (task: string) => void;
   toggleTodoAsCompleted: (id: string) => void
   handleDeleteTodo: (id: string) => void
}

export const todosContext = createContext <TodosContext | null> (null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
   const [todos, settodos] = useState<Todo[]>(() => {
      try {
         const newTodos = localStorage.getItem("todos") || "[]"
         return JSON.parse(newTodos) as Todo[]
      } catch (error) {
         return []
      }
   })
   const handleAddToDo = (task: string) => {
      if ((task.trim()).length === 0) return 
      settodos((prev) => {
         const newTodos: Todo[] = [
            {
               id: (Math.random().toString()).split('0.')[1],
               task: task,
               completed: false,
               createdAt: new Date()
            },
            ...prev
         ]
         localStorage.setItem("todos", JSON.stringify(newTodos))
         return newTodos
      })
   }

   const toggleTodoAsCompleted = (id: string) => {
      settodos((prev: Todo[]): Todo[] => {
         let newTodos: Todo[] = prev.map((todo: Todo) => {
            if (todo.id === id) {
               return { ...todo, completed: !todo.completed }
            }
            return todo
         })
         localStorage.setItem("todos", JSON.stringify(newTodos))
         return newTodos
      })
   }

   const handleDeleteTodo = (id: string) => {
      settodos((prev: Todo[]): Todo[] => {
         let newTodos = prev.filter((todo) => todo.id !== id);
         localStorage.setItem("todos", JSON.stringify(newTodos))
         return newTodos;
      })
   }

   return <todosContext.Provider value={{todos, handleAddToDo, toggleTodoAsCompleted, handleDeleteTodo}}>
      {children}
   </todosContext.Provider>
}

export const useTodos = (): TodosContext => {
   const todosConsumer: TodosContext | null = useContext(todosContext)

   if (!todosConsumer) {
      throw new Error("useTodos used outside of Provider");
   }

   return todosConsumer;
}