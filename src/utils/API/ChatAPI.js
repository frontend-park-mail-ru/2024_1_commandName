import { makeBaseRequest } from './common.js';
import { baseUrl, protocol } from './config.js';

/**
 * API для работы с чатами
 * @class ChatAPI
 */
export class ChatAPI {
    /**
     * Получает предварительный просмотр чатов для пользователя
     * @returns {{status: Number, body: Object}} - Json ответа.
     * @throws Если произошла ошибка при выполнении запроса.
     */
    async getChats() {
        try {
            return makeBaseRequest(`${protocol}://${baseUrl}/getChats`, 'GET');
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async getMessages(ChatId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/getMessages`,
                'POST',
                {
                    chat_id: ChatId,
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

    async deleteMessage(MessageId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/deleteMessage`,
                'POST',
                {
                    message_id: MessageId,
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

    async editMessage(MessageId, NewMessageText) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/editMessage`,
                'POST',
                {
                    message_id: MessageId,
                    new_message_text: NewMessageText,
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

    async chatByUserId(UserId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/createPrivateChat`,
                'POST',
                {
                    user_id: UserId,
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

    async chatById(ChatId) {
        try {
            return makeBaseRequest(`${protocol}://${baseUrl}/getChat`, 'POST', {
                chat_id: ChatId,
            });
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async deleteChatById(ChatId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/deleteChat`,
                'POST',
                {
                    chat_id: ChatId,
                },
            );
        } catch (error) {
            console.error(
                `There was a problem with the fetch operation ${baseUrl}/getChats:`,
                error,
            );
            throw error;
        }
    }

    async createGroup(group) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/createGroupChat`,
                'POST',
                group,
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async editGroup(ChatId, newName, newDescription) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/updateGroupChat`,
                'POST',
                {
                    chat_id: ChatId,
                    new_description: newDescription,
                    new_name: newName,
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

    async getPopularChannels() {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/getPopularChannels`,
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

    async joinChannel(ChatId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/joinChannel`,
                'POST',
                {
                    chat_id: ChatId,
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

    async createChannel(channelName, channelDescription) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/createChannel`,
                'POST',
                {
                    description: channelDescription,
                    name: channelName,
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

    async sendMessage(chatId, messageText, file) {
        try {
            const formData = new FormData();
            formData.append('files', file);
            formData.append(
                'json',
                JSON.stringify({
                    message_text: messageText,
                    chat_id: chatId,
                    type: 'file',
                }),
            );
            return makeBaseRequest(
                `${protocol}://${baseUrl}/uploadFiles`,
                'POST',
                formData,
                null,
            );
        } catch (error) {
            console.error(
                'There was a problem with the fetch operation:',
                error,
            );
            throw error;
        }
    }

    async getStickers() {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/getAllStickers`,
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

    async sendSticker(chatId, stickerId) {
        try {
            return makeBaseRequest(
                `${protocol}://${baseUrl}/sendSticker`,
                'POST',
                {
                    chat_id: chatId,
                    file_id: stickerId,
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
