export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  coverageReporters: [
    "json-summary",
    'text'
  ],
  setupFiles: [
    "./jest.setup.js"
  ]
};