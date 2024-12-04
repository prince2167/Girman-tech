import { useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";

const navLinks = [
  { title: "SEARCH", href: "/search" },
  { title: "WEBSITE", href: "https://girmantech.com/" },
  { title: "LINKEDIN", href: "https://www.linkedin.com/company/girmantech/" },
  { title: "CONTACT", href: "mailto:contact@girmantech.com" },
];

const isActiveLink = (href: string, pathname: string) => {
  return (
    href === pathname ||
    (href === "/search" && (pathname === "/" || pathname === "/search"))
  );
};

interface FilteredDataItem {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  contact: string;
  location: string;
}

const Navbar: React.FC<{
  filteredData: FilteredDataItem[];
  onSearch: (term: string) => void;
}> = ({ filteredData, onSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  // Custom debounce function
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    return (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  // Debounced search handler
  const handleSearchChange = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const onInputChange = (value: string) => {
    setQuery(value);
    handleSearchChange(value);
  };

  return (
    <nav className="w-full flex flex-wrap items-center justify-between px-4 md:px-8 py-4 shadow-md">
      <Logo />

      {/* Hamburger menu button for mobile */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Navigation links */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex w-full md:w-auto flex-col md:flex-row items-center gap-4 md:gap-8 mt-4 md:mt-0`}
      >
        {filteredData.length > 0 ? (
          <div className="w-full md:w-[300px] relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-12 p-2 border rounded-md"
              value={query}
              onChange={(e) => onInputChange(e.target.value)}
              aria-label="Search"
            />
          </div>
        ) : (
          navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className={`no-underline transition-colors duration-300 hover:text-[#3063E6] hover:underline text-sm w-full md:w-auto text-center py-2 md:py-0 ${
                isActiveLink(link.href, location.pathname)
                  ? "text-[#3063E6] font-semibold"
                  : "text-black"
              }`}
            >
              {link.title}
            </a>
          ))
        )}
      </div>
    </nav>
  );
};

export default Navbar;
