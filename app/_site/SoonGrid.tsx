import { APPS, SOON_GROUPS } from './data';
import { I, Tile } from './ui';

/** Every app that is not built yet, grouped by trade (from the same list as the trade tabs). */
export default function SoonGrid() {
  return (
    <div className="soon-grid">
      {SOON_GROUPS.map(([group, icon, ids]) => (
        <div className="sg" key={group}>
          <h3><I n={icon} />{group}</h3>
          <ul>
            {ids.map((id) => <li key={id}><Tile icon={APPS[id].icon} tone={APPS[id].tone} size="sm" />{APPS[id].name}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
}
