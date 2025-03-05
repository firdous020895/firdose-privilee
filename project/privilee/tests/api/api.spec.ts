import { test, expect } from '@playwright/test';

const baseUrl = 'https://gorest.co.in';

test.describe('API Tests for GoRest API', () => {

    test('GET /public/v2/users @apiTests', async ({ request }) => {
        const response = await request.get(`${baseUrl}/public/v2/users`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        console.log('Users Data:', data); // Log response data for reference
        expect(Array.isArray(data)).toBe(true); // Checking if the response is an array
        expect(data.title).not.toBe('');
        expect(data.user_id).not.toBe('');
        expect(data.id).not.toBe('');
        expect(data.body).not.toBe('');
    });

    test('GET /public/v2/posts @apiTests', async ({ request }) => {
        const response = await request.get(`${baseUrl}/public/v2/posts`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true); // Checking if the response is an array
        expect(data.title).not.toBe('');
        expect(data.user_id).not.toBe('');
        expect(data.id).not.toBe('');
        expect(data.body).not.toBe('');
        console.log('Posts Data:', data); // Log response data for reference
    });

    test('GET /public/v2/users/7374206/posts @apiTests', async ({ request }) => {
        const response = await request.get(`${baseUrl}/public/v2/users/7374206/posts`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true); // Checking if the response is an array
        expect(data.title).not.toBe('');
        expect(data.user_id).not.toBe('');
        expect(data.id).not.toBe('');
        expect(data.body).not.toBe('');
        console.log('User Posts Data:', data); // Log response data for reference
    });

    test('GET /public/v2/todos @apiTests', async ({ request }) => {
        const response = await request.get(`${baseUrl}/public/v2/todos`);
        expect(response.status()).toBe(200);
        const data = await response.json();
        expect(Array.isArray(data)).toBe(true); // Checking if the response is an array
        expect(data[0].title).toBeTruthy();
        expect(data[0].user_id).toBeTruthy();
        expect(data[0].due_on).toBeTruthy();
        expect(data[0].status).toBeTruthy();
        console.log('Todos Data:', data); // Log response data for reference
    });

});
