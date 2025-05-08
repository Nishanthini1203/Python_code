# Backend Documentation for the MERN EDF Analysis Application

## Overview
This backend application is part of the MERN stack project designed to analyze user data obtained from EDF (European Data Format) files. It utilizes Express for the server framework and Mongoose for MongoDB interactions.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/sinior_project.git
   cd mern-edf-analysis-app/backend
   ```

2. **Install Dependencies**
   Ensure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env` file in the `backend` directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the Application**
   Start the server with:
   ```bash
   npm start
   ```

   The server will run on `http://localhost:5000`.

## API Endpoints

### Upload User Data
- **Endpoint:** `POST /api/analyze`
- **Description:** Uploads an EDF file for analysis.
- **Request Body:** Form-data containing the EDF file.
- **Response:** Returns analysis results.

### Get Analysis Results
- **Endpoint:** `GET /api/results/:id`
- **Description:** Retrieves analysis results for a specific user.
- **Response:** Returns the analysis results in JSON format.

## File Structure
- **controllers/**: Contains the `analysisController.js` which handles the logic for analyzing user data.
- **models/**: Contains the `UserData.js` model defining the schema for user data.
- **routes/**: Contains the `analysisRoutes.js` which defines the API routes.
- **scripts/**: Contains the `analyze_data.py` script for analyzing EDF files.
- **app.js**: The main entry point for the backend application.
- **package.json**: Lists the dependencies and scripts for the backend.

