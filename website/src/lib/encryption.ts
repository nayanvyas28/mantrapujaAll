import crypto from 'crypto';

const ALGORITHM = 'aes-128-cbc';

export function encrypt(text: string): string {
    const key = process.env.ENCRYPTION_STRING_KEY || '';
    if (key.length !== 16) {
        throw new Error('ENCRYPTION_STRING_KEY must be exactly 16 characters long');
    }

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(key), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string {
    const key = process.env.ENCRYPTION_STRING_KEY || '';
    if (key.length !== 16) {
        throw new Error('ENCRYPTION_STRING_KEY must be exactly 16 characters long');
    }

    const [ivHex, encryptedData] = encryptedText.split(':');
    if (!ivHex || !encryptedData) {
        throw new Error('Invalid encrypted format');
    }

    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(key), iv);

    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}
