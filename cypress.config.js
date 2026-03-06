const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: true,

  e2e: {
    baseUrl: 'https://guest:welcome2qauto@qauto.forstudy.space',
  },
  env: {
    user: {
      email: 'test1703@gmail.com',
      password: 'Qwerty123',
    },
    user1: {
      email: 'test228@gmail.com',
      password: 'Qwerty123',
    },
  },
});
