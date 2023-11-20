import express from 'express';
import cors from 'cors';
// import personRoutes from './routes/personRoutes';

const app = express();

app.use(cors());
app.use(express.json());
// app.use('/api/persons', personRoutes);

export default app;
