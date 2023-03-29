module.exports = {
    resolve: {
        byDependency: {
            typescript: {
                extensions: [".tsx", ".ts", "..."],
            },
        },
        modules: [".", "node_modules"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        extensionAlias: {
            ".js": [".ts", ".js"],
            ".mjs": [".mts", ".mjs"],
        },
    },
};
