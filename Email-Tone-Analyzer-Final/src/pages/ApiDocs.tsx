import React, { useState } from "react";
import {
  Book,
  Code,
  Copy,
  CheckCircle,
  Play,
  Key,
  Shield,
  Zap,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

const ApiDocs: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    javascript: `// JavaScript/Node.js Example
const response = await fetch('https://api.emailtoneanalyzer.com/v1/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    email_content: "Dear Mr. Johnson, I hope this email finds you well...",
    options: {
      include_suggestions: true,
      confidence_threshold: 0.7
    }
  })
});

const analysis = await response.json();
console.log(analysis);`,

    python: `# Python Example
import requests

url = "https://api.emailtoneanalyzer.com/v1/analyze"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_API_KEY"
}
data = {
    "email_content": "Dear Mr. Johnson, I hope this email finds you well...",
    "options": {
        "include_suggestions": True,
        "confidence_threshold": 0.7
    }
}

response = requests.post(url, json=data, headers=headers)
analysis = response.json()
print(analysis)`,

    curl: `# cURL Example
curl -X POST https://api.emailtoneanalyzer.com/v1/analyze \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "email_content": "Dear Mr. Johnson, I hope this email finds you well...",
    "options": {
      "include_suggestions": true,
      "confidence_threshold": 0.7
    }
  }'`,

    response: `{
  "success": true,
  "data": {
    "id": "analysis_12345",
    "timestamp": "2024-01-15T10:30:00Z",
    "overall_sentiment": "positive",
    "confidence": 0.85,
    "tones": {
      "positive": 75,
      "negative": 10,
      "neutral": 15,
      "formal": 80,
      "informal": 20,
      "confident": 70,
      "tentative": 30
    },
    "suggestions": [
      "The email has a professional and positive tone overall",
      "Consider adding specific agenda items for clarity"
    ],
    "keywords": ["professional", "hope", "well", "email"],
    "processing_time_ms": 1250
  }
}`,
  };

  const endpoints = [
    {
      method: "POST",
      path: "/v1/analyze",
      description: "Analyze email content for tone and sentiment",
      status: "stable",
    },
    {
      method: "GET",
      path: "/v1/analysis/{id}",
      description: "Retrieve a specific analysis by ID",
      status: "stable",
    },
    {
      method: "GET",
      path: "/v1/history",
      description: "Get analysis history for your account",
      status: "stable",
    },
    {
      method: "POST",
      path: "/v1/batch",
      description: "Analyze multiple emails in batch",
      status: "beta",
    },
  ];

  const parameters = [
    {
      name: "email_content",
      type: "string",
      required: true,
      description: "The email content to analyze (max 10,000 characters)",
    },
    {
      name: "options.include_suggestions",
      type: "boolean",
      required: false,
      description:
        "Include improvement suggestions in response (default: true)",
    },
    {
      name: "options.confidence_threshold",
      type: "number",
      required: false,
      description:
        "Minimum confidence score to include tones (0.0-1.0, default: 0.5)",
    },
    {
      name: "options.language",
      type: "string",
      required: false,
      description: 'Language code for analysis (currently only "en" supported)',
    },
  ];

  const tabs = [
    { id: "overview", label: "Overview", icon: Book },
    { id: "authentication", label: "Authentication", icon: Key },
    { id: "endpoints", label: "Endpoints", icon: Code },
    { id: "examples", label: "Examples", icon: Play },
  ];

  const CodeBlock: React.FC<{ code: string; language: string; id: string }> = ({
    code,
    language,
    id,
  }) => (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800">
        <span className="text-sm text-gray-300 font-medium">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors"
        >
          {copiedCode === id ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="text-xs">
            {copiedCode === id ? "Copied!" : "Copy"}
          </span>
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
      {/* Header */}
      <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              API Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Integrate Email Tone Analyzer into your applications with our
              powerful and easy-to-use REST API
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">~1s</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">REST</div>
              <div className="text-sm text-gray-600">API Type</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md text-center">
              <Book className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">v1</div>
              <div className="text-sm text-gray-600">API Version</div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Getting Started
                    </h2>
                    <p className="text-gray-600 mb-4">
                      The Email Tone Analyzer API allows you to integrate
                      advanced email sentiment and tone analysis into your
                      applications. Our API is RESTful, uses JSON for data
                      exchange, and provides real-time analysis with high
                      accuracy.
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        Base URL
                      </h3>
                      <code className="bg-white px-3 py-2 rounded text-sm text-blue-800 block">
                        https://api.emailtoneanalyzer.com
                      </code>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-3">
                        Rate Limits
                      </h3>
                      <ul className="text-green-800 space-y-1 text-sm">
                        <li>• Free: 100 requests/day</li>
                        <li>• Pro: 10,000 requests/day</li>
                        <li>• Enterprise: Unlimited</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                      <p className="text-yellow-800">
                        <strong>Note:</strong> This is a demo API documentation.
                        The actual API is not yet available. This documentation
                        shows what the API would look like when implemented.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Authentication Tab */}
              {activeTab === "authentication" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Authentication
                    </h2>
                    <p className="text-gray-600 mb-4">
                      The API uses Bearer token authentication. Include your API
                      key in the Authorization header for all requests.
                    </p>
                  </div>

                  <CodeBlock
                    code={`Authorization: Bearer YOUR_API_KEY`}
                    language="HTTP Header"
                    id="auth-header"
                  />

                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      Getting Your API Key
                    </h3>
                    <ol className="text-blue-800 space-y-2">
                      <li>1. Sign up for an account at our developer portal</li>
                      <li>2. Navigate to the API Keys section</li>
                      <li>3. Generate a new API key</li>
                      <li>4. Copy and store your key securely</li>
                    </ol>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Get API Key
                    </button>
                  </div>
                </div>
              )}

              {/* Endpoints Tab */}
              {activeTab === "endpoints" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      API Endpoints
                    </h2>
                  </div>

                  <div className="space-y-4">
                    {endpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                endpoint.method === "GET"
                                  ? "bg-green-100 text-green-800"
                                  : endpoint.method === "POST"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {endpoint.method}
                            </span>
                            <code className="text-sm font-mono text-gray-800">
                              {endpoint.path}
                            </code>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded ${
                              endpoint.status === "stable"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {endpoint.status}
                          </span>
                        </div>
                        <p className="text-gray-600">{endpoint.description}</p>
                      </div>
                    ))}
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Request Parameters
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                              Parameter
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                              Type
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                              Required
                            </th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                              Description
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {parameters.map((param, index) => (
                            <tr key={index}>
                              <td className="px-4 py-3 text-sm font-mono text-gray-800">
                                {param.name}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {param.type}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span
                                  className={`px-2 py-1 text-xs font-medium rounded ${
                                    param.required
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {param.required ? "Required" : "Optional"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">
                                {param.description}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Examples Tab */}
              {activeTab === "examples" && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      Code Examples
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Here are examples of how to use the API in different
                      programming languages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      JavaScript/Node.js
                    </h3>
                    <CodeBlock
                      code={codeExamples.javascript}
                      language="JavaScript"
                      id="js-example"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Python
                    </h3>
                    <CodeBlock
                      code={codeExamples.python}
                      language="Python"
                      id="python-example"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      cURL
                    </h3>
                    <CodeBlock
                      code={codeExamples.curl}
                      language="bash"
                      id="curl-example"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Response Example
                    </h3>
                    <CodeBlock
                      code={codeExamples.response}
                      language="JSON"
                      id="response-example"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApiDocs;
