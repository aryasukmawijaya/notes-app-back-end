/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./src/routes.js');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  server.route(routes);

  await server.start();
  console.log(`Server run at ${server.info.uri}`);
};

init();
