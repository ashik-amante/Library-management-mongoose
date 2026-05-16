import type { Schema } from "mongoose";
export interface IBorrow {
    book: Schema.Types.ObjectId;
    quantity: number;
    dueDate: Date;
}
//# sourceMappingURL=borrow.interface.d.ts.map