import React, { useState, useRef, useEffect } from "react";
import styles from "./SelectDropdown.module.css";
import { TOption } from "client/src/types/tickets.model";
import { FlatList } from "../Flatlist";

type TSelectDropdownProps = {
  options: TOption[];
  value: TOption | null;
  onChange: (option: TOption) => void;
  placeholder?: string;
  showSearch?: boolean;
};

const SelectDropdown: React.FC<TSelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select",
  showSearch = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [alignRight, setAlignRight] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    if (!isOpen || !dropdownRef.current || !menuRef.current) return;

    const triggerRect = dropdownRef.current.getBoundingClientRect();
    const menu = menuRef.current;

    const updateMenuPosition = () => {
      const menuHeight = menu.offsetHeight;
      const menuWidth = menu.offsetWidth;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;
      const spaceRight = window.innerWidth - triggerRect.left;

      setOpenUpward(spaceBelow < menuHeight && spaceAbove > menuHeight);
      setAlignRight(spaceRight < menuWidth);
    };

    // Wait for DOM to fully render including input + list
    const timeout = setTimeout(updateMenuPosition, 0);

    const resizeObserver = new ResizeObserver(updateMenuPosition);
    resizeObserver.observe(menu);

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
    };
  }, [isOpen, filteredOptions.length, showSearch]);

  return (
    <div className={styles["dropdown"]} ref={dropdownRef}>
      <button
        data-testid="status-filter-button"
        className={styles["button-select"]}
        onClick={handleToggle}
        type="button"
      >
        <span>{value?.display ?? placeholder}</span>
        <span className={styles["icon"]}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#000000"
          >
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className={styles["menu"]}
          style={{
            top: openUpward ? "auto" : "100%",
            bottom: openUpward ? "100%" : "auto",
            left: alignRight ? "auto" : 0,
            right: alignRight ? 0 : "auto",
            maxHeight: "calc(1.5rem + 5 * 2.5rem)",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {showSearch && (
            <input
              type="text"
              className={styles["search"]}
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          )}

          <FlatList
            data={filteredOptions}
            keyExtractor={(item) => item.value}
            renderItem={(item) => (
              <div
                className={styles["option"]}
                onClick={() => handleSelect(item)}
                role="button"
                data-testid={`filter-${item.label.toLowerCase()}`}
              >
                <p>{item.display ?? item.label}</p>
              </div>
            )}
            ListEmptyComponent={
              <div className={styles["no-option"]}>No results found</div>
            }
            contentContainerStyle={{ gap: 4 }}
          />
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
