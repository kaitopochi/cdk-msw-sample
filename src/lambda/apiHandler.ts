import { APIGatewayProxyHandler } from 'aws-lambda';
import fetch from 'node-fetch';
import { mswDecorator } from './utils/mswDecorator';
import { GET_TODOS, GET_USERS } from '../constants/urlConstants';

export const baseHandler: APIGatewayProxyHandler = async event => {
    try {
        const response = await fetch(GET_TODOS);
        if (!response.ok) {
            throw new Error(`GetTodos API call failed with status: ${response.status}`);
        }
        const data: any = await response.json();

        const usersResponce = await fetch(GET_USERS);
        const users: any[] = (await usersResponce.json()) as any[];
        if (!usersResponce.ok || !users) {
            throw new Error(`GetUsers API call failed with status: ${usersResponce.status}`);
        }

        const userName = users[0].name;

        return {
            statusCode: 200,
            body: JSON.stringify({ ...data, userName }),
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
