import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/main.ts",
    output: {
        file: "public/bundle.js",
        format: "iife"
    },

    plugins: [typescript()]
};
