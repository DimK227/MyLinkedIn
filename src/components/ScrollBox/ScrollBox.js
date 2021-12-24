import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './ScrollBox.css';

function ScrollBox({ children }) {
  return (
    <div className="scroll-box">
      <div className="scroll-box__wrapper">
        <div className="scroll-box__container" role="list">
          {children.map((child, i) => (
            <div className="scroll-box__item" role="listitem" key={`scroll-box-item-${i}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ScrollBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ScrollBox;