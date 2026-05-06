# MongoDB Setup Guide with MongoDB Compass

## 📋 Prerequisites

You have MongoDB Compass installed ✅

Now you need to ensure MongoDB Server is running on your machine.

---

## Step 1: Check if MongoDB Server is Installed

### Windows

Open PowerShell and run:
```powershell
mongod --version
```

If you see version information, MongoDB is installed. If not, proceed to installation.

### Check if MongoDB Service is Running

```powershell
# Check MongoDB service status
Get-Service -Name MongoDB

# If not running, start it:
Start-Service -Name MongoDB

# OR use net command:
net start MongoDB
```

---

## Step 2: Install MongoDB Server (If Not Installed)

### Windows Installation

1. **Download MongoDB Community Server**
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows
   - Version: Latest (7.0 or higher)
   - Package: MSI

2. **Run the Installer**
   - Choose "Complete" installation
   - ✅ Check "Install MongoDB as a Service"
   - ✅ Check "Run service as Network Service user"
   - Data Directory: `C:\Program Files\MongoDB\Server\7.0\data`
   - Log Directory: `C:\Program Files\MongoDB\Server\7.0\log`

3. **Install MongoDB Compass** (Already done ✅)
   - The installer may offer to install Compass
   - You already have it, so you can skip this

4. **Verify Installation**
   ```powershell
   mongod --version
   mongo --version  # or mongosh --version
   ```

---

## Step 3: Start MongoDB Service

### Option A: Using Windows Services

1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Find "MongoDB" in the list
4. Right-click → Start (if not running)
5. Right-click → Properties → Set Startup type to "Automatic"

### Option B: Using Command Line

```powershell
# Start MongoDB service
net start MongoDB

# Check status
Get-Service -Name MongoDB

# Stop MongoDB (if needed)
net stop MongoDB
```

---

## Step 4: Connect with MongoDB Compass

### 1. Open MongoDB Compass

### 2. Create New Connection

**Connection String:**
```
mongodb://127.0.0.1:27017
```

OR

```
mongodb://localhost:27017
```

### 3. Connection Details

- **Host**: `127.0.0.1` or `localhost`
- **Port**: `27017` (default)
- **Authentication**: None (for local development)

### 4. Click "Connect"

You should see the MongoDB Compass interface with default databases:
- `admin`
- `config`
- `local`

---

## Step 5: Create EVIDMS Database

### Option A: Using Compass GUI

1. Click "Create Database" button (or the + icon)
2. **Database Name**: `evidms`
3. **Collection Name**: `users` (we'll create others later)
4. Click "Create Database"

### Option B: Using MongoDB Shell

If you have `mongosh` installed:

```bash
# Open MongoDB Shell
mongosh

# Create database and collection
use evidms
db.createCollection("users")

# Verify
show dbs
show collections

# Exit
exit
```

---

## Step 6: Verify Backend Configuration

Your backend `.env` file should have:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/evidms
```

This is already configured! ✅

---

## Step 7: Test the Connection

### Install Backend Dependencies

```bash
cd backend
npm install
```

### Start the Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
```

---

## Step 8: Seed the Database (Optional)

Populate the database with sample data:

```bash
cd backend
npm run seed
```

This will create:
- Sample users (applicants, embassy officers, admins)
- Sample applications
- Test data for development

---

## 🔍 Verify in MongoDB Compass

After seeding, refresh Compass and you should see:

**Database: evidms**
- 📁 users
- 📁 applications
- 📁 otps
- 📁 embassies (if applicable)

Click on each collection to view the documents.

---

## 🎯 MongoDB Compass Features

### View Data
- Click on a collection to see documents
- Use filters to search: `{ role: "applicant" }`
- Sort and limit results

### Add Documents
- Click "Add Data" → "Insert Document"
- Paste JSON or use the GUI editor

### Edit Documents
- Click on a document
- Click the pencil icon to edit
- Save changes

### Delete Documents
- Hover over a document
- Click the trash icon

### Create Indexes
- Go to "Indexes" tab
- Click "Create Index"
- Useful for performance optimization

---

## 🔧 Common Issues & Solutions

### Issue 1: "MongoDB service not found"

**Solution**: MongoDB Server is not installed
- Follow Step 2 to install MongoDB Community Server
- Ensure "Install as Service" is checked during installation

### Issue 2: "Connection refused" or "ECONNREFUSED"

**Solution**: MongoDB service is not running
```powershell
# Start the service
net start MongoDB

# Or check if it's running
Get-Service -Name MongoDB
```

### Issue 3: "Access denied" or "Authentication failed"

**Solution**: For local development, no authentication is needed
- Use: `mongodb://127.0.0.1:27017/evidms`
- Don't include username/password for local setup

### Issue 4: Port 27017 already in use

**Solution**: Another MongoDB instance is running
```powershell
# Find process using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Restart MongoDB service
net start MongoDB
```

### Issue 5: "Database not found" in Compass

**Solution**: Database is created automatically when you insert data
- Run the seed script: `npm run seed`
- Or manually create it in Compass

---

## 📊 Database Schema

### Users Collection
```json
{
  "_id": "ObjectId",
  "passportId": "string",
  "email": "string",
  "fullName": "string",
  "role": "applicant | embassy | admin",
  "country": "string",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Applications Collection
```json
{
  "_id": "ObjectId",
  "applicantId": "ObjectId (ref: User)",
  "visaType": "string",
  "country": "string",
  "status": "draft | submitted | under_review | approved | rejected",
  "documents": ["array of file paths"],
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### OTPs Collection
```json
{
  "_id": "ObjectId",
  "passportId": "string",
  "otp": "string",
  "expiresAt": "Date",
  "verified": "boolean",
  "createdAt": "Date"
}
```

---

## 🎯 Quick Reference

### Connection String
```
mongodb://127.0.0.1:27017/evidms
```

### Start MongoDB
```powershell
net start MongoDB
```

### Stop MongoDB
```powershell
net stop MongoDB
```

### Check Status
```powershell
Get-Service -Name MongoDB
```

### Backend Commands
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Start with auto-reload
npm run seed         # Seed database
```

---

## ✅ Verification Checklist

- [ ] MongoDB Server installed
- [ ] MongoDB service running
- [ ] MongoDB Compass connected to `mongodb://127.0.0.1:27017`
- [ ] Database `evidms` created (or will be auto-created)
- [ ] Backend `.env` file configured
- [ ] Backend dependencies installed (`npm install`)
- [ ] Backend server starts without errors
- [ ] Can see "MongoDB connected" message
- [ ] (Optional) Database seeded with sample data
- [ ] Can view collections in Compass

---

## 🎉 You're Ready!

Once all steps are complete:
1. MongoDB is running locally
2. Compass is connected
3. Backend can connect to database
4. You can view/edit data in Compass

**Next**: Start your backend server and test the application!

```bash
cd backend
npm run dev
```

Then visit http://localhost:3000 to use the application! 🚀
