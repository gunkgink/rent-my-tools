const nextJest = require('next/jest');
module.exports = nextJest({dir:'./'})({testEnvironment:'jsdom',testMatch:['**/__tests__/**/*.test.ts?(x)'],moduleNameMapper:{'^@/(.*)$':'<rootDir>/src/$1'},setupFilesAfterEnv:['@testing-library/jest-dom']});
