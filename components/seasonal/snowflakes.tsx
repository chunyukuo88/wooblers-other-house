export function Snowflakes() {
    const flakes = Array.from({length: 10}, (_, i) => i);
    return (
        <div className="woh__snowflakes" aria-hidden="true">
            {flakes.map((_: number, index: number) => (
                <div key={index} className="woh__single-snowflake">
                    <div className="inner">❅</div>
                </div>
            ))}
        </div>
    );
}