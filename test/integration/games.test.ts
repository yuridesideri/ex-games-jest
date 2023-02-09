import app from '../../src/app';
import supertest from 'supertest';
import { cleanDB } from '../helpers';
import { PrismaClient } from '@prisma/client';

const api = supertest(app);

beforeEach(async () => {
    await cleanDB();
})

beforeAll(() => {
    new PrismaClient()
})

describe('GET /games', () => {
    it ('should return 200 and an array of games', async () => {})
})

describe ('GET /games/:id', () => {
    it ('should return 200 and a specific game', async () => {})

    it ('should return 404 if the game does not exist', async () => {})
})

describe('POST /games', () => {
    it ('should return 201 when body is fine', async () => {})

    it ('should return 409 when game name already exists', async () => {})
})