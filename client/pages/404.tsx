import { useRouter } from 'next/router'

import Meta from '@/utils/meta/Meta'

export default function Error404() {
	const { push } = useRouter()
	return (
		<Meta title='Страница не найдена'>
			<div className={'text-center flex flex-col items-center mt-72 text-2xl font-bold'}>
				<div className='text-4xl mb-8'>404 | Страница не найдена</div>
				<div onClick={() => push('/')} className='w-fit cursor-pointer bg-green-400 rounded-lg px-4 py-2.5 text-xl'>
					На главную
				</div>
			</div>
		</Meta>
	)
}
