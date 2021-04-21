import multer from 'multer'
import { resolve } from 'path'
import crypto from 'crypto'

const tmpFolder = resolve(__dirname, "..", "..", "tmp")

export default {

  tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      // Criamos aqui um nome que seja a partir de um hash randomico + o nome do nosso arquivo
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}