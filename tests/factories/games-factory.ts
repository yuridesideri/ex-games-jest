import prisma from "config/database";
import { faker } from '@faker-js/faker';
import { createConsole } from "./consoles-factory";


export async function createGame(title?: string, consoleId?: number) {
    const game = await prisma.game.create({
        data: {
        title: title || faker.random.word(),
        Console: {
            connect: {
            id: consoleId ||  (await createConsole()).id,
            },
        },
        },
    });
    return game;
}