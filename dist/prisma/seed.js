"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function seed() {
    async function generatePasswordHash(plainPassword) {
        const salt = await (0, bcrypt_1.genSalt)(10);
        return (0, bcrypt_1.hash)(plainPassword, salt);
    }
    await prisma.role.createMany({
        data: [
            {
                name: 'Admin',
            },
            {
                name: 'PowerUser',
            },
            {
                name: 'User',
            },
        ],
    });
    const userRole = await prisma.role.findFirst({
        where: {
            name: 'User',
        },
    });
    const userRoleId = userRole.id;
    const users = await Promise.all(Array.from({ length: 1000 }).map(async () => ({
        name: faker_1.faker.person.fullName(),
        email: faker_1.faker.internet.email(),
        roleId: userRoleId,
        password: await generatePasswordHash('pass@123'),
    })));
    await prisma.user.createMany({
        data: users,
    });
    console.log('Database seeding completed!');
}
seed()
    .catch((err) => {
    console.log('Seed Error: ', err);
    process.exit(1);
})
    .finally(() => {
    prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map