import express from 'express';
import { Employee } from '../models/Employee.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get('/dashboard/employees', upload.single('image'), async (req, res) => {
  const { name, email, mobileNo, designation, gender, courses } = req.body;
  const uniqueId = uuidv4();

  try {
    const newEmployee = new Employee({
      uniqueId,
      image: req.file.path,
      name,
      email,
      mobileNo,
      designation,
      gender,
      courses: courses.split(',')
    });

    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/dashboard/employees', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    // res.status(400).json({ error: error.message });
  }
});

export default router;
