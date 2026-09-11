import { useEffect, useRef, useState } from "react";
import { Flame, Heart, Leaf, MapPin, Soup } from "lucide-react";
import { categories, dishes, restaurant, type CategoryId, type Dish } from "./menu";
import { parseTable } from "./menu-utils";
import { DishCard } from "./DishCard";
import { DishDialog } from "./DishDialog";
import "./App.css";

function App() {
  const [category, setCategory] = useState<CategoryId>("mains");
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const table = parseTable(window.location.search);

  useEffect(() => {
    let frame = 0;

    const updateCategory = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;

      const threshold = nav.getBoundingClientRect().height + 32;
      let current: CategoryId = "mains";
      for (const item of categories) {
        const section = document.getElementById(item.id);
        if (section && section.getBoundingClientRect().top <= threshold) {
          current = item.id;
        }
      }
      if (
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2
      ) {
        current = "drinks";
      }
      setCategory(current);
    };

    const queueUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateCategory);
    };

    const nav = navRef.current;
    const resizeObserver = new ResizeObserver(() => {
      if (!nav) return;
      document.documentElement.style.setProperty(
        "--category-offset",
        `${nav.getBoundingClientRect().height + 24}px`,
      );
      queueUpdate();
    });
    if (nav) resizeObserver.observe(nav);

    updateCategory();
    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      resizeObserver.disconnect();
      document.documentElement.style.removeProperty("--category-offset");
    };
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    const link = nav?.querySelector<HTMLElement>(`a[href="#${category}"]`);
    if (!nav || !link) return;
    const navBounds = nav.getBoundingClientRect();
    const linkBounds = link.getBoundingClientRect();
    if (linkBounds.left < navBounds.left || linkBounds.right > navBounds.right) {
      nav.scrollLeft += linkBounds.left - navBounds.left;
    }
  }, [category]);
  return (
    <>
      <a className="skip-link" href="#menu">
        Skip to menu
      </a>
      <div className="top-strip">{restaurant.tagline}</div>
      <header className="brand-header">
        <div className="brand-note">
          <Soup size={26} strokeWidth={1.3} />
          <span>
            Comfort food.
            <br />
            Made fresh.
          </span>
        </div>
        <a
          className="brand"
          href={table ? `/menu?table=${table}` : "/menu"}
          aria-label={`${restaurant.name} menu`}
        >
          <span className="wordmark">
            {restaurant.wordmark}
            <span className="brand-flower" aria-hidden="true">
              ✿
            </span>
          </span>
          <span className="brand-subtitle">{restaurant.subtitle}</span>
        </a>
        <div className="table-label">
          <MapPin size={17} strokeWidth={1.5} />
          <span>{table ? `Table ${table}` : `Welcome to ${restaurant.name}`}</span>
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
              {restaurant.introduction}
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
        <nav ref={navRef} className="category-nav" aria-label="Menu categories">
          {categories.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={category === item.id ? "location" : undefined}
              className={category === item.id ? "selected" : ""}
            >
              {item.name}
            </a>
          ))}
        </nav>
        {categories.map((item) => {
          const categoryDishes = dishes.filter(dish => dish.category === item.id);
          return (
            <section
              className="menu-category"
              id={item.id}
              key={item.id}
              aria-labelledby={`${item.id}-heading`}
              tabIndex={-1}
            >
              <div className="section-heading">
                <h2 id={`${item.id}-heading`}>{item.name}</h2>
                <span>{categoryDishes.length} dishes</span>
              </div>
              <div className="dish-grid">
                {categoryDishes.map((dish, index) => (
                  <DishCard
                    key={dish.id}
                    dish={dish}
                    eager={item.id === "mains" && index < 2}
                    onSelect={setSelectedDish}
                  />
                ))}
              </div>
            </section>
          );
        })}
        <div className="kitchen-note">
          <Soup size={21} strokeWidth={1.4} />
          <p>
            Made fresh, just for you.{" "}
            <span>{restaurant.allergyNote}</span>
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
          <span className="footer-brand">{restaurant.wordmark}</span>
          <span>{restaurant.farewell}</span>
          <span>Demo menu · Prices in PHP</span>
        </div>
      </footer>
      {selectedDish && (
        <DishDialog
          dish={selectedDish}
          onClose={() => setSelectedDish(null)}
        />
      )}
    </>
  );
}
export default App;
