import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PasswordAnalyzer from './pages/PasswordAnalyzer';
import JWTDecoder from './pages/JWTDecoder';
import URLAnalyzer from './pages/URLAnalyzer';
import WordlistGenerator from './pages/WordlistGenerator';
import HashGenerator from './pages/HashGenerator';
import Base64Tool from './pages/Base64Tool';
import PasswordGenerator from './pages/PasswordGenerator';
import HeaderAnalyzer from './pages/HeaderAnalyzer';
import EntropyCalculator from './pages/EntropyCalculator';
import XSSEncoder from './pages/XSSEncoder';
import SubdomainGenerator from './pages/SubdomainGenerator';
import RandomStringGenerator from './pages/RandomStringGenerator';
import Learn from './pages/Learn';

export default function App() {
  return (
    <BrowserRouter>
      <div className="scanline min-h-screen bg-cyber-dark font-sans text-gray-100">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/password-analyzer" element={<PasswordAnalyzer />} />
            <Route path="/jwt-decoder" element={<JWTDecoder />} />
            <Route path="/url-analyzer" element={<URLAnalyzer />} />
            <Route path="/wordlist-generator" element={<WordlistGenerator />} />
            <Route path="/hash-generator" element={<HashGenerator />} />
            <Route path="/base64-tool" element={<Base64Tool />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/header-analyzer" element={<HeaderAnalyzer />} />
            <Route path="/entropy-calculator" element={<EntropyCalculator />} />
            <Route path="/xss-encoder" element={<XSSEncoder />} />
            <Route path="/subdomain-generator" element={<SubdomainGenerator />} />
            <Route path="/random-string" element={<RandomStringGenerator />} />
            <Route path="/learn" element={<Learn />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
