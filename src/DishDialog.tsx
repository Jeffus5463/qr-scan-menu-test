import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { photoCredits, restaurant, type Dish } from "./menu";
import { formatPrice } from "./menu-utils";

interface DishDialogProps {
  dish: Dish;
  onClose: () => void;
}

export function DishDialog({ dish, onClose }: DishDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const credit = photoCredits[dish.id];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger instanceof HTMLElement && trigger.isConnected) {
        trigger.focus({ preventScroll: true });
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="dish-dialog"
      aria-labelledby="dish-dialog-title"
      aria-describedby="dish-dialog-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <button
        className="dialog-close"
        type="button"
        autoFocus
        aria-label="Close dish details"
        onClick={onClose}
      >
        <X size={22} aria-hidden="true" />
      </button>
      <img
        className="dialog-photo"
        src={dish.image}
        alt={dish.name}
        width="900"
        height="600"
        style={{ objectPosition: dish.imagePosition }}
      />
      <div className="dialog-content">
        <p className="dish-label">{dish.label}</p>
        <div className="dish-title">
          <h2 id="dish-dialog-title">{dish.name}</h2>
          <span className="price">{formatPrice(dish.price)}</span>
        </div>
        <p
          className={
            dish.available ? "availability" : "availability unavailable"
          }
        >
          {dish.available ? "Available today" : "Currently unavailable"}
        </p>
        <p className="dish-description" id="dish-dialog-description">
          {dish.description}
        </p>
        <p className="dish-portion">{dish.portion}</p>
        <p className="dialog-note">{restaurant.allergyNote}</p>
        {credit && (
          <p className="photo-credit">
            Photo:{" "}
            <a href={credit.source} target="_blank" rel="noreferrer">
              {credit.author}
            </a>
            {" · "}
            <a href={credit.licenseUrl} target="_blank" rel="noreferrer">
              {credit.license}
            </a>
            . Cropped to fit.
          </p>
        )}
      </div>
    </dialog>
  );
}
