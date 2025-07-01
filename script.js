const questions = [
  {
    q: "Tui tỏ tình bé vào ngày nào thế nhỉ?",
    a: "31/05/25",
    choices: ["31/04/25", "31/05/25", "31/02/25", "31/06/25"],
    info: "sai thế nào được!"
  },
  {
    q: "Địa điểm đầu tiên chúng mình gặp riêng với nhau là ở đâu?",
    a: "City Law School Private Library",
    choices: ["St James's Park", "British Museum", "National Gallery", "City Law School Private Library"],
    info: "NÀY, GẶP RIÊNG LẦN ĐẦU TIÊN THÌ LÀ Ở THƯ VIỆN LAW, KHÔNG PHẢI BRITISH MUSEUM!"
  },
  {
    q: "Bé nhớ bài nào của CAS mà bé gợi ý đầu tiên để tui up story lúc ở trên cầu ngắm Bigben sau khi ăn Eat Tokyo không :>?",
    a: "Nothing's Gonna Hurt You Baby",
    choices: ["Stop Waiting", "Cry", "Apocalypse", "Nothing's Gonna Hurt You Baby"],
    info: "HAHAHA! dễ sai lắm, đoán đúng được cũng tài đấy chứ bộ"
  },
  {
    q: "Mỗi vé của The Phantom of the Opera trị giá bao nhiêu?",
    a: "£78",
    choices: ["£79", "£80", "£75", "£78"],
    info: "Khó đần rồi nhen bé iu <3"
  },
  {
    q: "Lần đầu tiên hai đứa gặp nhau nhưng đối nghịch cảm xúc là vào ngày bao nhiêu?",
    a: "12/01/25",
    choices: ["09/01/25", "10/01/25", "11/01/25", "12/01/25"],
    info: "Bé có Spring Week PWC, tui thì mới biết trượt SVUK :(. Nhưng tui tự hào về bé lắm!"
  },
  {
    q: "Lần đầu tiên tụi mình nấu rùi ăn ở nhà bé là vào ngày bao nhiêu?",
    a: "20/01/25",
    choices: ["21/01/25", "22/01/25", "23/01/25", "20/01/25"],
    info: "Trí nhớ siêu phàm! Có thể check lại locket tui nếu muốn, nhưng bé xóa locket rồi còn đâu hơ hơ"
  },
  {
    q: "Tên loài hoa tui tặng bé vào mùng 8 tháng 3 là gì?",
    a: "Daisy",
    choices: ["Rose", "Tulip", "Lily of the valley", "Daisy"],
    info: "Daisy đóa bé iu. Mà bé xinh đẹp hơn thế nhèo!"
  },
  {
    q: "Một công viên mình định đi nhưng chưa có dịp vì bé vìa VN intern?",
    a: "Richmond Park",
    choices: ["Victoria Park", "Greenwich Park", "The Regent's Park ", "Richmond Park"],
    info: "Qua đây rùi đi nhé bé iu!"
  },
  {
    q: "Bé nhớ tui rủ bé đi làm gì khi về Việt Nam khum?",
    a: "Tất cả đáp án trên",
    choices: ["Từ thiện", "Tennis", "Cầu lông", "Tất cả đáp án trên"],
    info: "LÀM HẾTTTTT!"
  },
  {
    q: "Bé sẽ cùng tui bước tiếp chặng đường sắp tới chứ?",
    a: "Tất cả đáp án trên",
    choices: ["CÓ CHỨUU", "YESSS", "CHẮC CHẮNNN", "Tất cả đáp án trên"],
    info: "Yêu bé <3"
  }
];

let current = 0;
let attempts = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  document.getElementById("intro-screen").style.display = "none";
  document.getElementById("question-box").style.display = "block";
  const music = document.getElementById("bg-music");
  if (music) music.play();
  loadQuestion();
}

function loadQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.q;
  document.getElementById("choices").innerHTML = "";
  document.getElementById("feedback").textContent = "";
  const shuffled = [...q.choices];
  shuffle(shuffled);
  shuffled.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.className = "choice-btn";
    btn.onclick = () => submitAnswer(choice);
    document.getElementById("choices").appendChild(btn);
  });
}

function submitAnswer(selected) {
  const q = questions[current];
  if (selected === q.a) {
    attempts = 0;
    showInfo(q.info);
  } else {
    attempts++;
    if (attempts >= 2) {
      alert("Sai 2 lần òi 😢 Bắt đầu lại từ đầu nha bé iu!");
      current = 0;
      attempts = 0;
      showScreen("intro-screen");
    } else {
      document.getElementById("feedback").textContent = "Sai òi 😅 Thử lại thêm 1 lần nữa nhé!";
    }
  }
}

function showInfo(info) {
  document.getElementById("question-box").style.display = "none";
  document.getElementById("info-message").textContent = info;
  document.getElementById("affirmation-screen").style.display = "block";
}

function nextQuestion() {
  current++;
  if (current >= questions.length) {
    showScreen("final-message");
  } else {
    showScreen("question-box");
    loadQuestion();
  }
}

function showScreen(id) {
  ["intro-screen", "question-box", "affirmation-screen", "final-message"].forEach(e => {
    document.getElementById(e).style.display = "none";
  });
  document.getElementById(id).style.display = "block";

  if (id === "final-message") {
    launchConfetti();
  }
}

function launchConfetti() {
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
}
