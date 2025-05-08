import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./ReportPage.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const patients = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    age: 45,
    gender: "Male",
    hospital: "City Hospital",
    doctor: "Dr. Smith",
    classification: "Sleep Apnea",
    symptoms: "Chest pain, shortness of breath",
    medications: "Metformin, Lisinopril",
    history: "Hypertension, Type 2 Diabetes",
    eegFileName: "sleep_study1.edf",
    duration: "7.5 hours",
    sleepStudyData: {
      patientID: 101,
      reportDate: "2025-02-17",
      sleepSummary: {
        totalSleepDuration: "7h 30m",
        sleepEfficiency: "85%",
        apneaEventsDetected: 5,
        AHI: 10,
        oxygenDesaturationEvents: 3,
      },
      sleepStages: [
        { stage: "Light Sleep", duration: "04:00:00", percentage: "53.3%" },
        { stage: "Deep Sleep", duration: "02:00:00", percentage: "26.7%" },
        { stage: "REM Sleep", duration: "01:30:00", percentage: "20%" },
      ],
      observations: ["Mild sleep apnea detected", "Reduced oxygen levels observed."],
      recommendations: ["Consult a specialist", "Improve sleeping posture."],
    },
  },
  {
    email: "alice.smith@email.com",
    name: "Alice Smith",
    age: 38,
    gender: "Female",
    hospital: "Green Valley Clinic",
    doctor: "Dr. Johnson",
    classification: "Normal Sleep",
    symptoms: "Fatigue, mild headaches",
    medications: "None",
    history: "No significant medical history",
    eegFileName: "brain_scan2.edf",
    duration: "6 hours",
    sleepStudyData: {
      patientID: 102,
      reportDate: "2025-02-18",
      sleepSummary: {
        totalSleepDuration: "8h 15m",
        sleepEfficiency: "92%",
        apneaEventsDetected: 0,
        AHI: 0,
        oxygenDesaturationEvents: 0,
      },
      sleepStages: [
        { stage: "Light Sleep", duration: "05:00:00", percentage: "60.6%" },
        { stage: "Deep Sleep", duration: "02:30:00", percentage: "30.3%" },
        { stage: "REM Sleep", duration: "00:45:00", percentage: "9.1%" },
      ],
      observations: ["Healthy sleep pattern observed."],
      recommendations: ["Maintain regular sleep schedule."],
    },
  },
        {
            "email": "michaelb@example.com",
            "name": "Michael Brown",
            "age": 38,
            "gender": "Male",
            "hospital": "JM Hospital",
            "doctor": "Dr. Nishanthini",
            "classification": "Sleep Apnea",
            "symptoms": "Frequent interruptions, fatigue",
            "medications": "None",
            "history": "No significant medical history",
            "eegFileName": "brain_scan3.edf",
            "duration": "6 hours",
            "sleepStudyData": {
                "patientID": 103,
                "reportDate": "2025-02-17",
                "sleepSummary": {
                    "totalSleepDuration": "8h 00m",
                    "sleepEfficiency": "80%",
                    "apneaEventsDetected": "30-50",
                    "AHI": "10-15",
                    "oxygenDesaturationEvents": "5-10"
                },
                "sleepStages": [
                    { "stage": "Normal Sleep", "duration": "05:10:00", "percentage": "64.6%" },
                    { "stage": "Deep Sleep", "duration": "01:25:00", "percentage": "17.7%" },
                    { "stage": "Sleep Apnea", "duration": "01:25:00", "percentage": "17.7%" }
                ],
                "observations": [
                    "Sleep apnea detected: Yes",
                    "Most affected sleep stage: REM",
                    "Frequent interruptions observed."
                ],
                "recommendations": [
                    "Consider CPAP therapy.",
                    "Avoid sleeping on your back.",
                    "Consult a sleep specialist."
                ]
            }
        },
        {
            "email": "snehavr2002@gmail.com",
            "name": "Sneha",
            "age": 23,
            "gender": "Female",
            "hospital": "Cosh Hospital",
            "doctor": "Dr. Manju",
            "sleepStudyData": {
                "patientID": 201,
                "reportDate": "2025-02-17",
                "sleepSummary": {
                    "totalSleepDuration": "8h 00m",
                    "sleepEfficiency": "90%",
                    "apneaEventsDetected": 0,
                    "AHI": 0,
                    "oxygenDesaturationEvents": 0
                },
                "sleepStages": [
                    { "stage": "Normal Sleep", "duration": "06:00:00", "percentage": "66.7%" },
                    { "stage": "Deep Sleep", "duration": "02:00:00", "percentage": "22.2%" },
                    { "stage": "REM Sleep", "duration": "01:00:00", "percentage": "11.1%" }
                ],
                "observations": [
                    "Sleep apnea detected: No",
                    "Good sleep efficiency observed.",
                    "Healthy sleep pattern maintained."
                ],
                "recommendations": [
                    "Maintain a regular sleep schedule.",
                    "Ensure a comfortable sleep environment."
                ]
            }
        },
        {
            "email": "appu@example.com",
            "name": "Dharshan",
            "age": 18,
            "gender": "Male",
            "hospital": "Kumaran Hospital",
            "doctor": "Dr. Aruna",
            "sleepStudyData": {
                "patientID": 202,
                "reportDate": "2025-02-17",
                "sleepSummary": {
                    "totalSleepDuration": "8h 00m",
                    "sleepEfficiency": "90%",
                    "apneaEventsDetected": 0,
                    "AHI": 0,
                    "oxygenDesaturationEvents": 0
                },
                "sleepStages": [
                    { "stage": "Normal Sleep", "duration": "05:50:00", "percentage": "64.8%" },
                    { "stage": "Deep Sleep", "duration": "01:50:00", "percentage": "20.4%" },
                    { "stage": "REM Sleep", "duration": "01:20:00", "percentage": "14.8%" }
                ],
                "observations": [
                    "Sleep apnea detected: No",
                    "Good sleep efficiency observed.",
                    "Healthy sleep pattern maintained."
                ],
                "recommendations": [
                    "Maintain a regular sleep schedule.",
                    "Ensure a comfortable sleep environment."
                ]
            }
        },
        {
            "name": "Kumar",
            "age": 51,
            "gender": "Male",
            "hospital": "Subham Hospital",
            "doctor": "Dr. Nikila",
            "sleepStudyData": {
                "patientID": 203,
                "reportDate": "2025-02-17",
                "sleepSummary": {
                    "totalSleepDuration": "8h 00m",
                    "sleepEfficiency": "90%",
                    "apneaEventsDetected": 0,
                    "AHI": 0,
                    "oxygenDesaturationEvents": 0
                },
                "sleepStages": [
                    { "stage": "Normal Sleep", "duration": "06:10:00", "percentage": "68.5%" },
                    { "stage": "Deep Sleep", "duration": "01:40:00", "percentage": "18.5%" },
                    { "stage": "REM Sleep", "duration": "01:10:00", "percentage": "13.0%" }
                ],
                "observations": [
                    "Sleep apnea detected: No",
                    "Good sleep efficiency observed.",
                    "Healthy sleep pattern maintained."
                ],
                "recommendations": [
                    "Maintain a regular sleep schedule.",
                    "Ensure a comfortable sleep environment."
                ]
            }
        },
    

];

const ReportPage = () => {
  const navigate = useNavigate();
  const [reportData, setReportData] = useState(null);
  const [sleepData, setSleepData] = useState([]);

  const sleepPhases = ["Awake", "REM", "Light Sleep", "Normal Sleep", "Deep Sleep", "Extreme Sleep"];

  const generateSleepData = () => {
    return Array.from({ length: 8 }, (_, i) => ({
      time: `${i + 1} hr`,
      phase: Math.floor(Math.random() * sleepPhases.length),
      label: sleepPhases[Math.floor(Math.random() * sleepPhases.length)],
    }));
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const user = patients.find((patient) => patient.email === loggedInUser);
      setReportData(user);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (reportData) {
      setSleepData(generateSleepData());
    }
  }, [reportData]);

  const generatePDF = () => {
    if (!reportData) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Medical Report", 20, 20);

    doc.setFontSize(14);
    doc.text("Patient Details", 20, 30);
    let y = 40;
    const addText = (label, value) => {
      doc.text(`${label}: ${value}`, 20, y);
      y += 10;
      if (y > 280) { // Check if the y-coordinate exceeds the page height
        doc.addPage();
        y = 20; // Reset y-coordinate for the new page
      }
    };

    addText("Name", reportData.name);
    addText("Age", reportData.age);
    addText("Gender", reportData.gender);
    addText("Hospital", reportData.hospital);
    addText("Doctor", reportData.doctor);
    addText("EEG File Name", reportData.eegFileName);
    addText("Duration", reportData.duration);
    addText("Final Classification", reportData.classification);
    addText("Symptoms", reportData.symptoms);
    addText("Medications", reportData.medications);
    addText("Medical History", reportData.history);

    doc.setFontSize(14);
    doc.text("Sleep Study Data", 20, y);
    y += 10;
    addText("Patient ID", reportData.sleepStudyData.patientID);
    addText("Report Date", reportData.sleepStudyData.reportDate);

    doc.setFontSize(14);
    doc.text("Sleep Summary", 20, y);
    y += 10;
    Object.entries(reportData.sleepStudyData.sleepSummary).forEach(([key, value]) => {
      addText(key.replace(/([A-Z])/g, " $1"), value);
    });

    doc.setFontSize(14);
    doc.text("Sleep Stages", 20, y);
    y += 10;
    reportData.sleepStudyData.sleepStages.forEach((stage) => {
      addText(stage.stage, `${stage.duration} (${stage.percentage})`);
    });

    doc.setFontSize(14);
    doc.text("Observations", 20, y);
    y += 10;
    reportData.sleepStudyData.observations.forEach((obs) => {
      addText("Observation", obs);
    });

    doc.setFontSize(14);
    doc.text("Recommendations", 20, y);
    y += 10;
    reportData.sleepStudyData.recommendations.forEach((rec) => {
      addText("Recommendation", rec);
    });

    doc.save("Medical_Report.pdf");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  };

  if (!reportData) return <p>Loading...</p>;

  return (
    <div className="report-container">
      <h1>Medical Report</h1>
      <h2>Patient Details</h2>
      <table>
        <tbody>
          {Object.entries(reportData).map(([key, value]) => (
            key !== "sleepStudyData" && (
              <tr key={key}>
                <td>{key.replace(/([A-Z])/g, " $1")}</td>
                <td>{value}</td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      <h2>Sleep Study Data</h2>
      <table>
        <tbody>
          <tr>
            <td>Patient ID</td>
            <td>{reportData.sleepStudyData?.patientID}</td>
          </tr>
          <tr>
            <td>Report Date</td>
            <td>{reportData.sleepStudyData?.reportDate}</td>
          </tr>

          <tr>
            <td colSpan="2"><strong>Sleep Summary</strong></td>
          </tr>
          {Object.entries(reportData.sleepStudyData?.sleepSummary || {}).map(([key, value]) => (
            <tr key={key}>
              <td>{key.replace(/([A-Z])/g, " $1")}</td>
              <td>{value}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="2"><strong>Sleep Stages</strong></td>
          </tr>
          {reportData.sleepStudyData?.sleepStages.map((stage, index) => (
            <tr key={index}>
              <td>{stage.stage}</td>
              <td>{stage.duration} ({stage.percentage})</td>
            </tr>
          ))}

          <tr>
            <td colSpan="2"><strong>Observations</strong></td>
          </tr>
          {reportData.sleepStudyData?.observations.map((obs, index) => (
            <tr key={index}>
              <td colSpan="2">{obs}</td>
            </tr>
          ))}

          <tr>
            <td colSpan="2"><strong>Recommendations</strong></td>
          </tr>
          {reportData.sleepStudyData?.recommendations.map((rec, index) => (
            <tr key={index}>
              <td colSpan="2">{rec}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Sleep Analysis</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sleepData} margin={{ top: 15, right: 20, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 5]} tickFormatter={(value) => sleepPhases[value]} />
            <Tooltip formatter={(value) => sleepPhases[value]} />
            <Legend />
            <Line type="monotone" dataKey="phase" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <button onClick={generatePDF}>Download PDF</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ReportPage;