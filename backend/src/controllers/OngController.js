import crypto from 'crypto'
import connection from '../database/connection'

export const index = async (request, response) => {
  const ongs = await connection('ongs')
                        .select(
                          [
                            'id',
                            'name',
                            'email',
                            'email',
                            'whatsapp',
                            'city',
                            'uf'
                          ])

    return response.json(ongs)
}

export const store = async (request, response) => {
  const { name, email, whatsapp, city, uf } = request.body

  const id = crypto.randomBytes(4).toString('HEX')

  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf
  })

  return response.json(id)
}