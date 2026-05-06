# MongoDB Compass Quick Guide for EVIDMS

## ✅ Current Status

- **MongoDB Service**: Running ✅
- **Database**: `evidms` created ✅
- **Collections**: `users`, `applications`, `otps` ✅
- **Backend Dependencies**: Installed ✅

---

## 🎯 Connect MongoDB Compass

### Step 1: Open MongoDB Compass

Launch MongoDB Compass application on your computer.

### Step 2: Create New Connection

You should see a connection screen. Use this connection string:

```
mongodb://127.0.0.1:27017
```

**OR** fill in manually:
- **Host**: `127.0.0.1` (or `localhost`)
- **Port**: `27017`
- **Authentication**: None
- **Database**: Leave empty (will show all databases)

### Step 3: Click "Connect"

You should now see the MongoDB Compass interface!

---

## 📊 View Your EVIDMS Database

### In the Left Sidebar:

You should see:
- `admin` (system database)
- `config` (system database)
- **`evidms`** ← Your application database
- `local` (system database)

### Click on `evidms` database

You'll see three collections:
- 📁 **users** - User accounts (applicants, officers, admins)
- 📁 **applications** - Visa applications
- 📁 **otps** - One-time passwords for authentication

---

## 🌱 Seed the Database

Let's add sample data to test the application.

### Run the Seed Script

Open a new terminal/PowerShell in your project root:

```bash
cd backend
npm run seed
```

You should see:
```
Connected for seeding
Seeded default admin (username=admin, password=changeme1)
```

### Verify in Compass

1. Go back to MongoDB Compass
2. Click on the `users` collection
3. Click the refresh icon (🔄)
4. You should see 1 document (the admin user)

---

## 👀 Viewing Data in Compass

### View Documents

1. Click on a collection (e.g., `users`)
2. You'll see all documents in that collection
3. Each document is displayed in JSON format

### Example User Document

```json
{
  "_id": "ObjectId('...')",
  "role": "ADMIN",
  "username": "admin",
  "password": "changeme1",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

---

## 🔍 Useful Compass Features

### 1. Filter Documents

In the filter bar at the top, you can search:

**Find all applicants:**
```json
{ "role": "APPLICANT" }
```

**Find by passport ID:**
```json
{ "passportId": "AB123456" }
```

**Find by email:**
```json
{ "email": "user@example.com" }
```

### 2. Add New Document

1. Click "Add Data" button
2. Select "Insert Document"
3. Paste JSON or use the editor
4. Click "Insert"

**Example - Add an Applicant:**
```json
{
  "role": "APPLICANT",
  "email": "test@example.com",
  "mobileNumber": "9876543210",
  "passportId": "AB123456"
}
```

### 3. Edit Document

1. Hover over a document
2. Click the pencil icon (✏️)
3. Make changes
4. Click "Update"

### 4. Delete Document

1. Hover over a document
2. Click the trash icon (🗑️)
3. Confirm deletion

### 5. View Schema

1. Click on "Schema" tab
2. See the structure of your documents
3. Useful for understanding data types

### 6. Create Index

1. Click on "Indexes" tab
2. Click "Create Index"
3. Select field(s) to index
4. Improves query performance

**Recommended Indexes:**
- `users`: `email`, `passportId`, `username`
- `applications`: `applicantId`, `status`
- `otps`: `passportId`, `expiresAt`

---

## 🧪 Test Data Examples

### Add Test Applicant

```json
{
  "role": "APPLICANT",
  "email": "john.doe@example.com",
  "mobileNumber": "9876543210",
  "passportId": "AB123456"
}
```

### Add Embassy Officer

```json
{
  "role": "OFFICER",
  "embassyId": "EMB001",
  "password": "officer123"
}
```

### Add Admin User

```json
{
  "role": "ADMIN",
  "username": "superadmin",
  "password": "admin12345"
}
```

---

## 🔧 Common Tasks

### Clear All Data from a Collection

1. Click on the collection
2. Click "Documents" tab
3. Select all documents (checkbox at top)
4. Click "Delete" button
5. Confirm

### Export Data

1. Click on collection
2. Click "Export Data" button
3. Choose format (JSON or CSV)
4. Save file

### Import Data

1. Click on collection
2. Click "Add Data" → "Import File"
3. Select JSON or CSV file
4. Map fields
5. Click "Import"

---

## 📈 Monitor Database

### Database Stats

1. Click on `evidms` database
2. See overview:
   - Number of collections
   - Total size
   - Number of documents

### Collection Stats

1. Click on a collection
2. See:
   - Document count
   - Average document size
   - Total size
   - Indexes

---

## 🎯 Quick Reference

### Connection String
```
mongodb://127.0.0.1:27017
```

### Database Name
```
evidms
```

### Collections
- `users` - User accounts
- `applications` - Visa applications  
- `otps` - One-time passwords

### Default Admin Credentials
- **Username**: `admin`
- **Password**: `changeme1`

---

## 🚀 Next Steps

1. ✅ MongoDB Compass connected
2. ✅ Database `evidms` visible
3. ✅ Collections created
4. ✅ Sample admin user seeded

**Now you can:**
- Start the backend server: `cd backend && npm run dev`
- Test the application at http://localhost:3000
- View real-time data in Compass as users register and apply

---

## 💡 Pro Tips

### Real-time Updates

Compass doesn't auto-refresh. Click the refresh icon (🔄) to see new data.

### Query Performance

Use the "Explain Plan" tab to analyze query performance.

### Aggregation Pipeline

Use the "Aggregations" tab for complex queries:
- Group data
- Calculate statistics
- Transform documents

### Validation Rules

Set up schema validation to ensure data quality:
1. Click on collection
2. Go to "Validation" tab
3. Add JSON Schema validation rules

---

## 🎉 You're All Set!

Your MongoDB is configured and ready to use with EVIDMS!

**Compass Benefits:**
- 👁️ Visual interface for your data
- 🔍 Easy searching and filtering
- ✏️ Quick editing and testing
- 📊 Performance monitoring
- 🛠️ Index management

Happy developing! 🚀
