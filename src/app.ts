import express, {type Application, type Request, type Response } from 'express';
import { booksRouter } from './app/controllers/books.controller.js';
import { borrowRouter } from './app/controllers/borrow.controller.js';


const app: Application = express();

app.use(express.json());

app.use('/api/books', booksRouter)
app.use('/api/borrow', borrowRouter)

app.get('/', (req: Request, res:Response) => res.send('Library management system!'));

export default app 