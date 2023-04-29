import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, disabled }) => {
  return (
    <button
      type="button"
      className={css.Button}
      onClick={onClick}
      disabled={disabled}
    >
      Load more
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default Button;