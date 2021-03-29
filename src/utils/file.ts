import fs from 'fs'

export const deleteFile = async (filename: string) => {

  try {
    // O stat verifica se o arquivo existe ou não, se não existir retorna erro
    await fs.promises.stat(filename)

  } catch (error) {
    return
  }
  await fs.promises.unlink(filename)
}