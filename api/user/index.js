import { create } from './controller.js';

export default ((fastify, opts, done) => {
  fastify.post('/create', create);

  done();
});
