export function SoccerBalls() {
  const balls = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="woh__soccer-balls" aria-hidden="true">
      {balls.map((_: number, index: number) => (
        <div key={index} className="woh__single-rotating-seasonal-object">
          <div className="inner">
            <div className="woh__spin">⚽</div>
          </div>
        </div>
      ))}
    </div>
  );
}
