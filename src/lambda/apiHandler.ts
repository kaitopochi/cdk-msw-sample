import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { mswDecorator } from './utils/mswDecorator';

export const baseHandler: APIGatewayProxyHandler = async event => {
    try {
        const response = await fetch('https://dummyjson.com/todos');
        if (!response.ok) {
            throw new Error(`API call failed with status: ${response.status}`);
        }
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    }
};

export const handler = mswDecorator(baseHandler);
