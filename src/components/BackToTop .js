import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const toggleVisibility = () => {
            const locationSection = document.getElementById("location-section");

            if (locationSection) {
                const position = locationSection.getBoundingClientRect();
            
                if (position.top <= window.innerHeight  && position.bottom > 0) {
                    setIsVisible(true); 
                } else {
                    setIsVisible(false); 
                }
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-12 right-5 p-3 bg-white text-black rounded-full shadow-md transition-all duration-300 ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <ArrowUp size={24} />
        </button>
    );
};

export default BackToTop;
