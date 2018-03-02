module.exports = {
    "env": {
        "browser": true,
        "webextensions": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "no-unused-vars": ["error", { "vars": "all", "args": "none" }],
        "no-console": "off"
    },
    "parserOptions": {
        "ecmaVersion": 2017
    }
};
