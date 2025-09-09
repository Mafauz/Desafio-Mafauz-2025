 <!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Abrigo de Animais</title>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #8eb8dd;
            color: #333;
            line-height: 1.6;
            padding: 20px;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
            padding: 30px;
        }
        
        header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #4e9af1;
        }
        
        h1 {
            color: #2c6baf;
            margin-bottom: 10px;
        }
        
        .description {
            color: #666;
            font-size: 1.1em;
            margin-bottom: 20px;
        }
        
        .content {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        .input-section, .output-section {
            flex: 1;
            min-width: 300px;
        }
        
        h2 {
            color: #2c6baf;
            margin-bottom: 15px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ddd;
        }
        
        .form-group {
            margin-bottom: 20px;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
            color: #444;
        }
        
        input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
        }
        
        button {
            background-color: #4e9af1;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 600;
            transition: background-color 0.3s;
        }
        
        button:hover {
            background-color: #2c6baf;
        }
        
        .result {
            margin-top: 20px;
            padding: 20px;
            border-radius: 5px;
            background-color: #f9f9f9;
            min-height: 200px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        
        }
        
        .result-item {
            padding: 10px;
            border-bottom: 1px solid #eee;
        }
        
        .error {
            color: #d9534f;
            font-weight: 600;
        }
        
        .success {
            color: #5cb85c;
        }
        
        .animal-info {
            margin-top: 30px;
            background-color: #e9f5ff;
            padding: 20px;
            border-radius: 5px;
        }
        
        .animal-card {
            background-color: rgb(10, 9, 70);
            padding: 15px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .animal-name {
            font-weight: bold;
            color: #2c6baf;
        }
        
        .animal-type {
            font-style: italic;
            color: #666;
        }
        
    
        @media (max-width: 768px) {
            .content {
                flex-direction: column;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>Adoção de animais do abrigo</h1>
            <p class="description">Encontrar pessoas aptas a levar os animais para casa com base em seus brinquedos favoritos.</p>
        </header>
        
        <div class="content">
            <div class="input-section">
                <h2>Entrada de Dados</h2>
                <div class="form-group">
                    <label for="brinquedosPessoa1">Brinquedos da Pessoa 1 (separados por vírgula):</label>
                    <input type="text" id="brinquedosPessoa1" placeholder="Ex: RATO,BOLA">
                </div>
                
                <div class="form-group">
                    <label for="brinquedosPessoa2">Brinquedos da Pessoa 2 (separados por vírgula):</label>
                    <input type="text" id="brinquedosPessoa2" placeholder="Ex: RATO,NOVELO">
                </div>
                
                <div class="form-group">
                    <label for="ordemAnimais">Ordem dos Animais (separados por vírgula):</label>
                    <input type="text" id="ordemAnimais" placeholder="Ex: Rex,Fofo">
                </div>
                
                <button id="processarBtn">Processar Adoção</button>
                
                
            </div>
            
            <div class="output-section">
                <h2>Resultado</h2>
                <div class="result" id="resultado">
                    <p>Os resultados aparecerão aqui...</p>
                </div>
                
                <div class="animal-info">
                  
                    <div class="animal-grid" id="animalGrid">
            
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        class AbrigoAnimais {
            constructor() {
                this.animais = {
                    'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
                    'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
                    'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
                    'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
                    'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
                    'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
                    'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
                };
                
                this.brinquedosValidos = new Set(['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE']);
            }

            encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
                try {

                    const brinquedos1 = this.validarBrinquedos(brinquedosPessoa1);
                    const brinquedos2 = this.validarBrinquedos(brinquedosPessoa2);
                    const animaisLista = this.validarAnimais(ordemAnimais);

                    const resultado = [];
                    const animaisAdotadosPessoa1 = [];
                    const animaisAdotadosPessoa2 = [];

                    for (const nomeAnimal of animaisLista) {
                        const animal = this.animais[nomeAnimal];
                        
                        
                        const isLoco = nomeAnimal === 'Loco';
                        const temCompanhia = animaisLista.length > 1 && animaisLista.some(a => a !== 'Loco');
                        
                        if (isLoco && temCompanhia) {
                         
                            const podePessoa1 = animaisAdotadosPessoa1.length < 3;
                            const podePessoa2 = animaisAdotadosPessoa2.length < 3;
                            
                            if (podePessoa1 && podePessoa2) {
                                resultado.push(`${nomeAnimal} - abrigo`);
                            } else if (podePessoa1) {
                                animaisAdotadosPessoa1.push(nomeAnimal);
                                resultado.push(`${nomeAnimal} - pessoa 1`);
                            } else if (podePessoa2) {
                                animaisAdotadosPessoa2.push(nomeAnimal);
                                resultado.push(`${nomeAnimal} - pessoa 2`);
                            } else {
                                resultado.push(`${nomeAnimal} - abrigo`);
                            }
                            continue;
                        }

                   
                        const podePessoa1 = this.podeAdotar(animal, brinquedos1) && animaisAdotadosPessoa1.length < 3;
                        
                        const podePessoa2 = this.podeAdotar(animal, brinquedos2) && animaisAdotadosPessoa2.length < 3;

  
                        if (podePessoa1 && podePessoa2) {

                            resultado.push(`${nomeAnimal} - abrigo`);
                        } else if (podePessoa1) {
                            animaisAdotadosPessoa1.push(nomeAnimal);
                            resultado.push(`${nomeAnimal} - pessoa 1`);
                        } else if (podePessoa2) {
                            animaisAdotadosPessoa2.push(nomeAnimal);
                            resultado.push(`${nomeAnimal} - pessoa 2`);
                        } else {
                            resultado.push(`${nomeAnimal} - abrigo`);
                        }
                    }

                    resultado.sort();

                    return { lista: resultado };
                } catch (error) {
                    return { erro: error.message };
                }
            }

            podeAdotar(animal, brinquedosPessoa) {
                const brinquedosFavoritos = animal.brinquedos;
                let indexPessoa = 0;
                let indexAnimal = 0;

                while (indexPessoa < brinquedosPessoa.length && indexAnimal < brinquedosFavoritos.length) {
                    if (brinquedosPessoa[indexPessoa] === brinquedosFavoritos[indexAnimal]) {
                        indexAnimal++;
                    }
                    indexPessoa++;
                }

                return indexAnimal === brinquedosFavoritos.length;
            }

            validarBrinquedos(brinquedosString) {
                if (!brinquedosString) return [];
                
                const brinquedos = brinquedosString.split(',').map(b => b.trim().toUpperCase());
                const brinquedosVistos = new Set();
                
                for (const brinquedo of brinquedos) {
                    if (!this.brinquedosValidos.has(brinquedo)) {
                        throw new Error('Brinquedo inválido');
                    }
                    if (brinquedosVistos.has(brinquedo)) {
                        throw new Error('Brinquedo inválido');
                    }
                    brinquedosVistos.add(brinquedo);
                }
                
                return brinquedos;
            }

            validarAnimais(animaisString) {
                if (!animaisString) return [];
                
                const animais = animaisString.split(',').map(a => a.trim());
                const animaisVistos = new Set();
                
                for (const animal of animais) {
                    if (!this.animais[animal]) {
                        throw new Error('Animal inválido');
                    }
                    if (animaisVistos.has(animal)) {
                        throw new Error('Animal inválido');
                    }
                    animaisVistos.add(animal);
                }
                
                return animais;
            }
        }

       
        document.addEventListener('DOMContentLoaded', function() {
            const abrigo = new AbrigoAnimais();
            const processarBtn = document.getElementById('processarBtn');
            const resultadoDiv = document.getElementById('resultado');
            const animalGrid = document.getElementById('animalGrid');
            
            for (const [nome, info] of Object.entries(abrigo.animais)) {
                const card = document.createElement('div');
                card.className = 'animal-card';
                card.innerHTML = `
                    <div class="animal-name">${nome}</div>
                    <div class="animal-type">${info.tipo}</div>
                    <div>Brinquedos: ${info.brinquedos.join(', ')}</div>
                `;
              
            }
            
          
            processarBtn.addEventListener('click', function() {
                const brinquedos1 = document.getElementById('brinquedosPessoa1').value;
                const brinquedos2 = document.getElementById('brinquedosPessoa2').value;
                const ordemAnimais = document.getElementById('ordemAnimais').value;
                
                const resultado = abrigo.encontraPessoas(brinquedos1, brinquedos2, ordemAnimais);
                
             
                resultadoDiv.innerHTML = '';
                
                if (resultado.erro) {
                    const erroElem = document.createElement('div');
                    erroElem.className = 'result-item error';
                    erroElem.textContent = `Erro: ${resultado.erro}`;
                    resultadoDiv.appendChild(erroElem);
                } else {
                    if (resultado.lista.length === 0) {
                        const emptyElem = document.createElement('div');
                        emptyElem.className = 'result-item';
                        emptyElem.textContent = 'Nenhum animal para processar.';
                        resultadoDiv.appendChild(emptyElem);
                    } else {
                        resultado.lista.forEach(item => {
                            const itemElem = document.createElement('div');
                            itemElem.className = 'result-item';
                            
                            if (item.includes('abrigo')) {
                                itemElem.classList.add('error');
                            } else {
                                itemElem.classList.add('success');
                            }
                            
                            itemElem.textContent = item;
                            resultadoDiv.appendChild(itemElem);
                        });
                    }
                }
            });
        });
    </script>
</body>
</html>