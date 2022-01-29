import BaseDatabase from "../Basedatabase";


class Migrations extends BaseDatabase{
 createTable = async () => {
    try {
        await this.connection.raw(`
        CREATE TABLE users(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL 
            )
        `)
        await this.connection.raw(`
        CREATE TABLE posts(
            id VARCHAR(255) PRIMARY KEY,
            photo VARCHAR(255) NOT NULL,
            description VARCHAR(255) UNIQUE NOT NULL,
            type ENUM("NORMAL", "EVENT") DEFAULT "NORMAL",
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            author_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (author_id) REFERENCES users(id) 
            )
        `)

        console.log('MySQL setup completed')
    } catch (error: any) {
        console.log(error.message)
    } finally {
        this.connection.destroy()
    }
 }
    
}

const migrations = new Migrations()
migrations.createTable()