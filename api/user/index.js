import { getAll, create } from './controller.js';

import { isAdmin } from '../auth/service.js';

export default ((fastify, opts, done) => {
  fastify.get('/', { preHandler: [isAdmin()] }, getAll);
  fastify.post('/', { preHandler: [isAdmin()] }, create);

  done();
});
