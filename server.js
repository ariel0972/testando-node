import { fastify } from 'fastify'
// import { DBmemomry } from './DBmemory.js'
import { DBpostgres } from './DBpostgres.js'

const server = fastify()

// const db = new DBmemomry()

const db = new DBpostgres()



server.post('/videos', async (request, response) => {
    const { title, description, duration} = request.body

    await db.create({
        title,
        description,
        duration,
    })

    return response.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await db.list(search)

    console.log(videos)

    return videos
})

server.put('/videos/:id', async (request, response) => {
    const videosId = request.params.id
    const { title, description, duration} = request.body

    await db.update(videosId, {
        title,
        description,
        duration
    })

    return response.status(204).send()
})

server.delete('/videos/:id', async (request, response) => {
    const videoID = request.params.id

    await db.delete(videoID)

    return response.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
})