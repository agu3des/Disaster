# Disaster PW1
### Título do Aplicativo: Disaster

### Instalações necessárias:
- Caso não tenha o nodejs, instale com:
    1. winget install Schniz.fnm
    2. fnm install 22
- Instale os módulos com: `npm install`
- Instale o angular com: `npm install -g @angular/cli`
- Instale o json-server com: `npm install -g json-server`

### Rodar o projeto:
- Entre na pasta disaster-pw1
- Rode o ng serve em um terminal
- Rode o json-server db.json

### Link do Stackblitz
- https://stackblitz.com/~/github.com/agu3des/Disaster_Pw1?authuser=0 

### Descrição do Projeto

#### Temática: 
Sistema de Gerenciamento de Desastres Naturais

#### Descrição do Problema:
De acordo com a CNN Brasil, “Foram registrados 1.161 eventos de desastres, sendo 716 associados a eventos hidrológicos, como transbordamento de rios, e 445 de origem geológica, como deslizamentos de terra. Na média, foram registrados pelo menos três desastres por dia.” Diante da recorrência desses desastres naturais, é essencial contar com um sistema informatizado para controlar e gerenciar as vítimas, recursos disponíveis e agências de resgate, além de facilitar a coordenação de voluntários e abrigos.

#### Solução a ser Implementada: 
Desenvolver uma aplicação web para o gerenciamento e registro de desastres naturais. O sistema permitirá:
1. Cadastro e monitoramento de eventos de desastres naturais.
2. Registro e gestão de vítimas e suas necessidades.
3. Controle de doadores e doações.
4. Administração de abrigos e recursos.
5. Coordenação de voluntários e agências de resgate.
6. Armazenamento de relatos de testemunhas.

### Requisitos de Dados:
- Desastre Natural
- Vítimas
- Abrigos
- Doações
- Doadores
- Agências de Resgate
- Relatos
- Voluntários

### Requisitos Funcionais (RF):
- RF1: Registro de desastres naturais, incluindo tipo, localização, data e impacto.
- RF2: Cadastro e gerenciamento de vítimas afetadas.
- RF3: Registro de doações, categorizadas por tipo de item e status de distribuição.
- RF4: Controle de abrigos, incluindo disponibilidade de espaço e recursos.
- RF5: Cadastro e manutenção de agências de resgate.
- RF6: Registro de relatos de testemunhas para análise de impacto e prevenção futura.
- RF7: Gerenciamento de voluntários e suas contribuições.

### Requisitos Não Funcionais (RNF):
- RNF1: Desempenho: O sistema deve ser capaz de processar até 100 acessos simultâneos. Tempo de resposta inferior a 3 segundos para operações comuns.
- RNF2: Segurança: Os dados das vítimas e doações devem ser protegidos por criptografia. Autenticação segura para usuários administrativos.
- RNF3: Usabilidade: Interface intuitiva e responsiva para dispositivos móveis e desktop.
- RNF4: Disponibilidade: Tempo de disponibilidade de 99% ao longo do mês. Backup automático dos dados diariamente.
- RNF5: Escalabilidade: Capacidade de expansão para suportar novos abrigos e desastres registrados.
- RNF6: Portabilidade: Compatibilidade com navegadores modernos (Chrome, Firefox, Edge, Safari). Suporte para versões web e mobile.
- RNF7: Manutenibilidade: Código modular e documentado para futuras atualizações. Logs de erro e auditoria para monitoramento e segurança.
- RNF8: Acessibilidade: Cumprimento das diretrizes WCAG 2.1 para acessibilidade.

### Possíveis Telas (Templates/Layout):
1. Tela Inicial: Visão geral dos desastres registrados recentemente.
2. Tela de Cadastro de Desastre: Formulário para inserção de informações sobre o desastre.
3. Tela de Vítimas: Listagem e gerenciamento das vítimas registradas.
4. Tela de Doações: Gerenciamento de doações, incluindo recebimento e distribuição.
5. Tela de Abrigos: Registro e monitoramento da disponibilidade de espaços.
6. Tela de Relatos: Formulário para relatos de testemunhas.
7. Tela de Voluntários: Cadastro e administração de voluntários.

### Alunas: 
- [Ananda Guedes](https://github.com/agu3des)
- [Letícia Leite](https://github.com/l-e-t-i-c-i-a)
