const crypto = require('crypto');

// 16-character/byte AES key
const AES_KEY = process.env.PHONE_OPT_ENCRYPTION_STRING_KEY || process.env.ENCRYPTION_STRING_KEY || 'sg6XisTlL2QcXSuE';
// Using AES-128-CBC since the key is exactly 16 bytes
const ALGORITHM = 'aes-128-cbc';

/**
 * Encrypts a plaintext OTP string.
 * @param {string} text - The plaintext OTP
 * @returns {string} - The hex encoded string containing IV and Ciphertext
 */
const encryptOTP = (text) => {
    // Generate a random 16 byte initialization vector
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(AES_KEY, 'utf-8'), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Return the IV followed by the encrypted text separated by a colon
    return `${iv.toString('hex')}:${encrypted}`;
};

/**
 * Decrypts an encrypted OTP string.
 * @param {string} encryptedText - The encrypted string containing IV and Ciphertext
 * @returns {string} - The decrypted plaintext OTP
 */
const decryptOTP = (encryptedText) => {
    try {
        const textParts = encryptedText.split(':');
        const ivHex = textParts.shift();
        const encryptedHex = textParts.join(':');

        const iv = Buffer.from(ivHex, 'hex');
        const encryptedTextBuffer = Buffer.from(encryptedHex, 'hex');

        const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(AES_KEY, 'utf-8'), iv);

        let decrypted = decipher.update(encryptedTextBuffer);
        decrypted = Buffer.concat([decrypted, decipher.final()]);

        return decrypted.toString('utf8');
    } catch (err) {
        console.error('Error decrypting OTP', err);
        return null;
    }
};

module.exports = {
    encryptOTP,
    decryptOTP
};
