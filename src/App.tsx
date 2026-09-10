import { useState } from "react";
import { Flame, Heart, Leaf, MapPin, Soup } from "lucide-react";
import "./App.css";
const categories = ["All dishes", "Mains", "Rice", "Drinks"] as const;
type Category = (typeof categories)[number];
const dishes = [
  {
    name: "Chow Mein",
    category: "Mains",
    price: 145,
    image: "/menu/chow-mein.jpg",
    label: "Wok favorite",
    description:
      "Springy noodles, crisp vegetables, and a savory soy sauce. Tossed over a hot wok, served with love.",
  },
  {
    name: "Sweet & Sour Chicken",
    category: "Mains",
    price: 185,
    image: "/menu/sweet-sour-chicken.jpg",
    label: "House favorite",
    description:
      "Crispy chicken with pineapple, bell peppers, and our bright, tangy sweet and sour sauce.",
  },
  {
    name: "Yang Chow Fried Rice",
    category: "Rice",
    price: 125,
    image: "/menu/fried-rice.jpg",
    label: "Comfort in a bowl",
    description:
      "Golden wok-fried rice with egg, shrimp, pork, and spring onions. A little of everything in every spoonful.",
  },
  {
    name: "Calamansi Cooler",
    category: "Drinks",
    price: 65,
    image: "/menu/calamansi-juice.webp",
    label: "Fresh & refreshing",
    description:
      "Fresh calamansi juice, lightly sweetened and poured over ice. The perfect partner to a warm meal.",
  },
] as const;
function App() {
  const [category, setCategory] = useState<Category>("All dishes");
  const tableValue = new URLSearchParams(window.location.search).get("table");
  const table =
    tableValue && /^(?:[1-9]|10)$/.test(tableValue) ? tableValue : null;
  const visibleDishes = dishes.filter(
    (dish) => category === "All dishes" || dish.category === category,
  );
  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <div className="top-strip">FRESH · FAST · MADE WITH LOVE</div>
      <header className="brand-header">
        <div className="brand-note">
          <Soup size={26} strokeWidth={1.3} />
          <span>
            Comfort food.
            <br />
            Made fresh.
          </span>
        </div>
        <a className="brand" href="/menu" aria-label="Ahma menu">
          <span className="wordmark">
            AHMA
            <span className="brand-flower" aria-hidden="true">
              ✿
            </span>
          </span>
          <span className="brand-subtitle">CHINESE TAKE OUT</span>
        </a>
        <div className="table-label">
          <MapPin size={17} strokeWidth={1.5} />
          <span>{table ? `Table ${table}` : "Welcome to Ahma"}</span>
        </div>
      </header>
      <main id="menu">
        <section className="menu-intro" aria-labelledby="menu-heading">
          <div>
            <p className="eyebrow">FROM OUR WOK TO YOUR TABLE</p>
            <h1 id="menu-heading">
              A little comfort.
              <br className="mobile-break" /> A lot of flavor.
            </h1>
            <p className="intro-copy">
              Chinese favorites, cooked fresh and made with heart.
            </p>
          </div>
          <div className="love-stamp">
            <Heart size={23} strokeWidth={1.3} />
            <span>
              GOOD FOOD.
              <br />
              THE AHMA WAY.
            </span>
          </div>
        </section>
        <nav className="category-nav" aria-label="Menu categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              className={category === item ? "selected" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
              {item === "All dishes" && (
                <span className="category-count">{dishes.length}</span>
              )}
            </button>
          ))}
        </nav>
        <div className="section-heading">
          <h2>
            {category === "All dishes"
              ? "Something delicious awaits"
              : category}
          </h2>
          <span aria-live="polite">
            {visibleDishes.length}{" "}
            {visibleDishes.length === 1 ? "dish" : "dishes"}
          </span>
        </div>
        <div className="dish-grid">
          {visibleDishes.map((dish, index) => (
            <article className="dish-card" key={dish.name}>
              <div className="dish-photo">
                <img
                  src={dish.image}
                  alt={dish.name}
                  width="720"
                  height="540"
                  loading={index < 2 ? "eager" : "lazy"}
                  style={
                    dish.name === "Sweet & Sour Chicken"
                      ? { objectPosition: "center 78%" }
                      : undefined
                  }
                />
                <span className="dish-category">{dish.category}</span>
              </div>
              <div className="dish-content">
                <p className="dish-label">{dish.label}</p>
                <div className="dish-title">
                  <h3>{dish.name}</h3>
                  <span className="price">₱{dish.price}</span>
                </div>
                <p className="dish-description">{dish.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="kitchen-note">
          <Soup size={21} strokeWidth={1.4} />
          <p>
            Made fresh, just for you.{" "}
            <span>Please let our team know about any food allergies.</span>
          </p>
        </div>
      </main>
      <footer>
        <div className="footer-values">
          <span>
            <Flame size={17} />
            Freshly cooked
          </span>
          <span>
            <Leaf size={17} />
            Quality ingredients
          </span>
          <span>
            <Heart size={17} />
            Made with love
          </span>
        </div>
        <div className="footer-bottom">
          <span className="footer-brand">AHMA</span>
          <span>Good food. Warm hearts.</span>
          <span>Demo menu · Prices in PHP</span>
        </div>
      </footer>
    </>
  );
}
export default App;
