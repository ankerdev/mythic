import * as Knex from 'knex';

const tableName: string = 'posts';

export const up = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.uuid('userId');
    table.string('title');
    table.text('content');
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();

    table.foreign('userId').references('id').inTable('users');
  });
};

export const down = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.dropTable(tableName);
};
