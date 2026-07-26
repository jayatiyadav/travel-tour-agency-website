import { useNavigate } from 'react-router-dom'

function AboutUs() {
  const navigate = useNavigate()

  return (
    <div className="about-page">

      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>

      <section className="about-hero">

  <img
    src="/भ्रमणम्2.png"
    alt="Bhramanam Logo"
    className="about-logo"
  />

  <h1>About Bhramanam</h1>

  <p>
    Discover the Soul of Bharat
  </p>

</section>


      <section className="about-content">

        <h2>Our Story</h2>

        <p>
          Bhramanam is a travel platform created to help
          travelers discover the incredible beauty, culture
          and heritage of India.
        </p>

        <p>
          From the majestic Himalayas to the serene southern
          coasts, we bring India's most beautiful destinations
          and unforgettable journeys together in one place.
        </p>


        <div className="about-features">

          <div>
            <span>🇮🇳</span>
            <h3>Discover Bharat</h3>
            <p>
              Explore India's diverse destinations,
              cultures and traditions.
            </p>
          </div>

          <div>
            <span>✈️</span>
            <h3>Travel Better</h3>
            <p>
              Find inspiring tours and experiences
              for your next journey.
            </p>
          </div>

          <div>
            <span>🤖</span>
            <h3>Plan with Saarthi AI</h3>
            <p>
              Get personalized travel assistance
              for your Indian adventures.
            </p>
          </div>

        </div>

      </section>

    </div>
  )
}

export default AboutUs