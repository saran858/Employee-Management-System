import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/contactmyst/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});


app.get('/', (req, res) => {
  res.send('Welcome to your server'); 
});

app.use('/dashboard', employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
