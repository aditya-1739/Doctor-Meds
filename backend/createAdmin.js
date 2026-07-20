import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));


async function createAdmin() {
  const admin = new Admin({
    firstName: "Aditya",
    lastName: "Dev",
    email: "aditya2005.dwivedi@gmail.com",
    password: "Aditya2005@", 
    role: "admin"
  });

  try {
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();