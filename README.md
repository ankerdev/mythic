# mythic 🔮

A little framework that allows you to spin up a GraphQL API in no time. 🚀

Out of the box, it comes with swell features such as:

- Models and ORM using objection.js [https://vincit.github.io/objection.js/], with added soft delete, `withTrashed()` and restore functionality
  - The typings for the soft deleting functions are currently missing, as I would need to fork objection.js.
  - You can still run these functions by doing `await (<any>User).query().withTrashed()...` (yeah, I know, it's not great...)
  - Look at `./src/mythic/lib/objection/` to explore this funcitonality
- Database migrations and seeds utilizing knex [https://knexjs.org/]
- Apollo Server (GraphQL Implementation) [https://www.apollographql.com/docs/apollo-server/]
- A basic User model with GraphQL type definitions and resolvers, automatic password hashing on insert/update and login functionality
- JWT authentication and middleware
- Resolver model binding (queried models are bound to the context by middleware)
- Authorization policies
- CORS
- IP restriction

## How do I use this?

1. Run `npm i` to install dependencies
2. Copy `.env.example` to `.env` and set your environment variables

- Don't forget to generate a `JWT_SECRET`

3. Run the default `User` and `Post` migrations by running `./node_modules/.bin/knex migrate:latest --knexfile knexfile.ts`
4. Start the server in development by running `npm start`

## How do I make migrations?

- As our `knexfile` is in TypeScript we need to add `--knexfile knexfile.ts` to _all_ the knex commands
- You can run `knex` command from `./node_modules/.bin/knex` or install knex globally (`npm i -g knex`) to run it without the node_modules path
  - e.g. to make a migration `products_table` as a `.ts` file we run `knex migrate:make products_table --knexfile knexfile.ts -x ts` where `-x ts` defines our TypeScript extension
- Running migrations: `knex migrate:latest`
- Rolling back migrations: `knex migrate:rollback`

## Todo

If you like contributing to things and see something you can improve--fork the repo and PR your feature(s). 🏅

- Add `refreshAuthenticationToken` mutation
- Add out-of-the-box support for PubSub with Redis Pub/Sub
- Allow for more databases in config, e.g. SQLite3 and PostgreSQL (NB. needs to be supported by objection.js and knex)
- Other cool stuff to make it a better experience 😎

## Hacktoberfest

- PR1
- PR3
