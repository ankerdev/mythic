# ts-express-graphql
- A WIP. More to come shortly.

#### Create migration
- knex migrate:make table_name --knexfile knexfile.ts -x ts

#### Run migrations
- knex migrate:latest --knexfile knexfile.ts

#### Rollback migrations
- knex migrate:rollback --knexfile knexfile.ts
