// eslint-disable-next-line no-undef
module.exports = {
  "testMatch": [
      "**/test/unit/**/**.spec.js"
  ],
  "moduleFileExtensions": ["js",],
  "transform": {"^.+\\.js$": "babel-jest"},
  "transformIgnorePatterns": [
      "<rootDir>/node_modules/"
  ],
  "moduleNameMapper": {
      "^@/(.*)$": "<rootDir>/src/$1"
  },
  "collectCoverage": true,
  "collectCoverageFrom": [
      "**/src/**",
      "!**/src/**/*.json"
  ],
  "coverageReporters": [
      "text-summary",
      "text",
      "lcov"
  ],
  "silent": false,
  "coverageDirectory": "<rootDir>/test/coverage"
};
