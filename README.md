<div align="center">

# 🏥 DOCTOR-MEDS

### Hospital Management System — Powered by AI & Modern Web Technologies

[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-5.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> A full-stack, AI-powered Hospital Management System that streamlines patient care, appointment scheduling, prescription tracking, and disease prediction — all under one roof.

</div>

---

## ✨ Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** — secure, stateless, and scalable
- **Role-based access control** — three distinct portals: Admin, Doctor, Patient
- **bcrypt password hashing** — industry-standard security

### 👤 Patient Portal
- Register and manage personal health profiles
- Book, view, and manage appointments with doctors
- Access prescriptions and medical history
- AI-powered **Disease Prediction** based on symptoms

### 👨‍⚕️ Doctor Portal
- Manage personal schedule and availability
- View and update patient appointments
- Issue and track prescriptions
- Access patient medical records

### 🛡️ Admin Portal
- Full system oversight and user management
- Manage doctor registrations and profiles
- Monitor all appointments and system activity
- Role assignment and access control

### 🤖 AI Disease Prediction
- ML model trained on **132 symptoms** to predict diseases
- Built with Python (scikit-learn), served via a Node.js/FastAPI bridge
- Interactive symptom selector with instant results

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, TailwindCSS 4, React Router 7 |
| **Backend** | Node.js 18, Express 5 |
| **Database** | MongoDB 6 + Mongoose ODM |
| **Authentication** | JWT (jsonwebtoken) + bcrypt |
| **ML Model** | Python, scikit-learn, joblib |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |
| **Dev Tools** | Nodemon, ESLint, Prettier |

---

## 📁 Project Structure

```
Doctor-Meds/
├── backend/                    # Node.js + Express API
│   ├── models/                 # Mongoose schemas
│   │   ├── User.js
│   │   ├── Admin.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   └── Prescription.js
│   ├── routes/                 # API route handlers
│   │   ├── signup.js
│   │   ├── login.js
│   │   ├── admin.js
│   │   ├── doctor.js
│   │   └── patient.js
│   ├── server.js               # Express entry point
│   └── package.json
│
├── frontend/                   # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.jsx        # Landing page
│   │   │   ├── Login.jsx
│   │   │   ├── SignUp.jsx
│   │   │   ├── Patient.jsx     # Patient dashboard
│   │   │   ├── Doctors.jsx     # Doctor dashboard
│   │   │   ├── Admins.jsx      # Admin dashboard
│   │   │   └── DiseasePredictor.jsx  # AI prediction UI
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── ml-model-api/           # Python ML microservice
│   │   ├── main.py             # FastAPI server
│   │   ├── train_model.py      # Model training script
│   │   ├── requirements.txt
│   │   └── *.joblib            # Trained model files
│   └── package.json
│
├── render.yaml                 # Render deployment config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) (local) **or** a [MongoDB Atlas](https://cloud.mongodb.com) account
- [Python 3.10+](https://www.python.org/) (for the ML model)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/aditya-1739/Doctor-Meds.git
cd Doctor-Meds
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/doctor_meds
JWT_SECRET=your_super_secret_key_here
FRONTEND_URL=http://localhost:5173
```

> 💡 For **MongoDB Atlas**, replace `MONGODB_URI` with your Atlas connection string:
> `mongodb+srv://<user>:<password>@cluster.mongodb.net/doctor_meds`

Start the backend server:

```bash
npm run dev        # Development (with nodemon auto-restart)
# or
npm start          # Production
```

Backend runs at → **http://localhost:5000**

---

### 3. Setup the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at → **http://localhost:5173**

---

### 4. Setup the ML Model (Disease Prediction)

```bash
cd frontend/ml-model-api
pip install -r requirements.txt
python main.py
```

ML API runs at → **http://localhost:8000**

---

## 🌐 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/signup` | Register a new user |
| `POST` | `/api/login` | Login and receive JWT |

### Patient
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/patient/appointments` | Get patient appointments |
| `POST` | `/api/patient/appointments` | Book an appointment |
| `GET` | `/api/patient/prescriptions` | Get patient prescriptions |

### Doctor
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/doctor/appointments` | Get assigned appointments |
| `PUT` | `/api/doctor/appointments/:id` | Update appointment status |
| `POST` | `/api/doctor/prescriptions` | Create a prescription |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/admin/users` | Get all users |
| `GET` | `/api/admin/doctors` | Get all doctors |
| `DELETE` | `/api/admin/users/:id` | Remove a user |

---

## ☁️ Deployment

This project is configured for **[Render](https://render.com)** via `render.yaml`.

### Deploy to Render

1. Push this repo to your GitHub
2. Connect your GitHub account on [render.com](https://render.com)
3. Create a new **Blueprint** and point it to this repo — Render will auto-detect `render.yaml`
4. Set the following **environment variables** in the Render dashboard:

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong random secret key |
| `FRONTEND_URL` | Your deployed frontend URL |

> ⚠️ **Never commit your `.env` file.** It is already excluded via `.gitignore`.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**.

---

<div align="center">

Made with ❤️ for better healthcare management

⭐ **Star this repo if you found it helpful!** ⭐

</div>
