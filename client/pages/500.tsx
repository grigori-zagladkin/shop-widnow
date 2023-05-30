import { useRouter } from 'next/router'

import Meta from '@/utils/meta/Meta'

export default function Error500() {
	const { push } = useRouter()
	return (
		<Meta title='Ошибка на стороне сервера'>
			<div className={'text-center flex flex-col items-center mt-72 text-2xl font-bold'}>
				<div className='text-4xl mb-8'>500 | Ошибка на стороне сервера</div>
				<div onClick={() => push('/')} className='w-fit cursor-pointer bg-green-400 rounded-lg px-4 py-2.5 text-xl'>
					На главную
				</div>
			</div>
		</Meta>
	)
}
