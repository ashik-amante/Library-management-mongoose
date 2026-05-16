import express, {} from 'express';
import { booksRouter } from './app/controllers/books.controller.js';
import { borrowRouter } from './app/controllers/borrow.controller.js';
const app = express();
app.use(express.json());
app.use('/api/books', booksRouter);
app.use('/api/borrow', borrowRouter);
app.get('/', (req, res) => res.send('Library management system!'));
export default app;
//# sourceMappingURL=app.js.map