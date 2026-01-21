import { Composition } from 'remotion';
import { AGCitizenship } from './AGCitizenship';
import { GlobalToArgentina } from './GlobalToArgentina';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AGCitizenship"
        component={AGCitizenship}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1080} // Instagram Reels width
        height={1920} // Instagram Reels height (9:16 ratio)
        defaultProps={{}}
      />
      <Composition
        id="GlobalToArgentina"
        component={GlobalToArgentina}
        durationInFrames={300} // 10 seconds at 30fps
        fps={30}
        width={1080} // Instagram Reels width
        height={1920} // Instagram Reels height (9:16 ratio)
        defaultProps={{}}
      />
    </>
  );
};
