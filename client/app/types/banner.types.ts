import { IBase } from './base.types'

export interface IUpdateBanner {
	image: string
	title: string
	description: string
	order: number
}

export type IBanner = IUpdateBanner & IBase
