import React, { useEffect, useRef } from 'react';

const GradientBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation variables
    let animationFrameId: number;
    const circles: Circle[] = [];
    
    // Create circles
    for (let i = 0; i < 15; i++) {
      circles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: i % 2 === 0 ? '#4CAF50' : '#2c3e50',
        opacity: Math.random() * 0.4 + 0.1
      });
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas with white background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update circles
      circles.forEach(circle => {
        // Update position
        circle.x += circle.speedX;
        circle.y += circle.speedY;
        
        // Bounce off edges
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
          circle.speedX *= -1;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
          circle.speedY *= -1;
        }
        
        // Draw circle
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${circle.color}${Math.floor(circle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1
      }}
    />
  );
};

// Circle type definition
interface Circle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

export default GradientBackground; 