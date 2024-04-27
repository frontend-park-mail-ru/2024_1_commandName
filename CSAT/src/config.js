export const protocol = 'http';
export let baseUrl = 'localhost:8080';
export let CSATbaseUrl = 'localhost:8081';

if (protocol === 'https') {
    baseUrl = 'chatme.site/api/v1';
    CSATbaseUrl = 'chatme.site/api/v2';
}
