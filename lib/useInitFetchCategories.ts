// hooks/useInitFetchData.ts
import { store } from '@/stores/store';
import { useEffect } from 'react';

export function useInitFetchCategories({
  components = true,
  types = true,
  stacks = true,
  styles = true,
  industries = true,
} = {}) {
  const {
    fetchComponents,
    fetchTypes,
    fetchStacks,
    fetchStyles,
    fetchIndustries,
  } = store();

  useEffect(() => {
    components && fetchComponents();
    types && fetchTypes();
    stacks && fetchStacks();
    styles && fetchStyles();
    industries && fetchIndustries();
  }, []);
}
