const contas = [];

    function adicionarConta() {
      const nomeConta = document.getElementById('nomeConta').value;
      const valorConta = parseFloat(document.getElementById('valorConta').value);
      const tipoConta = document.getElementById('tipoConta').value;

      if (!nomeConta || isNaN(valorConta) || valorConta <= 0 || !tipoConta) {
        alert('Por favor, insira um nome de conta válido e um valor positivo.');
        return;
      }

      contas.push({ nome: nomeConta, valor: valorConta, tipo: tipoConta, salario: valorSalario});
      atualizarListaContas();
      document.getElementById('nomeConta').value = '';
      document.getElementById('valorConta').value = '';
      document.getElementById('tipoConta').value = 'formaPagamento';
    }

    function atualizarListaContas() {
      const valorSalario = parseFloat(document.getElementById('valorSalario').value);
      const totalContas = contas.reduce((total, conta) => total + conta.valor, 0);
      if (totalContas >= valorSalario*0.8 && totalContas <= valorSalario){
        alert('O seu total de contas está tomando 80% do seu salário, cuidado!');
      } else if (valorSalario < totalContas) {
        alert('O total de contas excede o valor do seu salário');
      };
      
      const listaContas = document.getElementById('listaContas');
      listaContas.innerHTML = '';
      contas.forEach(conta => {
        const listItem = document.createElement('li');
        listItem.textContent = `${conta.nome}: R$ ${conta.valor} (${conta.tipo})`;
        listaContas.appendChild(listItem);
      });
      alert('Conta adicionada à lista.');
    }
    function analiseContas() {
      const valorSalario = parseFloat(document.getElementById('valorSalario').value);
      const totalContas = contas.reduce((total, conta) => total + conta.valor, 0);
      const porcentagem = ((totalContas * 100) / valorSalario).toFixed(2);
      document.getElementById('porcentagem').textContent = `As contas representam ${porcentagem}% do seu salário.`;
    }
    function criarGrafico() {
        const contasNome = contas.map(function(conta) {
          return conta.nome + ' (' + conta.tipo + ')'
        })
        const contasValor = contas.map(function(conta) {
          return conta.valor
        })


        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
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

      function gerarRelatorio() {
        var conteudo = document.getElementById('listaContas').innerText;
        var blob = new Blob([conteudo], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'Relatório mensal.txt';
        link.click()
    }