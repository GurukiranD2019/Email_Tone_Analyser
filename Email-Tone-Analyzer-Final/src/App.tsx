import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingSpinner from "./components/LoadingSpinner";
import PageTransition from "./components/PageTransition";

// Lazy load components for better performance
const Home = React.lazy(() => import("./pages/Home"));
const Analyze = React.lazy(() => import("./pages/Analyze"));
const Result = React.lazy(() => import("./pages/Result"));
const About = React.lazy(() => import("./pages/About"));
const ApiDocs = React.lazy(() => import("./pages/ApiDocs"));

// Wrapper component for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <PageTransition>{children}</PageTransition>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main className="pt-0 overflow-hidden">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route
                path="/"
                element={
                  <PageWrapper>
                    <Home />
                  </PageWrapper>
                }
              />
              <Route
                path="/analyze"
                element={
                  <PageWrapper>
                    <Analyze />
                  </PageWrapper>
                }
              />
              <Route
                path="/result"
                element={
                  <PageWrapper>
                    <Result />
                  </PageWrapper>
                }
              />
              <Route
                path="/about"
                element={
                  <PageWrapper>
                    <About />
                  </PageWrapper>
                }
              />
              <Route
                path="/api-docs"
                element={
                  <PageWrapper>
                    <ApiDocs />
                  </PageWrapper>
                }
              />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}

export default App;
