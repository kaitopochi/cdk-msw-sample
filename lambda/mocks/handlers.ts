import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://dummyjson.com/todos", ({ request, params, cookies }) => {
    return HttpResponse.json({
      todos: [{ id: 1, todo: "散歩", completed: true, userId: 10 }],
      total: 1,
      skip: 0,
      limit: 1,
    });
  }),
];
