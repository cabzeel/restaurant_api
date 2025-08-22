const { hash, compare } = require('bcrypt');
const { createHmac } = require('crypto')

const doHash = (value, saltValue) => {
    const result = hash(value, saltValue);

    return result
}

const passwordHashValidator = (value, hashedvalue) => {
    const result = compare(value, hashedvalue);

    return result;
}

const hmacProcess = (value, key) => {
    const result = createHmac('sha256', key).update(value).digest('hex');

    return result;
}

module.exports = {doHash, passwordHashValidator, hmacProcess}