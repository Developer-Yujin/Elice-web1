const { EducationModel } = require("../schemas/education")

const Education = {
    create: async ({ newEducation }) => {
        const education = await EducationModel.create(newEducation)
        return education
    },

    findById: async ({ educationId }) => {
        const education = await EducationModel.find({ id: educationId })
        return education
    },

    findByUserId: async ({ user_id }) => {
        const education = await EducationModel.find({ user_id })
        return education
    },

    update: async ({ educationId, fieldToUpdate, newValue }) => {
        const filter = { id: educationId }
        // String을 key값으로 쓸 땐 배열로 감싸줌
        // $set : { key0: value0, key1: value1, ... } -> aggregation stage
        const update = {
            $set: {
                [fieldToUpdate[0]]: newValue[0],
                [fieldToUpdate[1]]: newValue[1],
                [fieldToUpdate[2]]: newValue[2],
                [fieldToUpdate[3]]: newValue[3]
            }
        }
        const option = { returnOriginal: false }

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedEducation
    },

    deleteById: async ({ educationId }) => {
        const deleteResult = await EducationModel.deleteOne({ id: educationId })
        const isDataDelete = deleteResult.deletedCount === 1

        return isDataDelete
    }
}

module.exports = { Education }
