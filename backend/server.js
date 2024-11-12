import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './database/db.js';

import userRoute from './routes/usersRoute.js';
import blogRoute from './routes/blogRoute.js';
import commentRoute from './routes/commentRoute.js';
import emailRoute from './routes/emailRoute.js';

import { loadEnvFile } from 'process';
import { GreenLog } from './utils/Logger.js';
import { errorHandler, notFound } from './middleware/error/errorMiddleware.js';

//* Db and .env config
loadEnvFile('./.env');
connectDB();

const app = express();
const port = process.env.PORT;

//* config middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));

//* Resources middleware
app.use('/api/users', userRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/comments', commentRoute);
app.use('/api/email', emailRoute);

//* Error middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => GreenLog(`Server running on port ${port} 🔥`, 'blue'));
