const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const bcrypt = require("bcrypt");

async function main() {
  await clearData(); // Clear existing data before seeding
  await seedDesignations(); // Seed Designations first
  await seedSkills();
  await seedCourses();
  await seedUsers(); // Seed Users after Designations
  await seedEmployeeProgress();
  await seedUserSkills();
  await seedDesignationSkills();
  await seedCourseSkills();
  console.log("Seeding completed!");
}

// Function to clear existing data
async function clearData() {
  await prisma.courseSkill.deleteMany({});
  await prisma.designationSkill.deleteMany({});
  await prisma.userSkill.deleteMany({});
  await prisma.employeeProgress.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.course.deleteMany({});
  await prisma.designation.deleteMany({});
}

// Function to parse CSV files
function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
}

// Seeding functions
async function seedDesignations() {
  const designations = await parseCSV(
    path.join(__dirname, "..", "..", "data", "creation", "designations.csv")
  );
  for (const row of designations) {
    await prisma.designation.create({
      data: {
        name: row.name,
      },
    });
  }
}

async function seedCourses() {
  const courses = await parseCSV(
    path.join(__dirname, "..", "..", "data", "creation", "courses.csv")
  );
  for (const row of courses) {
    await prisma.course.create({
      data: {
        title: row.title,
        url: row.url,
        shortIntro: row.shortIntro,
        difficulty: row.difficulty,
        language: row.language,
        totalTime: parseInt(row.totalTime, 10),
        totalModules: parseInt(row.totalModules, 10),
        createdAt: new Date(row.createdAt),
        updatedAt: new Date(row.updatedAt),
      },
    });
  }
}

async function seedSkills() {
  const skills = await parseCSV(
    path.join(__dirname, "..", "..", "data", "generator", "skills.csv")
  );
  for (const row of skills) {
    await prisma.skill.create({
      data: {
        name: row.skills,
      },
    });
  }
}

async function seedUsers() {
  const users = await parseCSV(
    path.join(__dirname, "..", "..", "data", "creation", "users.csv")
  );
  const designations = await prisma.designation.findMany(); // Fetch all designations
  const designationIds = designations.map((d) => d.id); // Get an array of valid designation IDs

  for (const row of users) {
    try {
      const designationId = row.designationId
        ? parseInt(row.designationId, 10)
        : null;

      // Check if designationId is valid
      if (designationId && !designationIds.includes(designationId)) {
        console.error(
          `Invalid designationId ${designationId} for user ${row.username}. Skipping...`
        );
        continue; // Skip to the next user
      }
      // Hash the new password "1245" for each user
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const bcryptPassword = await bcrypt.hash("1245", salt);

      await prisma.user.create({
        data: {
          username: row.username,
          passwordHash: bcryptPassword, // Use the new hashed password
          email: row.email,
          gender: row.gender,
          role: row.role,
          designationId: designationId,
          phoneNumber: row.phoneNumber,
          createdAt: new Date(row.createdAt),
          updatedAt: new Date(row.updatedAt),
        },
      });
    } catch (error) {
      console.error(`Error inserting user ${row.username}: ${error.message}`);
    }
  }
}

async function seedEmployeeProgress() {
  const progress = await parseCSV(
    path.join(
      __dirname,
      "..",
      "..",
      "data",
      "creation",
      "employee_progress.csv"
    )
  );
  for (const row of progress) {
    await prisma.employeeProgress.create({
      data: {
        userId: parseInt(row.userId, 10),
        courseId: parseInt(row.courseId, 10),
        progressStatus: row.progressStatus,
        lastUpdated: new Date(row.lastUpdated),
        modulesCompleted: parseInt(row.modulesCompleted, 10),
        certificateProof: row.certificateProof,
      },
    });
  }
}

async function seedUserSkills() {
  const userSkills = await parseCSV(
    path.join(__dirname, "..", "..", "data", "creation", "user_skills.csv")
  );
  for (const row of userSkills) {
    await prisma.userSkill.create({
      data: {
        userId: parseInt(row.userId, 10),
        skillId: parseInt(row.skillId, 10),
        level: row.level,
      },
    });
  }
}

async function seedDesignationSkills() {
  const designationSkills = await parseCSV(
    path.join(
      __dirname,
      "..",
      "..",
      "data",
      "creation",
      "designation_skills.csv"
    )
  );
  for (const row of designationSkills) {
    await prisma.designationSkill.create({
      data: {
        designationId: parseInt(row.designationId, 10),
        skillId: parseInt(row.skillId, 10),
      },
    });
  }
}

async function seedCourseSkills() {
  const courseSkills = await parseCSV(
    path.join(__dirname, "..", "..", "data", "creation", "course_skills.csv")
  );
  for (const row of courseSkills) {
    await prisma.courseSkill.create({
      data: {
        courseId: parseInt(row.courseId, 10),
        skillId: parseInt(row.skillId, 10),
        level: row.level,
      },
    });
  }
}

// Execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
