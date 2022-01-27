import connection from "../Basedatabase";

const createTables = async () => {
    try {
        await connection.raw(`
        CREATE TABLE users(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL 
            )
        `)
        await connection.raw(`
        CREATE TABLE posts(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL 
            )
        `)

        console.log('MySQL setup completed')
    } catch (error: any) {
        console.log(error.message)
    } finally {
        connection.destroy()
    }
}

createTables()