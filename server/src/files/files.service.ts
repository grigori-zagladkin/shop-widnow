import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, remove, writeFile } from 'fs-extra'
import FileResponse from './file.response'

@Injectable()
export class FilesService {
  async createFile(files: Express.Multer.File[], folder: string) {
    try {
      const uploadFolder = `${path}/uploads/${folder}`
      await ensureDir(uploadFolder)
      const res: FileResponse[] = await Promise.all(
        files.map(async (file) => {
          await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
          return {
            name: `/uploads/${folder}/${file.originalname}`,
            url: file.originalname,
          }
        }),
      )
      return res
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async deleteFile(name: string, folder: string) {
    try {
      const filePath = `${path}/uploads/${folder}`
      await remove(`${filePath}/${name}`)
      return 'success'
    } catch (error) {
      console.log(error)
      throw new HttpException(
        'Ошибка при удалении файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }
}
