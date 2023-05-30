import { useAppSelector } from './useAppSelector'

export const useAuth = () => useAppSelector(state => state.user)
