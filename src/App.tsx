import React, { useState } from 'react';
import { Upload, LogIn, LogOut, User, Shield, Brain, Activity, FileImage, CheckCircle, AlertTriangle, Stethoscope } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface DetectionResult {
  prediction: 'Normal' | 'Pneumonia';
  confidence: number;
  details: {
    normal_probability: number;
    pneumonia_probability: number;
  };
  timestamp: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    setUser({
      id: '1',
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email
    });
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setUploadedImage(null);
    setResult(null);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0] && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0]);
    }
  };

  const analyzeImage = async () => {
    if (!uploadedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const isPneumonia = Math.random() > 0.6;
      const confidence = 0.75 + Math.random() * 0.24;
      
      setResult({
        prediction: isPneumonia ? 'Pneumonia' : 'Normal',
        confidence: confidence,
        details: {
          normal_probability: isPneumonia ? 1 - confidence : confidence,
          pneumonia_probability: isPneumonia ? confidence : 1 - confidence
        },
        timestamp: new Date().toISOString()
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
        {/* Navigation */}
        <nav className="relative z-10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">PneumoAI</span>
            </div>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-teal-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="mb-8">
                <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300 text-sm font-medium">FDA-Grade AI Technology</span>
                </div>
                <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
                  AI-Powered
                  <span className="bg-gradient-to-r from-blue-400 to-teal-300 bg-clip-text text-transparent block">
                    Pneumonia Detection
                  </span>
                </h1>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  Revolutionary artificial intelligence platform that analyzes chest X-rays with unprecedented accuracy, 
                  helping healthcare professionals detect pneumonia faster and more reliably than ever before.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Start Analysis
                </button>
                <button className="border border-slate-600 text-slate-300 px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 hover:border-slate-500 transition-all duration-300">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">98.7%</div>
                  <div className="text-slate-300">Detection Accuracy</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">2.3s</div>
                  <div className="text-slate-300">Average Analysis Time</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
                  <div className="text-3xl font-bold text-white mb-2">50K+</div>
                  <div className="text-slate-300">X-rays Analyzed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Login Modal */}
        {showLogin && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                <p className="text-gray-600">Sign in to access PneumoAI</p>
              </div>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleLogin(formData.get('email') as string, formData.get('password') as string);
              }}>
                <div className="space-y-4">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-500 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-teal-600 transition-all duration-300"
                  >
                    Sign In
                  </button>
                </div>
              </form>
              
              <button
                onClick={() => setShowLogin(false)}
                className="w-full mt-4 text-gray-500 hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-400 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">PneumoAI</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-gray-700">
                <User className="w-5 h-5" />
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pneumonia Detection Dashboard</h1>
          <p className="text-gray-600">Upload a chest X-ray for AI-powered pneumonia analysis</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileImage className="w-5 h-5 mr-2 text-blue-600" />
              X-ray Upload
            </h2>
            
            {!uploadedImage ? (
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drag and drop your X-ray image here, or click to browse
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-gradient-to-r from-blue-600 to-teal-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:from-blue-700 hover:to-teal-600 transition-all duration-300 inline-block"
                >
                  Choose File
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={uploadedImage}
                    alt="Uploaded X-ray"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setUploadedImage(null);
                      setResult(null);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    ×
                  </button>
                </div>
                
                <button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Activity className="w-5 h-5" />
                      <span>Analyze X-ray</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 mr-2 text-blue-600" />
              Analysis Results
            </h2>
            
            {!result && !isAnalyzing && (
              <div className="text-center py-12 text-gray-500">
                <Activity className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>Upload an X-ray to see AI analysis results</p>
              </div>
            )}

            {isAnalyzing && (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Brain className="w-8 h-8 text-white animate-bounce" />
                  </div>
                  <p className="text-blue-600 font-medium">AI is analyzing your X-ray...</p>
                  <p className="text-gray-500 text-sm mt-2">This may take a few seconds</p>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-6">
                <div className={`p-4 rounded-lg border-l-4 ${
                  result.prediction === 'Normal' 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-red-50 border-red-500'
                }`}>
                  <div className="flex items-center">
                    {result.prediction === 'Normal' ? (
                      <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                    )}
                    <div>
                      <h3 className={`font-semibold ${
                        result.prediction === 'Normal' ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {result.prediction}
                      </h3>
                      <p className={`text-sm ${
                        result.prediction === 'Normal' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        Confidence: {(result.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Detailed Analysis</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Normal</span>
                        <span className="font-medium">{(result.details.normal_probability * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${result.details.normal_probability * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Pneumonia</span>
                        <span className="font-medium">{(result.details.pneumonia_probability * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${result.details.pneumonia_probability * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Analysis completed: {new Date(result.timestamp).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    <strong>Disclaimer:</strong> This is a demonstration. Always consult healthcare professionals for medical diagnosis.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;