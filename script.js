document.addEventListener('DOMContentLoaded', () => {
  const colors = ['red', 'green', 'blue', 'yellow'];
  let sequence = [];
  let userSequence = [];
  let canClick = false;

  const buttons = document.querySelectorAll('.btn');
  const startBtn = document.getElementById('start');

  // ボタンマップ作成
  const buttonMap = {};
  colors.forEach(color => {
    buttonMap[color] = document.querySelector(`.btn.${color}`);
  });

  // ログで確認（不要なら削除OK）
  console.log('buttonMap:', buttonMap);

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
    console.log('sequence:', sequence); // ← 確認用
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
        setTimeout(() => { canClick = true; }, 500);
      }
    }, 800); // 間隔調整
  }

  function flashColor(color) {
    console.log('flashColor:', color); // ← 確認用
    const button = buttonMap[color];
    if (!button) {
      console.error(`ボタンが見つかりません: ${color}`);
      return;
    }
    button.classList.add('active');
    setTimeout(() => {
      button.classList.remove('active');
    }, 400);
  }

  function handleClick(e) {
    if (!canClick) return;

    const color = e.target.dataset.color;
    flashColor(color); // ユーザー操作でも光らせる
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
