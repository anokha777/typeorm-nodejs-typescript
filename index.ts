import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

const app = express();
app.use(helmet());
const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3000;

createConnection()
  .then(() => {
    console.log("DB Connected");
  })
  .catch((e) => {
    console.log('Error:' + e);
  });

app.listen(PORT, () => {
  console.log('Server is up on port - ', PORT);
});

// app.use('/api', misrouter);

app.get('/api/health', (req: Request, res: Response) => {
  res.json(`jnc-mis service health is good, and runnubf on port ${PORT}`);
});

app.use((error: any, req: Request, res: Response, next: any) => {
  console.log('error - ', error);
  if (error)
    res
      .status(500)
      .send({ statusCode: error.statusCode, msg: error.error.msg });
  next();
});

app.use((req: Request, res: Response) => {
  res.status(404).send('NOT Found.');
});
