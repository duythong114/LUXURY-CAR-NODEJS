import bcrypt from "bcryptjs";
import db from '../models/index';

let createNewUserService = (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password)
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender,
                groupId: data.groupId,
            })
            resolve()
        } catch (error) {
            reject(error);
        }
    })
}

let hashUserPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);

    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // test join table
            // let newUser = await db.User.findOne({
            //     where: { id: 12 },
            //     attributes: ['id', 'firstName', 'lastName'],
            //     include: { model: db.Group, attributes: ['id', 'name', 'description'] },
            //     raw: true,
            //     nest: true
            // })

            // let roles = await db.Role.findAll({
            //     attributes: ['id', 'url', 'description'],
            //     include: { model: db.Group, where: { id: 3 }, attributes: ['id', 'name', 'description'] },
            //     raw: true,
            //     nest: true
            // })

            // console.log("check new user:", newUser)
            // console.log("check roles:", roles)

            let users = await db.User.findAll()
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUserService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (userId) {
                await db.User.destroy({
                    where: {
                        id: userId
                    }
                })
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}

let getUserByIdService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId }
            })
            resolve(user)
        } catch (error) {
            reject(error)
        }
    })
}

let editUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName
                user.lastName = data.lastName
                user.address = data.address

                await user.save()
                resolve()
            } else {
                resolve('user not found')
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUserService: createNewUserService,
    getAllUserService: getAllUserService,
    deleteUserService: deleteUserService,
    getUserByIdService: getUserByIdService,
    editUserService: editUserService,
}

