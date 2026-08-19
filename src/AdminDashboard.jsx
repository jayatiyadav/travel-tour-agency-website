import { useEffect, useState } from "react";
import "./admin.css";

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // =========================
  // TOURS STATE
  // =========================

  const [tours, setTours] = useState([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [showAddTour, setShowAddTour] = useState(false);
  const [editingTour, setEditingTour] = useState(null);

  const [tourForm, setTourForm] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    places: "",
    description: "",
    image: "",
  });

  // =========================
  // HOTELS STATE
  // =========================

  const [hotels, setHotels] = useState([]);
  const [loadingHotels, setLoadingHotels] = useState(false);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [editingHotel, setEditingHotel] = useState(null);

  const [hotelForm, setHotelForm] = useState({
    name: "",
    city: "",
    pricePerNight: "",
    rating: "",
    description: "",
    image: "",
  });

  // =========================
  // MENU
  // =========================

  const menuItems = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "tours", label: "🗺️ Tours" },
    { id: "hotels", label: "🏨 Hotels" },
    { id: "flights", label: "✈️ Flights" },
    { id: "bookings", label: "🎫 Bookings" },
    { id: "users", label: "👥 Users" },
  ];

  // =====================================================
  // FETCH TOURS
  // =====================================================

  const fetchTours = async () => {
    try {
      setLoadingTours(true);

      const response = await fetch(
        "http://localhost:5000/api/tours"
      );

      const data = await response.json();

      if (response.ok) {
        setTours(data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Failed to fetch tours:", error);
    } finally {
      setLoadingTours(false);
    }
  };

  // =====================================================
  // FETCH HOTELS
  // =====================================================

  const fetchHotels = async () => {
    try {
      setLoadingHotels(true);

      const response = await fetch(
        "http://localhost:5000/api/hotels"
      );

      const data = await response.json();

      if (response.ok) {
        setHotels(data);
      } else {
        console.error(data);
      }
    } catch (error) {
      console.error("Failed to fetch hotels:", error);
    } finally {
      setLoadingHotels(false);
    }
  };

  // =====================================================
  // INITIAL FETCH
  // =====================================================

  useEffect(() => {
    fetchTours();
    fetchHotels();
  }, []);

  // =====================================================
  // TOUR FORM CHANGE
  // =====================================================

  const handleTourChange = (e) => {
    const { name, value } = e.target;

    setTourForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // HOTEL FORM CHANGE
  // =====================================================

  const handleHotelChange = (e) => {
    const { name, value } = e.target;

    setHotelForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // ADD / EDIT TOUR
  // =====================================================

  const handleAddTour = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const tourData = {
      name: tourForm.name,
      destination: tourForm.destination,
      duration: tourForm.duration,
      price: Number(tourForm.price),

      places: tourForm.places
        .split(",")
        .map((place) => place.trim())
        .filter((place) => place !== ""),

      description: tourForm.description,
      image: tourForm.image,
    };

    try {
      const url = editingTour
        ? `http://localhost:5000/api/tours/${editingTour._id}`
        : "http://localhost:5000/api/tours";

      const response = await fetch(url, {
        method: editingTour ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(tourData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert(
        editingTour
          ? "Tour updated successfully ✨"
          : "Tour added successfully 🎉"
      );

      setTourForm({
        name: "",
        destination: "",
        duration: "",
        price: "",
        places: "",
        description: "",
        image: "",
      });

      setEditingTour(null);
      setShowAddTour(false);

      fetchTours();
    } catch (error) {
      console.error("Tour error:", error);
      alert("Unable to connect to server");
    }
  };

  // =====================================================
  // DELETE TOUR
  // =====================================================

  const handleDeleteTour = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this tour?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/tours/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete tour");
        return;
      }

      alert("Tour deleted successfully 🗑️");

      fetchTours();
    } catch (error) {
      console.error("Delete tour error:", error);
      alert("Unable to connect to server");
    }
  };

  // =====================================================
  // EDIT TOUR
  // =====================================================

  const handleEditTour = (tour) => {
    setEditingTour(tour);

    setTourForm({
      name: tour.name || "",
      destination: tour.destination || "",
      duration: tour.duration || "",
      price: tour.price || "",
      places: (tour.places || []).join(", "),
      description: tour.description || "",
      image: tour.image || "",
    });

    setShowAddTour(true);
  };

  // =====================================================
  // ADD / EDIT HOTEL
  // =====================================================

  const handleAddHotel = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const hotelData = {
      name: hotelForm.name,
      city: hotelForm.city,
      pricePerNight: Number(hotelForm.pricePerNight),
      rating: Number(hotelForm.rating) || 4,
      description: hotelForm.description,
      image: hotelForm.image,
    };

    try {
      const url = editingHotel
        ? `http://localhost:5000/api/hotels/${editingHotel._id}`
        : "http://localhost:5000/api/hotels";

      const response = await fetch(url, {
        method: editingHotel ? "PUT" : "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(hotelData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Unable to save hotel");
        return;
      }

      alert(
        editingHotel
          ? "Hotel updated successfully ✨"
          : "Hotel added successfully 🎉"
      );

      setHotelForm({
        name: "",
        city: "",
        pricePerNight: "",
        rating: "",
        description: "",
        image: "",
      });

      setEditingHotel(null);
      setShowAddHotel(false);

      fetchHotels();
    } catch (error) {
      console.error("Hotel error:", error);
      alert("Unable to connect to server");
    }
  };

  // =====================================================
  // DELETE HOTEL
  // =====================================================

  const handleDeleteHotel = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:5000/api/hotels/${id}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to delete hotel");
        return;
      }

      alert("Hotel deleted successfully 🗑️");

      fetchHotels();
    } catch (error) {
      console.error("Delete hotel error:", error);
      alert("Unable to connect to server");
    }
  };

  // =====================================================
  // EDIT HOTEL
  // =====================================================

  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);

    setHotelForm({
      name: hotel.name || "",
      city: hotel.city || "",
      pricePerNight: hotel.pricePerNight || "",
      rating: hotel.rating || "",
      description: hotel.description || "",
      image: hotel.image || "",
    });

    setShowAddHotel(true);
  };

  // =====================================================
  // DASHBOARD
  // =====================================================

  const renderDashboard = () => {
    return (
      <div>
        <h1>📊 Dashboard</h1>

        <p>
          Welcome to the Bhramanam Admin Dashboard 👋
        </p>

        <div className="admin-stats">

          <div className="stat-card">
            <h3>🗺️ Tours</h3>
            <p>{tours.length} Tours</p>
          </div>

          <div className="stat-card">
            <h3>🏨 Hotels</h3>
            <p>{hotels.length} Hotels</p>
          </div>

          <div className="stat-card">
            <h3>✈️ Flights</h3>
            <p>Manage Flights</p>
          </div>

          <div className="stat-card">
            <h3>🎫 Bookings</h3>
            <p>View Bookings</p>
          </div>

        </div>
      </div>
    );
  };

  // =====================================================
  // TOURS
  // =====================================================

  const renderTours = () => {
    return (
      <div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >

          <div>
            <h1>🗺️ Tours</h1>

            <p>
              Add and manage your travel tours.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAddTour(!showAddTour);

              if (showAddTour) {
                setEditingTour(null);

                setTourForm({
                  name: "",
                  destination: "",
                  duration: "",
                  price: "",
                  places: "",
                  description: "",
                  image: "",
                });
              }
            }}
          >
            {showAddTour ? "Close" : "+ Add Tour"}
          </button>

        </div>

        {/* ADD / EDIT TOUR FORM */}

        {showAddTour && (
          <div
            className="admin-placeholder"
            style={{
              display: "block",
              minHeight: "auto",
              padding: "30px",
              marginBottom: "30px",
            }}
          >

            <h2 style={{ marginBottom: "20px" }}>
              {editingTour ? "Edit Tour" : "Add New Tour"}
            </h2>

            <form onSubmit={handleAddTour}>

              <input
                name="name"
                placeholder="Tour Name"
                value={tourForm.name}
                onChange={handleTourChange}
                required
              />

              <input
                name="destination"
                placeholder="Destination"
                value={tourForm.destination}
                onChange={handleTourChange}
                required
              />

              <input
                name="duration"
                placeholder="Duration e.g. 7 Days"
                value={tourForm.duration}
                onChange={handleTourChange}
                required
              />

              <input
                name="price"
                type="number"
                placeholder="Price"
                value={tourForm.price}
                onChange={handleTourChange}
                required
              />

              <input
                name="places"
                placeholder="Places e.g. Srinagar, Gulmarg, Pahalgam"
                value={tourForm.places}
                onChange={handleTourChange}
              />

              <textarea
                name="description"
                placeholder="Tour Description"
                value={tourForm.description}
                onChange={handleTourChange}
                rows="4"
              />

              <input
                name="image"
                placeholder="Image URL"
                value={tourForm.image}
                onChange={handleTourChange}
              />

              <button type="submit">
                {editingTour ? "Update Tour" : "Add Tour"}
              </button>

            </form>

          </div>
        )}

        {/* TOUR LIST */}

        {loadingTours ? (

          <div className="admin-placeholder">
            <p>Loading tours...</p>
          </div>

        ) : tours.length === 0 ? (

          <div className="admin-placeholder">
            <p>No tours available.</p>
          </div>

        ) : (

          <div className="admin-tour-list">

            {tours.map((tour) => (

              <div
                key={tour._id}
                className="admin-tour-card"
              >

                <div className="admin-tour-info">

                  <h2>{tour.name}</h2>

                  <p>
                    📍 {tour.destination}
                  </p>

                  <p>
                    🗓️ {tour.duration}
                  </p>

                  <p>
                    💰 ₹
                    {Number(tour.price).toLocaleString("en-IN")}
                  </p>

                  {tour.description && (
                    <p className="tour-description">
                      {tour.description}
                    </p>
                  )}

                </div>

                <div className="admin-tour-actions">

                  <button
                    onClick={() => handleEditTour(tour)}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteTour(tour._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    );
  };

  // =====================================================
  // HOTELS
  // =====================================================

  const renderHotels = () => {
    return (
      <div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
          }}
        >

          <div>
            <h1>🏨 Hotels</h1>

            <p>
              Add and manage hotels for Bhramanam.
            </p>
          </div>

          <button
            onClick={() => {
              setShowAddHotel(!showAddHotel);

              if (showAddHotel) {
                setEditingHotel(null);

                setHotelForm({
                  name: "",
                  city: "",
                  pricePerNight: "",
                  rating: "",
                  description: "",
                  image: "",
                });
              }
            }}
          >
            {showAddHotel ? "Close" : "+ Add Hotel"}
          </button>

        </div>

        {/* ADD / EDIT HOTEL FORM */}

        {showAddHotel && (
          <div
            className="admin-placeholder"
            style={{
              display: "block",
              minHeight: "auto",
              padding: "30px",
              marginBottom: "30px",
            }}
          >

            <h2 style={{ marginBottom: "20px" }}>
              {editingHotel ? "Edit Hotel" : "Add New Hotel"}
            </h2>

            <form onSubmit={handleAddHotel}>

              <input
                name="name"
                placeholder="Hotel Name"
                value={hotelForm.name}
                onChange={handleHotelChange}
                required
              />

              <input
                name="city"
                placeholder="City"
                value={hotelForm.city}
                onChange={handleHotelChange}
                required
              />

              <input
                name="pricePerNight"
                type="number"
                placeholder="Price Per Night"
                value={hotelForm.pricePerNight}
                onChange={handleHotelChange}
                required
              />

              <input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="Rating (1-5)"
                value={hotelForm.rating}
                onChange={handleHotelChange}
              />

              <textarea
                name="description"
                placeholder="Hotel Description"
                value={hotelForm.description}
                onChange={handleHotelChange}
                rows="4"
              />

              <input
                name="image"
                placeholder="Image URL"
                value={hotelForm.image}
                onChange={handleHotelChange}
              />

              <button type="submit">
                {editingHotel
                  ? "Update Hotel"
                  : "Add Hotel"}
              </button>

            </form>

          </div>
        )}

        {/* HOTEL LIST */}

        {loadingHotels ? (

          <div className="admin-placeholder">
            <p>Loading hotels...</p>
          </div>

        ) : hotels.length === 0 ? (

          <div className="admin-placeholder">
            <p>No hotels available.</p>
          </div>

        ) : (

          <div className="admin-tour-list">

            {hotels.map((hotel) => (

              <div
                key={hotel._id}
                className="admin-tour-card"
              >

                <div className="admin-tour-info">

                  <h2>{hotel.name}</h2>

                  <p>
                    📍 {hotel.city}
                  </p>

                  <p>
                    💰 ₹
                    {Number(
                      hotel.pricePerNight
                    ).toLocaleString("en-IN")}{" "}
                    / night
                  </p>

                  <p>
                    ⭐ {hotel.rating || 4}
                  </p>

                  {hotel.description && (
                    <p className="tour-description">
                      {hotel.description}
                    </p>
                  )}

                </div>

                <div className="admin-tour-actions">

                  <button
                    onClick={() =>
                      handleEditHotel(hotel)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteHotel(hotel._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    );
  };

  // =====================================================
  // OTHER SECTIONS
  // =====================================================

  const renderPlaceholder = (
    title,
    description
  ) => {
    return (
      <div>

        <h1>{title}</h1>

        <p>{description}</p>

        <div className="admin-placeholder">
          <p>
            Management section coming next.
          </p>
        </div>

      </div>
    );
  };

  // =====================================================
  // CONTENT
  // =====================================================

  const renderContent = () => {
    switch (activeSection) {

      case "tours":
        return renderTours();

      case "hotels":
        return renderHotels();

      case "flights":
        return renderPlaceholder(
          "✈️ Flights",
          "Manage flights and schedules."
        );

      case "bookings":
        return renderPlaceholder(
          "🎫 Bookings",
          "View and manage customer bookings."
        );

      case "users":
        return renderPlaceholder(
          "👥 Users",
          "Manage registered users."
        );

      default:
        return renderDashboard();
    }
  };

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}

      <aside className="admin-sidebar">

        <div className="admin-logo">

          <img
            src="/भ्रमणम्2.png"
            alt="Bhramanam Logo"
          />

          <p>Admin Panel</p>

        </div>

        <nav className="admin-nav">

          {menuItems.map((item) => (

            <button
              key={item.id}
              className={
                activeSection === item.id
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() =>
                setActiveSection(item.id)
              }
            >
              {item.label}
            </button>

          ))}

        </nav>

        <button
          className="admin-logout"
          onClick={() => {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

            window.location.href = "/";

          }}
        >
          🚪 Logout
        </button>

      </aside>

      {/* MAIN */}

      <main className="admin-main">

        <header className="admin-header">

          <div>

            <h2>Bhramanam</h2>

            <p>
              Travel Management System
            </p>

          </div>

          <div className="admin-profile">
            👤 Admin
          </div>

        </header>

        <section className="admin-content">
          {renderContent()}
        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;