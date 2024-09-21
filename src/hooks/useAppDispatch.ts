import { AppDispatch } from '@store/store';
// src/hooks/useAppDispatch.ts
import { useDispatch } from 'react-redux';

// Use throughout your app instead of plain `useDispatch`
export const useAppDispatch = () => useDispatch<AppDispatch>();
