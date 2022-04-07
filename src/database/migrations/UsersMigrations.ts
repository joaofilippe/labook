import BaseDatabase from '../Basedatabase';

const argv: string = process.argv[2];

export default class UsersMigrations extends BaseDatabase {
    tableName: string = 'users';

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
                        table.string('name').notNullable();
                        table.string('email').notNullable().unique();
                        table.string('password').notNullable();
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

export const usersMigrations = async (argv: string) => {
    const usersMigrations = new UsersMigrations();
    if (argv === 'check') {
        const check = await usersMigrations.check();
        if (check) {
            console.log(
                `A tabela "${usersMigrations.tableName}" já existe em seu banco de dados.`
            );
        } else {
            console.log(
                `A tabela "${usersMigrations.tableName}" não existe em seu banco de dados.`
            );
        }
        usersMigrations.destroy();
    } else if (argv === 'create') {
        await usersMigrations.create();
    } else if (argv === 'drop') {
        await usersMigrations.drop();
    } else {
        console.log('Parâmetros inválidos');
    }
};

usersMigrations(argv);
