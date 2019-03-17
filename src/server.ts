import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { CONFIG } from './config';
import { resolvers, typeDefs } from './graphql';
import { jwtMiddleware } from './middleware';

class Application {
  app: express.Express;
  server!: ApolloServer;

  constructor() {
    this.app = express();
    this.applyExpressMiddleware();
    this.createGraphQLServer();
    this.app.listen(CONFIG.port, () => {
      console.log(`Serving application at port ${CONFIG.port} 🚀`);
    });
  }

  applyExpressMiddleware(): void {
    this.app.use(cors(CONFIG.cors));
    this.app.use(bodyParser.json());
    this.app.use(jwtMiddleware.handle);
  }

  createGraphQLServer(): void {
    const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      resolverValidationOptions: {
        requireResolversForResolveType: false,
      },
    });

    this.server = new ApolloServer({
      schema,
      context: ({ res }) => ({ auth: res.locals.auth }),
    });

    this.server.applyMiddleware({ app: this.app });
  }
}

export const app = new Application().app;
