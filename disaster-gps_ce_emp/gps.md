- **1. Plano de Gerenciamento de Integração e Stakeholders**
    
    ## Plano de Gerenciamento de Integração e Stakeholders
    
    ### Integração no Projeto (PMBOK + Scrum)
    
    A integração será feita por meio da atuação ativa da **Coordenadora de Projeto**, que atuará como *Product Owner*, sendo responsável por consolidar as entregas das equipes e garantir a coerência do produto com os objetivos estratégicos. Ela será o elo entre o time ágil e os stakeholders, promovendo uma visão unificada do progresso.
    
    O gerenciamento da integração será contínuo, com:
    
    - **Revisões de Sprint** ao final de cada iteração, funcionando como checkpoints de integração entre o que foi desenvolvido e o planejamento do projeto.
    - **Daily Scrum** como ferramenta para antecipar problemas e alinhar rapidamente ações que impactam mais de uma frente de trabalho.
    - **Backlog Refinement** como momento de integrar novas demandas, sugestões ou mudanças de escopo com impacto mínimo.
    
    Ferramentas como Asana serão utilizadas para integrar atividades de backend, frontend e prototipação de forma sincronizada.
    
    ---
    
    ### Engajamento dos Stakeholders
    
    O engajamento será guiado por práticas do PMBOK aplicadas de forma leve e iterativa:
    
    1. **Identificação e Classificação**:
        - Stakeholders mapeados: Defesa Civil, ONGs, doadores, comunidades afetadas, governo local, pesquisadores.
        - Classificados com base em **poder** e **influência** (matriz poder-interesse).
        
        https://www.figma.com/board/2JUjIOj4CbBqID1PbHav5N/Impact-vs.-Effort-%7C-Action-Prioritization-Matrix-Template--Community-?node-id=0-1&t=dRww3gs5ebh5knBX-1
        
        Obs: Influência = capacidade de impactar decisões do projeto ; Interesse = nível de envolvimento, preocupação ou afetação com o projeto.
        
        | **Stakeholder** | **Poder** | **Interesse** | **Classificação na Matriz** | **Ação Recomendada** |
        | --- | --- | --- | --- | --- |
        | Defesa Civil e Corpo de Bombeiros | Alto | Alto | Gerenciar de perto | Reuniões frequentes, atualizações diretas |
        | ONGs e instituições filantrópicas | Alto | Alto | Gerenciar de perto | Parcerias formais, comunicação ativa |
        | Governo municipal/estadual | Alto | Médio | Manter satisfeito | Relatórios estratégicos, envolvimento político/institucional |
        | Doadores e voluntários | Médio | Alto | Manter informado | Notificações, relatórios transparentes, UX clara |
        | Comunidades afetadas | Baixo | Alto | Manter informado | Interface acessível, comunicação direta |
        | Universidades e pesquisadores | Baixo | Médio | Monitorar com esforço mínimo | Publicação de dados, abertura da base de dados |
        | Equipe de desenvolvimento (interna) | Médio | Alto | Gerenciar de perto | Reuniões ágeis, definição de tarefas e entregas |
        | Coordenadora de Projeto | Alto | Alto | Gerenciar de perto | Responsável pela integração entre todos os stakeholders |
    2. **Planejamento de Engajamento**:
        - Canais de comunicação definidos: reuniões semanais com parceiros-chave, e-mail e atualizações em plataforma colaborativa (como Asana ou GitHub).
        - Atualizações visuais serão compartilhadas com stakeholders estratégicos.
    3. **Gerenciamento e Monitoramento Contínuo**:
        - Feedbacks coletados ao fim de cada sprint.
        - Adequações de escopo e backlog baseadas em sugestões dos stakeholders.
        - Testes de usabilidade com comunidades e voluntários para validação das funcionalidades.
    
    ---
    
    ### Justificativa da Abordagem Integrada
    
    A união do **PMBOK** (foco em controle e planejamento) com o **Scrum** (foco em agilidade e entrega iterativa) assegura a qualidade do produto final e o alinhamento com as reais necessidades das comunidades afetadas. Essa abordagem híbrida promove flexibilidade para inovação e robustez para lidar com a complexidade e urgência dos desastres naturais.
    
    ---
    
- **2. Product Backlog (Escopo)**
    
    **Produto Backlog**
    
    →R01. Banco de Dados Relacional Estruturado
    
    1. O sistema deve utilizar um banco de dados relacional com estrutura robusta.
    2. As tabelas devem ser inter-relacionadas para representar entidades como: Desastre Natural, Testemunha, Voluntário.
    
    →R02. Interface Web Responsiva e Intuitiva
    
    1. O sistema deve possuir uma interface web acessível por dispositivos móveis e desktops.
    2. A usabilidade deve ser pensada para operadores em campo, cidadãos e gestores, mesmo em situações de instabilidade de conexão.
    
    →R03. Sistema de Cadastro e Consulta de Desastres e Voluntários
    
    1. O sistema deve permitir o cadastro e a consulta de desastres e voluntários.
    2. Deve haver formulários simples e diretos para envio de relatos por cidadãos.
    3. Deve ser possível anexar mídias (fotos).
    
    →R04. Informações sobre o Portal
    
    1. O sistema deve ter uma página explicando as principais funcionalidades da plataforma
    2. O sistema deve ter uma página exibindo as ONGs/Abrigos verificados e seus contatos
    
    →R05. Disponibilidade e Escalabilidade
    
    1. A infraestrutura deve ser capaz de lidar com picos de acesso.
    2. O sistema deve contar com backups e replicação de dados.
    3. A arquitetura deve estar preparada para escalabilidade horizontal
    
    →RNF01. Plano de Gerenciamento de Integração e Stakeholders
    
    →RNF02. Plano de Gerenciamento de Tempo
    
    →RNF03. Plano de Gerenciamento de Recursos
    
    →RNF04. Plano de Gerenciamento de Qualidade
    
    - Feito [Última atualização 10/06/2025]:
    
    R01: Database de desastres naturais
    
    R02: Interface Web 
    
    R03: CRUD de desastres naturais
    
    R04: -
    
    R05: -
    
    RNF01: ok
    
    RNF02: ok
    
    RNF03: ok
    
    RNF04: -
    
- **3. Sprint 2 backlog**
    1. Criação do protótipo no figma
    2. Criação do banco de dados com a entidade desastres naturais
    3. Criação do CRUD de desastres no front
    4. Criação do CRUD de desastres no back
    5. Integração do back com o front
    6. Elaboração do Plano de Gerenciamento de Integração e Stakeholders (base PMBOK + Scrum)
    7. Elaboração do Plano de Gerenciamento de Tempo
- **4. Plano de Gerenciamento de Tempo**
    
    Apesar de o Scrum ser flexível, ele pode se beneficiar dos fundamentos do PMBOK para dar **mais estrutura ao gerenciamento de prazos**. Veja como integrar:
    
    ### **Integrações possíveis:**
    
    | **Prática do PMBOK** | **Adaptação no Scrum** |
    | --- | --- |
    | Planejar o cronograma | Planejamento do **Product Backlog** e do **Sprint Planning** |
    | Definir/Sequenciar atividades | Itens do backlog priorizados e organizados para cada sprint |
    | Estimar duração e recursos | Estimativas com **Planning Poker** ou story points por sprint |
    | Desenvolver cronograma | **Gráfico de Gantt, Burndown charts** ou **Release Plans** para visualização do progresso |
    | Controlar o cronograma | **Daily Scrum** para ajustes diários e **Sprint Review/Retrospective** para melhoria contínua |
    
    ### **Aplicação no Projeto de GPS (Gestão de Projetos de Software):**
    
    - **Definir**:
        - Criar um **Backlog do Produto** com todas as funcionalidades.
        - Realizar **planejamento das sprints** com estimativas de esforço (story points ou planning poker).
        - Utilizar ferramentas como Asana para organizar e visualizar prazos.
    - **Controlar**:
        - Realizar **Daily Scrum** para acompanhar o andamento.
        - Usar **gráficos** para monitorar o ritmo de entrega e ajustar o planejamento.
    - **Validar**:
        - Executar **reviews ao final de cada sprint** com os stakeholders.
        - Avaliar se os itens entregues estão dentro do prazo e conforme os critérios de aceitação.
    
    Essa integração garante que o cronograma seja **flexível**, porém **controlado**, e que o projeto se mantenha dentro dos **limites de tempo definidos**.
    
- **5. Plano de Gerenciamento de Recursos**
    
    No contexto da aplicação Disaster, todos os eventos scrum estão sendo considerados e aplicados a este orçamento. 
    
    OBS: Os valores seriam conversados e acordados em contrato com as partes interessadas, tanto a equipe quanto com os stakeholders. A reserva técnica estaria disponível ao começo de cada sprint (proporcional a sprint), caso fosse necessário usá-la. Caso não seja, o valor permaneceria em caixa.
    
    - Duração de 1 ano.
    - Equipe composta por 3 desenvolvedores back-end (em que um indivíduo também atua como Scrum Master) e 2 desenvolvedores front-end (em que um indivíduo também atua como Product Owner), todos contratados como Pessoa Jurídica (PJ) em formato remoto.
    - Custo de um designer UX/UI e testes de usabilidade.
    - Recursos técnicos, incluindo registro de domínio internacional e hospedagem da plataforma.
    - Reserva técnica de 30% para possíveis extensões de período de trabalho.
    
    ## **Recursos Humanos**
    
    ### Desenvolvedores Back-End
    
    - Quantidade: 3 profissionais
    - Salário médio mensal por profissional: R$ 7.100
    - Total anual para 3 profissionais: R$ 255.600
    
    *Fonte: Glassdoor (https://www.glassdoor.com.br/Sal%C3%A1rios/brasil-desenvolvedor-back-end-pleno-sal%C3%A1rio-SRCH_IL.0%2C6_IN36_KO7%2C35.htm)*
    
    ### Desenvolvedores Front-End
    
    - Quantidade: 2 profissionais
    - Salário médio mensal por profissional: R$ 5.000
    - Total anual para 2 profissionais: R$ 120.000
    
    *Fonte: Glassdoor (https://www.glassdoor.com.br/Sal%C3%A1rios/desenvolvedor-front-end-pleno-sal%C3%A1rio-SRCH_KO0%2C29.htm)*
    
    ### Adicional para Scrum Master
    
    - Profissional: 1 dos desenvolvedores back-end
    - Adicional mensal estimado: R$ 1.800
    - Total anual: R$ 21.600
    
    ### Adicional para Product Owner
    
    - Profissional: 1 dos desenvolvedores front-end
    - Adicional mensal estimado: R$ 1.500
    - Total anual: R$ 18.000
    
    ### Designer UX/UI e Testes de Usabilidade
    
    - Custo total estimado: R$ 8.000
    
    *Estimativa baseada em valores de mercado para serviços de design freelance no Brasil.*
    
    ## **Recursos Técnicos**
    
    ### Registro de Domínio Internacional (.com)
    
    - Custo anual: R$ 50
    
    *Fonte: Registro.br (https://registro.br/)*
    
    ### Hospedagem da Plataforma
    
    - Serviço de hospedagem em nuvem (AWS, Azure, Google Cloud):
        - Custo mensal estimado: R$ 500
        - Custo anual estimado: R$ 6.000
    
    *Fonte: Estimativas baseadas em calculadoras de preços das respectivas plataformas.*
    
    ## **Custo por Sprint**
    
    Considerando que:
    
    - As sprints têm duração de 3 semanas.
    - O projeto terá 17 sprints ao longo de 1 ano (51 semanas).
    
    ### **Custo por Sprint**
    
    - **Custo total anual (sem reserva)**: R$ 429.250
    - **Custo por sprint**: R$ 429.250 / 17 ≈ R$ 25.250
    
    ## **Observações**
    
    - **Reserva Técnica**: Inclui uma margem de 30% sobre o subtotal para cobrir possíveis extensões de prazo, ajustes de escopo e contingências, conforme recomendado pelas práticas do PMBOK.
    - **Modelo de Contratação PJ**: Embora profissionais PJ não estejam sujeitos aos encargos trabalhistas tradicionais, é prudente considerar possíveis custos adicionais, como benefícios ou bonificações, que podem ser negociados individualmente.
    - **Gerenciamento Ágil**: A alocação e o acompanhamento dos recursos humanos serão realizados por meio de cerimônias do Scrum (Sprint Planning, Daily Scrum, Sprint Review e Retrospective), garantindo alinhamento contínuo com os objetivos do projeto.
    
    ![image.png](attachment:40169230-ed30-4a72-b7bf-79699e406e2e:image.png)
    
- **6. Plano de Gerenciamento de Qualidade (Fazer)**
- **7. Sprint 3 backlog**
    
    Sprint Backlog:
    
    1. Criação de banco de dados no Firebase para a entidade Voluntários
    2. Criação do CRUD de voluntários no front
    3. Integração do Firebase com o front
    4. Pesquisa sobre o Plano de Gerenciamento de Recursos
    5. Elaboração do Plano de Gerenciamento de Recursos
    6. Pesquisa sobre o Plano de Gerenciamento de Qualidade
    7. Elaboração do Plano de Gerenciamento de Qualidade
    8. DOD da Sprint: Quando a aplicação estiver fazendo o CRUD da entidade Voluntários