// src/hooks/useAppSelector.ts
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from '@store/store';

// Use throughout your app instead of plain `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
