import { ApolloServer } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { CONFIG } from './config';
import { resolvers, typeDefs } from './graphql';
import { jwtMiddleware, policyMiddleware } from './middleware';

// @TODO Supress resolver warning somehow

class Application {
  app: express.Express;
  server!: ApolloServer;

  constructor() {
    this.app = express();
    this.applyExpressMiddleware();
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ res }) => ({ auth: res.locals.auth }),
    });
    this.server.applyMiddleware({ app: this.app });
    this.app.listen(CONFIG.port, () => {
      console.log(`Serving application at port ${CONFIG.port} 🚀`);
    });
  }

  applyExpressMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(jwtMiddleware.handle);
    this.app.use(policyMiddleware.handle);
  }
}

export const app = new Application().app
