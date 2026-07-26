import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function KeralaTour() {
  const navigate = useNavigate()

  const images = [
    '/image/Kerala1.jpg',
    '/image/Kerala2.jpg',
    '/image/Kerala3.jpg',
    '/image/Kerala4.jpg'
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
          alt="Kerala Backwaters Tour"
        />

        <div className="tour-details-overlay">
          <h1>Kerala Backwaters Tour</h1>

          <p>
            Discover the serene beauty of God's Own Country
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

          <h2>Experience the Beauty of Kerala</h2>

          <p>
            Escape into the peaceful landscapes of Kerala,
            surrounded by lush green forests, beautiful
            backwaters, coconut trees and serene beaches.
            Experience traditional houseboats, delicious
            local cuisine and the natural beauty of
            God's Own Country.
          </p>


          {/* Tour Highlights */}
          <div className="tour-highlights">

            <div>
              <span>🗓️</span>
              <strong>Duration</strong>
              <p>5 Days / 4 Nights</p>
            </div>

            <div>
              <span>📍</span>
              <strong>Destinations</strong>
              <p>Kochi, Munnar & Alleppey</p>
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
              <h3>Day 1 — Arrival in Kochi</h3>

              <p>
                Arrive in Kochi and explore the historic
                streets, beautiful coastline and famous
                Chinese fishing nets.
              </p>
            </div>


            <div className="itinerary-item">
              <h3>Day 2 — Journey to Munnar</h3>

              <p>
                Travel through scenic roads surrounded by
                tea plantations and lush green mountains.
              </p>
            </div>


            <div className="itinerary-item">
              <h3>Day 3 — Explore Munnar</h3>

              <p>
                Visit beautiful tea gardens, waterfalls
                and enjoy the peaceful mountain scenery.
              </p>
            </div>


            <div className="itinerary-item">
              <h3>Day 4 — Alleppey Backwaters</h3>

              <p>
                Experience a relaxing houseboat journey
                through the peaceful backwaters of Alleppey.
              </p>
            </div>


            <div className="itinerary-item">
              <h3>Day 5 — Departure</h3>

              <p>
                Enjoy your final morning in Kerala before
                departing with beautiful memories of
                God's Own Country.
              </p>
            </div>

          </div>

        </div>


        {/* Booking Card */}
        <div className="booking-card">

          <p className="booking-label">
            Starting from
          </p>

          <h2>₹22,000</h2>

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

export default KeralaTour