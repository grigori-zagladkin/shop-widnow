import { Button } from 'antd'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
	children?: ReactNode
}

interface State {
	hasError: boolean
	pathHistory?: string[]
}

class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false,
		pathHistory: [],
	}

	public static getDerivedStateFromError(_: Error): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		const { pathHistory } = this.state
		pathHistory.push(window.location.pathname)
		this.setState({ pathHistory })
		console.error('Uncaught error:', error, errorInfo)
	}

	handleGoBack = () => {
		const { pathHistory } = this.state
		const previousPath = pathHistory.pop()
		if (previousPath) {
			window.location.href = previousPath
		}
	}

	public render() {
		if (this.state.hasError) {
			return (
				<div className='w-screen h-screen flex items-center justify-center'>
					<div className='rounded-xl bg-slate-200'>
						<p>Произошла ошибка</p>
						<Button onClick={this.handleGoBack}>Назад</Button>
					</div>
				</div>
			)
		}

		return this.props.children
	}
}

export default ErrorBoundary
