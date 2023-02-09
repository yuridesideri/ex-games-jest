import app from '../../src/app';
import supertest from 'supertest';
import { cleanDB } from '../helpers';
import { createConsole } from '../factories/consoles-factory';

const api = supertest(app);

beforeEach(async () => {
    await cleanDB();

})

describe('GET /consoles', () => {
    it ('should return 200 and an array of consoles', async () => {
        const console1 = await createConsole();
        const console2 = await createConsole();
        const response = await api.get('/consoles')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([console1, console2])
    })
})

describe ('GET /consoles/:id', () => {
    it ('should return 200 and a specific console', async () => {
        const console1 = await createConsole();
        const response = await api.get(`/consoles/${console1.id}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(console1)
    })

    it ('should return 404 if the console does not exist', async () => {
        const response = await api.get(`/consoles/1`)
        expect(response.status).toBe(404)
    })
})

describe('POST /consoles', () => {
    it ('should return 201 when body is fine', async () => {
        const console = {
            name: 'Playstation 5'
        }
        const response = await api.post('/consoles').send(console)
        expect(response.status).toBe(201)
    })

    it ('should return 409 when console name already exists', async () => {
        await createConsole('Playstation 5');
        const console = {
            name: 'Playstation 5'
        }
        await api.post('/consoles').send(console)
        const response = await api.post('/consoles').send(console)
        expect(response.status).toBe(409)
    })
})