module.exports = {
    root: true,

    env: {
        browser: true,
        node: true,
    },

    extends: ["plugin:vue/essential", "@vue/airbnb", "@vue/typescript", "prettier"],

    parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: 12,
        sourceType: "module",
    },

    plugins: ["vue"],
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "quotes": "off",
        "indent": "off",
    },
};
