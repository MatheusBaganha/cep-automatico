const cepInput = document.querySelector('[data-cep]');
const loader = document.querySelector('[data-loader]');
const inputs = document.querySelectorAll('[data-input]');
const btnEnviar = document.querySelector('[data-btn]');

function toggleLoad() {
  loader.classList.toggle('load');
}

function validate(cep) {
  const matchCEP = cep.match(/[0-9]{5}[-. ]?[0-9]{3}/g);
  return (matchCEP && matchCEP[0] === cep);
}

function notValid() {
  inputs.forEach((input) => {
    input.value = 'Cep Inválido';
    cepInput.value = 'Cep Inválido';

    input.style.color = 'gray';
    cepInput.style.color = 'gray';

    cepInput.style.border = '2px solid red';
  });

  setTimeout(() => {
    inputs.forEach((input) => {
      input.value = '';
      cepInput.value = '';
      cepInput.style.border = '';
      cepInput.style.color = '';
    });
  }, 3000);
}

async function updateInfo() {
  try {
    toggleLoad();

    inputs.forEach((input) => {
      input.style.color = '#131313';
    });

    let cepValue = cepInput.value;
    cepValue = cepValue.replace(/[-. \D]/g, '');
    cepInput.value = cepValue;
    if (validate(cepValue)) {
      const cep = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const cepJSON = await cep.json();
      toggleLoad();
      const logradouroInput = document.querySelector('[data-logradouro]');
      logradouroInput.value = cepJSON.logradouro;

      const cidadeInput = document.querySelector('[data-cidade]');
      cidadeInput.value = cepJSON.localidade;

      const ufInput = document.querySelector('[data-uf]');
      ufInput.value = cepJSON.uf;

      const bairroInput = document.querySelector('[data-bairro]');
      bairroInput.value = cepJSON.bairro;
    } else {
      notValid();
    }
  }

  catch {
    notValid();
  }

  loader.classList.remove('load');
}

function btnPreventDefault(event) {
  event.preventDefault();
  this.addEventListener('click', updateInfo);
}

cepInput.addEventListener('change', updateInfo);
btnEnviar.addEventListener('click', btnPreventDefault);
