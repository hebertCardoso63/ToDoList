import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('todos').then(exists => {
        if (!exists) {
            return knex.schema.createTable('todos', function(table) {
                table.increments('id').primary();
                table.string('titulo', 255).notNullable();
                table.text('descricao');
                table.string('status', 50).notNullable().defaultTo('pending');
                table.timestamp('data_criacao').defaultTo(knex.fn.now());
                table.timestamp('data_atualizacao').defaultTo(knex.fn.now());
                table.timestamp('data_exclusao');
                table.integer('usuario_id').unsigned().notNullable();
                table.foreign('usuario_id').references('id').inTable('usuarios').onDelete('CASCADE');
            });
        }
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('todos');
}

