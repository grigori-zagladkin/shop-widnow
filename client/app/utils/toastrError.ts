import { toastr } from 'react-redux-toastr'

import { errorCatch } from '@/api/api.helper'

export const toastrError = (error: any, title?: string) => {
	const messsage = errorCatch(error)
	toastr.error(title || 'Ошибка при запросе', messsage)
	throw messsage
}
