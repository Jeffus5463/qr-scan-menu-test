import { useId, useState } from "react";
import { ArrowLeft, Printer, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { restaurant } from "./menu";
import { createTableUrl, validateBaseAddress } from "./table-links";
import "./TablesPage.css";

const tableNumbers = Array.from(
  { length: restaurant.tableCount },
  (_, index) => index + 1,
);

export function TablesPage() {
  const [address, setAddress] = useState(window.location.origin);
  const fieldId = useId();
  const result = validateBaseAddress(address);

  return (
    <div className="tables-page">
      <div className="tables-controls">
        <header className="tables-header">
          <a
            className="footer-brand"
            href="/menu"
            aria-label={`${restaurant.name} menu`}
          >
            {restaurant.wordmark}
          </a>
          <a className="back-to-menu" href="/menu">
            <ArrowLeft size={16} aria-hidden="true" /> Back to menu
          </a>
        </header>
        <main className="tables-setup" aria-labelledby="tables-title">
          <p className="eyebrow">SET THE TABLE</p>
          <h1 id="tables-title">A warm welcome. One quick scan.</h1>
          <p className="intro-copy">
            Create a menu QR code for each of your {restaurant.tableCount}{" "}
            tables.
          </p>
          <div className="address-panel">
            <div className="address-field">
              <label htmlFor={fieldId}>Laptop’s network address</label>
              <input
                id={fieldId}
                type="text"
                inputMode="url"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                maxLength={250}
                value={address}
                placeholder="http://192.168.1.103:5173"
                aria-invalid={Boolean(result.error)}
                aria-describedby={`${fieldId}-help ${fieldId}-status`}
                onChange={(event) => setAddress(event.target.value)}
              />
              <p
                id={`${fieldId}-status`}
                className={
                  result.error
                    ? "address-status address-error"
                    : "address-status"
                }
                aria-live="polite"
              >
                {result.error ??
                  `All ${restaurant.tableCount} cards use ${result.origin}. Open a menu link on your phone before printing.`}
              </p>
            </div>
            <button
              className="print-tables"
              type="button"
              disabled={!result.origin}
              onClick={() => window.print()}
            >
              <Printer size={18} aria-hidden="true" /> Print table cards
            </button>
          </div>
        </main>
      </div>

      {result.origin ? (
        <section
          className="table-card-grid"
          aria-label="Printable table QR cards"
        >
          {tableNumbers.map((table) => {
            const url = createTableUrl(result.origin, table);
            return (
              <article className="table-card" key={table}>
                <div className="table-card-brand">{restaurant.wordmark}</div>
                <p className="table-card-subtitle">{restaurant.subtitle}</p>
                <h2>Table {table}</h2>
                <QRCodeSVG
                  value={url}
                  size={176}
                  level="M"
                  marginSize={4}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  role="img"
                  title={`${restaurant.name} menu — Table ${table}`}
                />
                <p className="scan-label">Scan for something delicious.</p>
                <p className="table-card-instruction">
                  Join our Wi-Fi, then scan to see the menu.
                </p>
                <a className="table-menu-link" href={url}>
                  {url}
                </a>
              </article>
            );
          })}
        </section>
      ) : (
        <div className="table-empty">
          <QrCode size={38} strokeWidth={1.4} aria-hidden="true" />
          <h2>Your table cards will appear here</h2>
          <p>
            Enter a suitable laptop address above to generate all ten codes.
          </p>
        </div>
      )}
      <p className="invalid-print-message">
        Enter a valid laptop network address on the Tables page before printing
        QR cards.
      </p>
    </div>
  );
}
