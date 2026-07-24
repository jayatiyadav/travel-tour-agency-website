import './App.css'

function App() {
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
          <a href="#">Blog</a>
          <a href="#">About Us</a>
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
    document.getElementById("bharat-bhraman").scrollIntoView({
        behavior: "smooth"})
    }>Explore India</button>
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
<section id="bharat-bhraman" className="bharat-bhraman">
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

  <button className="explore-all">
    Explore all →
  </button>
</section>
    </div>
  )
}

export default App