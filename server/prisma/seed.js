const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function main() {
  // Seed designations
  const designations = await prisma.designation.createMany({
    data: [
      { name: "Software Developer" },
      { name: "Data Engineer" },
      { name: "HR" },
      { name: "Sales Executive" },
      { name: "IT Specialist" },
      { name: "Customer Support" },
      { name: "Project Manager" },
      { name: "Financial Analyst" },
    ],
  });

  // Seed skills
  const skills = await prisma.skill.createMany({
    data: [
      { name: "JavaScript" },
      { name: "Python" },
      { name: "SQL" },
      { name: "Data Analysis" },
      { name: "Project Management" },
      { name: "Communication" },
      { name: "Technical Support" },
      { name: "Machine Learning" },
    ],
  });

  // Seed courses
  const courses = await prisma.course.createMany({
    data: [
      {
        title: "Introduction to JavaScript",
        url: "http://example.com/js-course",
        shortIntro: "Learn the basics of JavaScript.",
        difficulty: "Beginner",
        language: "English",
        totalTime: 30,
        totalModules: 5,
      },
      {
        title: "Data Science with Python",
        url: "http://example.com/python-course",
        shortIntro: "Become a data scientist with Python.",
        difficulty: "Intermediate",
        language: "English",
        totalTime: 40,
        totalModules: 6,
      },
      {
        title: "Project Management Fundamentals",
        url: "http://example.com/pm-course",
        shortIntro: "Learn essential project management skills.",
        difficulty: "Beginner",
        language: "English",
        totalTime: 20,
        totalModules: 4,
      },
    ],
  });

  // Seed courseSkills
  await prisma.courseSkill.createMany({
    data: [
      { courseId: 1, skillId: 1, level: "Intermediate" }, // Introduction to JavaScript - JavaScript
      { courseId: 2, skillId: 2, level: "Advanced" }, // Data Science with Python - Python
      { courseId: 3, skillId: 5, level: "Intermediate" }, // Project Management Fundamentals - Project Management
      { courseId: 1, skillId: 4, level: "Beginner" }, // Introduction to JavaScript - Data Analysis
    ],
  });

  // Seed designationSkills
  await prisma.designationSkill.createMany({
    data: [
      { designationId: 1, skillId: 1 }, // Software Developer - JavaScript
      { designationId: 2, skillId: 2 }, // Data Engineer - Python
      { designationId: 3, skillId: 6 }, // HR - Communication
      { designationId: 4, skillId: 5 }, // Sales Executive - Project Management
      { designationId: 7, skillId: 4 }, // Project Manager - Data Analysis
      { designationId: 5, skillId: 7 }, // IT Specialist - Technical Support
    ],
  });

  // Seed admin user
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const bcryptPassword = await bcrypt.hash("1245", salt);

  await prisma.user.create({
    data: {
      username: "lara",
      email: "lara@g.co",
      role: "admin",
      designationId: 3,
      gender: "Female",
      phoneNumber: "9874563210",
      passwordHash: bcryptPassword,
    },
  });

  console.log("Seeding complete");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error seeding data:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

// npx prisma db seed
