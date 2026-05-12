import express, { type Request, type Response } from "express";
import { Borrow } from "../models/borrow.model.js";
import { Book } from "../models/books.model.js";


export const borrowRouter = express.Router()

borrowRouter.post('/', async (req: Request, res: Response) => {
    const { book: bookId, quantity, dueDate } = req.body
    // find the book by id
    const book = await Book.findById(bookId)
    // check if the book exists
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
        })
    }
    // check copies
    if (book.copies < quantity) {
        return res.status(400).json({
            success: false,
            message: "Not enough copies",
        })
    }
    //  reduce copy
    book.copies = book.copies - quantity;
    // save the book
    await book.save()
    // update availability
    await Book.updateAvailability(bookId)

    // create borrow
    const borrow = await Borrow.create({
        book: bookId,
        quantity,
        dueDate: new Date(dueDate)
    })
    // const result = await Borrow.create(req.body)
    res.status(201).json({
        success: true,
        message: "Book borrowed successfully",
        data: borrow
    })
})