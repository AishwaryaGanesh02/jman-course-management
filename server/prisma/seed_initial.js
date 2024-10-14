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
      { courseId: 1, skillId: 4, level: "Beginner" }, // Introduction to JavaScript - Data Analysis
      { courseId: 1, skillId: 6, level: "Beginner" }, // Introduction to JavaScript - Communication
      { courseId: 2, skillId: 2, level: "Advanced" }, // Data Science with Python - Python
      { courseId: 2, skillId: 3, level: "Intermediate" }, // Data Science with Python - SQL
      { courseId: 2, skillId: 8, level: "Intermediate" }, // Data Science with Python - HTML/CSS
      { courseId: 3, skillId: 5, level: "Intermediate" }, // Project Management Fundamentals - Project Management
      { courseId: 3, skillId: 6, level: "Beginner" }, // Project Management Fundamentals - Communication
      { courseId: 3, skillId: 10, level: "Intermediate" }, // Project Management Fundamentals - Agile Methodologies
      { courseId: 4, skillId: 1, level: "Advanced" }, // Advanced JavaScript Concepts - JavaScript
      { courseId: 4, skillId: 2, level: "Intermediate" }, // Advanced JavaScript Concepts - Python
      { courseId: 4, skillId: 3, level: "Intermediate" }, // Advanced JavaScript Concepts - SQL
      { courseId: 5, skillId: 3, level: "Intermediate" }, // Building Web Applications with React - SQL
      { courseId: 5, skillId: 1, level: "Intermediate" }, // Building Web Applications with React - JavaScript
      { courseId: 5, skillId: 4, level: "Beginner" }, // Building Web Applications with React - Data Analysis
      { courseId: 6, skillId: 3, level: "Intermediate" }, // Database Management with SQL - SQL
      { courseId: 6, skillId: 5, level: "Intermediate" }, // Database Management with SQL - Project Management
      { courseId: 6, skillId: 10, level: "Intermediate" }, // Database Management with SQL - Data Analysis
      { courseId: 7, skillId: 8, level: "Beginner" }, // Introduction to HTML & CSS - HTML & CSS
      { courseId: 7, skillId: 1, level: "Beginner" }, // Introduction to HTML & CSS - JavaScript
      { courseId: 7, skillId: 4, level: "Beginner" }, // Introduction to HTML & CSS - Data Analysis
      { courseId: 8, skillId: 2, level: "Intermediate" }, // Python for Data Analysis - Python
      { courseId: 8, skillId: 3, level: "Intermediate" }, // Python for Data Analysis - SQL
      { courseId: 8, skillId: 4, level: "Intermediate" }, // Python for Data Analysis - Data Analysis
      { courseId: 9, skillId: 4, level: "Advanced" }, // Mastering Django for Web Development - Data Analysis
      { courseId: 9, skillId: 2, level: "Intermediate" }, // Mastering Django for Web Development - Python
      { courseId: 9, skillId: 1, level: "Intermediate" }, // Mastering Django for Web Development - JavaScript
      { courseId: 10, skillId: 4, level: "Intermediate" }, // Data Visualization Techniques - Data Analysis
      { courseId: 10, skillId: 2, level: "Intermediate" }, // Data Visualization Techniques - Python
      { courseId: 10, skillId: 11, level: "Beginner" }, // Data Visualization Techniques - Cloud Computing
      { courseId: 11, skillId: 6, level: "Beginner" }, // Introduction to Cloud Computing - Communication
      { courseId: 11, skillId: 10, level: "Beginner" }, // Introduction to Cloud Computing - Agile Methodologies
      { courseId: 11, skillId: 3, level: "Beginner" }, // Introduction to Cloud Computing - SQL
      { courseId: 12, skillId: 7, level: "Beginner" }, // Fundamentals of Cybersecurity - Technical Support
      { courseId: 12, skillId: 8, level: "Beginner" }, // Fundamentals of Cybersecurity - HTML/CSS
      { courseId: 12, skillId: 6, level: "Beginner" }, // Fundamentals of Cybersecurity - Communication
      { courseId: 13, skillId: 8, level: "Beginner" }, // SEO for Beginners - SEO
      { courseId: 13, skillId: 1, level: "Beginner" }, // SEO for Beginners - JavaScript
      { courseId: 13, skillId: 6, level: "Beginner" }, // SEO for Beginners - Communication
      { courseId: 14, skillId: 2, level: "Advanced" }, // Advanced Data Analysis with Python - Python
      { courseId: 14, skillId: 3, level: "Intermediate" }, // Advanced Data Analysis with Python - SQL
      { courseId: 14, skillId: 4, level: "Intermediate" }, // Advanced Data Analysis with Python - Data Analysis
      { courseId: 15, skillId: 5, level: "Advanced" }, // Complete Guide to Project Management - Project Management
      { courseId: 15, skillId: 10, level: "Intermediate" }, // Complete Guide to Project Management - Agile Methodologies
      { courseId: 15, skillId: 11, level: "Beginner" }, // Complete Guide to Project Management - Cloud Computing
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
