var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var passwordformat = /^-?\d{1,3}\.\d{4}$/;

var intentosrestantes = 3;

const verificacion = {
  mail: "",
  password: "",
};

const fetchUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return await response.json();
};

const getUserByUsernameAndPassword = async (verificacion) => {
  const users = await fetchUsers();
  const userFound = users.find(
    (user) =>
      user.email === verificacion?.mail &&
      user.address.geo.lat === verificacion?.password
  );
  return !!userFound;
};

function Verificaruser() {
  var mail = document.getElementById("mail");
  var ErrorUser = document.getElementById("ErrorUser");
  if (mailformat.test(mail.value)) {
    mail.classList.remove("inputincorrecto");
    mail.classList.add("inputcorrecto");
    ErrorUser.innerHTML = "";
    verificacion.mail = mail.value;
  } else {
    mail.classList.remove("inputcorrecto");
    mail.classList.add("inputincorrecto");
    ErrorUser.innerHTML = "El usuario debe ser un mail válido.";
  }
}

function Verificarpass() {
  var password = document.getElementById("password");
  var errorpass = document.getElementById("ErrorPass");
  if (passwordformat.test(password.value)) {
    password.classList.remove("inputincorrecto");
    password.classList.add("inputcorrecto");
    errorpass.innerHTML = "";
    verificacion.password = password.value;
  } else {
    password.classList.remove("inputcorrecto");
    password.classList.add("inputincorrecto");
    errorpass.innerHTML =
      "La contraseña debe ser un número con formato `-XXX.XXXX`";
  }
}

async function VerifForm() {
  var formulario = document.getElementById("formulario");
  var InfoSubmit = document.getElementById("InfoSubmit");

  const isLoggedIn = await getUserByUsernameAndPassword(verificacion);

  if (isLoggedIn) {
    InfoSubmit.classList.add("showOK");
    if (InfoSubmit.classList.contains("showBanned")) {
      InfoSubmit.classList.remove("showBanned");
    }
    InfoSubmit.innerHTML =
      "Bienvenido. Será redirigido a otra página en 3, 2, 1 ...";

    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 3000);
  } else {
    intentosrestantes -= 1;
    if (intentosrestantes <= 0) {
      formulario.innerHTML =
        "<div class='block text-red-500'>Se ha bloqueado la cuenta</div>";
    } else {
      InfoSubmit.classList.add("showBanned");
      InfoSubmit.innerHTML = `Usuario o contraseña incorrectos. Le quedan ${intentosrestantes} intento(s).`;
    }
  }
}
