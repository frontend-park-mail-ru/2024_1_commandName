import { makeBaseRequest } from './common.js';
import { protocol, baseUrl } from './config.js';

export class TextAPI {
    async translate(text) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/translate`,
                'POST',
                {
                    texts: [text],
                },
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
    async short(text, username) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/summarizeMessage`,
                'POST',
                {
                    text: text,
                    username: username,
                },
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }
}
