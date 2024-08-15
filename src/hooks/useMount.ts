import { useEffect } from 'react';

export function useMount(onMount: () => any) {
  return useEffect(onMount, []);
}
