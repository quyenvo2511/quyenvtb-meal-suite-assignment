import React, { useState, useRef, useEffect } from "react";
import styles from "./SelectDropdown.module.css";
import { TOption } from "client/src/types/tickets.model";

type TSelectDropdownProps = {
  options: TOption[];
  value: TOption | null;
  onChange: (option: TOption) => void;
  placeholder?: string;
};

const SelectDropdown: React.FC<TSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (option: TOption) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm(""); // optional: clear search on outside click
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <button className={styles["button"]} onClick={handleToggle} type="button">
        <span>{value?.label ?? placeholder}</span>
        <span className={styles["icon"]}>▾</span>
      </button>

      {isOpen && (
        <div className={styles["menu"]}>
          <input
            type="text"
            className={styles["search"]}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          {filteredOptions.map((opt) => (
            <div
              key={opt.value}
              className={`${styles["option"]} ${
                value?.value === opt.value ? styles["selected"] : ""
              }`}
              onClick={() => handleSelect(opt)}
              role="button"
            >
              {opt.label}
            </div>
          ))}
          {filteredOptions.length === 0 && (
            <div className={styles["no-option"]}>No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
