/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { IProduct, type IUser } from './user.interface'
import { User } from './user.model'

const createUserIntoDB = async (userData: IUser): Promise<IUser | null> => {
  const result = await User.create(userData)
  return result
}

const getAllUsersFromDB = async () => {
  const results = await User.find()
  return results
}

const getUserByUserIdFromDB = async (userId: number) => {
  const results = await User.findOne({ userId })
  return results
}

const deleteUserByUserIdFromDB = async (userId: number) => {
  const results = await User.findOneAndDelete({ userId })
  return results
}

const updateUserByUserId = async (userId: number, userData: IUser) => {
  const result = await User.findOneAndUpdate({ userId }, { ...userData })
  return result
}

const addNewProductInOrder = async (userId: number, productData: IProduct) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: productData } },
  )
  return result
}

const getUserOrders = async (userId: number) => {
  const result = await User.findOne({ userId })
  return { orders: result?.orders }
}

const getUserOrderTotal = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
    {
      $unwind: '$orders',
    },
    {
      $project: {
        _id: 0,
        orderTotal: {
          $multiply: ['$orders.price', '$orders.quantity'],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: '$orderTotal',
        },
      },
    },
  ])

  return result
}

export const UserService = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByUserIdFromDB,
  updateUserByUserId,
  deleteUserByUserIdFromDB,
  addNewProductInOrder,
  getUserOrders,
  getUserOrderTotal,
}