const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UserModel = {
    createUser: async (data) => {
        return await prisma.user.create({ data });

    },
    findUserByEmail: async (email) => {
        return await prisma.user.findUnique({ where: { email } });
    },
};

module.exports = UserModel;
