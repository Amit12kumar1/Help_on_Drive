import React, { useRef, useState } from 'react';

/**
 * TiltCard3D Component
 * -------------------------------------------------------------
 * Presentation / Viva Ready:
 * This component implements interactive 3D physics using pure CSS transforms.
 * When the user moves their mouse over the card, it calculates the offset
 * relative to the center and tilts the card along rotateX and rotateY axes
 * with perspective(1000px).
 *
 * Child elements with `translate-z-10` or higher float forward in 3D space,
 * creating a realistic depth parallax effect!
 */
export default function TiltCard3D({
  children,
  className = '',
  maxTilt = 12,       // Maximum rotation angle in degrees
  scale = 1.02,       // Hover scale factor
  glare = true,       // Toggle dynamic specular shine
  floatAnimation = false // Ambient floating when idle
}) {
  const cardRef = useRef(null);
  const [style, setStyle] = useState({
    transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  });
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (-1 to +1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width - 0.5) * 2;
    const yPct = (mouseY / height - 0.5) * 2;

    // Tilt calculations:
    // Moving mouse up rotates card along positive X axis; moving right rotates along positive Y axis.
    const rotateX = -yPct * maxTilt;
    const rotateY = xPct * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.08s ease-out',
    });

    if (glare) {
      setGlarePosition({
        x: (mouseX / width) * 100,
        y: (mouseY / height) * 100,
        opacity: 0.35,
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    });
    if (glare) {
      setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform ${floatAnimation ? 'animate-float-3d' : ''} ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare Overlay */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 overflow-hidden"
          style={{
            background: `radial-gradient(circle 350px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45), transparent 70%)`,
            opacity: glarePosition.opacity,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
}
