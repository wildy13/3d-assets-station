import { getAll, create, update, remove } from './controller.js';

import { isAdmin } from '../auth/service.js';

export default ((fastify, opts, done) => {
  fastify.get('/', getAll);
  fastify.post('/', { preHandler: [isAdmin()] }, create);
  fastify.put('/:id', { preHandler: [isAdmin()] }, update);
  fastify.delete('/:id', { preHandler: [isAdmin()] }, remove);

  done();
});
