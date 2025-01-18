# File Sharing Application

## Overview

This project is a full-stack file-sharing web application that allows users to upload files and share download links. The backend is built with Node.js, Express, and MongoDB, while the frontend is styled with Tailwind CSS and implemented using react.

---

## Features

- **Drag and Drop File Upload**: Users can drag and drop files for easy uploading.
- **File Download**: Users receive a sharable download link to retrieve their files.
- **File Size Display**: The application displays the file size in MB for user convenience.
- **Error Handling**: Displays appropriate error messages for missing files or server issues.

---

## Tech Stack

- **Frontend**:
  - React
  - EJS Template
  - Tailwind CSS
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Tools**:
  - Nodemon for development
  - Browsersync for live reloading

---

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- Node.js (v16 or higher)
- MongoDB (running locally or on the cloud)

### Steps

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd file-sharing-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGO_URI=<your-mongodb-uri>
   BASE_APP_URL=http://localhost:3000
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```
   http://localhost:3000
   ```

---

## Project Structure

```
file-sharing-app/
├── backend/
│   ├── models/
│   │   └── filemodel.js
│   ├── routes/
│   │   ├── upload.js
│   │   └── showroute.js
│   ├── views/
│   │   └── download.ejs
│   ├── app.js
│   └── server.js
├── public/
│   ├── css/
│   │   ├── styles.css
│   │   └── output.css
│   └── js/
├── .env
├── package.json
└── tailwind.config.js
```

---

## API Endpoints

### File Upload

- **Endpoint**: `/upload`
- **Method**: POST
- **Description**: Upload a file to the server.
- **Request Body**: `multipart/form-data` containing the file.
- **Response**:
  ```json
  {
    "file": {
      "uuid": "unique-id",
      "filename": "example.txt",
      "size": 12345
    }
  }
  ```

### File Download

- **Endpoint**: `/:uuid`
- **Method**: GET
- **Description**: Retrieve a file's download page.
- **Response**: Renders the `download.ejs` template with file details.

---

## Styling with Tailwind CSS

- Tailwind CSS is used for rapid and responsive design.
- Custom styles are written in `styles.css`.

---

## Known Issues

- Large file uploads may require increasing the `bodyParser` size limit in Express.
- Ensure proper MongoDB connection credentials in `.env`.

---

## Future Enhancements

- Add user authentication for private file sharing.
- Support for multiple file uploads.
- Add expiration dates for file links.
- Enhance upload progress monitoring.


