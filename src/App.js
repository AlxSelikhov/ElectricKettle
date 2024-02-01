import React, { useState, useEffect } from 'react';

// Класс описывающий электрический чайник
function ElectricKettle() {
  const [isOn, setIsOn] = useState(false); // Состояние включения чайника
  const [waterLevel, setWaterLevel] = useState(0); // Уровень воды в чайнике (от 0 до 1)
  const [temperature, setTemperature] = useState(0); // Текущая температура в чайнике
  const boilingTime = 10; // Время закипания в секундах

  // Функция для включения чайника
  const turnOn = () => {
    setIsOn(true);
    console.log("Чайник включен");
  };

  // Функция для выключения чайника
  const turnOff = () => {
    setIsOn(false);
    console.log("Чайник выключен");
  };

  // Эффект для имитации работы чайника
  useEffect(() => {
    let intervalId;
    if (isOn) {
      // Включаем чайник
      console.log("Вода начала кипеть...");
      intervalId = setInterval(() => {
        setTemperature((prevTemperature) => {
          // Увеличиваем температуру каждую секунду
          const newTemperature = prevTemperature + (100 / boilingTime);
          if (newTemperature >= 100) {
            // Если достигнута максимальная температура, завершаем закипание
            clearInterval(intervalId);
            console.log("Вода вскипела!");
            setTemperature(0); // Обнуляем температуру
            setIsOn(false); // Автоматически выключаем чайник при достижении 100 градусов
            setWaterLevel(0); // Обнуляем уровень воды
          }
          return newTemperature;
        });
      }, 1000);
    } else {
      // Выключаем чайник
      console.log("Закипание остановлено");
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId); // Очищаем интервал при размонтировании компонента или при изменении isOn
  }, [isOn]);

  // Функция для изменения уровня воды
  const handleWaterLevelChange = (event) => {
    const newWaterLevel = parseFloat(event.target.value);
    setWaterLevel(newWaterLevel);
  };

  return (
    <div>
      <h1>Электрический чайник</h1>
      <p>Уровень воды: {waterLevel.toFixed(2)}</p>
      {waterLevel === 0 && <p>Налейте воду</p>}
      {isOn && <p>Текущая температура: {temperature.toFixed(2)}°C</p>}
      <input
        type="number"
        step="1"
        min="0"
        max="1"
        value={waterLevel}
        onChange={handleWaterLevelChange}
      />
      <button onClick={turnOn} disabled={isOn || waterLevel === 0}>
        Включить
      </button>
      <button onClick={turnOff} disabled={!isOn}>
        Выключить
      </button>
    </div>
  );
}

export default ElectricKettle;
