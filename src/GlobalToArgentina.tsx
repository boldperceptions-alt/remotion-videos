import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

// Simplified continent paths (relative to a 400x400 viewBox)
const CONTINENTS = {
  // South America (simplified)
  southAmerica: 'M180,180 Q160,160 160,140 L165,120 Q170,100 180,90 L190,85 Q200,80 210,85 L220,95 Q230,110 230,130 L228,150 Q225,170 220,185 L215,200 Q210,215 200,225 L190,230 Q180,230 175,220 L172,205 Q170,195 175,185 Z',
  // North America (simplified)
  northAmerica: 'M120,40 Q130,30 145,35 L160,45 Q170,55 172,70 L170,85 Q165,95 155,98 L140,95 Q130,90 125,80 L122,65 Q120,50 120,40 Z',
  // Europe (simplified)
  europe: 'M220,60 Q230,55 240,60 L245,70 Q248,80 245,88 L238,92 Q230,95 222,90 L218,80 Q215,70 220,60 Z',
  // Africa (simplified)
  africa: 'M230,110 Q240,105 250,115 L255,130 Q258,145 255,160 L250,175 Q245,188 235,192 L225,190 Q220,180 220,165 L222,145 Q225,125 230,110 Z',
  // Asia (simplified)
  asia: 'M260,50 Q280,45 300,55 L310,70 Q315,85 310,100 L300,110 Q285,115 270,108 L260,95 Q255,80 260,50 Z',
  // Australia (simplified)
  australia: 'M320,180 Q330,178 338,185 L340,195 Q338,205 330,208 L320,206 Q315,200 315,190 Q315,185 320,180 Z',
};

// Argentina outline (positioned within South America)
const ARGENTINA_PATH = 'M185,155 L188,165 Q190,175 192,185 L194,200 Q195,210 193,218 L190,225 Q188,228 185,227 L182,223 Q180,215 180,205 L181,190 Q183,175 185,155 Z';

export const GlobalToArgentina: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Color palette
  const argentineBlue = '#74ACDF';
  const white = '#FFFFFF';
  const darkBlue = '#2B5F8C';
  const deepSpace = '#0A1929';

  // Animation phases
  const PHASE_1_END = 90; // Globe rotation (0-3s)
  const PHASE_2_END = 150; // Zoom to Argentina (3-5s)
  const PHASE_3_END = 210; // Color wash (5-7s)
  const PHASE_4_END = 300; // Text fade (7-10s)

  // Phase 1: Globe rotation (0-90 frames)
  const globeRotation = interpolate(
    frame,
    [0, PHASE_1_END],
    [0, 360],
    {
      extrapolateRight: 'clamp',
    }
  );

  // Phase 2: Zoom into Argentina (90-150 frames)
  const zoomProgress = spring({
    frame: frame - PHASE_1_END,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const scale = interpolate(
    frame,
    [PHASE_1_END, PHASE_2_END],
    [1, 2.5],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Focus point shifts to Argentina (center of South America)
  const focusX = interpolate(
    frame,
    [PHASE_1_END, PHASE_2_END],
    [0, -40],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const focusY = interpolate(
    frame,
    [PHASE_1_END, PHASE_2_END],
    [0, 30],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Phase 3: Argentina glow and pulse (150-210 frames)
  const glowIntensity = interpolate(
    frame,
    [PHASE_2_END, PHASE_2_END + 20, PHASE_3_END],
    [0, 1, 0.7],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const pulseScale = interpolate(
    Math.sin((frame - PHASE_2_END) * 0.15),
    [-1, 1],
    [0.95, 1.05]
  );

  // Radial gradient color wash
  const colorWashProgress = interpolate(
    frame,
    [PHASE_2_END, PHASE_3_END],
    [0, 100],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Phase 4: Text fade-in (210-300 frames)
  const textSpring = spring({
    frame: frame - PHASE_3_END,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const textOpacity = interpolate(
    frame,
    [PHASE_3_END, PHASE_3_END + 30],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  const textScale = interpolate(textSpring, [0, 1], [0.8, 1]);

  // Particle effects during color wash
  const particleOpacity = interpolate(
    frame,
    [PHASE_2_END, PHASE_2_END + 30, PHASE_3_END - 20, PHASE_3_END],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Background transition
  const bgGradient = frame < PHASE_2_END
    ? `radial-gradient(circle at center, ${deepSpace} 0%, #000000 100%)`
    : `radial-gradient(circle at 50% 45%, ${argentineBlue} 0%, ${white} ${colorWashProgress}%, ${deepSpace} 100%)`;

  return (
    <AbsoluteFill
      style={{
        background: bgGradient,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Globe container */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${focusX}px, ${focusY}px) scale(${scale})`,
          opacity: frame < PHASE_3_END ? 1 : interpolate(frame, [PHASE_3_END, PHASE_3_END + 20], [1, 0], { extrapolateRight: 'clamp' }),
        }}
      >
        {/* Globe circle with gradient */}
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: `radial-gradient(circle at 30% 30%, ${argentineBlue}15, ${deepSpace})`,
            border: `2px solid ${argentineBlue}40`,
            position: 'relative',
            overflow: 'hidden',
            boxShadow: `
              inset -20px -20px 60px rgba(0,0,0,0.5),
              inset 20px 20px 60px rgba(116, 172, 223, 0.1),
              0 0 60px rgba(116, 172, 223, 0.3)
            `,
          }}
        >
          {/* Continents layer */}
          <svg
            viewBox="0 0 400 400"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transform: `rotate(${globeRotation}deg)`,
              transformOrigin: 'center',
            }}
          >
            {/* All continents except Argentina */}
            {Object.entries(CONTINENTS).map(([continent, path]) => (
              <path
                key={continent}
                d={path}
                fill={continent === 'southAmerica' ? 'rgba(116, 172, 223, 0.4)' : 'rgba(255, 255, 255, 0.3)'}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="0.5"
              />
            ))}

            {/* Argentina highlight - appears after zoom */}
            {frame >= PHASE_1_END && (
              <g style={{ transform: `scale(${pulseScale})`, transformOrigin: '187px 195px' }}>
                <path
                  d={ARGENTINA_PATH}
                  fill={argentineBlue}
                  stroke={white}
                  strokeWidth="1.5"
                  filter={`drop-shadow(0 0 ${glowIntensity * 20}px ${argentineBlue})`}
                  opacity={glowIntensity}
                />
                {/* Glow effect */}
                <path
                  d={ARGENTINA_PATH}
                  fill="none"
                  stroke={argentineBlue}
                  strokeWidth="3"
                  opacity={glowIntensity * 0.6}
                  filter={`blur(4px)`}
                />
              </g>
            )}
          </svg>

          {/* Light rays from Argentina during color wash */}
          {frame >= PHASE_2_END && frame < PHASE_3_END && (
            <>
              {[0, 1, 2, 3, 4].map((i) => {
                const angle = (i * 72) + (frame - PHASE_2_END) * 2;
                const length = interpolate(
                  frame,
                  [PHASE_2_END, PHASE_2_END + 40],
                  [0, 300],
                  { extrapolateRight: 'clamp' }
                );
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: '49%',
                      left: '47%',
                      width: 2,
                      height: length,
                      background: `linear-gradient(180deg, ${argentineBlue}, transparent)`,
                      transformOrigin: 'top',
                      transform: `rotate(${angle}deg)`,
                      opacity: particleOpacity * 0.6,
                    }}
                  />
                );
              })}
            </>
          )}
        </div>

        {/* Particle effects */}
        {frame >= PHASE_2_END && frame < PHASE_3_END && (
          <>
            {[...Array(12)].map((_, i) => {
              const angle = (i * 30);
              const distance = interpolate(
                frame,
                [PHASE_2_END, PHASE_3_END],
                [50, 200],
                { extrapolateRight: 'clamp' }
              );
              const x = Math.cos((angle * Math.PI) / 180) * distance;
              const y = Math.sin((angle * Math.PI) / 180) * distance;

              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? argentineBlue : white,
                    transform: `translate(${x}px, ${y}px)`,
                    opacity: particleOpacity * (1 - distance / 250),
                    boxShadow: `0 0 10px ${i % 2 === 0 ? argentineBlue : white}`,
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Text overlay - Phase 4 */}
      {frame >= PHASE_3_END && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${textScale})`,
            opacity: textOpacity,
            textAlign: 'center',
            width: '90%',
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 800,
              color: white,
              textAlign: 'center',
              lineHeight: 1.2,
              margin: 0,
              textShadow: `
                0 0 20px ${darkBlue},
                0 0 40px ${darkBlue},
                0 4px 20px rgba(0,0,0,0.5)
              `,
            }}
          >
            Your Second Home
          </h1>
          <h1
            style={{
              fontSize: 100,
              fontWeight: 900,
              background: `linear-gradient(135deg, ${white} 0%, ${argentineBlue} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center',
              lineHeight: 1.2,
              margin: '20px 0 0 0',
              filter: `drop-shadow(0 4px 20px rgba(0,0,0,0.5))`,
            }}
          >
            Awaits
          </h1>
        </div>
      )}

      {/* AG Logo - bottom corner */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          right: 60,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${argentineBlue} 0%, ${darkBlue} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(43, 95, 140, 0.4)',
          opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <span
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            color: white,
            letterSpacing: '1px',
          }}
        >
          AG
        </span>
      </div>

      {/* Subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  );
};
