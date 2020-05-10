import { v4 as uuid4 } from 'uuid'
import connection from '../database/connection'

export const index = async (request, response) => {

  const ong_id = request.headers.authorization

  const incidents = await connection('incidents')
    .where('ong_id', ong_id)
    .select([
      'id',
      'title',
      'description',
      'value',
      'ong_id'
    ])

    response
      .status(200)
      .json(incidents)
}

export const store = async (request, response) => {
  const { title, description, value } = request.body

  const id = uuid4()
  const ong_id = request.headers.authorization
  
  await connection('incidents').insert({
    id,
    title,
    description,
    value,
    ong_id
  })

  return response.json({ id })
}

export const remove = async (request, response) => {
  const { id } = request.params
  const ong_id = request.headers.authorization

  const incident = await connection('incidents')
    .where('id', id)
    .select('ong_id')
    .first()

  if (!incident)
    return response
      .status(404)
      .json({ error: 'Incident does not find' })

  if(incident && incident.ong_id !== ong_id)
    return response
      .status(401)
      .json({ error: "You cannot delete an incident that you don't created" })


  await connection('incidents')
    .where('id', id)
    .delete()

  return response.status(204).send()
}