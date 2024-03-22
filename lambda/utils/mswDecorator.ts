import { APIGatewayProxyEvent, APIGatewayProxyHandler, Callback, Context } from 'aws-lambda';
import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

export const mswDecorator = (lambdaHandler: APIGatewayProxyHandler): APIGatewayProxyHandler => {
    const handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback) => {
        let server = null;
        if (process.env.MSW_STATUS === 'enabled') {
            server = setupServer(...handlers);
            server.listen();
        }

        const response = await lambdaHandler(event, context, callback);

        if (server) {
            server.close();
        }

        return response;
    };
    return handler as unknown as APIGatewayProxyHandler;
};
