import { v4 as uuid4 } from 'uuid'
import connection from '../database/connection'

export const index = async (request, response) => {
  const { page = 1, qty_rows = 5 } = request.query

  const [count] = await connection('incidents')
    .count()

  const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(qty_rows)
    .offset((page - 1) * qty_rows)  
    .select({
      'incident.id': 'incidents.id',
      'incident.title': 'incidents.title',
      'incident.description': 'incidents.description',
      'incident.value': 'incidents.value',
      'ong.id': 'incidents.ong_id',
      'ong.name': 'ongs.name',
      'ong.email': 'ongs.email'
    })
    
  /*
    Page 1
    Qtd  5
  
    Total: 11
  */

  let totalCount = count['count(*)']
  let totalPages = parseInt(totalCount / qty_rows)
  if ((totalCount % qty_rows) > 0)
    totalPages++
  

  response.header('X-Total-Count', totalCount)
  response.header('X-Total-Pages', totalPages)

  return response.json(incidents)
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