import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

import {
  type UserModel,
  type IAddress,
  type IFullName,
  type IUser,
  IProduct,
} from './user.interface'

const fullNameSchema = new Schema<IFullName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
})

const addressSchema = new Schema<IAddress>({
  street: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  city: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
  country: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50,
  },
})

const productSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: [true, 'Product Name is required!'],
    trim: true,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: [true, 'Product Price is required!'],
  },
  quantity: {
    type: Number,
    required: [true, 'Product Quantity is required!'],
  },
})

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    required: [true, 'userId is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'username is required'],
    unique: true,
    maxlength: [20, "username can't be more than 20 character"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Max length of the passowd is 20'],
    trim: true,
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Need to provide the name'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
  hobbies: [
    {
      type: String,
    },
  ],
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: [
    {
      type: productSchema,
    },
  ],
})

// remove password form quesry resuslt
userSchema.methods.toJSON = function () {
  const user = this

  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

// hash password before save the document
userSchema.pre('save', { document: true, query: false }, async function (next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, Number(process.env.SALT))
  }
  next()
})

userSchema.static('isUserExists', async function (userId) {
  const user = await User.findOne({ userId })
  return user
})

export const User = model<IUser, UserModel>('User', userSchema)
