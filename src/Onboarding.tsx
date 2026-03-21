import { useState, useEffect } from "react";
import "./onboarding.css";

export default function Onboarding() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(false);

  const slides = [
    {
      title: "Welcome to Empire AI",
      desc: "Your AI command center"
    },
    {
      title: "Smart Dashboard",
      desc: "Control everything in one place"
    },
    {
      title: "Fast & Powerful",
      desc: "Built for the future"
    }
  ];

  useEffect(() => {
    if (!localStorage.getItem("seenOnboarding")) {
      setTimeout(() => setVisible(true), 500);
    }
  }, []);

  const next = () => {
    vibrate();

    if (step + 1 >= slides.length) {
      localStorage.setItem("seenOnboarding", "true");
      setVisible(false);
    } else {
      setStep(step + 1);
    }
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  // SWIPE
  let startX = 0;

  const handleTouchStart = (e: any) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) next();
    if (endX - startX > 50) prev();
  };

  function vibrate() {
    if (navigator.vibrate) navigator.vibrate(30);
  }

  if (!visible) return null;

  return (
    <div
      className="onboarding"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className="fade">{slides[step].title}</h1>
      <p className="fade">{slides[step].desc}</p>

      {/* dots */}
      <div className="dots">
        {slides.map((_, i) => (
          <span key={i} className={i === step ? "dot active" : "dot"} />
        ))}
      </div>

      {/* button */}
      <button onClick={next} className="nextBtn">
        →
      </button>
    </div>
  );
}
