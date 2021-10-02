const SpinnerLoadingPage = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border text-success" role="status"
        style={ {width: '3rem', height: '3rem'} }
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default SpinnerLoadingPage;