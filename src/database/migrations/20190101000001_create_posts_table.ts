import * as Knex from 'knex';

const tableName: string = 'posts';

export const up = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.uuid('user_id');
    table.string('title');
    table.text('content');
    table.timestamps();
    table.dateTime('deleted_at');

    table.foreign('user_id').references('id').inTable('users');
  });
};


export const down = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.dropTable(tableName);
};
