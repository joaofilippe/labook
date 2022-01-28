export default class UserBusiness {
    signup = async () => {
        let message = 'Sucesso!'
            
            if (!name || !email || !password) {
                res.statusCode = 406
                message = `As propriedades "name", "email" ou "password" não foram repassadas`
                throw new Error(message)
            }

            const id: string = generateId()
            const cypherPassword = await HashManager.hash(password)

            await connection('users')
                  .insert ({
                      id, name, email, cypherPassword
                  })
            const token : string = Authenticator.generateToken({id})
    }
}