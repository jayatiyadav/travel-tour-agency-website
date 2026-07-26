import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function TourDetails() {
  const navigate = useNavigate()

  const images = [
    '/image/kashmir2.jpg',
    '/image/kashmir11.jpg',
    '/image/kashmir3.jpg',
    '/image/kashmir4.jpg'
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="tour-details-page">

      {/* Back Button */}
      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>


      {/* Hero Image Slider */}
      <div className="tour-details-hero">

        <img
          src={images[currentImage]}
          alt="Kashmir Paradise Tour"
        />

        <div className="tour-details-overlay">
          <h1>Kashmir Paradise Tour</h1>
          <p>
            Discover the breathtaking beauty of Kashmir
          </p>
        </div>

        {/* Slider Dots */}
        <div className="slider-dots">

          {images.map((_, index) => (
            <span
              key={index}
              className={
                currentImage === index
                  ? 'dot active'
                  : 'dot'
              }
              onClick={() => setCurrentImage(index)}
            ></span>
          ))}

        </div>

      </div>


      {/* Tour Information */}
      <div className="tour-details-container">

        <div className="tour-main-content">

          <h2>Explore the Paradise on Earth</h2>

          <p>
            Experience the magical beauty of Kashmir with its
            snow-covered mountains, peaceful lakes, lush valleys
            and charming landscapes. This journey takes you through
            the most beautiful destinations of Kashmir.
          </p>


          {/* Tour Highlights */}
          <div className="tour-highlights">

            <div>
              <span>🗓️</span>
              <strong>Duration</strong>
              <p>6 Days / 5 Nights</p>
            </div>

            <div>
              <span>📍</span>
              <strong>Destinations</strong>
              <p>Srinagar, Gulmarg & Pahalgam</p>
            </div>

            <div>
              <span>⭐</span>
              <strong>Rating</strong>
              <p>4.8 / 5</p>
            </div>

          </div>


          {/* Itinerary */}
          <h2>Tour Itinerary</h2>

          <div className="itinerary">

            <div className="itinerary-item">
              <h3>Day 1 — Arrival in Srinagar</h3>
              <p>
                Arrive in Srinagar and enjoy a peaceful
                Shikara ride on Dal Lake.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 2 — Srinagar Sightseeing</h3>
              <p>
                Visit Mughal Gardens, Nishat Bagh and
                explore the beautiful city of Srinagar.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 3 — Gulmarg</h3>
              <p>
                Explore the scenic beauty of Gulmarg and
                enjoy the breathtaking mountain views.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 4 — Pahalgam</h3>
              <p>
                Discover the beautiful valleys and natural
                landscapes of Pahalgam.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 5 — Explore Kashmir</h3>
              <p>
                Spend a relaxing day exploring the local
                culture, markets and beautiful surroundings.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 6 — Departure</h3>
              <p>
                Enjoy your final morning in Kashmir before
                departing with unforgettable memories.
              </p>
            </div>

          </div>

        </div>


        {/* Booking Card */}
        <div className="booking-card">

          <p className="booking-label">
            Starting from
          </p>

          <h2>₹25,000</h2>

          <p>
            Per Person
          </p>

          <button className="book-now-button">
            Book Now
          </button>

        </div>

      </div>

    </div>
  )
}

export default TourDetails