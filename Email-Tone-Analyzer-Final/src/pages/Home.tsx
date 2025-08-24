import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Zap,
  Target,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Users,
  CheckCircle,
} from "lucide-react";
import AnimatedSection from "../components/AnimatedSection";

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "Advanced NLP Analysis",
      description:
        "Powered by cutting-edge natural language processing to understand emotional nuances in your emails.",
      color: "from-blue-800 to-blue-600",
    },
    {
      icon: Target,
      title: "Precise Tone Detection",
      description:
        "Identifies multiple emotional tones including positive, negative, formal, informal, and more.",
      color: "from-emerald-800 to-emerald-600",
    },
    {
      icon: TrendingUp,
      title: "Actionable Insights",
      description:
        "Get specific suggestions to improve your email communication and achieve better outcomes.",
      color: "from-teal-800 to-teal-600",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description:
        "Analyze your emails in seconds and get detailed breakdowns with confidence scores.",
      color: "from-slate-700 to-slate-500",
    },
    {
      icon: CheckCircle,
      title: "Professional Reports",
      description:
        "Export detailed PDF reports with comprehensive analysis, perfect for presentations and documentation.",
      color: "from-violet-800 to-violet-600",
    },
    {
      icon: Users,
      title: "Multi-Category Analysis",
      description:
        "Covers 10+ different tone categories including enthusiasm, formality, confidence, and analytical patterns.",
      color: "from-amber-800 to-amber-600",
    },
  ];

  const benefits = [
    "Improve professional communication",
    "Reduce misunderstandings",
    "Build better relationships",
    "Increase response rates",
    "Enhance email effectiveness",
  ];

  const stats = [
    { number: "99.5%", label: "Accuracy Rate", icon: Target },
    { number: "50K+", label: "Emails Analyzed", icon: Brain },
    { number: "<2s", label: "Analysis Time", icon: Zap },
    { number: "10+", label: "Tone Categories", icon: Users },
  ];

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-blue-100/50 to-indigo-100/30 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-indigo-100/40 to-blue-100/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-4 py-2 mb-8 shadow-lg hover-lift">
              <Sparkles className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                Real NLP Technology
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Analyze Your Email{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tone
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Understand the emotional impact of your emails before you send
              them. Get detailed tone analysis, sentiment scores, and actionable
              suggestions to improve your communication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/analyze"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover-lift"
              >
                <Sparkles className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Analyzing
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover-lift"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 hover-lift animate-fadeInUp shadow-lg"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <AnimatedSection className="max-w-7xl mx-auto" animation="fadeInUp">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our advanced email tone analysis can transform your
              communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <AnimatedSection
                key={index}
                animation="scaleIn"
                delay={index * 100}
                className="group relative bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-8 hover-lift shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
                ></div>

                <div className="relative">
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">
            Why Use Email Tone Analyzer?
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center text-white bg-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover-lift animate-fadeInUp"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle className="h-5 w-5 mr-3 text-green-300" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Email Communication?
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join thousands of professionals who are already using Email Tone
              Analyzer to create more effective and impactful emails.
            </p>
            <Link
              to="/analyze"
              className="group inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl hover:shadow-2xl hover-lift"
            >
              <Sparkles className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform" />
              Get Started Now
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
