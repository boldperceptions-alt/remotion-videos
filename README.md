# AG Immigration Law Firm - Remotion Videos

Professional video templates for AG Argentine Immigration Law Firm, created with Remotion.

## Videos

### 1. AG Citizenship Video
A 10-second professional video for Instagram Reels featuring:
- Text: "Your Path to Argentine Citizenship Starts Here"
- Clean fade-in animation with spring physics
- Argentine blue (#74ACDF) and white color scheme
- Instagram Reels format (1080x1920, 9:16 ratio)
- 30 fps, 300 frames total

### 2. Global to Argentina Video
A cinematic 10-second Instagram Reels video with multi-phase animation:
- **Phase 1 (0-3s)**: Elegant 2D globe with rotating continents
- **Phase 2 (3-5s)**: Smooth zoom into Argentina with spring physics
- **Phase 3 (5-7s)**: Argentina glows with pulsing effect, flag colors wash across screen
- **Phase 4 (7-10s)**: Text reveal - "Your Second Home Awaits"
- Features particle effects, light rays, and radial gradient transitions
- Cinematic, aspirational aesthetic
- Instagram Reels format (1080x1920, 9:16 ratio)
- 30 fps, 300 frames total

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

```bash
npm install
```

### Development

Start Remotion Studio to preview and edit videos:

```bash
npm start
```

This will open the Remotion Studio in your browser where you can:
- Preview the video in real-time
- Adjust timing and animations
- Export individual frames
- Test different configurations

### Rendering

To render videos to MP4:

**AG Citizenship video:**
```bash
npx remotion render AGCitizenship out/ag-citizenship.mp4
```

**Global to Argentina video:**
```bash
npx remotion render GlobalToArgentina out/global-to-argentina.mp4
```

To render with custom settings:

```bash
npx remotion render GlobalToArgentina out/global-to-argentina.mp4 --codec h264 --crf 18
```

### Export for Instagram Reels

For best quality on Instagram Reels:

```bash
# AG Citizenship
npx remotion render AGCitizenship out/ag-citizenship-reel.mp4 --codec h264 --crf 18 --audio-codec aac

# Global to Argentina
npx remotion render GlobalToArgentina out/global-to-argentina-reel.mp4 --codec h264 --crf 18 --audio-codec aac
```

## Project Structure

```
remotion-videos/
├── src/
│   ├── AGCitizenship.tsx       # Simple text fade-in video
│   ├── GlobalToArgentina.tsx   # Cinematic globe animation
│   ├── Root.tsx                # Composition registration
│   └── index.ts                # Entry point
├── .claude/
│   └── skills/                 # Remotion best practices
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Customization

### AGCitizenship Video
To customize `src/AGCitizenship.tsx`:

- **Colors**: Modify the `argentineBlue`, `white`, and `darkBlue` constants
- **Text**: Update the text content in the JSX
- **Animation timing**: Adjust `fadeInStart` and `fadeInDuration`
- **Logo**: Replace the AG logo circle with your own design

### GlobalToArgentina Video
To customize `src/GlobalToArgentina.tsx`:

- **Colors**: Modify the color palette constants at the top
- **Text**: Update "Your Second Home" and "Awaits" text
- **Animation phases**: Adjust the `PHASE_*_END` frame numbers for timing
  - `PHASE_1_END = 90`: Globe rotation duration
  - `PHASE_2_END = 150`: Zoom completion
  - `PHASE_3_END = 210`: Color wash completion
  - `PHASE_4_END = 300`: Final text display
- **Globe details**: Modify `CONTINENTS` and `ARGENTINA_PATH` SVG paths for different geography
- **Effects**: Adjust particle count, light ray count, or spring physics parameters

## Learn More

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Skills](./.claude/skills/remotion/SKILL.md) - Best practices included in this project
