export const protocol = 'http';
export let CSATbaseUrl = 'localhost:8081';
export const baseUrl = 'localhost:8080';

if (protocol === 'https') {
    CSATbaseUrl = '';
}
