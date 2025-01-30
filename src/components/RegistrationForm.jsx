import React, { useState } from 'react';
import { Camera, Download, Loader2 } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    photo: "",
    fullName: "",
    registrationId: "",
    className: "",
    interest: "",
    socialLink: "",
    contact: "",
    email: "",
    skills: "",
    expectedGraduation: ""
  });

  const [loading, setLoading] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);
  
  const generateRegistrationId = () => {
    const prefix = 'WR';
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}${timestamp}${random}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadIdCard = () => {
    const idCardData = `
Name: ${formData.fullName}
Registration ID: ${formData.registrationId}
Class: ${formData.className}
Contact: ${formData.contact}
    `;
    
    const blob = new Blob([idCardData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName}_ID_Card.txt`;
    a.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const registrationId = generateRegistrationId();
      setFormData(prev => ({ ...prev, registrationId }));
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowIdCard(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {!showIdCard ? (
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
            <div className="text-center p-6 border-b border-gray-700">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Join Webreich Community
              </h1>
            </div>
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Photo Upload Section */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-32 h-32 rounded-full border-4 border-blue-500 overflow-hidden bg-gray-700">
                    {formData.photo ? (
                      <img
                        src={formData.photo}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Camera className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="w-64 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                  />
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-200">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="className" className="block text-sm font-medium text-gray-200">
                      Program Level
                    </label>
                    <select
                      id="className"
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    >
                      <option value="">Select your program</option>
                      <option value="UG">Undergraduate (UG)</option>
                      <option value="PG">Postgraduate (PG)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-200">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="interest" className="block text-sm font-medium text-gray-200">
                      What do you want to learn?
                    </label>
                    <input
                      id="interest"
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-200">
                      Current Skills
                    </label>
                    <input
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="e.g., JavaScript, Python, Design"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="socialLink" className="block text-sm font-medium text-gray-200">
                      Social Media Profile
                    </label>
                    <input
                      type="url"
                      id="socialLink"
                      name="socialLink"
                      value={formData.socialLink}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                      placeholder="LinkedIn/GitHub profile"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    'Join Community'
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-xl">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-center text-green-400">
                Registration Successful!
              </h2>
            </div>
            <div className="p-6">
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded">
                <p>
                  Your registration ID is: <strong>{formData.registrationId}</strong>
                </p>
              </div>
              
              <div className="p-6 border-2 border-gray-700 rounded-lg mb-4">
                <div className="text-center mb-4">
                  <img
                    src={formData.photo}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-500"
                  />
                  <h3 className="text-xl font-bold text-white">{formData.fullName}</h3>
                  <p className="text-gray-400">{formData.registrationId}</p>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong>Program:</strong> {formData.className}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                  <p><strong>Contact:</strong> {formData.contact}</p>
                  <p><strong>Interest:</strong> {formData.interest}</p>
                </div>
              </div>
              
              <button
                onClick={downloadIdCard}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                <Download className="w-5 h-5" />
                <span>Download ID Card</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;