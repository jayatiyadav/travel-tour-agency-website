import { useNavigate } from 'react-router-dom'

function Blog() {
  const navigate = useNavigate()

  return (
    <div className="blog-page">

      <button
        className="back-button"
        onClick={() => navigate('/')}
      >
        ← Back to Home
      </button>

      <section className="blog-hero">
        <h1>Explore India Through Our Stories</h1>
        <p>
          Discover the culture, traditions, hidden gems and
          unforgettable experiences of Bharat.
        </p>
      </section>

      <section className="blog-container">

        <article className="blog-card">
          <img
            src="/image/kashmir.png"
            alt="Kashmir"
          />

          <div className="blog-content">
            <h2>Discover the Paradise of Kashmir</h2>

            <p>
              From snow-covered mountains to peaceful lakes,
              explore the breathtaking beauty of Kashmir.
            </p>

            <button>Read More →</button>
          </div>
        </article>


        <article className="blog-card">
          <img
            src="/image/rajsthan.png"
            alt="Rajasthan"
          />

          <div className="blog-content">
            <h2>The Royal Heritage of Rajasthan</h2>

            <p>
              Step into a world of majestic forts, royal palaces
              and vibrant traditions.
            </p>

            <button>Read More →</button>
          </div>
        </article>


        <article className="blog-card">
          <img
            src="/image/kerala.png"
            alt="Kerala"
          />

          <div className="blog-content">
            <h2>Escape to God's Own Country</h2>

            <p>
              Experience peaceful backwaters, lush greenery
              and the natural beauty of Kerala.
            </p>

            <button>Read More →</button>
          </div>
        </article>

      </section>

    </div>
  )
}

export default Blog