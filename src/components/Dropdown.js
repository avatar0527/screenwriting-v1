import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({
  options,
  selected,
  onSelectedChange,
  label,
  toggleInlineStyle,
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);
  const renderedOptions = options.map((option) => {
    if (option.value === options[selected].value) {
      return null;
    }

    return (
      <div
        key={option.value}
        className='item'
        onClick={() => onSelectedChange(options.indexOf(option))}
      >
        {option.value}
      </div>
    );
  });

  const onClick = () => {
    setOpen(!open);
    toggleInlineStyle();
  };

  return (
    <div ref={ref} className='ui form'>
      <div className='field'>
        <label className='label'>{label}</label>
        <div
          onClick={onClick}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className='dropdown icon'></i>
          <div className='text'>{options[selected].value}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
