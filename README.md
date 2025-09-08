# Subscription-Based Job Portal

A **MERN stack** web application that connects job seekers with employers using a subscription model. Job seekers can browse and apply for jobs, while employers can post job listings and manage applications. Premium features are available through subscription plans.

---

## 🛠 Tech Stack

- **Frontend:** React JS, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payment Integration:** Razorpay  
- **Email:** Nodemailer  
- **Other Tools/Libraries:** bcrypt, cookie-parser, cors, multer, validator, node-cron, dotenv  

---

## 📂 Backend Structure

### Packages Used

- **bcrypt:** Password hashing  
- **cookie-parser:** Parse cookies in requests  
- **cors:** Enable Cross-Origin Resource Sharing  
- **dataurl:** Handle Data URLs (Base64, etc.)  
- **dotenv:** Environment variable management  
- **express:** Web framework  
- **jsonwebtoken (JWT):** Authentication & authorization  
- **mongoose:** MongoDB object modeling  
- **multer:** File uploads  
- **node-cron:** Task scheduling  
- **nodemailer:** Sending emails  
- **razorpay:** Payment gateway integration  
- **validator:** Data validation  

### Folder Structure

| Folder        | Files / Description                                  |
|---------------|-----------------------------------------------------|
| **Config**    | `config.env`, `database.js`                         |
| **Models**    | `User.js`, `Jobs.js`                                |
| **Controllers** | `authController.js`, `jobController.js`         |
| **Routes**    | `authRoutes.js`, `jobsRoutes.js`                   |
| **Middlewares** | `catchAsyncError.js`, `ErrorMiddleware.js`      |
| **Utils**     | `errorHandler.js` (Custom Error Handler)           |

### Main Files

- `app.js`  
- `server.js`  

---

## 🧩 Models Structure

### User Model

| Field                 | Type    | Description |
|-----------------------|--------|-------------|
| name                  | String | Full name (required) |
| email                 | String | Email (unique, valid, required) |
| number                | String | Phone number (required) |
| password              | String | Password (min length 6, required, not returned by default) |
| role                  | String | User role (admin or user, default: user) |
| subscription          | Object | Subscription details (`id`, `status`) |
| avatar                | Object | Avatar details (`public_id`) |
| createdAt             | Date   | Account creation timestamp |
| ResetPasswordToken    | String | Token for password reset |
| ResetPasswordExpire   | String | Token expiry |

### Jobs Model

| Field            | Type   | Description |
|-----------------|--------|-------------|
| title            | String | Job title (required, trimmed) |
| description      | String | Detailed job description (required) |
| company          | String | Company offering the job (required) |
| location         | String | Job location (required) |
| salary           | Number | Offered salary (default: 0) |
| jobType          | String | Full-time, Part-time, Internship, Contract, Remote (default: Full-time) |
| experienceLevel  | String | Fresher, Mid-level, Senior (default: Fresher) |
| postedDate       | Date   | Date when job is posted (default: current date) |
| deadline         | Date   | Application deadline |
| createdAt        | Date   | Auto-generated timestamp |
| updatedAt        | Date   | Auto-updated timestamp |

---

## 🖥 Frontend Structure

- **Pages/Components:**
  - Register  
  - Login  
  - Subscription Plans  
  - Admin Dashboard  
  - View Profile  
  - Job Listings / Applications  

- **Features:**
  - User authentication & authorization  
  - Role-based access (User/Admin)  
  - Subscription-based premium features  
  - Responsive design  

---

## ⚡ Features

- Secure user registration and login  
- Job posting and application management  
- Admin dashboard for managing users and jobs  
- Subscription plans with Razorpay payment integration  
- File uploads (resumes, company logos)  
- Email notifications via Nodemailer  
- Cron jobs for scheduled tasks  

---

## 🔧 Setup Instructions

1. **Clone the repository**
```bash
git clone <repo-url>
cd Subscription-Job-Portal
