exports.default = {
  jest: {
    transform: {
      '^.+\\.(js|jsx|mjs)$': 'babel-jest',
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/(?!(xxxx.*?\\.js$))'],
    testRegex: '(/test/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    testPathIgnorePatterns: ['/node_modules/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  },
};
