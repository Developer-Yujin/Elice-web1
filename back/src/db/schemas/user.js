const { Schema, model } = require("mongoose")

const UserSchema = new Schema(
    {
        id: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
          default: "설명이 아직 없습니다. 추가해 주세요.",
        },
        created_at: {
          type: Date,
          required: true,
        },
        updated_at: {
          type: Date,
          required: true,
        }
    }
)

const UserModel = model("User", UserSchema)

module.exports = { UserModel }