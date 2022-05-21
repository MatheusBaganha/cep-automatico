const cepInput = document.querySelector('[data-cep]')
async function updateInfo() {
    const cepValue = cepInput.value;
    
    const cep = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
    const cepJSON = await cep.json();

    let bairroInput = document.querySelector('[data-bairro]');
    bairroInput.value = cepJSON.bairro;
    let logradouroInput = document.querySelector('[data-logradouro]');
    logradouroInput.value = cepJSON.logradouro;
    let estadoInput = document.querySelector('[data-estado]');
    estadoInput.value = cepJSON.localidade;
    console.log(estadoInput)

    
}

cepInput.addEventListener('change', updateInfo);