import { getAll, create } from './controller.js';

export default ((fastify, opts, done) => {
  fastify.get('/', getAll);
  fastify.post('/create', create);

  done();
});
