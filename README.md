# Spam Checker API (Express + Sequelize + EJS)

Feature set:
- Register / Login (JWT in HTTP-only cookie)
- Protected routes (middleware)
- Contacts per user
- Mark numbers as spam
- Search by name / phone with spam likelihood
- EJS Bootstrap UI

## Setup

```bash
npm install
# Update .env with your MySQL credentials
npm run seed   # optional: create tables and sample data
npm run dev    # or: npm start
```
Open http://localhost:3000

Seeded demo users:
- Alice — phone: 1111111111 — password: password123
- Bob   — phone: 2222222222 — password: password123
- Carol — phone: 3333333333 — password: password123
