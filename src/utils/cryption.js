export async function decryptMessage(encryptedMessage, key) {
    const ivAndEncryptedMessage = new Uint8Array(
        atob(encryptedMessage)
            .split('')
            .map((c) => c.charCodeAt(0)),
    );

    const iv = ivAndEncryptedMessage.slice(0, 12);
    const encryptedContent = ivAndEncryptedMessage.slice(12);

    const algorithm = {
        name: 'AES-GCM',
        iv: iv,
    };

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        algorithm,
        false,
        ['decrypt'],
    );

    const decryptedMessage = await window.crypto.subtle.decrypt(
        algorithm,
        cryptoKey,
        encryptedContent,
    );
    return new TextDecoder().decode(decryptedMessage);
}

export async function encryptMessage(message, key) {
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Initialization vector
    const algorithm = {
        name: 'AES-GCM',
        iv: iv,
    };

    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        key,
        algorithm,
        false,
        ['encrypt'],
    );

    const encodedMessage = new TextEncoder().encode(message);
    const encryptedMessage = await window.crypto.subtle.encrypt(
        algorithm,
        cryptoKey,
        encodedMessage,
    );

    const ivAndEncryptedMessage = new Uint8Array(
        iv.length + encryptedMessage.byteLength,
    );
    ivAndEncryptedMessage.set(iv);
    ivAndEncryptedMessage.set(new Uint8Array(encryptedMessage), iv.length);

    return btoa(String.fromCharCode.apply(null, ivAndEncryptedMessage));
}

export function generateKey() {
    const key = new Uint8Array(32);
    window.crypto.getRandomValues(key);
    return key;
}
