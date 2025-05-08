class AnalysisController {
    async analyzeData(req, res) {
        try {
            // Logic to handle file upload and analysis
            const file = req.file; // Assuming file is uploaded using multer
            if (!file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Call the Python script to analyze the EDF file
            const { exec } = require('child_process');
            exec(`python3 backend/scripts/analyze_data.py ${file.path}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error executing script: ${error.message}`);
                    return res.status(500).json({ message: 'Error analyzing data' });
                }
                if (stderr) {
                    console.error(`Script stderr: ${stderr}`);
                    return res.status(500).json({ message: 'Error analyzing data' });
                }

                // Process the output from the Python script
                const analysisResults = JSON.parse(stdout);
                return res.status(200).json(analysisResults);
            });
        } catch (error) {
            console.error(`Error in analyzeData: ${error.message}`);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}



module.exports = AnalysisController;
