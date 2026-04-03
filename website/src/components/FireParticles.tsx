'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    hue: number;
}

export const FireParticles: React.FC<{ className?: string, baseHue?: number }> = ({ className = '', baseHue = 10 }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const updateSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        // Create particles
        const particles: Particle[] = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 1,
                speedY: Math.random() * -1.5 - 0.5,
                opacity: Math.random() * 0.6 + 0.4,
                hue: Math.random() * 30 + baseHue // Use provided baseHue
            });
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle, index) => {
                // Update particle position
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                particle.opacity -= 0.003;

                // Reset particle if it goes off screen or fades out
                if (particle.y < -10 || particle.opacity <= 0 || particle.x < 0 || particle.x > canvas.width) {
                    particle.y = canvas.height + 10;
                    particle.opacity = Math.random() * 0.6 + 0.4;
                    particle.hue = Math.random() * 30 + baseHue;
                }

                // Draw particle with glow
                ctx.save();
                ctx.globalAlpha = particle.opacity;

                // Outer glow
                const gradient = ctx.createRadialGradient(
                    particle.x, particle.y, 0,
                    particle.x, particle.y, particle.size * 2
                );
                gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 60%, ${particle.opacity})`);
                gradient.addColorStop(0.5, `hsla(${particle.hue}, 100%, 50%, ${particle.opacity * 0.5})`);
                gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 40%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', updateSize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default FireParticles;
