import { type Model } from 'mongoose'

export interface IFullName {
  firstName: string
  lastName: string
}

export interface IAddress {
  street: string
  city: string
  country: string
}

export interface IProduct {
  productName: string
  price: number
  quantity: number
}

export interface IUser {
  userId: number
  username: string
  password: string
  fullName: IFullName
  age: number
  email: string
  isActive: boolean
  hobbies: string[]
  address: IAddress
  orders: IProduct[]
}

export interface UserModel extends Model<IUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists: (userId: number) => Promise<IUser | null>
}
