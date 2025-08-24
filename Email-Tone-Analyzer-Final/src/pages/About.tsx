import React from "react";
import {
  Brain,
  Target,
  Zap,
  Code,
  Globe,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
} from "lucide-react";

const About: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "Advanced NLP Engine",
      description:
        "Powered by state-of-the-art natural language processing algorithms that understand context, sentiment, and emotional nuances.",
    },
    {
      icon: Target,
      title: "Multi-Dimensional Analysis",
      description:
        "Analyzes 10+ emotional tones including positive, negative, formal, informal, confident, tentative, and more.",
    },
    {
      icon: Zap,
      title: "Real-Time Processing",
      description:
        "Get instant results with our optimized processing pipeline that analyzes emails in under 2 seconds.",
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description:
        "Your email content is processed securely and never stored permanently on our servers.",
    },
  ];

  const techStack = [
    {
      name: "React",
      icon: Code,
      description: "Modern UI framework for responsive interfaces",
    },
    {
      name: "TypeScript",
      icon: Code,
      description: "Type-safe development for better code quality",
    },
    {
      name: "Vite",
      icon: Zap,
      description: "Fast build tool for optimized performance",
    },
    {
      name: "Tailwind CSS",
      icon: Globe,
      description: "Utility-first CSS for beautiful designs",
    },
  ];

  const benefits = [
    "Improve email response rates by 40%",
    "Reduce miscommunication incidents",
    "Build stronger professional relationships",
    "Save time with instant feedback",
    "Enhance cross-cultural communication",
    "Increase email effectiveness",
  ];

  const futureScope = [
    "Integration with major email clients (Gmail, Outlook)",
    "Advanced sentiment analysis with emotion detection",
    "Multi-language support for global teams",
    "Team collaboration features and shared insights",
    "AI-powered email composition suggestions",
    "Advanced analytics and reporting dashboards",
    "Integration with CRM and communication tools",
    "Real-time email coaching and tips",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      {/* Hero Section */}
      <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Email Tone Analyzer
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            We're revolutionizing email communication through intelligent tone
            analysis, helping professionals communicate more effectively and
            build better relationships.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To bridge communication gaps in the digital age by providing
                intelligent analysis tools that help people understand and
                improve the emotional impact of their written communication.
              </p>
              <div className="space-y-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                How It Works
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Input Analysis
                    </h3>
                    <p className="text-gray-600">
                      Paste or upload your email content for processing
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      NLP Processing
                    </h3>
                    <p className="text-gray-600">
                      Our AI analyzes sentiment, tone, and emotional markers
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Results & Insights
                    </h3>
                    <p className="text-gray-600">
                      Receive detailed analysis with actionable suggestions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="text-center p-6 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <tech.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {tech.name}
                </h3>
                <p className="text-gray-600 text-sm">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Future Roadmap</h2>
          <p className="text-lg text-blue-100 mb-12 max-w-3xl mx-auto">
            We're constantly innovating to bring you more powerful features and
            capabilities
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureScope.map((item, index) => (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30 shadow-lg"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-white/30 rounded-full mx-auto mb-3">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                <p className="text-sm font-medium text-center text-white">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.5%</div>
              <div className="text-gray-600">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                &lt;2s
              </div>
              <div className="text-gray-600">Analysis Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">10+</div>
              <div className="text-gray-600">Tone Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Email Communication?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of professionals who are already using our platform
            to improve their communication.
          </p>
          <a
            href="/analyze"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl group"
          >
            Start Analyzing Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
