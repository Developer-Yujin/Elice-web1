const { UserModel } = require("../schemas/user")

const User = {
    create: async ({ newUser }) => {
        const createdNewUser = await UserModel.create(newUser)
        return createdNewUser
    },

    findByEmail: async ({ email }) => {
        const user = await UserModel.findOne({ email })
        return user
    },

    findById: async ({ userId }) => {
        const user = await UserModel.findOne({ id: userId })
        return user
    },

    findAll: async () => {
        const users = await UserModel.find({})
        return users
    },

    update: async ({ user_id, updateObject }) => {
        const filter = { id: user_id }
        const update = { $set: updateObject }
        const option = { returnOriginal: false }

        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedUser
    },

    updatePassword: async ({ email, newPassword }) => {
        const filter = { email }
        const update = { password: newPassword }
        const option = { runValidators: true }

        const updatedUser = await UserModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedUser
    }
}

module.exports = { User }
