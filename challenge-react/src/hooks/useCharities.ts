import { useState, useEffect } from 'react';
import { Charity } from 'types/charity';

const useCharities = () => {
  const [charities, setCharities] = useState<Charity[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => {
        return resp.json();
      })
      .then((data: Charity[]) => {
        setCharities(data);
      });
  }, []);

  return charities;
};

export default useCharities;
