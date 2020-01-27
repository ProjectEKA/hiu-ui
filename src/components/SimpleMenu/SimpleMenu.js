import React, { useEffect } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SimpleMenuStyles from "./SimpleMenu.style";

const SimpleMenu = ({ menuItems, selectedValue, handleChange }) => {
  return (
    <SimpleMenuStyles>
      <Select
        id="select-menu"
        className="select-menu"
        value={selectedValue}
        onChange={handleChange}
      >
        {menuItems.map(type => (
          <MenuItem
            id="menu-item"
            key={type.value}
            value={type.value}
            onClick={handleChange}
          >
            {type.label}
          </MenuItem>
        ))}
      </Select>
    </SimpleMenuStyles>
  );
};

export default SimpleMenu;
