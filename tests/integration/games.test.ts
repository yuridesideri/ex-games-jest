import app from '../../src/app';
import supertest from 'supertest';
import { cleanDB } from '../helpers';
import { createGame } from '../factories/games-factory';
import { createConsole } from '../factories/consoles-factory';


const api = supertest(app);

beforeEach(async () => {
    await cleanDB();
})



describe('GET /games', () => {
    it ('should return 200 and an array of games', async () => {
        const console1 = await createConsole();
        const console2 = await createConsole();
        const game1 = await createGame(null, console1.id);
        const game2 = await createGame(null, console2.id);
        const response = await api.get('/games')
        expect(response.status).toBe(200)
        expect(response.body).toEqual([{...game1, Console: {...console1}}, {...game2, Console: {...console2}}])
    })
})

describe ('GET /games/:id', () => {
    it ('should return 200 and a specific game', async () => {
        const game1 = await createGame();
        const response = await api.get(`/games/${game1.id}`)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(game1)
    })

    it ('should return 404 if the game does not exist', async () => {
        const response = await api.get(`/games/1`)
        expect(response.status).toBe(404)
    })
})

describe('POST /games', () => {
    it ('should return 201 when body is fine', async () => {
        const console = await createConsole();
        const game = {
            title: 'God of War',
            consoleId: console.id
        }
        const response = await api.post('/games').send(game)
        expect(response.status).toBe(201)
    })

    it ('should return 409 when game name already exists', async () => {
        await createGame('God of War');
        const game = {
            title: 'God of War',
            consoleId: 1
        }
        await api.post('/games').send(game)
        const response = await api.post('/games').send(game)
        expect(response.status).toBe(409)
    })
})