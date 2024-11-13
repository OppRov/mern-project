import mongoose from 'mongoose'
import validator from 'email-validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 50,
        validate: {
            validator: (email) => {
                return validator.validate(email)
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        maxLength: 50
    }
})

const User = mongoose.model("User", userSchema)
export default User