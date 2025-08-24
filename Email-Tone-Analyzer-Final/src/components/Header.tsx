import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, Home, Search, Info, Book, Menu, X } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth navigation
  const handleNavigation = (path: string, e: React.MouseEvent) => {
    if (path === location.pathname) return;

    e.preventDefault();
    setIsNavigating(true);
    setIsMobileMenuOpen(false);

    // Small delay for visual feedback
    setTimeout(() => {
      navigate(path);
      setIsNavigating(false);
    }, 150);
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/analyze", label: "Analyze", icon: Search },
    { path: "/about", label: "About Us", icon: Info },
    { path: "/api-docs", label: "API Docs", icon: Book },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-200/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse-slow"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              Email Tone Analyzer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map(({ path, label, icon: Icon }, index) => (
              <Link
                key={path}
                to={path}
                onClick={(e) => handleNavigation(path, e)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover-lift group animate-fadeInUp smooth-hover ${
                  isActive(path)
                    ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                } ${isNavigating ? "opacity-50 pointer-events-none" : ""}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isActive(path) ? "scale-110" : "group-hover:scale-110"
                  }`}
                />
                <span>{label}</span>
                {isActive(path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-80 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-gray-200/50">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navItems.map(({ path, label, icon: Icon }, index) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover-lift animate-fadeInLeft ${
                  isActive(path)
                    ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 shadow-md"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isActive(path) ? "scale-110 text-blue-600" : ""
                  }`}
                />
                <span>{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
