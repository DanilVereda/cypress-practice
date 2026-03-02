const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto2.forstudy.space',
  },
  env: {
    user: {
      email: 'testqauto2@gmail.com',
      password: 'Qwerty123',
    },
  },
});
