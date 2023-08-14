import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export const generateHookStore = <T> (selector: T, actions: ActionCreatorWithPayload<T, string>) : [ T, (e: T) => void ] => {
  const dispatch = useDispatch();
  const value = selector;
  const setValue = (e: T) => {
    dispatch(actions(e));
  };
  
  return [value, setValue];
  
};