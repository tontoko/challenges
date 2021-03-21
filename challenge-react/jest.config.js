module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      babelConfig: '.babelrc',
    },
  },
  testMatch: ['**/__tests__/**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
};
