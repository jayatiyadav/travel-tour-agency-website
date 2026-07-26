import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function RajasthanTour() {
  const navigate = useNavigate()

  const images = [
    '/image/rajasthan1.jpg',
    '/image/Rajasthan2.jpg',
    '/image/Rajasthan3.jpg',
    '/image/Rajasthan4.jpg'
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
          alt="Royal Rajasthan Tour"
        />

        <div className="tour-details-overlay">
          <h1>Royal Rajasthan Tour</h1>
          <p>
            Experience the royal heritage and vibrant culture of Rajasthan
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

          <h2>Experience the Royal Land of Rajasthan</h2>

          <p>
            Step into the world of magnificent forts, grand palaces,
            colorful markets and timeless traditions. Explore the
            royal charm of Rajasthan and experience the rich culture
            and heritage of India's land of kings.
          </p>


          {/* Tour Highlights */}
          <div className="tour-highlights">

            <div>
              <span>🗓️</span>
              <strong>Duration</strong>
              <p>7 Days / 6 Nights</p>
            </div>

            <div>
              <span>📍</span>
              <strong>Destinations</strong>
              <p>Jaipur, Jodhpur & Udaipur</p>
            </div>

            <div>
              <span>⭐</span>
              <strong>Rating</strong>
              <p>4.7 / 5</p>
            </div>

          </div>


          {/* Itinerary */}
          <h2>Tour Itinerary</h2>

          <div className="itinerary">

            <div className="itinerary-item">
              <h3>Day 1 — Arrival in Jaipur</h3>
              <p>
                Arrive in Jaipur and explore the beautiful
                Pink City and its vibrant local markets.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 2 — Jaipur Sightseeing</h3>
              <p>
                Visit Amber Fort, City Palace, Hawa Mahal
                and other magnificent landmarks.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 3 — Journey to Jodhpur</h3>
              <p>
                Travel to the Blue City of Jodhpur and
                explore the magnificent Mehrangarh Fort.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 4 — Explore Jodhpur</h3>
              <p>
                Discover the blue streets, local markets
                and the rich heritage of Jodhpur.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 5 — Udaipur</h3>
              <p>
                Travel to the romantic city of lakes and
                enjoy the beautiful surroundings of Udaipur.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 6 — Udaipur Sightseeing</h3>
              <p>
                Visit City Palace, Lake Pichola and explore
                the royal beauty of Udaipur.
              </p>
            </div>

            <div className="itinerary-item">
              <h3>Day 7 — Departure</h3>
              <p>
                Enjoy your final morning in Rajasthan before
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

          <h2>₹30,000</h2>

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

export default RajasthanTour