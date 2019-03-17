import * as Knex from 'knex';

const tableName: string = 'users';

export const up = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.createTable(tableName, (table) => {
    table.uuid('id').primary();
    table.string('first_name');
    table.string('last_name');
    table.string('email').unique();
    table.string('password');
    table.boolean('is_admin').defaultTo(false);
    table.timestamps();
    table.dateTime('deleted_at');
  });
};


export const down = async (knex: Knex): Promise<Knex.SchemaBuilder> => {
  return knex.schema.dropTable(tableName);
};
