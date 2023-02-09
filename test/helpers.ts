import prisma from "config/database";

export async function cleanDB(){
    await prisma.console.deleteMany();
    await prisma.game.deleteMany();
}