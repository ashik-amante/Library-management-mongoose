import { model } from "mongoose"
import { Schema } from "mongoose"
import { type IBorrow } from "../interfaces/borrow.interface.js"

const borrowSchema = new Schema<IBorrow>({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        min: [1, "Quantity must be greater than 0"],
        validate: {
            validator: (value: number) => Number.isInteger(value) && value > 0,
        },
        required: true,
    },
    dueDate: {
        type: Date,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

export const Borrow = model<IBorrow>("Borrow", borrowSchema)