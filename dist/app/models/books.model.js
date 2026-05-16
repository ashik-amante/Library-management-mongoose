import { model, Schema } from "mongoose";
import {} from "../interfaces/book.interface.js";
const booksSchema = new Schema({
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
            validator: (value) => Number.isInteger(value),
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
});
booksSchema.static("updateAvailability", async function (bookId) {
    const book = await this.findById(bookId);
    if (!book) {
        throw new Error("Book not found");
    }
    book.available = book.copies > 0;
    await book.save();
    return book;
});
export const Book = model("Book", booksSchema);
//# sourceMappingURL=books.model.js.map