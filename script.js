document.addEventListener('DOMContentLoaded', () => {
  const colors = ['red', 'green', 'blue', 'yellow'];
  let sequence = [];
  let userSequence = [];
  let canClick = false;

  const buttons = document.querySelectorAll('.btn');
  const startBtn = document.getElementById('start');

  // 色名と対応ボタンのMap
  const buttonMap = {
    red: document.querySelector('.btn.red'),
    green: document.querySelector('.btn.green'),
    blue: document.querySelector('.btn.blue'),
    yellow: document.querySelector('.btn.yellow'),
  };

  // イベント設定
  startBtn.addEventListener('click', startGame);
  buttons.forEach(btn => btn.addEventListener('click', handleClick));

  function startGame() {
    sequence = [];
    userSequence = [];
    nextStep();
  }

  function nextStep() {
    canClick = false;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(nextColor);
    userSequence = [];
    playSequence();
  }

  function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
      const color = sequence[i];
      flashColor(color);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => { canClick = true; }, 700);
      }
    }, 1000); // ここを1000msにしてゆっくり光らせる
  }

  function flashColor(color) {
    const button = buttonMap[color];
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 400);
  }

  function handleClick(e) {
    if (!canClick) return;
    const color = e.target.dataset.color;
    flashColor(color); // ユーザー操作にも光るエフェクト
    userSequence.push(color);

    const index = userSequence.length - 1;
    if (userSequence[index] !== sequence[index]) {
      alert('間違えた！ゲームオーバー');
      canClick = false;
      return;
    }

    if (userSequence.length === sequence.length) {
      canClick = false;
      setTimeout(nextStep, 1000);
    }
  }
});
