import { getAll, create, update, remove } from './controller.js';

import { isAdmin } from '../auth/service.js';

export default ((fastify, opts, done) => {
  fastify.get('/', getAll);
  fastify.post('/create', { preHandler: [isAdmin()] }, create);
  fastify.post('/update/:id', { preHandler: [isAdmin()] }, update);
  fastify.post('/remove/:id', { preHandler: [isAdmin()] }, remove);

  done();
});
