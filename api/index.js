import 'dotenv/config';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

import { connect } from 'mongoose';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import User from './user/model.js';
import setup from './auth/passport.js';

import asset from './asset/index.js';
import auth from './auth/index.js';
import category from './category/index.js';
import user from './user/index.js';

const fastify = Fastify({
  logger: true,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setup(User);

fastify.register(fastifyCors);
fastify.register(fastifyJwt, { secret: process.env.SESSION_KEY, sign: { expiresIn: '8h' } });
fastify.register(fastifyMultipart);
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/public/', 
});

fastify.addHook('onRequest', async (req, res) => {
  try {
    if (req.headers.authorization) {
      await req.jwtVerify();
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

fastify.register(asset, { prefix: '/api/asset' });
fastify.register(auth, { prefix: '/api/auth' });
fastify.register(category, { prefix: '/api/category' });
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
