import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  uniqueId: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true },
  designation: { type: String, required: true },
  gender: { type: String, required: true },
  courses: { type: [String], required: true },
  createDate: { type: Date, default: Date.now }
});

export const Employee = mongoose.model('Employee', EmployeeSchema);
