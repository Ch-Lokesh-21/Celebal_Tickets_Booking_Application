// src/components/SeatGrid.jsx
export default function SeatGrid({ selected, booked, onSelect }) {
  const seats = Array.from({ length: 64 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-8 gap-2">
      {seats.map((seat) => {
        const isBooked = booked.includes(seat);
        const isSelected = selected.includes(seat);
        return (
          <button
            key={seat}
            disabled={isBooked}
            className={`
              p-2 rounded text-sm cursor-pointer
              ${isBooked ? "bg-red-400 cursor-not-allowed" :
              isSelected ? "bg-green-500" : "bg-gray-200"}
            `}
            onClick={() => onSelect(seat)}
          >
            {seat}
          </button>
        );
      })}
    </div>
  );
}