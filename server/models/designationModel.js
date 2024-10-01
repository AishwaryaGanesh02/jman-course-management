const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const DesignationModel = {
    getAll: async () => {
        return await prisma.designation.findMany();
    },
};

module.exports = DesignationModel;
