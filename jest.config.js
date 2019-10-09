module.exports = {
    "verbose": true,
    "automock": false,
    "transform": {
        "^.+\\.tag$": "riot-jest-transformer",
        "^.+\\.tsx?$": "ts-jest",
    },
    collectCoverage: true,
    coverageReporters: ["html", "text-summary", "lcov"],
    coverageDirectory: "<rootDir>/test/unit/coverage",
    collectCoverageFrom: ["src/**/*.{ts, js}"],
    globals: {
        'ts-jest': {
            diagnostics: false
        }
    }
};
