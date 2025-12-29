# Shopease 🛒

Shopease is a React-based web application. Follow the steps below to clone the project and run it locally on your system.

---

## Prerequisites

Make sure you have the following installed on your system:

* **Node.js** (v16 or above recommended)
* **npm** (comes with Node.js)
* **Git**


## Steps to Run the Project

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Sinchanabh/Shopease.git
```

# Shopease – Run Instructions

## Backend

cd Shopease
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cd ..

cmd /c "cd Shopease & call backend\venv\Scripts\activate.bat & python -m uvicorn backend.main:app --reload --host localhost --port 8000"


Backend URL:
http://localhost:8000
http://localhost:8000/docs

--------------------------------------------

## Frontend

cd Shopease
npm run dev

Frontend URL:
http://localhost:5173


## 📌 Notes

* If you face errors while running the project, try deleting `node_modules` and run `npm install` again.
* Make sure no other application is running on port 3000.

---

## 🛠 Technologies Used

* React.js
* JavaScript
* HTML5
* TailwindCSS
---


## 📧 Author

**Sinchana**

GitHub: [https://github.com/Sinchanabh]

---
