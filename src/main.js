let meuGrafico;
 
const contas = [];
 
function adicionarConta() {
  const nomeConta = document.getElementById('nomeConta').value;
  const valorConta = parseFloat(document.getElementById('valorConta').value);
  const tipoConta = document.getElementById('tipoConta').value;
 
  if (!nomeConta || isNaN(valorConta) || valorConta <= 0 || !tipoConta || tipoConta == 'formaPagamento'){
    alert('Por favor, insira um nome de conta válido e um valor positivo.');
    return;
  }
 
  contas.push({ nome: nomeConta, valor: valorConta, tipo: tipoConta, salario: valorSalario});
  atualizarListaContas();
  document.getElementById('nomeConta').value = '';
  document.getElementById('valorConta').value = '';
  document.getElementById('tipoConta').value = 'formaPagamento';
}
    
function atualizarListasAuxiliares() {
  contasNome = contas.map(function (conta) {
    return conta.nome + ' (' + conta.tipo + ')';
  });
  contasValor = contas.map(function (conta) {
    return conta.valor;
  });
}

function atualizarListaContas() {
  const valorSalario = parseFloat(document.getElementById('valorSalario').value);
  const totalContas = contas.reduce((total, conta) => total + conta.valor, 0);
    
  if (totalContas >= valorSalario * 0.8 && totalContas <= valorSalario) {
    alert('O seu total de contas está tomando 80% do seu salário, cuidado!');
  } else if (valorSalario < totalContas) {
    alert('O total de contas excede o valor do seu salário');
  }

  atualizarListasAuxiliares();
    
  const listaContas = document.getElementById('listaContas');
  listaContas.innerHTML = '';
    
  contas.forEach((conta, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${conta.nome}: R$ ${conta.valor} (${conta.tipo})`;
    
    // Criando o ícone de lápis para edição
    const editIcon = document.createElement('ion-icon');
    editIcon.setAttribute('name', 'create-outline'); // Define o ícone de lápis
    editIcon.style.cursor = 'pointer';
    editIcon.style.marginLeft = '10px'; // Adicione algum espaço entre o texto e o ícone
    editIcon.addEventListener('click', () => {
      // Função de edição que você precisa implementar
      editarConta(index);
    });
    
    // Criando o ícone de X para remoção
    const deleteIcon = document.createElement('ion-icon');
    deleteIcon.setAttribute('name', 'close-circle-outline'); // Define o ícone de X
    deleteIcon.style.cursor = 'pointer';
    deleteIcon.style.marginLeft = '10px'; // Adicione algum espaço entre os ícones
    deleteIcon.addEventListener('click', () => {
    // Função de remoção que você precisa implementar
      removerConta(index);
    });
    
    // Adicionando os ícones ao listItem
    listItem.appendChild(editIcon);
    listItem.appendChild(deleteIcon);
    
    listaContas.appendChild(listItem);
  });
      
  alert('Lista alterada com sucesso');
  analiseContas();
  criarGrafico();
}
    
// Função para editar a conta (você precisa implementar)
function editarConta(index) {
  const conta = contas[index];
  const novoNome = prompt('Digite o novo nome para a conta:', conta.nome);
  if (novoNome !== null && novoNome.trim() !== '') {
    const novoValor = prompt('Digite o novo valor para a conta:', conta.valor);
    if (novoValor !== null && !isNaN(parseFloat(novoValor))) {
      conta.nome = novoNome;
      conta.valor = parseFloat(novoValor);
      atualizarListaContas();
      criarGrafico();
      analiseContas();
    } else {
      alert('Valor inválido. Por favor, digite um número.');
    }
  } else {
    alert('Nome inválido. Por favor, digite um nome válido.');
  }
}

// Função para remover a conta
function removerConta(index) {
  contas.splice(index, 1);
      atualizarListaContas();
      criarGrafico();
      analiseContas();
}
    
function analiseContas() {
  const valorSalario = parseFloat(document.getElementById('valorSalario').value);
  const totalContas = contas.reduce((total, conta) => total + conta.valor, 0);
  const porcentagem = ((totalContas * 100) / valorSalario).toFixed(2);
  document.getElementById('porcentagem').textContent = `As contas (R$ ${totalContas}) representam ${porcentagem}% do seu salário.`;
}

// Inicializando as listas auxiliares
let contasNome = [];
let contasValor = [];

function criarGrafico() {
   
  const ctx = document.getElementById('myChart').getContext('2d');
   
  if (meuGrafico) {
    // Esvaziar as listas antes de adicionar novos elementos
    meuGrafico.data.labels = [];
    meuGrafico.data.datasets.forEach((dataset) => {
      dataset.data = [];
    });
      
    // Adicionar novos elementos
    contasNome.forEach((nome, index) => {
      meuGrafico.data.labels.push(nome);
      meuGrafico.data.datasets.forEach((dataset) => {
        dataset.data.push(contasValor[index]);
      });
    });
      
    // Atualizar o gráfico após modificar os dados
    meuGrafico.update();
  } else {
    // Criar um novo gráfico
    meuGrafico = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: contasNome,
        datasets: [{
          label: 'reais',
          data: contasValor,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(0, 128, 0, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
 
function gerarRelatorio() {
  var conteudo = document.getElementById('listaContas').innerText;
  var blob = new Blob([conteudo], { type: 'text/plain' });
  var url = URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.download = 'Relatório mensal.txt';
  link.click()
}