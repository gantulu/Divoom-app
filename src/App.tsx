import { App as KonstaApp, Button, Navbar, Page } from "konsta/react";

const navigationItems = [
  { label: "Home", icon: "⌂", active: true },
  { label: "Catalog", icon: "▦", active: false },
  { label: "Cart", icon: "⌑", active: false },
  { label: "Profile", icon: "○", active: false },
];

function App() {
  return (
    <KonstaApp theme="ios" safeAreas>
      <Page className="store-page">
        <div className="store-shell">
          <Navbar
            title={
              <span className="brand-lockup">
                <span className="brand-mark">D</span>
                <span>DIVOOM</span>
              </span>
            }
            right={
              <button className="icon-button" type="button" aria-label="Open cart">
                <span aria-hidden="true">⌑</span>
              </button>
            }
            className="store-navbar"
          />

          <main className="store-content">
            <section className="welcome-section" aria-labelledby="welcome-title">
              <p className="section-eyebrow">PIXEL ART. SOUND. PERSONALITY.</p>
              <h1 id="welcome-title">
                Make your
                <br />
                world <span>colorful.</span>
              </h1>
              <p className="welcome-copy">
                Discover creative speakers and pixel art displays that bring
                your everyday spaces to life.
              </p>
              <Button large rounded className="discover-button">
                Explore collection
              </Button>
              <div className="hero-art" aria-label="Decorative pixel art display">
                <div className="pixel-device">
                  <div className="pixel-screen">
                    <span className="pixel-sun" />
                    <span className="pixel-cloud pixel-cloud-one" />
                    <span className="pixel-cloud pixel-cloud-two" />
                    <span className="pixel-hill pixel-hill-back" />
                    <span className="pixel-hill pixel-hill-front" />
                  </div>
                  <div className="device-speaker">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <span className="art-caption">A LITTLE MORE YOU.</span>
              </div>
            </section>

            <section className="foundation-note" aria-label="Development status">
              <div>
                <span className="status-dot" />
                <span>Storefront foundation</span>
              </div>
              <p>UI foundation is ready for the next storefront phase.</p>
            </section>
          </main>

          <nav className="bottom-navigation" aria-label="Main navigation">
            {navigationItems.map((item) => (
              <button
                className={item.active ? "nav-item is-active" : "nav-item"}
                key={item.label}
                type="button"
                aria-current={item.active ? "page" : undefined}
              >
                <span className="nav-icon" aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </Page>
    </KonstaApp>
  );
}

export default App;
