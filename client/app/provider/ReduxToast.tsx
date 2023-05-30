import { FC } from 'react'
import ReduxToastr from 'react-redux-toastr'

const ReduxToast: FC = () => (
	<ReduxToastr
		newestOnTop={false}
		preventDuplicates
		progressBar
		closeOnToastrClick
		timeOut={8000}
		transitionIn='fadeIn'
		transitionOut='fadeOut'
	/>
)

export default ReduxToast
