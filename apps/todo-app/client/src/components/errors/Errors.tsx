const Errors = ({ errors = [] }: { errors: string[] }) => {
  return errors.length > 0 ? (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="magic magictime swap">
        <h2 className="text-red-600">Errors</h2>
        <ul className="flex flex-col justify-start items-start">
          {
            errors.map((err, i) => (
              <li key={`${i}-${i}`} className="text-red-500">{err}</li>
            ))
          }
        </ul>
      </div>
    </div>
  ) : null;
}

export default Errors;
