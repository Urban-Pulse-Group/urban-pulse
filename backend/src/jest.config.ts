import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  globals: {
    'ts-jest': {
      diagnostics: false,
    },
  },
};

export default config;