import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TourDetails from './TourDetails'
import RajasthanTour from './RajasthanTour'
import KeralaTour from './KeralaTour'
import Blog from './Blog'
import AboutUs from './AboutUs'
import ExploreIndia from './ExploreIndia'
function Home() {
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
          <button className="ai-button">
            🤖 Plan with Saarthi AI
          </button>

          <button className="login-button">
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
            <img src="/image/kas1.jpg" alt="Kashmir" />
            <p>Paradise in the North</p>
          </div>

          <div className="destination-card">
            <img src="/image/raj1.jpg" alt="Rajasthan" />
            <p>Royal Heritage & Culture</p>
          </div>

          <div className="destination-card">
            <img src="/image/var1.jpg" alt="Varanasi" />
            <p>The Spiritual Heart of India</p>
          </div>

          <div className="destination-card">
            <img src="/image/guj1.jpg" alt="Gujarat" />
            <p>A Blend of Heritage & Vibrant Culture</p>
          </div>

          <div className="destination-card">
            <img src="/image/ker1.jpg" alt="Kerala" />
            <p>Nature, Backwaters & Serenity</p>
          </div>

          <div className="destination-card">
            <img src="/image/goa1.jpg" alt="Goa" />
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


          {/* Kashmir Tour */}
          <div className="tour-card">

            <img
              src="/image/kashmir_tour.jpg"
              alt="Kashmir Paradise Tour"
            />

            <div className="tour-info">

              <h3>Kashmir Paradise Tour</h3>

              <p className="tour-duration">
                🗓️ 6 Days / 5 Nights
              </p>

              <p>
                Experience the breathtaking beauty of Kashmir,
                from serene lakes to majestic mountains.
              </p>

              <div className="tour-bottom">

                <span className="tour-price">
                  ₹25,000
                </span>

                <button
                  className="view-details"
                  onClick={() =>
                    window.location.href = "/kashmir-tour"
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          </div>


          {/* Rajasthan Tour */}
          <div className="tour-card">

            <img
              src="/image/rajsthan_tour.jpg"
              alt="Royal Rajasthan Tour"
            />

            <div className="tour-info">

              <h3>Royal Rajasthan Tour</h3>

              <p className="tour-duration">
                🗓️ 7 Days / 6 Nights
              </p>

              <p>
                Discover royal palaces, magnificent forts,
                vibrant culture and the golden desert.
              </p>

              <div className="tour-bottom">

                <span className="tour-price">
                  ₹30,000
                </span>

                <button className="view-details"
                 onClick={() => window.location.href = "/rajasthan-tour"}
>
                  View Details
                </button>

              </div>

            </div>

          </div>


          {/* Kerala Tour */}
          <div className="tour-card">

            <img
              src="/image/kerala_tour.jpg"
              alt="Kerala Backwaters Tour"
            />

            <div className="tour-info">

              <h3>Kerala Backwaters Tour</h3>

              <p className="tour-duration">
                🗓️ 5 Days / 4 Nights
              </p>

              <p>
                Relax amidst peaceful backwaters, lush greenery
                and the natural beauty of God's Own Country.
              </p>

              <div className="tour-bottom">

                <span className="tour-price">
                  ₹22,000
                </span>

                <button className="view-details"
                 onClick={() => window.location.href = "/kerala-tour"}
                >
                  View Details
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  )
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
/>

      </Routes>

    </BrowserRouter>
  )
}

export default App