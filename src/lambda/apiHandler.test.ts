import { baseHandler } from './apiHandler';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { setupServer } from 'msw/node';
import { successHandler, errorHandler } from './mocks/handlers';

const server = setupServer();

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

describe('apiHandler テスト', () => {
    it('成功パターン', async () => {
        // 成功パターンのモックを動的に設定
        server.use(successHandler);

        const event = {} as APIGatewayProxyEvent;
        const context = {} as Context;

        const result = await baseHandler(event, context, () => {});

        if (result) {
            expect(result.statusCode).toBe(200);
            expect(JSON.parse(result.body)).toStrictEqual({
                todos: [{ id: 1, todo: '散歩', completed: true, userId: 10 }],
                total: 1,
                skip: 0,
                limit: 1,
            });
        } else {
            fail('result is undefined');
        }
    });

    it('失敗パターン', async () => {
        // 失敗パターンのモックを動的に設定
        server.use(errorHandler);

        const event = {} as APIGatewayProxyEvent;
        const context = {} as Context;

        const result = await baseHandler(event, context, () => {});

        if (result) {
            expect(result.statusCode).toBe(500);
        } else {
            fail('result is undefined');
        }
    });
});
