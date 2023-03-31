const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let intervalId = null;

  return (seconds) => {
    clearInterval(intervalId);
    
    let remainingTime = seconds;
    //функция обновления таймера
    const updateTimer = () => { 
    //уменьшаем на еденицу значение в секундах
    remainingTime--;
    //получаем целое значение часов
    let hours = Math.floor(remainingTime / 3600);
    //получаем целое значение минут
    let minutes = Math.floor(remainingTime / 60) - (hours * 60);
    let seconds = remainingTime % 60;
      //выводим таймер в формате “hh:mm:ss”
      timerEl.innerHTML = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');
      //по окончанию времени таймера выводим сообщение
      if (remainingTime == 0) {
        clearInterval(intervalId);
        timerEl.innerHTML = "Time is over!"
      }
    };
    
    //каждый шаг интервала запускаем функцию обновления таймера
    updateTimer();
    //создаём интервал длительностью в одну секунду
    intervalId = setInterval(updateTimer, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении оставались только числа
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

//Обработчик клика по кнопке
buttonEl.addEventListener('click', () => {
  //Проверяем отсутствие значения в input
  if (Number(inputEl.value) == 0) {
  //если пусто, предлагаем установить значение
    timerEl.innerHTML = "Set timer in seconds first!"
  } else {
  // иначе, запускаем таймер
  const seconds = Number(inputEl.value);

  animateTimer(seconds);
  //очищаем значение input
  inputEl.value = '';
}
});
