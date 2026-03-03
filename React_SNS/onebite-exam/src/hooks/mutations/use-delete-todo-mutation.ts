import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,

    // 1. 캐시 무효화 -> invalidateQueries
    // 2. 수정 요청의 응답값 활용 -> OnSuccess
    // 3. 낙관적 업데이트 -> onMutate
    onSuccess: (deleteTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deleteTodo.id),
      });
      queryClient.setQueryData<string[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.filter((id) => id !== deleteTodo.id);
        },
      );
    },
  });
}
