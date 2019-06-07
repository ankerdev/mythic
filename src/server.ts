import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { CONFIG } from './config';
import { schema } from './graphql';
import { ipRestrictionMiddleware, jwtMiddleware, modelBindingMiddleware, graphqlQueryMiddleware } from './mythic';

// Create express application
const app: express.Express = express();

// Apply settings and middleware
app.set('trust proxy', 1);
app.use([
  helmet(),
  ipRestrictionMiddleware.handle,
  cors(CONFIG.cors),
  new rateLimit(CONFIG.rateLimit),
  bodyParser.json(),
  graphqlQueryMiddleware.handle,
  jwtMiddleware.handle,
  modelBindingMiddleware.handle,
]);

// Create Apollo server
const server: ApolloServer = new ApolloServer({
  schema,
  context: ({ res }) => ({ ...res.locals }),
});

server.applyMiddleware({ app });

// Listen for connections
app.listen(CONFIG.port, () => {
  console.log(`Serving application at port ${CONFIG.port} 🚀`);
});
