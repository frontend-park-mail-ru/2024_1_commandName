export const protocol = 'http';
export let baseUrl = 'localhost:8081';

if (protocol === 'https') {
    baseUrl = 'chatme.site/api/v1';
}
