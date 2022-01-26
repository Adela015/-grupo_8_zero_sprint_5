const fs = require('fs');
const path = require('path');
const { resolve } = require('path/posix');

const model = {
    file: resolve(__dirname, '../data', 'user.json'),
    all: () => JSON.parse(fs.readFileSync(model.file)),
}