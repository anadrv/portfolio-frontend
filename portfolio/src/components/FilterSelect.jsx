import { ChevronDown } from "lucide-react";

function FilterSelect({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-1 w-full">

      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full p-2 pr-10 rounded bg-white text-background appearance-none focus:outline-none cursor-pointer"
        >
          <option value="">{label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

    
        <ChevronDown
          size={20}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-background"
        />

      </div>

    </div>
  );
}

export default FilterSelect;