import { create, remove } from './controller.js';

import { isAdmin } from '../auth/service.js';

export default ((fastify, opts, done) => {
  fastify.post('/', { preHandler: [isAdmin()] }, create);
  fastify.delete('/:id', { preHandler: [isAdmin()] }, remove);

  done();
});
