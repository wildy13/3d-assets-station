import 'dotenv/config';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { connect } from 'mongoose';

import user from './user/index.js';

const fastify = Fastify({
  logger: true,
});

fastify.register(cors);
fastify.register(jwt, { secret: process.env.SESSION_KEY, sign: { expiresIn: '8h' } });

fastify.addHook('onRequest', async (req, res) => {
  try {
    if (req.headers.authorization) {
      await req.jwtVerify();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

fastify.register(user, { prefix: '/api/user' });

const connector = async () => {
  try {
    await connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serializeFunctions: true,
    });

    console.log('Connection has been established successfully.');
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

const start = async () => {
  try {
    await fastify.listen({ port: process.env.PORT, host: process.env.HOST });
    await connector();
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
