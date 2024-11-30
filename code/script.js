function createInputFields() {
    const numCourses = document.getElementById('numCourses').value;
    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML = ''; // Xóa các trường cũ

    for (let i = 0; i < numCourses; i++) {
        inputFields.innerHTML += `
            <div>
                <label for="course${i}">Môn ${i + 1}:</label>
                <input type="number" id="credits${i}" min="1" placeholder="Số tín chỉ" required>
               <input type="number" step="0.01" id="grade${i}" min="0" max="4" placeholder="Điểm (0 - 4)" required>
            </div>
        `;
    }
}
document.getElementById('gpaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const numCourses = document.getElementById('numCourses').value;
    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < numCourses; i++) {
        const credits = parseFloat(document.getElementById(`credits${i}`).value);
        const grade = parseFloat(document.getElementById(`grade${i}`).value);

        // Kiểm tra tính hợp lệ
        if (isNaN(credits) || credits <= 0) {
            alert(`Số tín chỉ của Môn ${i + 1} phải lớn hơn 0.`);
            return;
        }
        if (isNaN(grade) || grade < 0 || grade > 4) {
            alert(`Điểm của Môn ${i + 1} phải trong khoảng từ 0 đến 4.`);
            return;
        }

        totalCredits += credits;
        totalPoints += credits * grade;
    }

    // Tính GPA
    const gpa = totalPoints / totalCredits;
    const roundedGpa = Math.round(gpa * 100) / 100;
    let classification = '';

    if (roundedGpa >= 3.6) {
        classification = 'Xuất sắc';
    } else if (roundedGpa >= 3.2) {
        classification = 'Giỏi';
    } else if (roundedGpa >= 2.5) {
        classification = 'Khá';
    } else if (roundedGpa >= 2.0) {
        classification = 'Trung bình';
    } else {
        classification = 'Yếu';
    }

    // Hiển thị kết quả
    document.getElementById('result').innerText = `Điểm trung bình tích lũy: ${roundedGpa.toFixed(2)}\nXếp loại: ${classification}`;
});
