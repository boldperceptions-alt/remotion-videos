import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const AGCitizenship: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Argentine flag colors
  const argentineBlue = '#74ACDF';
  const white = '#FFFFFF';
  const darkBlue = '#2B5F8C';

  // Animation timing
  const fadeInStart = 30; // Start fade-in at 1 second
  const fadeInDuration = 45; // Fade-in over 1.5 seconds

  // Fade-in opacity
  const opacity = interpolate(
    frame,
    [fadeInStart, fadeInStart + fadeInDuration],
    [0, 1],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  // Scale animation with spring
  const scale = spring({
    frame: frame - fadeInStart,
    fps,
    config: {
      damping: 100,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const scaleValue = interpolate(scale, [0, 1], [0.9, 1]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: white,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Decorative top stripe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: `linear-gradient(180deg, ${argentineBlue} 0%, ${white} 100%)`,
          opacity: 0.15,
        }}
      />

      {/* Decorative bottom stripe */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25%',
          background: `linear-gradient(0deg, ${argentineBlue} 0%, ${white} 100%)`,
          opacity: 0.15,
        }}
      />

      {/* Main content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '80px 60px',
          opacity,
          transform: `scale(${scaleValue})`,
        }}
      >
        {/* AG Logo placeholder */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${argentineBlue} 0%, ${darkBlue} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 60,
            boxShadow: '0 10px 40px rgba(43, 95, 140, 0.3)',
          }}
        >
          <span
            style={{
              fontSize: 52,
              fontWeight: 'bold',
              color: white,
              letterSpacing: '2px',
            }}
          >
            AG
          </span>
        </div>

        {/* Main text */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: darkBlue,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: 0,
            maxWidth: '90%',
          }}
        >
          Your Path to
        </h1>
        <h1
          style={{
            fontSize: 68,
            fontWeight: 800,
            color: argentineBlue,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: '10px 0 0 0',
            maxWidth: '90%',
          }}
        >
          Argentine Citizenship
        </h1>
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: darkBlue,
            textAlign: 'center',
            lineHeight: 1.3,
            margin: '10px 0 0 0',
            maxWidth: '90%',
          }}
        >
          Starts Here
        </h1>

        {/* Decorative underline */}
        <div
          style={{
            width: 200,
            height: 6,
            background: `linear-gradient(90deg, ${argentineBlue} 0%, ${darkBlue} 100%)`,
            marginTop: 50,
            borderRadius: 3,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: 32,
            fontWeight: 400,
            color: darkBlue,
            textAlign: 'center',
            marginTop: 40,
            opacity: 0.8,
            letterSpacing: '1px',
          }}
        >
          Expert Immigration Law Services
        </p>
      </div>

      {/* Corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background: `radial-gradient(circle at top right, ${argentineBlue}15 0%, transparent 70%)`,
        }}
      />
    </AbsoluteFill>
  );
};
