import { useState, useCallback, useEffect } from 'react';

export const useRouteState = () => {
  const [targetReached, setTargetReached] = useState(false);

  const [ mouthAccount, setMouthAccount ] = useState()

  console.log(mouthAccount)
  

  return {targetReached, mouthAccount, setMouthAccount};
};