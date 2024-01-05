import { format } from "date-fns";

const weatherApp = document.getElementById("weatherApp");
const weatherOutput = weatherApp.querySelector(".weatherOutput");
const date = weatherOutput.querySelector(".date");

export default function updateDate() {
  const today = new Date();
  date.textContent = format(today, "eeee, MM/dd/yyyy");
  setTimeout(updateDate, 1000);
}
