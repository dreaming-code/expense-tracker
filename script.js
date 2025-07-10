// 🌐 Global transactions array
const transactions = [];

// 📆 Set today's date on page load
window.addEventListener("DOMContentLoaded", () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("myDate").value = today;
  document.getElementById("realCalendar").value = today;
  const stored = JSON.parse(localStorage.getItem("transactions")) || [];
  transactions.push(...stored);
  updateRow2(today);
  renderTransactionsByMonth(today);
});

// 📌 Calculator Functions
function appendValue(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function removeValue() {
  const display = document.getElementById("display");
  display.value = display.value.slice(0, -1);
}

function calculateResult() {
  try {
    const result = eval(document.getElementById("display").value);
    document.getElementById("display").value = result;
  } catch {
    document.getElementById("display").value = "Error";
  }
}

// 🧠 Handle category selection
const images = document.querySelectorAll(".editing1 img");
let selectedCategory = null;
images.forEach((imageEl) => {
  imageEl.addEventListener("click", () => {
    const container = imageEl.closest(".editing1");
    const name = container.querySelector(".nameimage").innerText;
    const imgsrc = imageEl.getAttribute("src");
    selectedCategory = { name, imgsrc };

    document.querySelector(".calc").classList.remove("hide");
    document.querySelector(".bottom-nav").classList.add("hide");
  });
});

// 🔄 Hide calculator on cancel
document.querySelector(".op").addEventListener("click", () => {
  document.querySelector(".calc").classList.add("hide");
});

// 👤 Toggle profile edit
document.querySelector(".edit1").addEventListener("click", () => {
  document.querySelectorAll(".edinside").forEach((input) => {
     input.removeAttribute("readonly");
  });
});
document.querySelector(".edit7").addEventListener("click", () => {
  document.querySelectorAll(".edinside").forEach((input) => {
     input.setAttribute("readonly", true);
  });
});
// 🔁 Switch between expense/income categories
document.querySelector(".l14").addEventListener("click", () => {
  document.querySelector(".main3").classList.remove("hide");
  document.querySelector(".l13").classList.remove("ll34");
  document.querySelector(".l14").classList.add("ll34");
  document.querySelector(".main2").classList.add("hide");
});

document.querySelector(".l13").addEventListener("click", () => {
  document.querySelector(".main2").classList.remove("hide");
  document.querySelector(".l14").classList.remove("ll34");
  document.querySelector(".l13").classList.add("ll34");
  document.querySelector(".main3").classList.add("hide");
});

// 📆 Show calendar picker on icon click
document.getElementById("calendarIcon").addEventListener("click", () => {
  const calendar = document.getElementById("realCalendar");
  calendar.showPicker?.();
  calendar.click();
});

// 📌 Submit value from calculator
function SubmitValue() {
  calculateResult();

  const note = document.getElementById("note").value.trim();
  const amount = parseFloat(document.getElementById("display").value);
  const date = document.getElementById("dates").value;

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount.");
    return;
  }

  if (!date || !selectedCategory) {
    alert("Please choose a date and category.");
    return;
  }

  const isIncome = ["Salary", "Investments", "Bonus", "Part-Time"].includes(selectedCategory.name);
  const type = isIncome ? "income" : "expense";

  // Save transaction
  transactions.push({
    type,
    amount,
    date,
    category: selectedCategory.name,
    img: selectedCategory.imgsrc,
    note: note || selectedCategory.name
  });

  // Update UI
  renderTransactionsByMonth(document.getElementById("myDate").value);
  updateRow2(document.getElementById("myDate").value);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  // Reset
  selectedCategory = null;
  document.getElementById("note").value = "";
  document.getElementById("display").value = "";
  document.querySelector(".calc").classList.add("hide");
 
  document.querySelector("#fp").classList.remove("hide");
  document.querySelector(".bottom-nav").classList.remove("hide");
  document.querySelector("#edit").classList.add("hide");
}

// 🧮 Update expense/income/balance in row2
function updateRow2(selectedDate) {
  const selectedMonth = new Date(selectedDate).getMonth();
  const selectedYear = new Date(selectedDate).getFullYear();

  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (d.getMonth() === selectedMonth && d.getFullYear() === selectedYear) {
      if (t.type === "income") income += t.amount;
      else if (t.type === "expense") expense += t.amount;
    }
  });

  document.getElementById("exp").textContent = expense;
  document.getElementById("inc").textContent = income;
  document.getElementById("bal").textContent = income - expense;
}

// 📅 Update data shown in the expense container based on selected month
function renderTransactionsByMonth(selectedDate) {
  const container = document.getElementById("expenseContainer");
  container.innerHTML = ""; // clear previous records

  const selectedMonth = new Date(selectedDate).getMonth();
  const selectedYear = new Date(selectedDate).getFullYear();

  const grouped = {};

  transactions.forEach((t) => {
    const d = new Date(t.date);
    if (d.getMonth() === selectedMonth && d.getFullYear() === selectedYear) {
      const formatted = d.toDateString();
      if (!grouped[formatted]) grouped[formatted] = [];
      grouped[formatted].push(t);
    }
  });

  for (const date in grouped) {
    const section = document.createElement("div");
    section.setAttribute("data-date", date);
    section.innerHTML = `<h3>📅 ${date}</h3><ul></ul>`;

    const ul = section.querySelector("ul");

    grouped[date].forEach((t) => {
      const li = document.createElement("li");
      const prefix = t.type === "income" ? "+" : "-";
      li.innerHTML = `<img src="${t.img}" style="width:20px; vertical-align:middle; margin-right:6px;">
                      ${t.note}: ${prefix}₹${t.amount}`;
      ul.appendChild(li);
    });

    container.appendChild(section);
  }

  if (Object.keys(grouped).length === 0) {
    document.querySelector(".default").classList.remove("hide");
  }
}

// ⏱ When month changes, update data
document.getElementById("myDate").addEventListener("change", function () {
  const selected = this.value;
  updateRow2(selected);
  renderTransactionsByMonth(selected);
});


//for hiding
document.querySelector(".b").addEventListener("click",function(){
document.querySelector("#signup").classList.remove("hide");
document.querySelector(".startpage").classList.add("hide");
});

document.querySelector("#q1").addEventListener("click",function(){
document.querySelector("#login").classList.remove("hide");
document.querySelector(".startpage").classList.add("hide");
});

document.getElementById("formsubbut").addEventListener("click",function(){
  const userName=document.getElementById("username").value;
  const em=document.getElementById("email").value;
  const password=document.getElementById("pass").value;
  const confirm=document.getElementById("confirm").value;
  if(userName==""|| em=="" || password=="" || confirm=="")
    {
      alert("Fill the details completely");
      return;}
  if(!(password===confirm))
  {
    alert("Passwords do not match");
    return;
  }
  if (localStorage.getItem(userName)) {
  alert("Username already exists. Choose another one.");
  return;
  }
    document.getElementById("nme1").value=`${userName}`;
    document.getElementById("nme2").value=`${em}`;
    document.getElementById("fp").classList.remove("hide");
    document.querySelector(".bottom-nav").classList.remove("hide");
    document.getElementById("signup").classList.add("hide");
    localStorage.setItem(userName, password);
  })

document.getElementById("formsubbut2").addEventListener("click",function(){
  const userName=document.getElementById("username1").value;
  const password=document.getElementById("passw").value;
  if(userName==""|| password=="")
   {
 alert("Fill the details completely");
 return;
   }
   const storedPassword = localStorage.getItem(userName);
if (storedPassword !== password) {
  alert("Invalid username or password");
  return;
}
    document.getElementById("nme1").value=`${userName}`;
  
  document.getElementById("fp").classList.remove("hide");
  document.querySelector(".bottom-nav").classList.remove("hide");
  document.getElementById("login").classList.add("hide");
});

document.querySelector("#bnp").addEventListener("click",function(){
document.querySelector(".qwer").classList.remove("hide");
document.querySelector("#fp").classList.add("hide");
document.querySelector("#chart").classList.add("hide"); 
 document.getElementById("budgetReportSection").classList.add("hide");
});

document.querySelector("#bnrec").addEventListener("click",function(){
document.querySelector("#fp").classList.remove("hide");
document.querySelector(".qwer").classList.add("hide");
document.querySelector("#chart").classList.add("hide"); 
document.getElementById("budgetReportSection").classList.add("hide");
 document.getElementById("budgetReportSection").classList.add("hide");
});

document.querySelector("#bne").addEventListener("click",function(){
document.querySelector("#edit").classList.remove("hide");
document.querySelector(".qwer").classList.add("hide");
document.querySelector("#fp").classList.add("hide");
document.querySelector("#chart").classList.add("hide"); 
 document.getElementById("budgetReportSection").classList.add("hide");
});

document.querySelector(".op").addEventListener("click",function(){
document.querySelector("#edit").classList.add("hide");
document.querySelector(".calc").classList.add("hide");
document.querySelector(".qwer").classList.add("hide");
document.querySelector("#fp").classList.remove("hide");
document.querySelector(".bottom-nav").classList.remove("hide");
document.querySelector("#chart").classList.add("hide"); 
 document.getElementById("budgetReportSection").classList.add("hide");
});

//updating charts
// 📊 Chart setup
let chartInstance = null;
const ctx = document.getElementById("summaryChart").getContext("2d");

function generateChart(data, labels) {
  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [
          "#4caf50", "#f44336", "#2196f3", "#ff9800",
          "#9c27b0", "#00bcd4", "#ffc107", "#e91e63"
        ]
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false }
      }
    }
  });
}

// 📆 Populate year or month
function populateTimeScroll(type) {
  const scrollSelect = document.getElementById("scrollSelect");
  scrollSelect.innerHTML = "";

  const unique = new Set();
  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = type === "month"
      ? `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`
      : d.getFullYear().toString();
    unique.add(key);
  });

  [...unique].sort().forEach(timeKey => {
    const div = document.createElement("div");
    div.className = "scroll-option";
    div.textContent = type === "month"
      ? `${timeKey.split("-")[1]}/${timeKey.split("-")[0]}`
      : timeKey;

    div.dataset.key = timeKey;
    div.addEventListener("click", () => {
      document.querySelectorAll(".scroll-option").forEach(el => el.classList.remove("active"));
      div.classList.add("active");
      updateChart();
    });

    scrollSelect.appendChild(div);
  });
}

// 🔄 Chart update
function updateChart() {
  const dataType = document.getElementById("dataType").value;
  const viewType = document.getElementById("viewType").value;
  const activeKey = document.querySelector(".scroll-option.active")?.dataset.key;

  if (!activeKey) return;

  const filtered = {};
  transactions.forEach(t => {
    if (t.type !== dataType) return;
    const d = new Date(t.date);
    const key = viewType === "month"
      ? `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}`
      : d.getFullYear().toString();

    if (key !== activeKey) return;
    if (!filtered[t.category]) filtered[t.category] = 0;
    filtered[t.category] += t.amount;
  });

  const labels = Object.keys(filtered);
  const values = Object.values(filtered);

  generateChart(values, labels);
  updateLegend(filtered);
}

function updateLegend(data) {
  const legend = document.getElementById("summaryLegend");
  legend.innerHTML = "";

  Object.entries(data).forEach(([label, value], index) => {
    const color = chartInstance?.data.datasets[0].backgroundColor[index % 8];
    const item = document.createElement("div");
    item.className = "legend-item";

    item.innerHTML = `
      <div class="legend-left">
        <div class="legend-color" style="background:${color}"></div>
        <strong>${label}</strong>
      </div>
      <div>₹${value}</div>
    `;

    legend.appendChild(item);
  });
}

// 🎯 Event Listeners
document.getElementById("dataType").addEventListener("change", () => updateChart());
document.getElementById("viewType").addEventListener("change", function () {
  populateTimeScroll(this.value);
  setTimeout(() => document.querySelector(".scroll-option")?.click(), 100);
});

// 🧿 Show chart when nav clicked
document.getElementById("bnc").addEventListener("click", () => {
  document.querySelector("#chart").classList.remove("hide");
  document.querySelector("#fp").classList.add("hide"); // front page hide
  document.querySelector("#edit").classList.add("hide"); //edit section hide
  document.querySelector(".qwer").classList.add("hide"); //profile hide
  document.getElementById("budgetReportSection").classList.add("hide"); // hiding report

  const viewType = document.getElementById("viewType").value;
  populateTimeScroll(viewType);

  setTimeout(() => document.querySelector(".scroll-option")?.click(), 100);
});


//updating report
// 🌐 Budget Report Section
const budgetReportScroll = document.getElementById("budgetReportScroll");
const reportViewType = document.getElementById("reportViewType");
const reportBudgetInput = document.getElementById("reportBudgetInput");
const reportChartCanvas = document.getElementById("budgetReportChart");
const reportCenterText = document.getElementById("budgetReportCenterText");
const generateReportBtn = document.getElementById("generateBudgetReportBtn");
const reportLegend = document.getElementById("budgetReportLegend");

let budgetReportChartInstance = null;
const budgetReportCtx = reportChartCanvas.getContext("2d");

// 🗓 Scroll for month/year
function populateBudgetReportScroll(viewType) {
  budgetReportScroll.innerHTML = "";
  const uniqueKeys = new Set();

  transactions.forEach(t => {
    const d = new Date(t.date);
    const key = viewType === "month"
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      : `${d.getFullYear()}`;
    uniqueKeys.add(key);
  });

  [...uniqueKeys].sort().forEach(key => {
    const div = document.createElement("div");
    div.className = "scroll-option";
    div.dataset.key = key;
    div.textContent = viewType === "month"
      ? `${key.split("-")[1]}/${key.split("-")[0]}`
      : key;

    div.addEventListener("click", () => {
      document.querySelectorAll("#budgetReportScroll .scroll-option").forEach(el => el.classList.remove("active"));
      div.classList.add("active");
    });

    budgetReportScroll.appendChild(div);
  });
}

// 🧠 Chart logic
function drawBudgetReportChart(budget, totalExpense) {
  if (budgetReportChartInstance) budgetReportChartInstance.destroy();

  budget = (!budget || isNaN(budget) || budget < 0) ? 100 : budget;
  totalExpense = (!totalExpense || isNaN(totalExpense)) ? 0 : totalExpense;

  const remaining = Math.max(0, budget - totalExpense);
  const exceeded = totalExpense > budget;

  if (exceeded) {
    reportCenterText.textContent = "Exceeded";
    reportCenterText.style.color = "red";

    budgetReportChartInstance = new Chart(budgetReportCtx, {
      type: "doughnut",
      data: {
        labels: ["Exceeded"],
        datasets: [{
          data: [1],
          backgroundColor: ["#bbb"]
        }]
      },
      options: {
        cutout: "70%",
        plugins: { legend: { display: false } }
      }
    });
  } else {
    reportCenterText.textContent = "";
    reportCenterText.style.color = "#333";

    budgetReportChartInstance = new Chart(budgetReportCtx, {
      type: "doughnut",
      data: {
        labels: ["Expense", "Remaining"],
        datasets: [{
          data: [totalExpense, remaining],
          backgroundColor: ["#f44336", "#4caf50"]
        }]
      },
      options: {
        cutout: "70%",
        plugins: { legend: { display: false } }
      }
    });
  }

  updateBudgetReportLegend({
    "Budget": budget,
    "Expense": totalExpense,
    "Remaining": remaining
  });
}

// 🧾 Custom legend
function updateBudgetReportLegend(data) {
  reportLegend.innerHTML = "";
  const colors = budgetReportChartInstance.data.datasets[0].backgroundColor;

  Object.entries(data).forEach(([label, value], i) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `
      <div class="legend-left">
        <div class="legend-color" style="background:${colors[i % colors.length]}"></div>
        <strong>${label}</strong>
      </div>
      <div>₹${value}</div>
    `;
    reportLegend.appendChild(item);
  });
}

// 🎯 Generate chart on button click
function generateBudgetReportChart() {
  const activeKey = document.querySelector("#budgetReportScroll .scroll-option.active")?.dataset.key;
  const viewType = reportViewType.value;
  const budget = parseFloat(reportBudgetInput.value);

  if (!activeKey) return alert("Select a month or year.");

  let totalExpense = 0;
  transactions.forEach(t => {
    if (t.type !== "expense") return;
    const d = new Date(t.date);
    const key = viewType === "month"
      ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
      : `${d.getFullYear()}`;

    if (key === activeKey) totalExpense += t.amount;
  });

  drawBudgetReportChart(budget, totalExpense);
}

// 🧠 Auto-select current month or year
function autoSelectCurrentReportPeriod() {
  const today = new Date();
  const monthKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
  const yearKey = `${today.getFullYear()}`;
  const view = reportViewType.value;
  const keyToSelect = view === "month" ? monthKey : yearKey;

  const match = [...document.querySelectorAll("#budgetReportScroll .scroll-option")]
    .find(el => el.dataset.key === keyToSelect);

  if (match) {
    match.click();
  } else {
    document.querySelector("#budgetReportScroll .scroll-option")?.click();
  }
}

// 🔄 Event listeners
reportViewType.addEventListener("change", () => {
  populateBudgetReportScroll(reportViewType.value);
  setTimeout(autoSelectCurrentReportPeriod, 100);
});

generateReportBtn.addEventListener("click", generateBudgetReportChart);
// 🧿 Open report section on nav click
document.getElementById("bnr").addEventListener("click", () => {
  document.getElementById("budgetReportSection").classList.remove("hide");
  document.getElementById("fp").classList.add("hide");
  document.getElementById("edit").classList.add("hide");
  document.getElementById("chart").classList.add("hide");
  document.querySelector(".qwer")?.classList.add("hide");

  if (!reportBudgetInput.value) reportBudgetInput.value = 100;

  populateBudgetReportScroll(reportViewType.value);
  setTimeout(autoSelectCurrentReportPeriod, 100);
});
