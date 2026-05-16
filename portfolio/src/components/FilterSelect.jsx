import { ChevronDown } from "lucide-react";

function FilterSelect({
  label,
  options,
  value,
  onChange,
  textSize = "text-sm",
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="relative w-full">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-2 px-4 pr-10 rounded bg-white text-background appearance-none focus:outline-none cursor-pointer ${textSize} ${className}`}
        >
          <option value="" disabled hidden>
            {label}
          </option>

          {options.map((option, index) => {
            const isObject = typeof option === "object";

            return (
              <option
                key={index}
                value={isObject ? option.value : option}
              >
                {isObject ? option.label : option}
              </option>
            );
          })}
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