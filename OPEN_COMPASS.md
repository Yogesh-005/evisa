# 🧭 Open MongoDB Compass - Step by Step

## Quick Steps

### 1. Launch MongoDB Compass

**Windows:**
- Press `Win` key
- Type "MongoDB Compass"
- Click on the application

**OR**
- Go to Start Menu → MongoDB → MongoDB Compass

### 2. Connection Screen

When Compass opens, you'll see a connection screen.

### 3. Enter Connection String

In the connection string field at the top, paste:

```
mongodb://127.0.0.1:27017
```

### 4. Click "Connect"

Click the green "Connect" button.

### 5. You're In!

You should now see the MongoDB Compass interface with a list of databases on the left.

---

## 🎯 Find Your EVIDMS Database

### In the Left Sidebar:

Look for these databases:
- `admin` (system)
- `config` (system)
- **`evidms`** ← **This is your database!**
- `local` (system)

### Click on `evidms`

You'll see three collections:
- 📁 **users**
- 📁 **applications**
- 📁 **otps**

---

## 👀 View Your Data

### Click on `users` collection

You should see **1 document** - the admin user we just created!

**Document Preview:**
```json
{
  "_id": "...",
  "role": "ADMIN",
  "username": "admin",
  "password": "changeme1",
  "createdAt": "...",
  "updatedAt": "...",
  "__v": 0
}
```

---

## 🔄 Refresh Data

As you use the application:
1. New users will appear in `users`
2. Applications will appear in `applications`
3. OTPs will appear in `otps`

**To see new data:**
- Click the refresh icon (🔄) at the top of the collection view

---

## 🎨 Compass Interface Overview

```
┌─────────────────────────────────────────────────────┐
│  [Connection String]                    [Connect]   │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Databases│  Collection View                         │
│          │                                          │
│ • admin  │  [Filter] [Project] [Sort] [Refresh]    │
│ • config │                                          │
│ ▼ evidms │  Documents:                              │
│   • users│  ┌────────────────────────────────────┐ │
│   • apps │  │ { "_id": "...",                    │ │
│   • otps │  │   "role": "ADMIN",                 │ │
│ • local  │  │   "username": "admin" }            │ │
│          │  └────────────────────────────────────┘ │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

---

## 🎯 Quick Actions

### View All Documents
1. Click on collection name
2. See all documents listed

### Search/Filter
1. Click in the filter bar
2. Enter: `{ "role": "ADMIN" }`
3. Press Enter

### Add Document
1. Click "Add Data" button
2. Select "Insert Document"
3. Paste JSON
4. Click "Insert"

### Edit Document
1. Hover over document
2. Click pencil icon (✏️)
3. Make changes
4. Click "Update"

### Delete Document
1. Hover over document
2. Click trash icon (🗑️)
3. Confirm

---

## 📊 Tabs Available

When viewing a collection, you'll see these tabs:

- **Documents** - View and edit data
- **Aggregations** - Run complex queries
- **Schema** - See data structure
- **Explain Plan** - Query performance
- **Indexes** - Manage indexes
- **Validation** - Schema validation rules

---

## 💡 Pro Tips

### Keyboard Shortcuts
- `Ctrl + K` - Focus on filter bar
- `Ctrl + F` - Find in documents
- `F5` - Refresh

### View Options
- **List View** - Compact list of documents
- **JSON View** - Full JSON format
- **Table View** - Spreadsheet-like view

### Export Data
1. Click "Export Data" button
2. Choose JSON or CSV
3. Save file

### Import Data
1. Click "Add Data" → "Import File"
2. Select JSON/CSV file
3. Map fields
4. Import

---

## 🔍 What You Should See Now

### Database: evidms
- **Collections**: 3
- **Size**: ~4 KB
- **Documents**: 1 (in users collection)

### Collection: users
- **Documents**: 1
- **Average Size**: ~200 bytes
- **Total Size**: ~200 bytes

### Collection: applications
- **Documents**: 0 (empty)

### Collection: otps
- **Documents**: 0 (empty)

---

## ✅ Verification

If you can see:
- ✅ `evidms` database in the left sidebar
- ✅ Three collections: `users`, `applications`, `otps`
- ✅ One document in `users` collection (admin user)

**Then your MongoDB Compass is properly connected!** 🎉

---

## 🚨 Troubleshooting

### Can't see `evidms` database?
- Click the refresh icon (🔄) at the top
- Check connection string is correct
- Verify MongoDB service is running

### Connection failed?
```powershell
# Check if MongoDB is running
Get-Service -Name MongoDB

# If not running, start it
Start-Service -Name MongoDB
```

### Wrong connection string?
Make sure you're using:
```
mongodb://127.0.0.1:27017
```
NOT:
- `mongodb://localhost:27017` (might work, but use 127.0.0.1)
- `mongodb://127.0.0.1:27017/evidms` (don't specify database in connection)

---

## 🎉 You're Ready!

Now you can:
- ✅ View your database in Compass
- ✅ See the admin user
- ✅ Monitor data changes in real-time
- ✅ Edit and test data easily

**Next:** Start the backend server and watch the data grow! 🚀

```bash
cd backend
npm run dev
```
