import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.hasTable('usuarios').then(exists => {
        if (!exists) {
            return knex.schema.createTable('usuarios', function(table) {
                table.increments('id').primary();
                table.string('nome_usuario', 255).unique().notNullable();
                table.string('senha', 255).notNullable();
                table.timestamp('data_criacao').defaultTo(knex.fn.now());
                table.timestamp('data_atualizacao').defaultTo(knex.fn.now());
                table.timestamp('data_exclusao');
            });
        }
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('usuarios');
}

