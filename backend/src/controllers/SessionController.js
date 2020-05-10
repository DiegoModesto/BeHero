import { v4 as uuid4 } from 'uuid'
import connection from '../database/connection'

export const store = async (request, response) => {
  const { id } = request.body

  const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first()
    
  if (!ong)
    return response
      .status(400)
      .json({ error: 'No ONG found with this ID' })

  return response.json(ong)
}