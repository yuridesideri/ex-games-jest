import prisma from "config/database";
import { faker } from '@faker-js/faker';


export async function createGame(consoleId : number) {
    const game = await prisma.game.create({
        data: {
        title: faker.random.word(),
        Console: {
            connect: {
            id: consoleId,
            },
        },
        },
    });
    return game;
}