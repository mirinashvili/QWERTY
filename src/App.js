import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const HomePage = lazy(() => import('./Page/HomePage/HomePage'));
const SingelPage = lazy(() => import('./Page/SingelPage/SingelPage'));
function App() {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/SingelPage/:id" element={<SingelPage />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}
export default App;