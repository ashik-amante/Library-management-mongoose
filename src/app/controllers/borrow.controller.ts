import express, { type Request, type Response } from "express";
import { Borrow } from "../models/borrow.model.js";
import { Book } from "../models/books.model.js";


export const borrowRouter = express.Router()

borrowRouter.post('/', async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        })
    }
})

borrowRouter.get('/', async (req: Request, res: Response) => {
    try {
        const result = await Borrow.aggregate([
    {
        $group: { 
            _id: "$book",
            totalQuantity : {$sum : "$quantity"}
        }
    },
    {
        $lookup: {
               from: "books",
               localField: "_id",
               foreignField: "_id",
               as: "book"
             }
    },
    { $unwind: "$book"},
    {
        $project: {
            _id : 0,
            totalQuantity:1,
            book: {
                title : "$book.title",
                isbn : "$book.isbn"
            }
        }
    }
])
res.status(200).json({
    success: true,
    message: "Borrowed books summary retrieved successfully",
    data: result
})
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error
        })
    }
})