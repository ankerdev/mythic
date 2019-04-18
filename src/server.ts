import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { CONFIG } from './config';
import { resolvers, typeDefs } from './graphql';
import { ipRestrictionMiddleware, jwtMiddleware, modelBindingMiddleware } from './mythic';

class Application {
  app: express.Express;
  server!: ApolloServer;

  constructor() {
    this.app = express();
    this.app.enable('trust proxy');
    this.applyExpressMiddleware();
    this.createGraphQLServer();
    this.app.listen(CONFIG.port, () => {
      console.log(`Serving application at port ${CONFIG.port} 🚀`);
    });
  }

  applyExpressMiddleware(): void {
    this.app.use(ipRestrictionMiddleware.handle);
    this.app.use(new rateLimit(CONFIG.rateLimit));
    this.app.use(cors(CONFIG.cors));
    this.app.use(bodyParser.json());
    this.app.use(jwtMiddleware.handle);
    this.app.use(modelBindingMiddleware.handle);
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
      context: ({ res }) => ({ ...res.locals }),
    });

    this.server.applyMiddleware({ app: this.app });
  }
}

export const app = new Application().app;
