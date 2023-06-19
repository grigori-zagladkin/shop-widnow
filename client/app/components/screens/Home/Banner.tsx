// import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Image from 'next/image'
import { FC, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { IBanner } from 'types/banner.types'

import styles from './Home.module.scss'

const Banner: FC<{ banners: IBanner[] }> = ({ banners }) => {
	return (
		<Carousel
			className={styles.carousel}
			dynamicHeight={false}
			showThumbs={false}
			showStatus={false}
			showIndicators={false}
		>
			{banners.map((item, idx) => (
				<div
					className={styles.itemWrapper}
					style={{
						position: 'relative',
						width: '100%',
						height: '300px',
						backgroundImage: `linear-gradient(90deg, rgba(0,0,0,1) 31%, rgba(185,172,162,1) 100%), url(${item.image})`,
					}}
					key={idx}
				>
					<div className={styles.title}>{item.title}</div>
					<div className={styles.descr}>{item.description}</div>
				</div>
			))}
		</Carousel>
	)
}

export default Banner
