document.addEventListener("DOMContentLoaded", function () {
  const newAvailabilityButton = document.getElementById("newAvailabilityButton");
  const saveAvailabilityButton = document.getElementById("saveAvailabilityButton");
  const cancelAvailabilityButton = document.getElementById("cancelAvailabilityButton");
  const newAvailabilityModal = document.getElementById("newAvailabilityModal");
  const availabilityDateInput = document.getElementById("availabilityDate");
  const availabilityTimeInput = document.getElementById("availabilityTime");
  const calendar = document.getElementById("calendar");
  const prevMonthButton = document.getElementById("prevMonthButton");
  const nextMonthButton = document.getElementById("nextMonthButton");
  const currentMonthElement = document.getElementById("currentMonth");
  const SeeNewAvailabilityButton = document.getElementById("SeeNewAvailabilityButton")

  let availabilities = [];
  let currentDate = new Date();

  // Atualizar o calendário inicialmente
  updateCalendar();

  // Mostrar o modal para adicionar nova disponibilidade
  newAvailabilityButton.addEventListener("click", function () {
      newAvailabilityModal.style.display = "block";
  });

  // Ocultar o modal de nova disponibilidade
  cancelAvailabilityButton.addEventListener("click", function () {
      newAvailabilityModal.style.display = "none";
  });

  // Salvar nova disponibilidade
  // saveAvailabilityButton.addEventListener("click", function () {
  //     const date = availabilityDateInput.value;
  //     const time = availabilityTimeInput.value;

  //     if (date && time) {
  //         availabilities.push({ date, time });
  //         updateCalendar();
  //         newAvailabilityModal.style.display = "none";
  //     }
  // });

  SeeNewAvailabilityButton.addEventListener("click", () => {
      
  })


  // Navegar para o mês anterior
  prevMonthButton.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() - 1);
      updateCalendar();
  });

  // Navegar para o próximo mês
  nextMonthButton.addEventListener("click", function () {
      currentDate.setMonth(currentDate.getMonth() + 1);
      updateCalendar();
  });

  function updateCalendar() {
      // Limpar o conteúdo do calendário
      calendar.innerHTML = "";

      // Crie um contêiner para o calendário
      const calendarContainer = document.createElement("div");
      calendarContainer.id = "calendarContainer";

      // Adicionar cabeçalho do calendário
      const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      weekdays.forEach(function (weekday) {
          const dayElement = document.createElement("div");
          dayElement.classList.add("day");
          dayElement.textContent = weekday;
          calendarContainer.appendChild(dayElement);
      });

      // Atualizar o nome do mês atual
      const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
      currentMonthElement.textContent = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

      // Obter o primeiro e o último dia do mês
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const daysInMonth = lastDayOfMonth.getDate();
      const firstDayIndex = firstDayOfMonth.getDay();

      // Preencher os dias vazios antes do primeiro dia do mês
      for (let i = 0; i < firstDayIndex; i++) {
          const emptyElement = document.createElement("div");
          emptyElement.classList.add("day", "empty");
          calendarContainer.appendChild(emptyElement);
      }

      // Preencher os dias do mês
      for (let day = 1; day <= daysInMonth; day++) {
          const dayElement = document.createElement("div");
          dayElement.classList.add("day");
          dayElement.textContent = day;

          const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

          // Verificar se o dia está disponível
          availabilities.forEach(function (availability) {
              const availabilityDate = new Date(availability.date + "T00:00:00");
              if (dayDate.toISOString().slice(0, 10) === availabilityDate.toISOString().slice(0, 10)) {
                  const formattedTime = formatTime(availability.time);
                  dayElement.innerHTML += `<br>${formattedTime}`;
                  dayElement.classList.add("availability");
              }
          });

          calendarContainer.appendChild(dayElement);
      }

      // Substituir o conteúdo atual do calendário pelo novo calendário
      calendar.innerHTML = "";
      calendar.appendChild(calendarContainer);
  }

  function formatTime(time) {
      const [hours, minutes] = time.split(":");
      const formattedMinutes = minutes.padStart(2, '0'); // Adicionando um zero à esquerda, se necessário
      return `${hours}:${formattedMinutes}`;
  }

});
  

async function createAppointment(event) {
  event.preventDefault();

  let dia = document.getElementById("dia").value;
  let hora = document.getElementById("hora").value;

  const data = {
    dia,
    hora
  }

  const response = await fetch("http://localhost:3002/api/store/appointment", {
    method: "POST",
    headers: {
      'Content-Type':'application/json' 
    },
    body: JSON.stringify(data)
  });

  let result = await response.json();  
  
  if(result.success) {
    alert(result.message);
  } else {
    alert("Algo deu errado!");
  }
}