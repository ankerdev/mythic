import * as Knex from 'knex';

const tableName: string = 'users';

export const up = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email').unique();
    table.string('password');
    table.boolean('isAdmin').defaultTo(false);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();
  });
};

export const down = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.dropTable(tableName);
};
