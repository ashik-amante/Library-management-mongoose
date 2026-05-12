import { Model, model, Schema } from "mongoose";
import {   type BookStaticMethods, type IBook } from "../interfaces/book.interface.js";


const booksSchema = new Schema<IBook, BookStaticMethods>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author is required"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Copies is required"],
        min: [0, "Copies must be a non-negative number"],
        validate: {
            validator: (value: number) => Number.isInteger(value),
            message: "Copies must be an integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false
})



booksSchema.static("updateAvailability", async function (bookId: Schema.Types.ObjectId) {
    const book = await this.findById(bookId)
    if (!book) {
        throw new Error("Book not found")
    }
    book.available = book.copies> 0
    return book
    }
  )
export const Book = model<IBook, BookStaticMethods>("Book", booksSchema)  