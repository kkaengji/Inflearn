import TodoEditor from "@/components/todo-list/todo-editor";
import TodoItem from "@/components/todo-list/todo-item";
import { API_URL } from "@/lib/constants";
import type { Todo } from "@/type";
import { useQuery } from "@tanstack/react-query";

async function fetchTodos() {
  const response = await fetch(`${API_URL}/todos`);
  if (!response.ok) throw new Error("Fetch Failed");

  const data: Todo[] = await response.json();
  return data;
}

export default function TodoListPage() {
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryFn: fetchTodos,
    queryKey: ["todos"],
    retry: 0,
  });

  if (error) return <div>오류가 발생했습니다.</div>;
  if (isLoading) return <div>로딩 중 입니다...</div>;

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-bold">TodoList</h1>
      <TodoEditor />
      {todos?.map((todo) => (
        <TodoItem key={todo.id} id={todo.id} content={todo.content} />
      ))}
    </div>
  );
}
