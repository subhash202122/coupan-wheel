const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");

// Object that stores values of minimum and maximum angle for a value
const rotationValues = [
  { minDegree: 0, maxDegree: 30, value: "Try again" },
  { minDegree: 31, maxDegree: 90, value: "10% off" },
  { minDegree: 91, maxDegree: 150, value: "20% off" },
  { minDegree: 151, maxDegree: 210, value: "30% off" },
  { minDegree: 211, maxDegree: 270, value: "40% off" },
  { minDegree: 271, maxDegree: 330, value: "50% off" },
  { minDegree: 331, maxDegree: 360, value: "60% off" },
];

// Size of each piece
const data = [16, 16, 16, 16, 16, 16];

// Background color for each piece
const pieColors = ["#FF0000", "#FF5555", "#FFAAAA", "#FFCCCC", "#FF6666", "#FF8888"];

// Create chart
const myChart = new Chart(wheel, {
  plugins: [ChartDataLabels],
  type: "pie",
  data: {
    labels: ["Try Again", "10% off", "20% off", "30% off", "40% off", "50% off", "60% off"],
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      tooltip: false,
      legend: {
        display: false,
      },
      datalabels: {
        color: "#FFFFFF",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});

// Display value based on the randomAngle
const valueGenerator = (angleValue) => {
  if (angleValue >= rotationValues[0].minDegree && angleValue <= rotationValues[0].maxDegree) {
    finalValue.innerHTML = `<p style="color: #FF0000;">Value: ${rotationValues[0].value}</p>`;
    spinBtn.disabled = false;
    return;
  }

  for (let i = 1; i < rotationValues.length; i++) {
    if (angleValue >= rotationValues[i].minDegree && angleValue <= rotationValues[i].maxDegree) {
      finalValue.innerHTML = `<p style="color: #0000FF;">Value: ${rotationValues[i].value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

// Spinner count
let count = 0;
let isFirstSpin = true;
// 100 rotations for animation and last rotation for result
let resultValue = 101;

// Start spinning
spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;
  finalValue.innerHTML = "";

  // Generate random degrees to stop at
  const randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);

  // Interval for rotation animation
  const rotationInterval = setInterval(() => {
    myChart.options.rotation = myChart.options.rotation + resultValue;
    myChart.update();

    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation === randomDegree) {
      if (isFirstSpin) {
        valueGenerator(randomDegree);
        isFirstSpin = false;
      } else {
        const valueIndex = Math.floor(Math.random() * (rotationValues.length - 1) + 1);
        valueGenerator(randomDegree);
      }
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
