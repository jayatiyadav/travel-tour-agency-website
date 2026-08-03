import "./RajasthanToursList.css";

function RajasthanToursList() {
  return (
    <div className="rajasthan-page">

      {/* Hero */}
      <section className="rajasthan-hero">
        <img
          src="/image/rajst5.jpg"
          alt="Rajasthan"
        />

        <div className="hero-overlay">
          <h1>Discover Royal Rajasthan</h1>
          <p>
            Experience magnificent forts, royal palaces,
            golden deserts and vibrant culture.
          </p>
        </div>
      </section>

      {/* About Rajasthan */}
      <section className="about-rajasthan">

        <h2>About Rajasthan</h2>

        <p>
          Rajasthan, the Land of Kings, is famous for its royal
          heritage, colorful culture, majestic forts, beautiful
          palaces, desert landscapes and traditional hospitality.
          Every city has its own unique charm and history.
        </p>

      </section>

      {/* Popular Places */}
      <section className="popular-places">

        <h2>Popular Places to Visit</h2>

        <div className="places-grid">

          <div className="place-card">
            <img src="/image/jaipur.jpg" alt="Jaipur" />
            <h3>Jaipur</h3>
            <p>The Pink City famous for Amber Fort, Hawa Mahal and City Palace.</p>
          </div>

          <div className="place-card">
            <img src="/image/udaipur1.jpg" alt="Udaipur" />
            <h3>Udaipur</h3>
            <p>The City of Lakes known for Lake Pichola and magnificent palaces.</p>
          </div>

          <div className="place-card">
            <img src="/image/jaisalmer.jpg" alt="Jaisalmer" />
            <h3>Jaisalmer</h3>
            <p>Golden City with desert safari, camel rides and sandstone forts.</p>
          </div>

          <div className="place-card">
            <img src="/image/jodhpur.jpg" alt="Jodhpur" />
            <h3>Jodhpur</h3>
            <p>The Blue City famous for Mehrangarh Fort and heritage streets.</p>
          </div>

        </div>

      </section>

      {/* Tours */}
      <section className="tour-list">

        <h2>Choose Your Rajasthan Tour</h2>

        <div className="tour-grid">

          <div className="tour-card">

            <h3>Royal Rajasthan Tour</h3>

            <p>📅 7 Days / 6 Nights</p>

            <p>💰 Starting from ₹30,000</p>

            <button
              onClick={() =>
                window.location.href="/rajasthan-tour"
              }
            >
              View Details
            </button>

          </div>

          <div className="tour-card">

            <h3>Jaipur Udaipur Tour</h3>

            <p>📅 5 Days / 4 Nights</p>

            <p>💰 Starting from ₹24,000</p>

            <button>
              View Details
            </button>

          </div>

          <div className="tour-card">

            <h3>Desert Adventure Tour</h3>

            <p>📅 4 Days / 3 Nights</p>

            <p>💰 Starting from ₹18,000</p>

            <button>
              View Details
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default RajasthanToursList;