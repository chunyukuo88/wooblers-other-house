import { useSeasonalVolume } from 'store';

export function AutumnLeaves() {
  const { seasonalVolume } = useSeasonalVolume();
  const numberOfLeaves = Math.round(seasonalVolume / 10);
  const leaves = Array.from({ length: numberOfLeaves }).map((_, i) => i);
  return (
    <div className="woh__autumn-leaves" aria-hidden="true">
      {leaves.map((_, i) => (
        <div key={i} className="woh__single-rotating-seasonal-object">
          <div className="inner">
            <div className="woh__spin">🍁</div>
          </div>
        </div>
      ))}
    </div>
  );
}
