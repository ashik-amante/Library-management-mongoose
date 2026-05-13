import express, { type Request, type Response } from "express";
import { Book } from "../models/books.model.js";

export const booksRouter = express.Router()

booksRouter.post('/', async (req: Request, res: Response) => {
    try {
        const data = req.body
    const result = await Book.create(req.body)
    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: result
    })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Problem to insert book",
        error
      })  
    }
})
booksRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await Book.find()
    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: result
    })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Problem to retrieve books",
        error
      })  
    }
})
booksRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const bookId = req.params.bookId
    const result = await Book.findById(bookId)
    res.status(200).json({
        success: true,
        message: "Book retrieved successfully",
        data: result
    })
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Problem to retrieve single book",
        error
      })  
    }
})
booksRouter.patch('/:bookId', async (req: Request, res: Response) => {
   try {
     const bookId = req.params.bookId
    console.log(bookId);
    const updatedData = req.body
    const result = await Book.findByIdAndUpdate(bookId, updatedData, {returnDocument: 'after'})
    res.status(200).json({
        success: true,
        message: "Book updated successfully",
        data: result
    })
   } catch (error) {
    res.status(400).json({
        success: false,
        message: "Problem to update book",
        error   
    })
   }
})
booksRouter.delete('/:bookId', async (req: Request, res: Response) => {
   try {
     const bookId = req.params.bookId
    const result = await Book.findByIdAndDelete(bookId,{returnDocument: 'after'})
    res.status(200).json({
        success: true,
        message: "Book deleted successfully",
        data: result
    })
   } catch (error) {
    res.status(400).json({
        success: false,
        message: "Problem to delete book",
        error
    })
   }
})