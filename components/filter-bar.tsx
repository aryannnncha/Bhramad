type FilterBarProps = {
  category: string;
  crowd: string;
  district: string;
  categoryOptions: string[];
  districtOptions: string[];
  onCategoryChange: (value: string) => void;
  onCrowdChange: (value: string) => void;
  onDistrictChange: (value: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
};

const crowdOptions = ['All', 'Low', 'Moderate', 'High'];

function PillGroup({
  label,
  value,
  values,
  onChange,
}: {
  label: string;
  value: string;
  values: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">{label}</p>
      <div className="flex flex-wrap gap-2">
        {values.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${
              value === item ? 'bg-[#B5651D] text-white shadow-glass' : 'bg-white/70 text-black/65 hover:bg-white'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export function FilterBar({
  category,
  crowd,
  district,
  categoryOptions,
  districtOptions,
  onCategoryChange,
  onCrowdChange,
  onDistrictChange,
  search,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="glass-panel rounded-[2rem] p-5 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <label className="block space-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Search</span>
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search a place, district, or story"
            className="w-full rounded-[1.5rem] border border-black/8 bg-white/75 px-4 py-3 text-sm text-ink outline-none transition focus:border-[#B5651D]/35 focus:ring-4 focus:ring-[#B5651D]/10"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
          <PillGroup label="Category" value={category} values={categoryOptions} onChange={onCategoryChange} />
          <PillGroup label="Crowd" value={crowd} values={crowdOptions} onChange={onCrowdChange} />
          <PillGroup label="District" value={district} values={districtOptions} onChange={onDistrictChange} />
        </div>
      </div>
    </div>
  );
}
