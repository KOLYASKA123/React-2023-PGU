import express from 'express';
import mainRoute from './routes/mainRoute.js';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';
import { dbConnect } from './db/db.js';

const app = express();
const PORT = 3900;

app.use(express.json());
app.use(cors());
app.use(mainRoute);
app.use(postRoute);
app.use(userRoute);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    dbConnect();
})