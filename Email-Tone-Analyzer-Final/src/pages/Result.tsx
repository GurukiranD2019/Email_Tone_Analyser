import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Target,
  Lightbulb,
  ArrowLeft,
  Download,
  Share2,
  BarChart3,
  Sparkles,
  Eye,
  Award,
  Zap,
  FileText,
} from "lucide-react";
import type { ToneAnalysis } from "../types";
import { exportToPDF, exportToPDFSimple } from "../utils/pdfExport";

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis as ToneAnalysis;
  const [isVisible, setIsVisible] = useState(false);
  const [animatedScores, setAnimatedScores] = useState<Record<string, number>>(
    {}
  );

  useEffect(() => {
    setIsVisible(true);

    // Animate scores
    if (analysis) {
      const scores = analysis.tones;
      Object.keys(scores).forEach((key, index) => {
        setTimeout(() => {
          setAnimatedScores((prev) => ({
            ...prev,
            [key]: scores[key as keyof typeof scores],
          }));
        }, index * 100);
      });
    }
  }, [analysis]);

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center pt-16">
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-xl border border-gray-200/50 glass">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Eye className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            No Analysis Data Found
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Please go back and analyze an email first to see the results.
          </p>
          <Link
            to="/analyze"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Analyze
          </Link>
        </div>
      </div>
    );
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <TrendingUp className="h-8 w-8 text-green-600" />;
      case "negative":
        return <TrendingDown className="h-8 w-8 text-red-600" />;
      default:
        return <Minus className="h-8 w-8 text-gray-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "from-green-500 to-emerald-500";
      case "negative":
        return "from-red-500 to-pink-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

  const getSentimentBadgeColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-100 text-green-800";
      case "negative":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-yellow-600";
    return "text-red-600";
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const handleExport = async () => {
    try {
      // Try to export the complete dashboard including header
      const success = await exportToPDF(analysis, "dashboard-content");
      if (!success) {
        console.log('Full dashboard export failed, trying content only...');
        const contentSuccess = await exportToPDF(analysis, "analysis-content");
        if (!contentSuccess) {
          console.log('Content export failed, trying simple export...');
          await exportToPDFSimple(analysis);
        }
      }
    } catch (error) {
      console.error('Export failed:', error);
      // Fallback to simple export
      try {
        console.log('Attempting fallback simple export...');
        await exportToPDFSimple(analysis);
      } catch (fallbackError) {
        console.error('Fallback export also failed:', fallbackError);
        alert('PDF export failed. Please try refreshing the page and trying again.');
      }
    }
  };

  const toneData = [
    {
      name: "Positive",
      value: animatedScores.positive || 0,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500",
    },
    {
      name: "Negative",
      value: animatedScores.negative || 0,
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-500",
    },
    {
      name: "Neutral",
      value: animatedScores.neutral || 0,
      color: "from-gray-500 to-slate-500",
      bgColor: "bg-gray-500",
    },
    {
      name: "Angry",
      value: animatedScores.angry || 0,
      color: "from-red-600 to-red-700",
      bgColor: "bg-red-600",
    },
    {
      name: "Enthusiastic",
      value: animatedScores.enthusiastic || 0,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500",
    },
    {
      name: "Formal",
      value: animatedScores.formal || 0,
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500",
    },
    {
      name: "Informal",
      value: animatedScores.informal || 0,
      color: "from-orange-500 to-yellow-500",
      bgColor: "bg-orange-500",
    },
    {
      name: "Analytical",
      value: animatedScores.analytical || 0,
      color: "from-indigo-500 to-purple-600",
      bgColor: "bg-indigo-500",
    },
    {
      name: "Confident",
      value: animatedScores.confident || 0,
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-500",
    },
    {
      name: "Tentative",
      value: animatedScores.tentative || 0,
      color: "from-yellow-500 to-amber-500",
      bgColor: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div
          className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10" id="dashboard-content">
        {/* Header */}
        <div
          className={`flex items-center justify-between mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          id="dashboard-header"
        >
          <div>
            <button
              onClick={() => navigate("/analyze")}
              className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium transition-colors hover-lift print:hidden"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Analyze
            </button>
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              Analysis Results
            </h1>
            <p className="text-gray-600 flex items-center text-lg">
              <Clock className="h-5 w-5 mr-2" />
              {formatDate(analysis.timestamp)}
            </p>
          </div>
          <div className="flex space-x-3 print:hidden">
            <button
              id="export-btn"
              onClick={handleExport}
              className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-700 hover:bg-white transition-all duration-300 hover-lift glass"
            >
              <Download className="h-5 w-5 mr-2" />
              Export PDF
            </button>
            <button
              onClick={() => exportToPDFSimple(analysis)}
              className="inline-flex items-center px-4 py-3 bg-gray-100/80 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-200 transition-all duration-300 hover-lift glass text-sm"
              title="Simple text-based PDF export"
            >
              <FileText className="h-4 w-4 mr-1" />
              Simple PDF
            </button>
            <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover-lift">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8" id="analysis-content">
          {/* Main Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overall Sentiment */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 glass hover-lift transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${getSentimentColor(
                    analysis.overallSentiment
                  )} rounded-xl flex items-center justify-center mr-4`}
                >
                  <Target className="h-6 w-6 text-white" />
                </div>
                Overall Sentiment
              </h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getSentimentIcon(analysis.overallSentiment)}
                    <span
                      className={`px-4 py-2 rounded-full text-lg font-bold ${getSentimentBadgeColor(
                        analysis.overallSentiment
                      )}`}
                    >
                      {analysis.overallSentiment.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-gray-900 mb-1">
                    {Math.round(analysis.confidence * 100)}%
                  </div>
                  <div className="text-gray-600 flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Confidence
                  </div>
                </div>
              </div>
            </div>

            {/* Tone Breakdown */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 glass transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                Tone Breakdown
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {toneData.map((tone, index) => (
                  <div
                    key={tone.name}
                    className="group relative p-6 border border-gray-200/50 rounded-xl hover:border-transparent transition-all duration-300 hover-lift card-hover animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${tone.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}
                    ></div>

                    <div className="relative flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-full ${tone.bgColor}`}
                        ></div>
                        <span className="font-bold text-gray-900 group-hover:text-gradient transition-all duration-300">
                          {tone.name}
                        </span>
                      </div>
                      <div
                        className={`text-2xl font-bold ${getScoreColor(
                          tone.value
                        )}`}
                      >
                        {Math.round(tone.value)}%
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full bg-gradient-to-r ${tone.color} transition-all duration-1000 progress-bar`}
                          style={{ width: `${tone.value}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-200/50 glass transition-all duration-1000 delay-600 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mr-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                AI Suggestions
              </h2>
              <div className="space-y-4">
                {analysis.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="group flex items-start space-x-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200/50 hover:border-purple-300/50 transition-all duration-300 hover-lift animate-fadeInLeft"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Keywords */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 glass transition-all duration-1000 delay-800 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                Key Words
              </h3>
              <div className="flex flex-wrap gap-3">
                {analysis.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-bold border border-purple-200/50 hover:from-purple-200 hover:to-pink-200 transition-all duration-300 hover-lift animate-fadeInUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            {/* Email Preview */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 glass transition-all duration-1000 delay-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-600" />
                Email Preview
              </h3>
              <div className="bg-gray-50 rounded-xl p-4 max-h-64 overflow-y-auto custom-scrollbar">
                <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {analysis.emailContent.length > 300
                    ? `${analysis.emailContent.substring(0, 300)}...`
                    : analysis.emailContent}
                </p>
              </div>
              <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span className="flex items-center">
                  <Zap className="h-3 w-3 mr-1" />
                  {analysis.emailContent.length} characters
                </span>
                <span>{analysis.emailContent.split(/\s+/).length} words</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-200/50 glass transition-all duration-1000 delay-1200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  to="/analyze"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold hover-lift"
                >
                  Analyze Another Email
                </Link>
                <button className="block w-full px-6 py-3 bg-gray-100 text-gray-700 text-center rounded-xl hover:bg-gray-200 transition-all duration-300 font-medium hover-lift">
                  Save Results
                </button>
                <button className="block w-full px-6 py-3 bg-green-100 text-green-700 text-center rounded-xl hover:bg-green-200 transition-all duration-300 font-medium hover-lift">
                  Get Detailed Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
