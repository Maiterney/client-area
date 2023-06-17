
import { useState, useCallback, useEffect } from 'react';

export const useRouteState = () => {
  const [targetReached, setTargetReached] = useState(false);

  const [ mouthAccount, setMouthAccount ] = useState<number>()

  // useEffect(() => {console.log(mouthAccount)},[mouthAccount])
  
  

  return {targetReached, mouthAccount, setMouthAccount};
};