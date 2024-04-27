import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from '../config.js';

/**
 * API для работы с опросами
 * @class CsatAPI
 */
export class CsatAPI {
    async checkAccess() {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/checkAccess`,
                'GET',
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async getQuestions() {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/getQuestions`,
                'GET',
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async setAnswer(QuestionId, Answer) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/setAnswer`,
                'POST',
                {
                    question_id: QuestionId,
                    answer: Answer,
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
