/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, type Request, type Response } from 'express'
import userValidationSchema, {
  productValidationSchema,
} from './user.validation'
import { errorResponse, successResponse } from '../../utils/helper'
import { UserService } from './user.service'
import { User } from './user.model'

const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { user: userData } = req.body

    if (await User.isUserExists(userData.userId)) {
      throw new Error('User already Exist with this UserId')
    }

    const validatedUserData = userValidationSchema.validate(userData)

    if (validatedUserData.error) {
      errorResponse(res, 422, validatedUserData.error?.message)
      return
    }

    const result = await UserService.createUserIntoDB(validatedUserData.value)

    successResponse(res, 201, 'User created successfully!', result)
  } catch (err: any) {
    next(err.message)
  }
}

const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const results = await UserService.getAllUsersFromDB()

    if (!results.length) {
      successResponse(res, 200, 'No users found in DB', results)
    }

    successResponse(res, 200, 'Users fetched successfully!', results)
  } catch (err: any) {
    next(err.message)
  }
}

const getUserByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params

    if (!(await User.isUserExists(Number(userId)))) {
      errorResponse(res, 404, 'User not found')
      return
    }

    const result = await UserService.getUserByUserIdFromDB(Number(userId))

    successResponse(res, 200, 'User fetched successfully!', result)
  } catch (err: any) {
    next(err.message)
  }
}

const deleteUserByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params

    if (!(await User.isUserExists(Number(userId)))) {
      errorResponse(res, 404, 'User not found')
      return
    }

    await UserService.deleteUserByUserIdFromDB(Number(userId))

    successResponse(res, 200, 'User deleted successfully!', null)
  } catch (err: any) {
    next(err.message)
  }
}

const updateUserByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params
    const { user: userData } = req.body

    if (!(await User.isUserExists(Number(userId)))) {
      errorResponse(res, 404, 'User not found')
      return
    }

    const validatedUserData = userValidationSchema.validate(userData)

    if (validatedUserData.error) {
      errorResponse(res, 422, validatedUserData.error?.message)
      return
    }

    const result = await UserService.updateUserByUserId(
      Number(userId),
      userData,
    )

    successResponse(res, 200, 'User updated successfully!', result)
  } catch (err: any) {
    next(err.message)
  }
}

const addNewProductToOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params
    const productData = req.body

    if (!(await User.isUserExists(Number(userId)))) {
      errorResponse(res, 404, 'User not found')
      return
    }

    const validatedProductData = productValidationSchema.validate(productData)

    if (validatedProductData.error) {
      errorResponse(res, 422, validatedProductData.error?.message)
      return
    }

    await UserService.addNewProductInOrder(
      Number(userId),
      validatedProductData.value,
    )

    successResponse(res, 200, 'Order created successfully!', null)
  } catch (err: any) {
    next(err.message)
  }
}

const getUserOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params

    if (!(await User.isUserExists(Number(userId)))) {
      errorResponse(res, 404, 'User not found')
      return
    }

    const result = await UserService.getUserOrders(Number(userId))

    successResponse(res, 200, 'Order fetched successfully!', result)
  } catch (err: any) {
    next(err.message)
  }
}

const getUserOrderTotal = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params

    if (!(await User.isUserExists(Number(userId)))) {
      errorResponse(res, 404, 'User not found')
      return
    }

    const result = (await UserService.getUserOrderTotal(Number(userId))) as [
      {
        totalPrice: number
      },
    ]

    if (!result || !result.length) {
      errorResponse(res, 404, 'No Order has been found for this User!')
      return
    }

    const { totalPrice } = result?.[0]

    successResponse(res, 200, 'Total price calculated successfully!', {
      totalPrice,
    })
  } catch (err: any) {
    next(err.message)
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getUserByUserId,
  updateUserByUserId,
  deleteUserByUserId,
  addNewProductToOrders,
  getUserOrders,
  getUserOrderTotal,
}
