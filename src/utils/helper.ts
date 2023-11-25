/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express'

export const successResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
): void => {
  const response = {
    success: true,
    message,
    data,
  }
  res.status(statusCode).json(response)
}

export const errorResponse = (
  res: Response,
  statusCode: number,
  message: string,
) => {
  const response = {
    success: false,
    message: message,
    error: {
      code: statusCode,
      description: message,
    },
  }
  res.status(statusCode).json(response)
}
