import { useEffect, useState } from 'react'

const getWindowWidth = () => {
	const { innerWidth: windowWidth } = typeof window !== 'undefined' ? window : { innerWidth: 0 }
	return { windowWidth }
}

const useWidnowWidth = () => {
	const [windowWidth, setWindowWidth] = useState(getWindowWidth())
	const handleResize = () => setWindowWidth(getWindowWidth())
	useEffect(() => {
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})
	return { windowWidth, handleResize }
}

export const useMediaQuery = (maxWidth: number) => {
	const {
		windowWidth: { windowWidth },
		handleResize,
	} = useWidnowWidth()
	const [isMedia, setIsMedia] = useState(false)
	useEffect(() => {
		if (maxWidth >= windowWidth) {
			setIsMedia(true)
		} else {
			setIsMedia(false)
		}
	}, [handleResize, maxWidth, windowWidth])
	return isMedia
}
