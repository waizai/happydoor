module.exports = {
    "env": {
        "node": true,
        "mocha": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "script",
        "ecmaVersion": 6,
    },
    "rules": {
        "no-console": ["error",{
            "allow": ["warn", "error", "info"]
        }]
    },
    "globals":{

    }
};
