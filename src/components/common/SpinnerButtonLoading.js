const SpinnerButtonLoading = () => {
  return (
    <span className="spinner-border spinner-border-sm" role="status"
      aria-hidden="true" style={ {marginRight: '0.5rem'} }
    >
      <span className="visually-hidden">Loading...</span>
    </span>
  );
};

export default SpinnerButtonLoading;