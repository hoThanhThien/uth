function createInputFields() {
    const numCourses = document.getElementById('numCourses').value;
    const inputFields = document.getElementById('inputFields');
    inputFields.innerHTML = '';

    for (let i = 0; i < numCourses; i++) {
        inputFields.innerHTML += `
            <div>
                <label for="course${i}">Môn ${i + 1}:</label>
                <input type="number" id="credits${i}" placeholder="Số tín chỉ" required>
                <input type="float" id="grade${i}" placeholder="Điểm" required>
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

        totalCredits += credits;
        totalPoints += credits * grade;
    }

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

    document.getElementById('result').innerText = `Điểm trung bình tích lũy: ${roundedGpa.toFixed(2)}\nXếp loại: ${classification}`;
});
