// import React, { useState } from 'react';
// import { Camera, Download, Loader2 } from 'lucide-react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     photo: "",
//     fullName: "",
//     registrationId: "",
//     className: "",
//     interest: "",
//     socialLink: "",
//     contact: "",
//     email: "",
//     skills: "",
//     expectedGraduation: ""
//   });

//   const [loading, setLoading] = useState(false);
//   const [showIdCard, setShowIdCard] = useState(false);

//   const generateRegistrationId = () => {
//     const prefix = 'WR';
//     const timestamp = new Date().getTime().toString().slice(-6);
//     const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
//     return `${prefix}${timestamp}${random}`;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handlePhotoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, photo: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const downloadIdCard = () => {
//     const idCardData = `
// Name: ${formData.fullName}
// Registration ID: ${formData.registrationId}
// Class: ${formData.className}
// Contact: ${formData.contact}
// Email: ${formData.email}
// Skills: ${formData.skills}
// Interest: ${formData.interest}
// Expected Graduation: ${formData.expectedGraduation}
//     `;

//     const blob = new Blob([idCardData], { type: 'text/plain' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = `${formData.fullName}_ID_Card.txt`;
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const registrationId = generateRegistrationId();
//       const updatedFormData = { ...formData, registrationId };
//       setFormData(updatedFormData);

//       const formPayload = {
//         access_key: "493d9c5b-52aa-4f09-adf2-785d2924d8e4", // Replace with your Web3Forms access key
//         subject: `New Registration: ${updatedFormData.fullName}`,
//         from_name: updatedFormData.fullName,
//         message: `
// Registration Details:
// -------------------
// Name: ${updatedFormData.fullName}
// Registration ID: ${registrationId}
// Program Level: ${updatedFormData.className}
// Email: ${updatedFormData.email}
// Contact: ${updatedFormData.contact}
// Interest: ${updatedFormData.interest}
// Skills: ${updatedFormData.skills}
// Social Link: ${updatedFormData.socialLink}
// Expected Graduation: ${updatedFormData.expectedGraduation}
//         `,
//       };

//       const response = await fetch('https://api.web3forms.com/submit', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json'
//         },
//         body: JSON.stringify(formPayload)
//       });

//       const data = await response.json();
      
//       if (data.success) {
//         setShowIdCard(true);
//       } else {
//         throw new Error('Form submission failed');
//       }
//     } catch (error) {
//       alert('Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         {!showIdCard ? (
//           <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
//             <div className="text-center p-6 border-b border-gray-700">
//               <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
//                 Join Webreich Community
//               </h1>
//             </div>
//             <div className="p-6">
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Photo Upload Section */}
//                 <div className="flex flex-col items-center space-y-4">
//                   <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-700">
//                     {formData.photo ? (
//                       <img
//                         src={formData.photo}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <Camera className="w-12 h-12 text-gray-400" />
//                       </div>
//                     )}
//                   </div>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handlePhotoUpload}
//                     className="w-64 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
//                   />
//                 </div>

//                 {/* Personal Information */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
//                       Full Name
//                     </label>
//                     <input
//                       id="fullName"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="className" className="block text-sm font-medium text-gray-200">
//                       Program Level
//                     </label>
//                     <select
//                       id="className"
//                       name="className"
//                       value={formData.className}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       required
//                     >
//                       <option value="">Select your program</option>
//                       <option value="UG">Undergraduate (UG)</option>
//                       <option value="PG">Postgraduate (PG)</option>
//                     </select>
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="email" className="block text-sm font-medium text-gray-200">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       id="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="contact" className="block text-sm font-medium text-gray-200">
//                       Contact Number
//                     </label>
//                     <input
//                       type="tel"
//                       id="contact"
//                       name="contact"
//                       value={formData.contact}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Additional Information */}
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <label htmlFor="interest" className="block text-sm font-medium text-gray-200">
//                       What do you want to learn?
//                     </label>
//                     <input
//                       id="interest"
//                       name="interest"
//                       value={formData.interest}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       required
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="skills" className="block text-sm font-medium text-gray-200">
//                       Current Skills
//                     </label>
//                     <input
//                       id="skills"
//                       name="skills"
//                       value={formData.skills}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       placeholder="e.g., JavaScript, Python, Design"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="socialLink" className="block text-sm font-medium text-gray-200">
//                       Social Media Profile
//                     </label>
//                     <input
//                       type="url"
//                       id="socialLink"
//                       name="socialLink"
//                       value={formData.socialLink}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                       placeholder="e.g., LinkedIn, GitHub"
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <label htmlFor="expectedGraduation" className="block text-sm font-medium text-gray-200">
//                       Expected Graduation Year
//                     </label>
//                     <input
//                       type="text"
//                       id="expectedGraduation"
//                       name="expectedGraduation"
//                       value={formData.expectedGraduation}
//                       onChange={handleChange}
//                       className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
//                     />
//                   </div>
//                 </div>

//                 <div className="flex justify-center">
//                   <button
//                     type="submit"
//                     className="w-full px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <Loader2 className="w-5 h-5 animate-spin mx-auto" />
//                     ) : (
//                       "Submit Registration"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         ) : (
//           <div className="text-center space-y-4">
//             <h2 className="text-2xl font-semibold text-white">Registration Successful!</h2>
//             <p className="text-lg text-gray-300">Your Registration ID: {formData.registrationId}</p>
//             <div className="flex justify-center space-x-4">
//               <button
//                 onClick={downloadIdCard}
//                 className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
//               >
//                 <Download className="w-5 h-5 mr-2" />
//                 Download ID Card
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState, useRef } from 'react';
import { Camera, Download, Loader2 } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    photo: "",
    fullName: "",
    email: "",
    program: "",
    interests: "",
    skills: "",
    contact: "",
    graduation: ""
  });
  const [loading, setLoading] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const cardRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5000000) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, photo: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setShowCard(true);
      setLoading(false);
    }, 1500);
  };

  const IdCard = () => (
    <div className="w-96 h-56 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-6 text-white shadow-xl transform hover:scale-105 transition-all">
      <div className="flex items-center gap-4">
        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-white/50">
          {formData.photo ? (
            <img src={formData.photo} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{formData.fullName}</h2>
          <p className="text-sm opacity-75">{formData.program}</p>
          <p className="text-xs mt-1">{formData.email}</p>
        </div>
      </div>
      <div className="mt-4 text-sm space-y-1">
        <p>Skills: {formData.skills}</p>
        <p>Interests: {formData.interests}</p>
        <p className="text-xs mt-2 text-blue-200">Webreich Community Member</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
      <div className="max-w-2xl mx-auto">
        {!showCard ? (
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-xl border border-gray-700">
            <div className="p-6 text-center border-b border-gray-700">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-indigo-400">
                Join Webreich
              </h1>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Photo Upload */}
              <div className="flex justify-center">
                <div className="relative group">
                  <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-violet-500/30 group-hover:border-violet-500 transition-all">
                    {formData.photo ? (
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                        <Camera className="w-10 h-10 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhoto}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="col-span-2 px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-violet-500 outline-none text-white"
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-violet-500 outline-none text-white"
                />
                <select
                  name="program"
                  onChange={handleChange}
                  className="px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-violet-500 outline-none text-white"
                >
                  <option value="">Select Program</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
                <input
                  name="interests"
                  placeholder="Interests"
                  onChange={handleChange}
                  className="px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-violet-500 outline-none text-white"
                />
                <input
                  name="skills"
                  placeholder="Skills"
                  onChange={handleChange}
                  className="px-4 py-2 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-violet-500 outline-none text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Join Community"
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white">Welcome to Webreich!</h2>
            <div ref={cardRef} className="flex justify-center">
              <IdCard />
            </div>
            <button
              onClick={() => {
                const cardElement = cardRef.current;
                if (cardElement) {
                  html2canvas(cardElement).then(canvas => {
                    const link = document.createElement('a');
                    link.download = 'webreich-card.png';
                    link.href = canvas.toDataURL();
                    link.click();
                  });
                }
              }}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Download className="w-5 h-5 inline mr-2" />
              Download Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
