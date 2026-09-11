import { ArrowUpRight } from "lucide-react";
import type { Dish } from "./menu";
import { formatPrice } from "./menu-utils";

interface DishCardProps {
  dish: Dish;
  eager: boolean;
  onSelect: (dish: Dish) => void;
}

export function DishCard({ dish, eager, onSelect }: DishCardProps) {
  return (
    <article className="dish-card">
      <div className="dish-photo">
        <img
          src={dish.image}
          alt={dish.name}
          width="720"
          height="540"
          loading={eager ? "eager" : "lazy"}
          style={{ objectPosition: dish.imagePosition }}
        />
        <span
          className={
            dish.available ? "dish-category" : "dish-category unavailable"
          }
        >
          {dish.available ? "Available today" : "Currently unavailable"}
        </span>
      </div>
      <div className="dish-content">
        <p className="dish-label">{dish.label}</p>
        <div className="dish-title">
          <h3>{dish.name}</h3>
          <span className="price">{formatPrice(dish.price)}</span>
        </div>
        <p className="dish-description">{dish.description}</p>
        <button
          className="dish-open"
          type="button"
          aria-label={`View ${dish.name} details`}
          aria-haspopup="dialog"
          onClick={(event) => {
            event.currentTarget.focus({ preventScroll: true });
            onSelect(dish);
          }}
        >
          View details <ArrowUpRight size={16} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
