import express from 'express';

import mongoose from 'mongoose';
import cors from 'cors';

import userRouter from './routes/user.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', userRouter);

const PORT = process.env.PORT || 5000;
const MONGODB =
  process.env.MONGODB_ATLAS ||
  'mongodb+srv://A36643:A36643@cluster0.ey4iw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })

  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);
