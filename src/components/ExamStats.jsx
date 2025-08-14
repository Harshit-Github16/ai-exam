export default function ExamStats() {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-3">Exam Stats</h3>
      <ul className="space-y-2">
        <li>Total Exams: <strong>12</strong></li>
        <li>Best Score: <strong>95%</strong></li>
        <li>Last Week Avg: <strong>88%</strong></li>
      </ul>
    </div>
  );
}
