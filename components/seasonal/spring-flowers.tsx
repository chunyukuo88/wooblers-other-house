export function SpringFlowers() {
  const flowers = Array.from({ length: 10 }, (_, i) => i);
  return (
    <div className="woh__spring-flowers" aria-hidden="true">
      {flowers.map((_: number, index: number) => (
        <div key={index} className="woh__single-rotating-seasonal-object">
          <div className="inner">
            <div className="woh__spin">🌸</div>
          </div>
        </div>
      ))}
    </div>
  );
}
