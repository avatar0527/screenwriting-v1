import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

const FormatDropdown = ({ options, onSelectedChange, label, format, id }) => {
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

  const renderText = () => {
    const selectedText = options.map((option) => {
      if (option.value === format) {
        return option.text;
      } else {
        return null;
      }
    });
    console.log(selectedText);
    return <div>{selectedText}</div>;
  };

  // iterate through options
  // if current = selected do nothing
  // render options
  // on click call toggle
  const renderedOptions = options.map((option) => {
    if (option.value === format) {
      return null;
    }

    return (
      <div
        key={option.text}
        className='item'
        onClick={() => onSelectedChange(option.value, id)}
        data-block={option.value}
      >
        {option.text}
      </div>
    );
  });

  const onClick = (e) => {
    setOpen(!open);
  };

  return (
    <div ref={ref} className='ui form small'>
      <div className='field'>
        <label className='label'>{label}</label>
        <div
          onClick={onClick}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className='dropdown icon'></i>
          <div className='text'>{renderText()}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    format: state.format,
  };
};

export default connect(mapStateToProps)(FormatDropdown);
