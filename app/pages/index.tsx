import Header from "../components/Header";
import heroImage from "../public/hero.svg";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import OnlyCoinbaseSupported from "../components/OnlyCoinbaseSupported";

export default function Home() {
  return (
    <>
      <Header
        buttons={
          <>
            <Link href="/start">
              <a className="btn">Aloita käyttö</a>
            </Link>
            <a href="https://github.com/jehna/fifo-fi/graphs/contributors">
              Tekijät
            </a>
            <a href="https://github.com/jehna/fifo-fi/">Lähdekoodi</a>
          </>
        }
      />
      <main>
        <div className={`${styles.indexWrapper} ${styles.row}`}>
          <div className={styles.hero}>
            <h1 className={styles.h1}>
              Laske verot myymistäsi kryptovaluutoista
            </h1>
            <p>
              Ilmaisella työkalulla lasket automaattisesti verotettavan voiton
              määrän kaikista myynneistäsi ja ostoistasi Suomen verottajan
              ohjeiden mukaan
            </p>

            <Link href="/start">
              <a className="btn">Aloita käyttö</a>
            </Link>
          </div>
          <img src="/hero.svg" alt="" />
        </div>
        <div className={`${styles.row} ${styles.secondRowWrapper}`}>
          <img src="/illustrationImage1.svg" alt="" />
          <div>
            <h2 className={styles.h1}>Näin se toimii</h2>
            <ol>
              <li>
                Hae tekemiesi ostosten data pörssistä<em>*</em>
                <div className={styles.info}>
                  Osto- ja myyntidatan lataus on parin klikin päässä
                </div>
              </li>
              <li>
                Lataa ostosten data kryptovero.fi -työkaluun
                <div className={styles.info}>
                  Voit myös lisätä tekemäsi ostokset käsin
                </div>
              </li>
              <li>
                Valmis!
                <div className={styles.info}>
                  Saat heti oikeat luvut veroilmoitukseen
                </div>
              </li>
            </ol>
            <OnlyCoinbaseSupported />
          </div>
        </div>
        <div className={`${styles.row} ${styles.videoWrapper}`}>
          <h2>Katso video:</h2>
          <iframe
            width="850"
            height="478"
            src="https://www.youtube.com/embed/Ul0pKCoK5Tc"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className={`${styles.row} ${styles.thirdRowWrapper}`}>
          <div>
            <h2 className={styles.h1}>Avoin, ilmainen ja turvallinen</h2>
            <p>
              Tämä projekti on tehty harrastustoiminnan pohjalta ja sen
              lähdekoodi on avointa. Tämä tarkoittaa, että uusia ominaisuuksia
              voi kehittää kuka tahansa ja saada ne helposti lisättyä tähän
              palveluun.
            </p>

            <p>
              Jos löydät palvelusta virheen, voit ilmoittaa siitä avaamalla{" "}
              <a href="https://github.com/jehna/fifo-fi/issues">
                Github issuen
              </a>
              . Löydät lähdekoodin ja lisää tietoa{" "}
              <a href="https://github.com/jehna/fifo-fi">
                Projektin Github-sivulta
              </a>
              .
            </p>

            <p>
              Tämä sivusto on suunniteltu siten, että kaikki laskenta tapahtuu
              sinun koneellasi. Ostodata pysyy vain sinun laitteellasi.
            </p>
          </div>
          <img src="/illustrationImage2.svg" alt="" />
        </div>
      </main>
    </>
  );
}
