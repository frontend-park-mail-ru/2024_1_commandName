export const protocol = 'http';
export let CSATbaseUrl = 'localhost:8081';

if (protocol === 'https') {
    CSATbaseUrl = '';
}
