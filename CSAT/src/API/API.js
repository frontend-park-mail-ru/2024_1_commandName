import { makeBaseRequest } from './common.js';
import { baseUrl, CSATbaseUrl, protocol } from '../config.js';

/**
 * API для работы с опросами
 * @class CsatAPI
 */
export class CSATAPI {
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
                `${protocol}://${CSATbaseUrl}/setAnswer`,
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
