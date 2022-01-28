import { User } from "../entities/Users"

export default class UserModels{
    toUserModel = (obj: any) : User=> {
        const user: User = {
            id: obj.id,
            name: obj.name,
            email: obj.email,
            password: obj.password
        }

        return obj && user
    }
}