'use client';

import PropTypes from 'prop-types';
import { useModal } from './Modal';

export default function ModalTrigger({ children, render }) {
  const { show } = useModal();

  const handleClick = () => {
    if (typeof render === 'function') {
      show(render());
    } else {
      console.error('ModalTrigger: render prop must be a function');
    }
  };

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

ModalTrigger.propTypes = {
  children: PropTypes.node,
  render: PropTypes.func.isRequired,
};
