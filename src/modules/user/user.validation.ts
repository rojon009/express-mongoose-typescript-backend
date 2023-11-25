import Joi from 'joi'

const fullNameSchema = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required().max(50),
})

const addressSchema = Joi.object({
  street: Joi.string().max(50).required(),
  city: Joi.string().max(50).required(),
  country: Joi.string().max(50).required(),
})

export const productValidationSchema = Joi.object({
  productName: Joi.string().required().max(50),
  price: Joi.number().required(),
  quantity: Joi.number().integer().required(),
})

const userValidationSchema = Joi.object({
  userId: Joi.number().required(),
  username: Joi.string()
    .required()
    .min(3)
    .max(20)
    .message('At least need 3 character'),
  password: Joi.string().required().max(20),
  fullName: fullNameSchema.required(),
  age: Joi.number().required(),
  email: Joi.string().email().max(250).required(),
  isActive: Joi.boolean().valid(true, false).default(true).required(),
  hobbies: Joi.array().items(Joi.string()),
  address: addressSchema.required(),
})

export default userValidationSchema
