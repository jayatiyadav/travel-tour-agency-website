import './ExploreIndia.css'

function ExploreIndia() {

  const states = [
    {
      name: "Kashmir",
      image: "/image/kas1.jpg",
      description: "Paradise in the North",
      path: "/kashmir-tour"
    },
    {
      name: "Rajasthan",
      image: "/image/raj1.jpg",
      description: "Royal Heritage & Culture",
      path: "/rajasthan-tour"
    },
    {
      name: "Varanasi",
      image: "/image/var1.jpg",
      description: "The Spiritual Heart of India",
      path: "/varanasi-tour"
    },
    {
      name: "Gujarat",
      image: "/image/guj1.jpg",
      description: "Heritage, Culture & Vibrant Traditions",
      path: "/gujarat-tour"
    },
    {
      name: "Kerala",
      image: "/image/ker1.jpg",
      description: "Nature, Backwaters & Serenity",
      path: "/kerala-tour"
    },
    {
      name: "Goa",
      image: "/image/goa1.jpg",
      description: "Beaches, Sunsets & Vibrant Vibes",
      path: "/goa-tour"
    }
  ]

  return (
    <div className="explore-india-page">

      {/* Back Button */}
      <button
        className="back-home"
        onClick={() => window.location.href = "/"}
      >
        ← Back to Home
      </button>

      {/* Heading */}
      <section className="explore-header">

        <h1>Explore India</h1>

        <p>
          Discover the diverse beauty, culture and heritage of Bharat
        </p>

      </section>


      {/* State Cards */}
      <section className="states-section">

        <div className="states-grid">

          {states.map((state, index) => (

            <div
              className="state-card"
              key={index}
              onClick={() => {
                if (state.path !== "#") {
                  window.location.href = state.path
                }
              }}
            >

              <img
                src={state.image}
                alt={state.name}
              />

              <div className="state-overlay">

                <h2>{state.name}</h2>

                <p>{state.description}</p>

                <button>
                  Explore Tours →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  )
}

export default ExploreIndia