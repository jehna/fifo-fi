import { useAtom } from "jotai";
import { calculateGains } from "@fifo/ledger";
import { Temporal } from "proposal-temporal";
import Header from "../components/Header";
import { useSave } from "../components/use-save";
import s from "../styles/App.module.scss";
import { useEffect, useState } from "react";
import EntryRow from "../components/EntryRow";
import Importer from "../components/Importer";
import Link from "next/link";
import {
  appStateAtom,
  computedStateAtom,
  useAppState,
} from "../components/app-state";

export default function App() {
  const [onSave, onAutosave] = useSave();
  const [appState] = useAtom(appStateAtom);
  const addAppStateItem = useAppState();
  useEffect(() => {
    onAutosave(appState);
  }, [appState, onAutosave]);
  const [ledger] = useAtom(computedStateAtom);
  const uniqYears = Array.from(
    new Set(ledger.map((item) => item.date.year))
  ).sort((a, b) => b - a);
  const [showAddRow, setShowAddRow] = useState(false);

  return (
    <>
      <Header
        buttons={
          <button className="btn" onClick={() => onSave(appState)}>
            Tallenna
          </button>
        }
      />
      <main className={s.app}>
        <div className={s.container}>
          <div className={`${s.box} ${s.buttons}`}>
            <button
              className="btn btn-wider"
              onClick={() => setShowAddRow(true)}
            >
              Lisää uusi rivi...
            </button>
            <Link href="/coinbase-import">
              <a className="btn btn--secondary btn-wider">Tuo Coinbasesta...</a>
            </Link>
          </div>
          {uniqYears.map((year) => {
            const gains = calculateGains(
              Temporal.PlainDate.from(`${year}-01-01`),
              Temporal.PlainDate.from(`${year}-12-31`),
              ledger
            );
            const taxes = gains * 0.3;
            return (
              <>
                <dl className={s.box}>
                  <dt>Verotettavan tulon märä {year}</dt>
                  <dd>
                    {gains.toLocaleString("fi", { maximumFractionDigits: 2 })} €
                  </dd>
                </dl>
                <dl className={s.box}>
                  <dt>Maksettavan veron määrä {year}</dt>
                  <dd>
                    {taxes.toLocaleString("fi", { maximumFractionDigits: 2 })} €
                  </dd>
                </dl>
                {ledger
                  .filter((item) => item.date.year === year)
                  .map((item) => (
                    <EntryRow key={item.id} item={item} />
                  ))}
              </>
            );
          })}
        </div>

        <div className={s.container}>
          <Importer
            onRead={async (file) =>
              addAppStateItem({
                data: await file.text(),
                type: "importCoinbaseCsv",
              })
            }
          >
            Drop CSV here
          </Importer>
        </div>
      </main>
      {showAddRow && (
        <>
          <div
            className={s.overlayBg}
            onClick={() => setShowAddRow(false)}
          ></div>
          <aside className={s.overlay}>
            <h2>Lisää uusi rivi...</h2>
            <label>
              Päivämäärä
              <div>
                <input className={s.dateInput} value="10.6.2021" />
              </div>
            </label>
            <label>
              Mistä
              <div>
                <input className={s.numberInput} value="10 000" />
                <select>
                  <option>EUR</option>
                </select>
              </div>
            </label>
            <label>
              Mihin
              <div>
                <input className={s.numberInput} value="5" />
                <select>
                  <option>BTC</option>
                </select>
              </div>
            </label>
            <div className={s.overlayButtons}>
              <button type="submit" className="btn">
                Lisää
              </button>
            </div>
          </aside>
        </>
      )}
    </>
  );
}