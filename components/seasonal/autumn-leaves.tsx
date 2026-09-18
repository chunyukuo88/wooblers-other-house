export function AutumnLeaves() {
  const leaves = Array.from({ length: 10 }).map((_, i) => i);
  return (
    <div className="autumn-leaves" aria-hidden="true">
      {leaves.map((_, i) => (
        <div key={i} className="woh__autumn-leaf">
          <div className="inner">
            <div className="woh__spin">🍁</div>
          </div>
        </div>
      ))}
    </div>
  );
}
