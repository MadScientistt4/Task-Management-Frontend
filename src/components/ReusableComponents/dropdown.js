import { useState } from "react"
export const Dropdown = ({ dropdownOn, buttonDefaultText, options, onSelectItem, toggleDropdown }) => {
  const handleChangeItem = (item) => {
    onSelectItem(item);
    toggleDropdown(false);
  };
  return (
    <div className={`dropdown ${dropdownOn ? "is-active" : ""}`}>
      <div className="dropdown-trigger">
        <button
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => toggleDropdown(!dropdownOn)}
        >
          <span>{buttonDefaultText}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {options.map((item, i) => (
            item != buttonDefaultText &&
            <a
              key={i} 
              className="dropdown-item"
              onClick={() => handleChangeItem(item)}
            > 
            {item} 
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}