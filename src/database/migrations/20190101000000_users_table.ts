import * as Knex from 'knex';

const tableName: string = 'users';

export async function up(knex: Knex): Promise<any> {
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


export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(tableName);
};

