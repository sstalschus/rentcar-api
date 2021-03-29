import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

export default {

  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex')
          // Criamos aqui um nome que seja a partir de um hash randomico + o nome do nosso arquivo
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}