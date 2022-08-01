const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity")

const userSchema = mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  dateBirth: {type: Date, required: true},
})

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({_id: this._id, email: this.email}, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d"
  })
  return token
}

const User = mongoose.model("user", userSchema)

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label('Email'),
    password: passwordComplexity().required().label("Password"),
    dateBirth: Joi.date().less('12-31-2013').required().label("Date Birth").messages({"date.less": "Date of birth should not be after year 2013"})
  })
  return schema.validate(data)
}

module.exports = {User, validate}