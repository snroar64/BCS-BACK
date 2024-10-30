module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  roots: ['src', 'test'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'dist',
    'mock-data',
    'node_modules',
    'test/integration',
  ],
  coveragePathIgnorePatterns: [
    '.dto.ts',
    '.interface.ts',
    '.module.ts',
    'main.ts',
    'src/db/migration',
    'test/e2e',
    'entity.ts',
    '.definitions.ts',
    'index.ts'
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 80,
      functions: 90,
      lines: 90,
    },
  },
};
