function Loader({ label = "Loading metrics" }) {
  return (
    <div className="loader">
      <span className="spinner" />
      <span>{label}</span>
    </div>
  );
}

export default Loader;