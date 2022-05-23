const cepInput = document.querySelector('[data-cep]');
const loader = document.querySelector('[data-loader]');
const inputs = document.querySelectorAll('[data-input]');
const btnEnviar = document.querySelector('[data-btn]');

// ativa e desativa o loading
function toggleLoad() {
  loader.classList.toggle('load');
}

//  Verifica se o CEP está formatado corretamente
function validate(cep) {
  const matchCEP = cep.match(/[0-9]{5}[-. ]?[0-9]{3}/g);
  return (matchCEP && matchCEP[0] === cep);
}

//  Caso não esteja, será mostrado na tela inválido
function notValid() {
  inputs.forEach((input) => {
    input.value = 'Cep Inválido';
    cepInput.value = 'Cep Inválido';

    input.style.color = 'gray';
    cepInput.style.color = 'gray';

    cepInput.style.border = '2px solid red';
  });

  //  Após 3s o aviso será limpado da tela
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
    //  Remove todos os - . espaços e não digitos do valor de cep
    cepValue = cepValue.replace(/[-. \D]/g, '');

    //  Formata o cep digitado na tela
    cepInput.value = cepValue;

    // Validação começa
    if (validate(cepValue)) {
      const cep = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`);
      const cepJSON = await cep.json();
      toggleLoad();

      //  Altera os endereços de acordo com o cep
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
      // Se não for um cep válido, ativa notValid
    }
  }

  catch {
    notValid();
  }

  // loader desativodo no final para evitar loading infinito em certas ocasiões
  loader.classList.remove('load');
}

//  previne que o formulário seja resetado quando clica no botão
function btnPreventDefault(event) {
  event.preventDefault();
  this.addEventListener('click', updateInfo);
}

cepInput.addEventListener('change', updateInfo);
btnEnviar.addEventListener('click', btnPreventDefault);
