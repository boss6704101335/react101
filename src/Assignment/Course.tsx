// Course.tsx
import { useState } from "react";

type Course = {
  name: string;
  grade: string;
};

function GradeList() {
  const [course, setCourse] = useState<string>(""); // เก็บชื่อวิชา
  const [grade, setGrade] = useState<string>("A"); // เก็บเกรด
  const [courses, setCourses] = useState<Course[]>([]); // รายวิชาทั้งหมด
  const [gpa, setGpa] = useState<number | null>(null); // ค่า GPA

  const addCourse = () => {
    if (course.trim() === "") return;
    setCourses([...courses, { name: course, grade }]);
    setCourse("");
    setGrade("A");
  };

  const deleteCourse = (index: number) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const gradeToPoint = (g: string): number => {
    switch (g) {
      case "A": return 4.0;
      case "B+": return 3.5;
      case "B": return 3.0;
      case "C+": return 2.5;
      case "C": return 2.0;
      case "D+": return 1.5;
      case "D": return 1.0;
      case "F": return 0.0;
      case "W": return NaN; // ถอน ไม่นับ
      default: return 0;
    }
  };

  const calculateGPA = () => {
    const validCourses = courses.filter(c => c.grade !== "W");
    if (validCourses.length === 0) {
      setGpa(0);
      return;
    }
    const totalPoints = validCourses.reduce(
      (sum, c) => sum + gradeToPoint(c.grade),
      0
    );
    setGpa(totalPoints / validCourses.length);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>My Course</h1>

      {/* Input + Select */}
      <input
        type="text"
        placeholder="รายชื่อวิชา"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />
      <select value={grade} onChange={(e) => setGrade(e.target.value)}>
        <option value="A">A</option>
        <option value="B+">B+</option>
        <option value="B">B</option>
        <option value="C+">C+</option>
        <option value="C">C</option>
        <option value="D+">D+</option>
        <option value="D">D</option>
        <option value="F">F</option>
        <option value="W">W</option>
      </select>
      <button onClick={addCourse}>เพิ่มรายวิชา</button>

      {/* แสดงรายวิชา */}
      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {courses.map((c, index) => (
          <li key={index} style={{ margin: "5px 0" }}>
            <span style={{ color: c.grade === "F" ? "red" : "black" }}>
              {c.name} - {c.grade}
            </span>
            <button
              onClick={() => deleteCourse(index)}
              style={{ marginLeft: 10, color: "red" }}
            >
              ลบ
            </button>
          </li>
        ))}
      </ul>

      {/* ปุ่มคำนวณ GPA */}
      <button onClick={calculateGPA} style={{ marginTop: 10 }}>
        คำนวณ GPA
      </button>

      {/* แสดงผล GPA */}
      {gpa !== null && (
        <h2 style={{ marginTop: 20 }}>GPA: {gpa.toFixed(2)}</h2>
      )}
    </div>
  );
}

export default GradeList;
