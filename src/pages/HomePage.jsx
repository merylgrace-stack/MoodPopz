import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const MiniDoodle = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        // Set canvas size
        canvas.width = 300;
        canvas.height = 200;

        // Default style
        ctx.strokeStyle = "#FF6B6B"; // Vibrant coral
        ctx.lineWidth = 3;
        ctx.lineCap = "round";

        // Clear logic if needed
        return () => {
            // cleanup
        };
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();
        const x = e.nativeEvent.offsetX || (e.touches && e.touches[0].clientX - rect.left);
        const y = e.nativeEvent.offsetY || (e.touches && e.touches[0].clientY - rect.top);

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const rect = canvas.getBoundingClientRect();

        let x, y;
        if (e.type.includes('touch')) {
            x = e.touches[0].clientX - rect.left;
            y = e.touches[0].clientY - rect.top;
        } else {
            x = e.nativeEvent.offsetX;
            y = e.nativeEvent.offsetY;
        }

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    return (
        <div className="mini-doodle-container">
            <p className="doodle-hint">✨ Scribble here to let go...</p>
            <canvas
                ref={canvasRef}
                className="mini-doodle-canvas"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
            />
        </div>
    );
};

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="home-container">
            {/* Background Texture/Overlay handled in CSS */}

            <div className="vintage-frame">
                <header className="home-header">
                    <h1 className="brand-title">MoodPopz</h1>
                    <div className="sep-line"></div>
                </header>

                <main className="home-content">
                    <blockquote className="hero-quote">
                        "Your mind is a garden. Your thoughts are the seeds. You can grow flowers or you can grow weeds."
                    </blockquote>

                    <button className="begin-btn" onClick={() => navigate("/mood")}>
                        Begin Journey
                    </button>

                    <p className="home-footer-text">A quiet space for your feelings.</p>
                </main>
            </div>

            {/* Decorative Elements */}
            <div className="vintage-decor leaf-1">🌿</div>
            <div className="vintage-decor leaf-2">🍂</div>
            <div className="vintage-decor leaf-3">✨</div>
        </div>
    );
};

export default HomePage;
