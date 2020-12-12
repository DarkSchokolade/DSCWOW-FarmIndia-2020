import bcrypt from 'bcryptjs'
const users = [{
    name : 'Adomin user',
    email: 'Admin@example.com',
    password: bcrypt.hashSync('123456',10),
    isAdmin: true
},
{
    name : 'John doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456',10)
},{
    name : 'Jane doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456',10)
},{
    name: 'Farmer',
    email: 'farmer@example.com',
    password: bcrypt.hashSync('12345',10),
    isVendor: true

}]

export default users