import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from "react"
import TourDetails from './TourDetails'
import RajasthanTour from './RajasthanTour'
import KeralaTour from './KeralaTour'
import Blog from './Blog'
import AboutUs from './AboutUs'
import ExploreIndia from './ExploreIndia'
import RajasthanToursList from './RajasthanToursList'
import Login from './login'
import Signup from "./Signup"
import SaarthiAI from "./SaarthiAI";
import AdminDashboard from "./AdminDashboard";
function Home() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSaarthi, setShowSaarthi] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
    const [tours, setTours] = useState([]);
  const [loadingTours, setLoadingTours] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/tours")
      .then((res) => res.json())
      .then((data) => {
        setTours(data);
        setLoadingTours(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tours:", error);
        setLoadingTours(false);
      });
  }, []);

  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">

        {/* Logo */}
        <div className="logo">
          <img src="/भ्रमणम्2.png" alt="Bhramanam Logo" />
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Destinations</a>
          <a href="#">Tours</a>
          <a href="#">Flights</a>
          <a href="#">Hotels</a>
          <a href="/blog">Blog</a>
          <a href="/about-us">About Us</a>
        </div>

        {/* AI Planner & Login */}
        <div className="nav-right">
          <button className="ai-button"
          onClick={() => setShowSaarthi(true)}>
            🤖 Plan with Saarthi AI
            
          </button>

          <button
  className="login-button"
  onClick={() => setShowLogin(true)}
>
  👤
</button>
        </div>

      </nav>


      {/* Hero Section */}
      <section className="hero">

        <img
          src="/udaipur_hero.jpeg"
          alt="Beautiful Indian Destination"
          className="hero-image"
        />

        <div className="hero-text">

          <button
            className="explore-button"
            onClick={() =>
              document
                .getElementById("bharat-bhraman")
                .scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Explore India
          </button>

          <h1>Discover The Soul Of Bharat</h1>

        </div>

      </section>


      {/* Search Section */}
      <section className="search-section">

        <div className="search-box">
          <span>WHERE DO YOU WANT TO TRAVEL?</span>
          <span>📍</span>
        </div>

        <div className="date-box">
          <span>DATE</span>
          <span>📅</span>
        </div>

        <button className="search-button">
          🔍
        </button>

      </section>


      {/* Bharat Bhraman Section */}
      <section
        id="bharat-bhraman"
        className="bharat-bhraman"
      >

        <h2>भारत भ्रमण</h2>

        <p>
          From the majestic Himalayas to the serene southern coasts,
          <br />
          discover destinations that tell the story of Bharat.
        </p>

        <div className="destination-grid">

          <div className="destination-card">
            <img src="/image/kashmir.png" alt="Kashmir" />
            <p>Paradise in the North</p>
          </div>

          <div className="destination-card">
            <img src="/image/rajsthan.png" alt="Rajasthan" />
            <p>Royal Heritage & Culture</p>
          </div>

          <div className="destination-card">
            <img src="/image/varanasi.png" alt="Varanasi" />
            <p>The Spiritual Heart of India</p>
          </div>

          <div className="destination-card">
            <img src="/image/gujrat.png" alt="Gujarat" />
            <p>A Blend of Heritage & Vibrant Culture</p>
          </div>

          <div className="destination-card">
            <img src="/image/kerala.png" alt="Kerala" />
            <p>Nature, Backwaters & Serenity</p>
          </div>

          <div className="destination-card">
            <img src="/image/goa.png" alt="Goa" />
            <p>Beaches, Sunsets & Vibrant Vibes</p>
          </div>

        </div>

        <button className="explore-all" 
        onClick={() => window.location.href = "/explore-india"}>
          Explore all →
        </button>

      </section>


      {/* Popular Tours Section */}
      <section className="popular-tours">

        <h2>Popular Tours</h2>

        <p className="popular-tours-subtitle">
          Explore India's most loved journeys
        </p>

        <div className="tour-grid">

  {loadingTours ? (
    <p>Loading tours...</p>
  ) : tours.length === 0 ? (
    <p>No tours available.</p>
  ) : (
    tours.map((tour) => (
      <div className="tour-card" key={tour._id}>

        <img
          src={
            tour.destination === "Kashmir"
              ? "/image/kashmir_tour.jpg"
              : tour.destination === "Rajasthan"
              ? "/image/rajsthan_tour.jpg"
              : "/image/kerala_tour.jpg"
          }
          alt={tour.name}
        />

        <div className="tour-info">

          <h3>{tour.name}</h3>

          <p className="tour-duration">
            🗓️ {tour.duration}
          </p>

          <p>
            {tour.description}
          </p>

          <div className="tour-bottom">

            <span className="tour-price">
              ₹{tour.price.toLocaleString("en-IN")}
            </span>

            <button
              className="view-details"
              onClick={() => {
                if (tour.destination === "Kashmir") {
                  window.location.href = "/kashmir-tour";
                } else if (tour.destination === "Rajasthan") {
                  window.location.href = "/rajasthan-tour";
                } else if (tour.destination === "Kerala") {
                  window.location.href = "/kerala-tour";
                }
              }}
            >
              View Details
            </button>

          </div>

        </div>

      </div>
    ))
  )}

</div>

      </section>

    
          

      {showLogin && (
  <Login
    onClose={() => setShowLogin(false)}
    onSignup={() => {
      setShowLogin(false);
      setShowSignup(true);
    }}
  />
)}
{showSignup && (
  <Signup
    onClose={() => setShowSignup(false)}
    onLogin={() => {
      setShowSignup(false);
      setShowLogin(true);
    }}
  />
)}
{showSaarthi && (
  <SaarthiAI onClose={() => setShowSaarthi(false)} />
)}
    </div>
  );
}
    
  




function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Kashmir Tour Details Page */}
        <Route
          path="/kashmir-tour"
          element={<TourDetails />}
        />
        <Route
  path="/rajasthan-tour"
  element={<RajasthanTour />}
/>

<Route
  path="/kerala-tour"
  element={<KeralaTour />}
/>
<Route path="/blog" element={<Blog />} />
<Route path="/about-us" element={<AboutUs />} />
<Route
  path="/explore-india"
  element={<ExploreIndia />}
/><Route
  path="/rajasthan-tours"
  element={<RajasthanToursList />}
/>
<Route
  path="/admin"
  element={<AdminDashboard />}
/>


      </Routes>

    </BrowserRouter>
  )
}

export default App