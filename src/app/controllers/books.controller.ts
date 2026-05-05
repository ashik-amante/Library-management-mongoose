import express, { type Request, type Response } from "express";
import { Book } from "../models/books.model";

export const booksRouter = express.Router()

booksRouter.post('/', async (req: Request, res: Response) => {
    const data = req.body
    const result = await Book.create(req.body)
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result
    })
})
booksRouter.get('/', async (req: Request, res: Response) => {
    const result = await Book.find()
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: result
    })
})
booksRouter.get('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const result = await Book.findById(bookId)
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result
    })
})
booksRouter.patch('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    console.log(bookId);
    const updatedData = req.body
    const result = await Book.findByIdAndUpdate(bookId, updatedData, {returnDocument: 'after'})
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: result
    })
})
booksRouter.delete('/:bookId', async (req: Request, res: Response) => {
    const bookId = req.params.bookId
    const result = await Book.findByIdAndDelete(bookId,{returnDocument: 'after'})
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: result
    })
})