import { model } from "mongoose";
import { Schema } from "mongoose";
import {} from "../interfaces/borrow.interface.js";
const borrowSchema = new Schema({
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
        required: true,
    },
    quantity: {
        type: Number,
        min: [0, "Quantity must be greater than 0"],
        validate: {
            validator: (value) => Number.isInteger(value) && value >= 0,
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
});
export const Borrow = model("Borrow", borrowSchema);
//# sourceMappingURL=borrow.model.js.map