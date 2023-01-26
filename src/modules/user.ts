import jwt from 'jsonwebtoken'

class User {

    id: number;
    name: string;

    constructor(id, name) {
        this.id = id
        this.name = name
    }



    GenerateToken(id, user){}
}

User.prototype.GenerateToken = async function() {
    return jwt.sign({ id: this.id, user: this.user }, process.env.APP_SECRET)
}

export default User