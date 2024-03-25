import { http, HttpResponse } from 'msw';
import { GET_TODOS, GET_USERS } from '../../constants/urlConstants';

export const getTodosSuccessHandler = http.get(GET_TODOS, ({ request, params, cookies }) => {
    return HttpResponse.json({
        todos: [{ id: 1, todo: '散歩', completed: true, userId: 10 }],
        total: 1,
        skip: 0,
        limit: 1,
    });
});

export const getTodosErrorHandler = http.get(GET_TODOS, ({ request, params, cookies }) => {
    return HttpResponse.error();
});

export const getUsersSuccessHandler = http.get(GET_USERS, ({ request, params, cookies }) => {
    return HttpResponse.json([
        {
            id: 100,
            name: 'Pochi',
            username: 'Pochi',
            email: 'Pochi@mail.afcr',
        },
    ]);
});

export const handlers = [getTodosSuccessHandler, getUsersSuccessHandler];
