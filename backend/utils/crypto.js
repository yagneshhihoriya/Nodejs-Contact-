const crypto = require('crypto');
const env = require('../env-loader');

exports.encrypt = async (data) => {
    const key = crypto.createHash('sha256').update(String(env.ENC_SECRET)).digest('base64').substr(0, 32);
    const cipher = await crypto.createCipheriv(env.ENC_ALGO, key, Buffer.from(env.ENC_IV, 'hex'))
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
    return encrypted.toString('base64')
}

exports.decrypt = async (encrypted) => {
    const key = crypto.createHash('sha256').update(String(env.ENC_SECRET)).digest('base64').substr(0, 32);
    const decipher = await crypto.createDecipheriv(env.ENC_ALGO, key, Buffer.from(env.ENC_IV, 'hex'))
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64')), decipher.final()])
    return decrypted.toString()
}