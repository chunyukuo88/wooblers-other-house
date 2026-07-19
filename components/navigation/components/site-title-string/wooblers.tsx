import { useCalendar } from 'store';
import { useSession } from 'next-auth/react';
import { useAdmin } from 'store';

export function Wooblers() {
  const { currentDate } = useCalendar();
  const { data: session, status } = useSession();
  const isAdmin = useAdmin(session, status);
  const month = currentDate.split(' ')[0];

  return (
    <div className="woh_drop-in">
      <SeasonalAdornment month={month} />
      {isAdmin ? <>Admin's</> : <div>Woobler's</div>}
    </div>
  );
}

function SeasonalAdornment(props: { month: string }) {
  const { month } = props;
  if (month.toLocaleLowerCase() === 'december') {
    return <img id="santa-hat" src="/images/seasonal/santa-hat__small.png" alt="A santa hat" />;
  }
  if (isWinterMonth(month)) {
    return <img id="winter-hat" src="/images/seasonal/winter-hat.png" alt="A winter hat" />;
  }
  return null;
}

function isWinterMonth(month: string): boolean {
  // Excluding December, which will have Santa theme
  return (
    month.toLocaleLowerCase() === 'november' ||
    month.toLocaleLowerCase() === 'january' ||
    month.toLocaleLowerCase() === 'february' ||
    month.toLocaleLowerCase() === 'march'
  );
}
