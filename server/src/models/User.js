const mongoose = require('mongoose');
const validator = require('validator');
// const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken');
// const Event = require('./Event')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Value must be a valid email address!")
            }
        }
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, {
    timestamps: true
})

// userSchema.virtual('events', {
//     ref: 'Event',
//     localField: '_id',
//     foreignField: 'owner'
// })

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;
    delete userObject.avatar

    return userObject;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

userSchema.pre('save', async function(next) {
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

userSchema.pre('remove', async function(next) {
    const user = this
    await Event.deleteMany({ owner: user._id })
    next()
})

// userSchema.statics.findByCredentials = async (email, pass) => {
//     const user = await User.findOne({email})

//     if(!user){
//         throw new Error("Unable to login")
//     }

//     const isValidPass = await bcrypt.compare(pass, user.password)

//     if(!isValidPass){
//         throw new Error("Unable to login")
//     }

//     return user
// }

const User = mongoose.model('User', userSchema)

module.exports = User