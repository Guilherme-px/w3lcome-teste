module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/__TESTS__/'],
    testMatch: ['**/*.test.ts'],
    testPathIgnorePatterns: ['/node_modules/'],
};
