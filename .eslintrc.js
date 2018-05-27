module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "plugins": ["html"],
    "env": {
        "browser": true,
        "es6": true
    },
    "settings": {
        "html/html-extensions": [".html", ".vue"],
        "html/indent": "+2",
        "import/resolver": {
            "webpack": {
                "config": "./webpack.conf.js"
            }
        }
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ]
    }
};