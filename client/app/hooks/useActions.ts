import { bindActionCreators } from '@reduxjs/toolkit'
import { useMemo } from 'react'

import { actions } from '../store'

import { useAppDispatch } from './useAppDispatch'

export const useActions = () => {
	const dispatch = useAppDispatch()
	return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
