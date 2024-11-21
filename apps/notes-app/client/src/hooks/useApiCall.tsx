import { useState } from 'react';
import { getCookie } from 'yw-hooks';

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

function useApiCall() {
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState();
  const [value, setValue] = useState();

  async function callApi(url: string, options: object) {
    try {
      setLoading(true);
      setError(undefined);
      setValue(undefined);
      const res: Response = await fetch(url, options);
      const data = await res.json();
      const bearerToken = getCookie("bearerToken")
      console.log({ bearerToken })
      setValue(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, value, callApi }
}

export default useApiCall;