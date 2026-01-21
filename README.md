# AG Immigration Law Firm - Remotion Videos

Professional video templates for AG Argentine Immigration Law Firm, created with Remotion.

## Videos

### AG Citizenship Video
A 10-second professional video for Instagram Reels featuring:
- Text: "Your Path to Argentine Citizenship Starts Here"
- Clean fade-in animation with spring physics
- Argentine blue (#74ACDF) and white color scheme
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

To render the video to MP4:

```bash
npx remotion render AGCitizenship out/ag-citizenship.mp4
```

To render with custom settings:

```bash
npx remotion render AGCitizenship out/ag-citizenship.mp4 --codec h264 --crf 18
```

### Export for Instagram Reels

For best quality on Instagram Reels:

```bash
npx remotion render AGCitizenship out/ag-citizenship-reel.mp4 --codec h264 --crf 18 --audio-codec aac
```

## Project Structure

```
remotion-videos/
├── src/
│   ├── AGCitizenship.tsx    # Main video component
│   ├── Root.tsx              # Composition registration
│   └── index.ts              # Entry point
├── .claude/
│   └── skills/               # Remotion best practices
├── package.json
├── tsconfig.json
└── remotion.config.ts
```

## Customization

To customize the video, edit `src/AGCitizenship.tsx`:

- **Colors**: Modify the `argentineBlue`, `white`, and `darkBlue` constants
- **Text**: Update the text content in the JSX
- **Animation timing**: Adjust `fadeInStart` and `fadeInDuration`
- **Logo**: Replace the AG logo circle with your own design

## Learn More

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion Skills](./.claude/skills/remotion/SKILL.md) - Best practices included in this project
