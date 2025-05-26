// Jawaban benar untuk semua soal
const jawabanBenar = {
    soal1: { value: 'c', text: 'Mengobrol untuk dapat informasi' },
    soal2: { value: 'a', text: 'Ilustrasi' },
    soal3: { value: 'b', text: 'Mengikuti aturan' },
    soal4: { value: 'd', text: 'Bertanya pada teman' },
    soal5: { value: 'a', text: 'Mengumumkan sesuatu' },
    soal6: { value: 'c', text: 'Kalimat singkat' },
    soal7: { value: 'c', text: 'Gambar dan tulisan' },
    soal8: { value: 'a', text: 'Mendengarkan' },
    soal9: { value: 'b', text: 'Keamanan dan kebenaran' },
    soal10: { value: 'd', text: 'Membaca peta' },
    soal11: { value: 'c', text: 'Mengoreksi' },
    soal12: { value: 'b', text: 'Membaca dan mencatat' },
    soal13: { value: 'a', text: 'Jelas dan sopan' },
    soal14: { value: 'c', text: 'Tempat umum' },
    soal15: { value: 'd', text: 'Menggambar' },
    soal16: { values: ['salam', 'halo', 'assalamu\'alaikum'], text: 'Salam, Halo, atau Assalamu\'alaikum' },
    soal17: { values: ['gambar', 'foto', 'video'], text: 'Gambar, Foto, atau Video' },
    soal18: { values: ['bertanya'], text: 'Bertanya' },
    soal19: { values: ['ayo beli buku baru di toko kami'], text: 'Contoh: Ayo beli buku baru di toko kami!' },
    soal20: { values: ['dinding', 'papan pengumuman', 'sekolah'], text: 'Dinding, Papan pengumuman, atau Sekolah' }
};

let skor = 0;
const totalSoal = 20;
const answeredQuestions = new Set();

// Check multiple-choice answers
function checkAnswer(soalNum, selectedValue) {
    const soalDiv = document.getElementById(`soal${soalNum}`);
    const feedbackDiv = document.getElementById(`feedback${soalNum}`);
    const radios = document.getElementsByName(`soal${soalNum}`);

    // Prevent re-answering
    if (answeredQuestions.has(soalNum)) {
        console.log(`Soal ${soalNum} sudah dijawab.`);
        return;
    }

    answeredQuestions.add(soalNum);
    console.log(`Menjawab soal ${soalNum} dengan nilai ${selectedValue}`);

    // Disable all radio buttons for this question
    radios.forEach(radio => radio.disabled = true);

    if (selectedValue === jawabanBenar[`soal${soalNum}`].value) {
        feedbackDiv.classList.add('correct');
        feedbackDiv.textContent = 'Benar!';
        skor++;
        console.log(`Soal ${soalNum} benar. Skor: ${skor}`);
    } else {
        feedbackDiv.classList.add('incorrect');
        feedbackDiv.textContent = `Salah! Jawaban yang benar adalah: ${jawabanBenar[`soal${soalNum}`].text}`;
        soalDiv.classList.add('incorrect');
        console.log(`Soal ${soalNum} salah. Jawaban benar: ${jawabanBenar[`soal${soalNum}`].text}`);
    }
}

// Check fill-in answers
function checkTextAnswer(soalNum) {
    const input = document.getElementById(`input${soalNum}`);
    const feedbackDiv = document.getElementById(`feedback${soalNum}`);
    const soalDiv = document.getElementById(`soal${soalNum}`);

    // Prevent re-answering
    if (answeredQuestions.has(soalNum)) {
        console.log(`Soal ${soalNum} sudah dijawab.`);
        return;
    }

    answeredQuestions.add(soalNum);
    console.log(`Menjawab soal ${soalNum} dengan nilai ${input.value}`);

    // Disable the input field
    input.disabled = true;

    const jawaban = input.value.trim().toLowerCase();
    const correctAnswers = jawabanBenar[`soal${soalNum}`].values;
    const isCorrect = correctAnswers.includes(jawaban);

    if (isCorrect) {
        feedbackDiv.classList.add('correct');
        feedbackDiv.textContent = 'Benar!';
        skor++;
        console.log(`Soal ${soalNum} benar. Skor: ${skor}`);
    } else {
        feedbackDiv.classList.add('incorrect');
        feedbackDiv.textContent = `Salah! Jawaban yang benar adalah: ${jawabanBenar[`soal${soalNum}`].text}`;
        soalDiv.classList.add('incorrect');
        console.log(`Soal ${soalNum} salah. Jawaban benar: ${jawabanBenar[`soal${soalNum}`].text}`);
    }
}

// Show final result in modal
document.getElementById('selesai').addEventListener('click', function() {
    const salah = totalSoal - skor;
    const nilai = Math.round((skor / totalSoal) * 100);
    const hasil = `Nilai: ${nilai}/100<br>Benar: ${skor}<br>Salah: ${salah}`;
    document.getElementById('hasil').innerHTML = hasil;

    // Show modal
    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
    console.log(`Menampilkan modal. Nilai: ${nilai}, Benar: ${skor}, Salah: ${salah}`);

    // Share to WhatsApp (Universal Link)
    const pesan = encodeURIComponent(`Hasil Latihan Soal Bahasa Indonesia\nNilai: ${nilai}/100\nBenar: ${skor}, Salah: ${salah}`);
    document.getElementById('shareWa').onclick = function() {
        const linkWa = `https://api.whatsapp.com/send?text=${pesan}`;
        window.open(linkWa, '_blank');
        console.log('Membuka link WhatsApp');
    };

    // Close modal
    document.getElementById('closeModal').onclick = function() {
        modal.style.display = 'none';
        console.log('Menutup modal');
    };
});