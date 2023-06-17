import { IsNumber, IsString } from 'class-validator'

export class BannerDto {
  @IsString()
  title: string
  @IsString()
  description: string
  @IsString()
  image: string
  @IsNumber()
  order: number
}
