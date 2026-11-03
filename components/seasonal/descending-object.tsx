import { ReactNode } from 'react';

export function DescendingObject(props: DescendingObjectProps) {
  const { emoji, name, numberOfDescendingObjects } = props;
  const leaves = Array.from({ length: numberOfDescendingObjects }).map(
    (_: unknown, i: number) => i,
  );

  return (
    <div className={name} aria-hidden="true">
      {leaves.map((_: number, i: number): ReactNode => (
        <div key={i} className="woh__single-rotating-seasonal-object">
          <div className="inner">
            <div className="woh__spin">{emoji}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

type DescendingObjectProps = {
  name: string;
  numberOfDescendingObjects: number;
  emoji: string;
};
