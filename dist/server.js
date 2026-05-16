import 'dotenv/config';
import mongoose from "mongoose";
import { Server } from "http";
import app from "./app.js";
let server;
const PORT = 3000;
async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h2l9h.mongodb.net/Library_management?appName=Cluster0`);
        console.log('connected to databa');
        server = app.listen(PORT, () => {
            console.log(`${server} is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
//# sourceMappingURL=server.js.map