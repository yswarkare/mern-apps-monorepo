const Errors = ({ errors = [] }) => {
  return errors.length > 0 ? (
    <div className="w-full flex flex-col items-center">
      <p className="text-red-600">Errors</p>
      <ul className="flex flex-col justify-start items-start">
        {
          errors.map((err, i) => (
            <li key={`${i}-${i}`} className="text-red-500">{err}</li>
          ))
        }
      </ul>
    </div>
  ) : null;
}

export default Errors;
