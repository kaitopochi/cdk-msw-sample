import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { mswDecorator } from './utils/mswDecorator';

const baseHandler: APIGatewayProxyHandler = async event => {
    const response = await fetch('https://dummyjson.com/todos');
    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};

export const handler = mswDecorator(baseHandler);
