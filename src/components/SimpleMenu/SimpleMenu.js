import React from 'react';
import * as PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SimpleMenuStyles from './SimpleMenu.style';

const SimpleMenu = ({ menuItems, selectedValue, handleChange }) => (
  <SimpleMenuStyles>
    <Select
      id="select-menu"
      className="select-menu"
      value={selectedValue}
      onChange={handleChange}
    >
      {menuItems.map((type) => (
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

SimpleMenu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  selectedValue: PropTypes.string,
  handleChange: PropTypes.func,
};

SimpleMenu.defaultProps = {
  menuItems: [],
  selectedValue: '',
  handleChange: {},
};

export default SimpleMenu;
