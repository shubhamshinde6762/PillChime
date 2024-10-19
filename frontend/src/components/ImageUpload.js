// import React, { useState, useRef, useEffect } from 'react';
// import { Camera, Upload, ArrowLeft } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth, getAuthStatus } from "../contexts/AuthContext"; 


// const ImageUpload = () => {
//   const [showCamera, setShowCamera] = useState(false);
//   const [preview, setPreview] = useState(null);
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [result, setResult] = useState(null);
//   const fileInputRef = useRef(null);
//   const videoRef = useRef(null);
//   const [cameraError, setCameraError] = useState(null);

//   const { currentUser } = useAuth();
//     console.log("CUrrent user", currentUser)

//   const handleFileUpload = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       setFile(selectedFile);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreview(reader.result);
//       };
//       reader.readAsDataURL(selectedFile);
//       setError(null);
//       setResult(null);
//     }
//   };

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }
//       setShowCamera(true);
//       setCameraError(null);
//       setError(null);
//       setResult(null);
//     } catch (err) {
//       setCameraError("Unable to access camera. Please ensure you've granted camera permissions.");
//     }
//   };

//   const captureImage = () => {
//     const video = videoRef.current;
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     canvas.getContext('2d').drawImage(video, 0, 0);

//     canvas.toBlob((blob) => {
//       setFile(new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' }));
//       setPreview(canvas.toDataURL('image/jpeg'));
//     }, 'image/jpeg');

//     setShowCamera(false);
//     stopCameraStream();
//   };

//   const stopCameraStream = () => {
//     const video = videoRef.current;
//     const stream = video?.srcObject;
//     if (stream) {
//       const tracks = stream.getTracks();
//       tracks.forEach((track) => track.stop());
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopCameraStream();
//     };
//   }, []);

//   const handleProcessImage = async () => {
//     setLoading(true);
//     setError(null);
//     setResult(null);

//     const formData = new FormData();
//     formData.append('image', file);



//     try {
//       // const flaskResponse = await axios.post('http://localhost:4000/upload', formData, {
//       //   headers: { 'Content-Type': 'multipart/form-data' }
//       // });

//       const expressResponse = await axios.post('http://localhost:5000/api/prescription/process-text/', {
//         // text: flaskResponse.data.text

//           "patient": {
//             "name": "John Doe",
//             "age": 45,
//             "gender": "male",
//             "prescribedBy": "Dr. Sarah Smith"
//           },
//           "prescription": [
//             {
//               "medicine": "Paracetamol",
//               "dosage": "500mg",
//               "colour": "red",
//               "timing": ["after lunch"]  // Now as array
//             },
//             {
//               "medicine": "Amoxicillin", 
//               "dosage": "250mg",
//               "colour": "white",
//               "timing": ["before lunch", "after lunch"]
//             },
//             {
//               "medicine": "Vitamin D3",
//               "dosage": "1000IU",
//               "colour": "yellow",
//               "timing": ["with breakfast"]  // Now as array
//             },
//             {
//               "medicine": "Metformin",
//               "dosage": "850mg",
//               "colour": "blue",
//               "timing": ["after breakfast", "after dinner"]
//             }
//           ],
//           "id": currentUser.id


//       });

//       console.log("ExpressRes: ", expressResponse);

//       setResult(expressResponse.data);
//     } catch (err) {
//       setError('An error occurred while processing the image.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const resetUpload = () => {
//     setPreview(null);
//     setFile(null);
//     setShowCamera(false);
//     setError(null);
//     setResult(null);
//   };

//   return (
//     <motion.div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
//       <motion.div className="flex items-center mb-8">
//         <Link to="/dashboard" className="mr-4">
//           <button className="p-2 hover:bg-white rounded-full transition-all">
//             <ArrowLeft className="w-6 h-6 text-gray-600" />
//           </button>
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Upload Prescription</h1>
//           <p className="text-gray-600 mt-1">Upload a prescription image or take a photo</p>
//         </div>
//       </motion.div>

//       <motion.div className="max-w-3xl mx-auto">
//         {!showCamera && !preview && (
//           <div className="grid md:grid-cols-2 gap-6">
//             <motion.div
//               className="bg-white p-8 rounded-xl shadow-sm text-center cursor-pointer"
//               onClick={() => fileInputRef.current?.click()}
//             >
//               <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
//                 <Upload className="w-8 h-8 text-blue-600" />
//               </div>
//               <h2 className="text-xl font-semibold mb-2">Upload from Device</h2>
//               <p className="text-gray-600">Choose a prescription image from your device</p>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleFileUpload}
//                 accept="image/*"
//                 className="hidden"
//               />
//             </motion.div>

//             <motion.div
//               className="bg-white p-8 rounded-xl shadow-sm text-center cursor-pointer"
//               onClick={startCamera}
//             >
//               <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
//                 <Camera className="w-8 h-8 text-green-600" />
//               </div>
//               <h2 className="text-xl font-semibold mb-2">Take Picture</h2>
//               <p className="text-gray-600">Use your camera to capture the prescription</p>
//             </motion.div>
//           </div>
//         )}

//         {showCamera && (
//           <div className="bg-white p-6 rounded-xl shadow-sm">
//             <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
//             <button
//               onClick={captureImage}
//               className="mt-4 w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
//             >
//               Capture Image
//             </button>
//           </div>
//         )}

//         {cameraError && (
//           <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//             {cameraError}
//           </div>
//         )}

//         {preview && (
//           <motion.div className="bg-white p-6 rounded-xl shadow-sm">
//             <img src={preview} alt="Preview" className="w-full rounded-lg mb-4" />
//             <div className="flex gap-4">
//               <button onClick={resetUpload} className="flex-1 bg-gray-100 text-gray-600 py-3 px-4 rounded-lg">
//                 Cancel
//               </button>
//               <button
//                 onClick={handleProcessImage}
//                 disabled={loading || !file}
//                 className={`flex-1 py-3 px-4 rounded-lg text-white transition-colors ${
//                   loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
//                 }`}
//               >
//                 {loading ? 'Processing...' : 'Process Prescription'}
//               </button>
//             </div>
//           </motion.div>
//         )}

//         {error && (
//           <motion.div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
//             {error}
//           </motion.div>
//         )}

//         {result && (
//           <motion.div className="mt-4 bg-white p-6 rounded-xl shadow-sm">
//             <h2 className="text-xl font-semibold mb-4">Processing Result:</h2>
//             <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
//           </motion.div>
//         )}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default ImageUpload;

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import { Upload, Camera, ArrowLeft } from 'lucide-react';
import axios from 'axios' // Adjust the import according to your icon library
import { useAuth } from "../contexts/AuthContext"

const UploadPrescription = () => {
  const { currentUser } = useAuth();
  const [showCamera, setShowCamera] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const webcamRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const startCamera = () => {
    setShowCamera(true);
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setPreview(imageSrc);
    setShowCamera(false);
  };

  const resetUpload = () => {
    setPreview(null);
    setError(null);
    setLoading(false);
  };

  const base64ToBlob = async (base64String) => {
    const response = await fetch(base64String);
    const blob = await response.blob();
    return new File([blob], 'webcam-image.jpg', { type: 'image/jpeg' });
  };


  const handleProcessImage = async () => {
    if (!preview) return; // Ensure there's an image to process
    setLoading(true); // Set loading state

    try {
      // Create a FormData object to handle image upload
      const formData = new FormData();

      // If the preview is a base64 string (webcam capture), convert to blob
      if (preview) {
        const file = await base64ToBlob(preview); // Convert base64 to blob
        formData.append('image', file); // Append the file to formData
      }

      // Uncomment this block if you plan to use file input in the future
      /*
      else {
          const file = fileInputRef.current.files[0]; // File upload case
          formData.append('image', file); // Append file from input
      }
      */

      // Send POST request to Flask API with the image file
      const response = await axios.post('http://localhost:4000/process_prescription',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file upload
          },
          mode: 'cors'
        }
      );

      // Dummy response for testing
      // const response = {
      //   status: 200,
      //   data: "Shubham Shinde, 20, male, prescribedBy: Unknown, medicine: Paracetamol, dosage: 1 tablet, timing: before lunch, medicine: Isotretinoin, dosage: 1 tablet, timing: after dinner"
      // };

      console.log(response);
      if (response.status === 200) {
        const cleanedData = response.data.prescription_data;
        console.log('Cleaned data:', cleanedData);

        // Parse the cleaned string into a structured JSON object
        let parsedData = parseResponseToJSON(cleanedData);
        console.log('Parsed Data:', parsedData);

        // Access patient details
        const patient = {
          name: parsedData.name,
          age: parsedData.age,
          gender: parsedData.gender,
          prescribedBy: parsedData.prescribedBy
        };

        // console.log('Patient Name:', patient.name ?? 'N/A');
        // console.log('Patient Age:', patient.age ?? 'N/A');
        // console.log('Patient Gender:', patient.gender ?? 'N/A');
        // console.log('Prescribed By:', patient.prescribedBy ?? 'N/A');
        let summary = "";
        // Log prescription sentences
        parsedData.prescriptionSentences.forEach((sentence, index) => {
          summary += " " + sentence;
          console.log(`Prescription ${index + 1}: ${sentence}`);
        });

        const CLIENT_ID = '1048108211111-nv3qelf651mavpgeqfu2n2jc4bp2at20.apps.googleusercontent.com';
        const CLIENT_SECRET = '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';
        const REDIRECT_URI = 'http://localhost:3000';


        const startDate = new Date('2024-10-20'); // Replace with your actual start date
        const endDate = new Date('2024-10-27'); // Replace with your actual end date
        const accessToken = localStorage.getItem("access_token");
        console.log(accessToken);

        // Initialize an empty array to hold event payloads
        const eventsPayload = [];

        // Function to add events for a specific time
        const addEventForTime = (date, time) => {
          const dateTime = new Date(date);
          const [hours, minutes] = time.split(':').map(Number); // Split time into hours and minutes
          dateTime.setHours(hours, minutes, 0); // Set hours and minutes

          return {
            summary: "Take your pill !", // Customize your summary
            start: { dateTime: dateTime.toISOString(), timeZone: 'Asia/Kolkata' },
            end: { dateTime: new Date(dateTime.getTime() + 60 * 60 * 1000).toISOString(), timeZone: 'Asia/Kolkata' }, // 1-hour duration
            reminders: {
              useDefault: false,
              overrides: [
                { method: 'popup', minutes: 10 },
                { method: 'email', minutes: 10 },
              ],
            },
          };
        };

        // Loop through each day from startDate to endDate
        for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
          // Set reminder times
          const reminderTimes = ['09:00', '18:00']; // 9 AM and 6 PM

          reminderTimes.forEach(time => {
            const eventPayload = addEventForTime(date, time);
            eventsPayload.push(eventPayload); // Push event payload into the array
          });
        }

        console.log(eventsPayload);

        const createCalendarEvents = async () => {
          for (const eventPayload of eventsPayload) {
            try {
              const response = await axios.post(
                'https://www.googleapis.com/calendar/v3/calendars/primary/events',
                eventPayload,
                {
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                  },
                }
              );
              console.log('Event created:', response.data);
            } catch (error) {
              console.error('Calendar event creation error:', error);
            }
          }
        };

        // Call the function to create calendar events
        createCalendarEvents();


        // const accessToken = localStorage.getItem("access_token");
        // console.log(accessToken)
        // const reminderTime = "";

        // const startDateTime = `${reminderTime}:00`;
        // const endDateTime = `${reminderTime}:00`;

        // const eventPayload = {
        //   summary,
        //   start: { dateTime: startDateTime, timeZone: 'Asia/Kolkata' },
        //   end: { dateTime: endDateTime, timeZone: 'Asia/Kolkata' },
        //   reminders: {
        //     useDefault: false,
        //     overrides: [
        //       { method: 'popup', minutes: 10 },
        //       { method: 'email', minutes: 10 },
        //     ],
        //   },
        // };

        // try {
        //   const response = await axios.post(
        //     'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        //     eventPayload,
        //     {
        //       headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //         'Content-Type': 'application/json',
        //       },
        //     }
        //   );
        //   console.log(response)
        // } catch (error) {
        //   console.error('Calendar event creation error:', error);
        // }

        try {
          const expressResponse = await axios.post(
            'http://localhost:5000/api/prescription/process-text/',
            {
              prescription: parsedData.prescriptions,
              id: currentUser?.id,
              patient
            }
          );

          console.log(expressResponse);
          // setResult(expressResponse.data);
        } catch (err) {
          setError('An error occurred while processing the image.');
          console.error('Processing error:', err);
        }
      } else {
        setError('Failed to upload image'); // Handle non-200 status codes
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to process image'); // Error handling
    } finally {
      setLoading(false); // Reset loading state after completion
    }
  };

  // Funce the response string into structured JSON
  const parseResponseToJSON = (responseString) => {
    console.log(responseString);
    const parts = responseString.split(',');

    // Extract patient information with default values if missing
    const name = parts[0]?.trim() || 'Unknown';
    const age = parts[1]?.trim() || 'Unknown';
    const gender = parts[2]?.trim() || 'Unknown';
    const prescribedBy = parts[3]?.split(':')[1]?.trim() || 'Unknown';

    const prescriptions = [];
    for (let i = 4; i < parts.length; i += 3) {
      const medication = parts[i]?.split(':')[1]?.trim() || 'Dummy Medicine';
      const dosage = parts[i + 1]?.split(':')[1]?.trim() || 'Dummy Dosage';
      const timing = parts[i + 2]?.split(':')[1]?.trim() || 'Dummy Timing';

      prescriptions.push({
        medicine: medication,
        dosage: dosage,
        timing: timing
      });
    }

    // Convert each prescription into a proper sentence
    const prescriptionSentences = prescriptions.map(prescription => {
      return `Take ${prescription.dosage} of ${prescription.medicine} ${prescription.timing}.`;
    });

    return {
      name,
      age,
      gender,
      prescribedBy,
      prescriptions,
      prescriptionSentences // Include the array of sentences in the return object
    };
  };




  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="flex items-center mb-8">
        <Link to="/dashboard" className="mr-4">
          <button className="p-2 hover:bg-white rounded-full transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Upload Prescription</h1>
          <p className="text-gray-600 mt-1">Upload a prescription image or take a photo</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        {!showCamera && !preview && (
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className="bg-white p-8 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Upload className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Upload from Device</h2>
              <p className="text-gray-600">Choose a prescription image from your device</p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div
              className="bg-white p-8 rounded-xl shadow-sm text-center cursor-pointer hover:shadow-md transition-shadow"
              onClick={startCamera}
            >
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <Camera className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Take Picture</h2>
              <p className="text-gray-600">Use your camera to capture the prescription</p>
            </div>
          </div>
        )}

        {showCamera && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={400}
              height={300}
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setShowCamera(false);
                }}
                className="flex-1 bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={captureImage}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700"
              >
                Capture Image
              </button>
            </div>
          </div>
        )}

        {preview && (
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <img src={preview} alt="Preview" className="w-full rounded-lg mb-4" />
            <div className="flex gap-4">
              <button
                onClick={resetUpload}
                className="flex-1 bg-gray-100 text-gray-600 py-3 px-4 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleProcessImage}
                disabled={loading}
                className={`flex-1 py-3 px-4 rounded-lg text-white transition-colors ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                {loading ? 'Processing...' : 'Process Prescription'}
              </button>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPrescription;