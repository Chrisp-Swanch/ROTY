import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../store'
import type { ThunkDispatch } from 'redux-thunk'
import type { AnyAction } from 'redux'


export const useAppDispatch: () => ThunkDispatch<RootState, void, AnyAction> =
  useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector