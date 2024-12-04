import SearchIcon from "@/assets/SearchIcon";
import { Input } from "./ui/input";
import CompanyName from "@/assets/CompanyName";

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  error?: string;
}

const Search = ({
  searchTerm,
  onSearchChange,
  onSearch,
  error,
}: SearchProps) => {
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-[600px] px-2 flex flex-col items-center gap-8">
        <CompanyName />
        <div className="relative w-full">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-gray-500">
            <SearchIcon />
          </div>
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search..."
            className={`w-full pl-14 pr-6 py-4 text-lg border rounded-sm shadow-lg 
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "focus:outline-[#5c84ea] focus:ring-2 focus:ring-[#5c84ea] focus:border-transparent"
              }`}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    </div>
  );
};

export default Search;
