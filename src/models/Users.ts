import { User } from "../entities/Users"

export default class UserModels{
    toUserModel = (obj: any) => {
        const user: User = {
            id: obj.id,
            name: obj.name,
            email: obj.email,
            password: obj.paswword
        }

        return obj && user
    }
}