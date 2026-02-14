import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            <div className="floating-shape-home shape-1"></div>
            <div className="floating-shape-home shape-2"></div>
            <div className="floating-shape-home shape-3"></div>

            <h1 className="home-title">MoodPopz</h1>
            <p className="home-subtitle">
                A tiny space for your big feelings. Take a deep breath, verify your vibe, and let’s make today a little lighter. Vintage soul, modern heart.
            </p>

            <button className="enter-btn" onClick={() => navigate("/mood")}>
                Begin Journey 🌿
            </button>
        </div>
    );
};

export default HomePage;
