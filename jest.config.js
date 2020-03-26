const {defaults} = require('jest-config');
module.exports = {
    verbose: true,
    testTimeout: 50000,
    testMatch: [
        "**/?(*.)+(spec|test).[jt]s?(x)"
    ],
    updateSnapshot: true,
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "miniProgram Test",
            "outputPath": "reports/index.html",
            "includeFailureMsg": true
        }]
    ]
};
