import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Upload,
  Loader2,
  Sparkles,
  Brain,
  Zap,
  Target,
  ArrowRight,
} from "lucide-react";
import { EmailAnalysisService } from "../services/analysisService";
import { sampleEmails } from "../data/sampleData";

const Analyze: React.FC = () => {
  const [emailContent, setEmailContent] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedSample, setSelectedSample] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const analysisService = EmailAnalysisService.getInstance();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAnalyze = async () => {
    if (!emailContent.trim()) {
      alert("Please enter email content to analyze");
      return;
    }

    setIsAnalyzing(true);

    try {
      const result = await analysisService.analyzeEmail(emailContent);

      if (result.success && result.data) {
        navigate("/result", { state: { analysis: result.data } });
      } else {
        alert(result.error || "Analysis failed. Please try again.");
      }
    } catch (error) {
      alert("An error occurred during analysis. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSampleSelect = (sampleId: string) => {
    const sample = sampleEmails.find((email) => email.id === sampleId);
    if (sample) {
      setEmailContent(sample.content);
      setSelectedSample(sampleId);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setEmailContent(content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a .txt file");
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "business":
        return "from-blue-600 to-blue-500";
      case "complaint":
        return "from-red-600 to-red-500";
      case "appreciation":
        return "from-green-600 to-green-500";
      case "inquiry":
        return "from-yellow-600 to-yellow-500";
      case "casual":
        return "from-purple-600 to-purple-500";
      case "urgent":
        return "from-orange-600 to-orange-500";
      case "follow-up":
        return "from-indigo-600 to-indigo-500";
      case "announcement":
        return "from-pink-600 to-pink-500";
      default:
        return "from-gray-600 to-gray-500";
    }
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case "business":
        return "bg-blue-100 text-blue-800";
      case "complaint":
        return "bg-red-100 text-red-800";
      case "appreciation":
        return "bg-green-100 text-green-800";
      case "inquiry":
        return "bg-yellow-100 text-yellow-800";
      case "casual":
        return "bg-purple-100 text-purple-800";
      case "urgent":
        return "bg-orange-100 text-orange-800";
      case "follow-up":
        return "bg-indigo-100 text-indigo-800";
      case "announcement":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-60 h-60 bg-gradient-to-br from-blue-100/50 to-indigo-100/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-indigo-100/40 to-blue-100/20 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 mb-6 shadow-lg">
            <Brain className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              AI-Powered Analysis
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Analyze Email{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Tone
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Paste your email content below or choose from our sample emails to
            get started with intelligent tone analysis
          </p>
        </div>

        {/* Sample Emails */}
        <div
          className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Sparkles className="h-6 w-6 mr-2 text-blue-500" />
            Try with Sample Emails
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleEmails.map((sample, index) => (
              <button
                key={sample.id}
                onClick={() => handleSampleSelect(sample.id)}
                className={`group relative p-6 text-left border-2 rounded-xl transition-all duration-300 hover-lift card-hover animate-fadeInUp ${
                  selectedSample === sample.id
                    ? "border-blue-500 bg-blue-50/50 shadow-lg"
                    : "border-gray-200 bg-white/80 backdrop-blur-sm hover:border-blue-300"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(
                    sample.category
                  )} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryBadgeColor(
                        sample.category
                      )}`}
                    >
                      {sample.category}
                    </span>
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-br ${getCategoryColor(
                        sample.category
                      )}`}
                    ></div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-all duration-300">
                    {sample.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {sample.content.substring(0, 120)}...
                  </p>
                  <div className="mt-3 flex items-center text-xs text-gray-500">
                    <FileText className="h-3 w-3 mr-1" />
                    {sample.content.split(" ").length} words
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Analysis Area */}
        <div
          className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 glass transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <label
                htmlFor="email-content"
                className="text-2xl font-bold text-gray-900 flex items-center"
              >
                <Target className="h-6 w-6 mr-2 text-blue-600" />
                Email Content
              </label>
              <div className="flex items-center space-x-3">
                <label className="group flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-all duration-300 hover-lift">
                  <Upload className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  Upload .txt file
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="relative">
              <textarea
                id="email-content"
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste your email content here..."
                className="w-full h-80 p-6 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none form-input custom-scrollbar transition-all duration-300"
              />
              {emailContent && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 border border-gray-200">
                  <Zap className="h-4 w-4 text-green-500 inline mr-1" />
                  <span className="text-sm font-medium text-gray-700">
                    Ready to analyze
                  </span>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FileText className="h-4 w-4 mr-1" />
                {emailContent.length} characters
              </span>
              <span>
                {
                  emailContent.split(/\s+/).filter((word) => word.length > 0)
                    .length
                }{" "}
                words
              </span>
            </div>
          </div>

          {/* Analysis Button */}
          <div className="text-center mb-8">
            <button
              onClick={handleAnalyze}
              disabled={!emailContent.trim() || isAnalyzing}
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed hover-lift"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                  Analyzing Magic in Progress...
                </>
              ) : (
                <>
                  <Sparkles className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
                  Analyze Tone
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            {isAnalyzing && (
              <div className="mt-4 text-center">
                <div className="inline-flex items-center space-x-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-pink-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <span className="ml-3 text-sm">
                    Processing your email with AI...
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              Pro Tips for Better Analysis
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>
                  Include complete sentences for more accurate tone detection
                </span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Longer emails provide more context for analysis</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Remove personal information before analyzing</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Try different email types to see how tone varies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-200/50">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-yellow-900 mb-2 flex items-center">
                Important Disclaimer
              </h3>
              <p className="text-yellow-800 text-sm leading-relaxed mb-3">
                <strong>Please note:</strong> This application currently uses
                simulated analysis algorithms for demonstration purposes. The
                results may not be entirely accurate as we are not yet
                implementing advanced Natural Language Processing (NLP) models.
              </p>
              <p className="text-yellow-800 text-sm leading-relaxed">
                <strong>Future Development:</strong> We are actively working on
                integrating state-of-the-art NLP technologies (such as BERT,
                GPT, and sentiment analysis libraries) to provide more accurate
                and reliable email tone analysis. Stay tuned for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;
