module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    "^@models/(.*)": "<rootDir>/src/app/models/$1"
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  globals: {
    "ts-jest": {
      "tsconfig": "<rootDir>/src/tsconfig.spec.json"
    }
  },

  collectCoverage: false,
  collectCoverageFrom: [ "src/**/*.{js,ts}" ],
  coverageReporters: ["lcov", "text-summary"],
};
