// filepath: /C:/Users/winha/Desktop/sinior project/Final_year_project/mern-edf-analysis-app/backend/routes/analysisRoutes.js
const express = require('express');
const multer = require('multer');
const { exec } = require('child_process');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const filePath = req.file.path;
  const command = `python C:/Users/winha/Desktop/final-project-20.10/final.py ${filePath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).send('Error analyzing file.');
    }

    if (stderr) {
      console.error(`Script error: ${stderr}`);
      return res.status(500).send('Error analyzing file.');
    }

    console.log(`Script output: ${stdout}`);
    res.send({ message: 'File analyzed successfully', output: stdout });
  });
});

module.exports = router;