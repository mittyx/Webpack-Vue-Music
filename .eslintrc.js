module.exports = {
    "root": true,
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "plugins": ['html','standard','promise'],
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "settings": {
        "html/html-extensions": [".html", ".vue"],
        "html/indent": "+2"
    },
    "extends": "standard",
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