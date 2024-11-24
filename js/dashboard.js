let coincidenceName = [];
const resultsTableBody = document.getElementById("resultsTableBody");
const lastSearched = document.getElementById("lastSearched");

const findName = (queryName) => {
  return Promise.allSettled([
    fetch(`https://api.genderize.io/?name=${queryName}`).then((response) =>
      response.json()
    ),
    fetch(`https://api.nationalize.io/?name=${queryName}`).then((response) =>
      response.json()
    ),
  ]);
};

const getCountryName = async (code) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
  if (!response.ok) {
    throw new Error("Country not found");
  }
  const data = await response.json();
  return data[0]?.name?.common || "Unknown country";
};

const searchName = async () => {
  const queryName = document.getElementById("queryName").value.trim();

  if (!queryName) {
    alert("Por favor, ingresa un nombre");
    return;
  }

  const findedName = await findName(queryName);

  const genderData =
    findedName[0].status === "fulfilled" ? findedName[0].value : {};
  const countryData =
    findedName[1].status === "fulfilled" ? findedName[1].value : {};

  const newEntry = {
    name: genderData.name || queryName,
    count: genderData.count || "unknown",
    gender: genderData.gender || "unknown",
    probability: genderData.probability
      ? (genderData.probability * 100).toFixed(2) + "%"
      : "unknown",
    countries: countryData.country
      ? countryData.country
          .map(
            (c) =>
              `<span 
                  class="cursor-pointer underline text-blue-500"
                  onmouseover="showTooltip(event, '${c.country_id}')">
                  ${c.country_id}
               </span> (${(c.probability * 100).toFixed(2)}%)`
          )
          .join(", ")
      : "No data",
  };

  coincidenceName.push(newEntry);
  renderTable();

  localStorage.setItem("savedResult", JSON.stringify(newEntry));

  const getLastSearched = JSON.parse(localStorage.getItem("savedResult"));
  if (getLastSearched) {
    lastSearched.innerHTML += `<span class="p-2 bg-gray-900 text-white rounded-lg">${getLastSearched.name}</span>`;
  }
};

const renderTable = () => {
  resultsTableBody.innerHTML = coincidenceName
    .map(
      (coincidence, index) => `
        <tr class="${
          index % 2 === 0 ? "bg-gray-100" : "bg-white"
        } hover:bg-gray-200 transition-colors">
          <td class="p-4 font-semibold border-b-2 border-gray-300">${
            coincidence.name
          }</td>
          <td class="p-4 border-b-2 border-gray-300">${coincidence.count}</td>
          <td class="p-4 border-b-2 border-gray-300 capitalize">${
            coincidence.gender
          }</td>
          <td class="p-4 border-b-2 border-gray-300">${
            coincidence.probability
          }</td>
          <td class="p-4 border-b-2 border-gray-300">${
            coincidence.countries
          }</td>
        </tr>`
    )
    .join("");
};

const showTooltip = async (event, code) => {
  try {
    const countryName = await getCountryName(code);

    const tooltip = document.createElement("div");
    tooltip.className = "tooltip absolute bg-black text-white p-2 rounded";
    tooltip.style.top = `${event.clientY + 10}px`;
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.textContent = countryName;

    document.body.appendChild(tooltip);

    event.target.addEventListener("mouseleave", () => {
      tooltip.remove();
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
  }
};
