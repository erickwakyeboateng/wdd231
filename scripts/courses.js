const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Intro to Programming",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: false,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: false,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    completed: false,
  },
];

const courseList = document.querySelector("#course-list");
const totalCreditsDisplay = document.querySelector("#total-credits");

function renderCourses(filter = "All") {
  courseList.innerHTML = "";

  const filtered =
    filter === "All"
      ? courses
      : courses.filter((course) => course.subject === filter);

  filtered.forEach((course) => {
    const div = document.createElement("div");
    div.className = `course-card ${course.completed ? "completed" : ""}`;
    div.innerHTML = `<span>${course.subject} ${course.number}</span>`;
    courseList.appendChild(div);
  });

  const total = filtered.reduce((sum, course) => sum + course.credits, 0);
  totalCreditsDisplay.textContent = `Total Credits: ${total}`;
}

document
  .querySelector("#all")
  .addEventListener("click", () => renderCourses("All"));
document
  .querySelector("#cse")
  .addEventListener("click", () => renderCourses("CSE"));
document
  .querySelector("#wdd")
  .addEventListener("click", () => renderCourses("WDD"));

renderCourses();
