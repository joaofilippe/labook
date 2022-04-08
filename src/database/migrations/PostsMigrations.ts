import BaseDatabase from '../Basedatabase';

const argv: string = process.argv[2];

export default class PostsMigrations extends BaseDatabase {
    tableName: string = 'posts';

    destroy = async () => {
        await this.connection.destroy();
    };

    check = async () => {
        try {
            return await this.connection.schema.hasTable(
                this.tableName
            );
        } catch (error: any) {
            console.log(error);
        }
    };

    create = async () => {
        try {
            const check = await this.check();
            if (check) {
                console.log(
                    `A tabela "${this.tableName} "já consta em seu banco de dados.`
                );
            } else {
                await this.connection.schema.createTable(
                    this.tableName,
                    (table) => {
                        table.string('id').primary().notNullable();
                        table.string('photo').notNullable()
                        table.string('description').unique().notNullable()
                        table.enum('type',['NORMAL', 'EVENT']).defaultTo('NORMAL')
                        table.timestamp("created_at")
                        table.string("author_id").references('id').inTable('users')
                    }
                );
            }

            console.log(
                `A tabela "${this.tableName}" foi criada com sucesso.`
            );
        } catch (error: any) {
            console.log(error);
        } finally {
            this.connection.destroy();
        }
    };

    drop = async () => {
        try {
            const check = await this.check();

            if (!check) {
                console.log(
                    `A tabela "${this.tableName}" não consta em seu banco de dados.`
                );
            } else {
                await this.connection.schema.dropTable(
                    this.tableName
                );
                console.log(
                    `A tabela "${this.tableName}" foi excluída com sucesso.`
                );
            }
        } catch (error: any) {
            console.log(error);
        } finally {
            this.connection.destroy();
        }
    };
}

export const postsMigrations = async (argv: string) => {
    const postsMigrations = new PostsMigrations();
    if (argv === 'check') {
        const check = await postsMigrations.check();
        if (check) {
            console.log(
                `A tabela "${postsMigrations.tableName}" já existe em seu banco de dados.`
            );
        } else {
            console.log(
                `A tabela "${postsMigrations.tableName}" não existe em seu banco de dados.`
            );
        }
        postsMigrations.destroy();
    } else if (argv === 'create') {
        await postsMigrations.create();
    } else if (argv === 'drop') {
        await postsMigrations.drop();
    } else {
        console.log('Parâmetros inválidos');
    }
};

postsMigrations(argv);
