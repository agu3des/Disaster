document.addEventListener('DOMContentLoaded', () => {
    const content = {
        pt: {
            button: "Mudar para Inglês"
        },
        en: {
            button: "Switch to Portuguese"
        }
    };

    let currentLanguage = 'en'; // Idioma inicial

    const buttonElement = document.getElementById('language-toggle');
    const iconElement = document.getElementById('language-icon');

    // Função para atualizar o conteúdo da página
    function updateContent() {
        // Atualiza textos e ícones aqui, se necessário
        buttonElement.children[1].textContent = content[currentLanguage].button;
        iconElement.className = 'fas fa-language'; // Se você quiser trocar por outros ícones, adicione a lógica aqui
    }

    // Evento para mudar o idioma
    buttonElement.addEventListener('click', () => {
        currentLanguage = currentLanguage === 'en' ? 'pt' : 'en';
        updateContent();
    });

    // Chamada inicial para definir o conteúdo correto
    updateContent();
    
    
    const cancelBtn = document.getElementById('cancel-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');

    const loginModal = document.getElementById('login-modal');
    const openLoginModalBtn = document.getElementById('open-login-modal-btn');
    const loginClose = document.getElementById('login-modal-close');

    // Abre o modal de login
    if (openLoginModalBtn) {
        openLoginModalBtn.addEventListener('click', () => {
            loginModal.style.display = 'flex';
        });
    }

    if (loginClose) {
        loginClose.addEventListener('click', () => {
            loginModal.style.display = 'none';
        });
    }

    if (confirmBtn) {
        confirmBtn.addEventListener('click', function (event) {
            event.preventDefault(); // Impede a submissão do formulário

            Toastify({
                text: "Formulário enviado com sucesso!",
                duration: 2000, // duração do toast em milissegundos
                close: true, // botão de fechar
                gravity: "bottom", // posição: top ou bottom
                position: "center", // posição: left, center ou right
                backgroundColor: "blue", // cor de fundo
                stopOnFocus: true, // para não fechar ao clicar no toast
            }).showToast();

            setTimeout(function () {
                document.getElementById('testimony-form').submit(); // Submete o formulário após exibir o toast
            }, 3000); // aguarda a duração do toast antes de submeter
        });
    }

    let progress = 0;

    function updateProgress() {
        progress = Math.min(progress + 20, 100); // Incrementa a barra em 20% ou para em 100%
        document.getElementById('progress').style.width = progress + '%';
    }

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    if (emailInput) {
        emailInput.addEventListener('input', function () {
            updateProgress();
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('input', function () {
            updateProgress();
        });
    }

    // Alterna a visibilidade da sidebar ao clicar no botão de menu
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const carouselInner = document.querySelector('.carousel-inner');
    const items = document.querySelectorAll('.carousel-item');
    let currentIndex = 0;

    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselInner.style.transform = `translateX(${offset}%)`;
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
            updateCarousel();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
            updateCarousel();
        });
    }

    const searchInput = document.getElementById('search-input');
    const sidebarItems = document.querySelectorAll('#sidebar .search-item a');

    function performSearch(query) {
        query = query.toLowerCase();
        sidebarItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query)) {
                item.parentElement.style.display = 'block';
            } else {
                item.parentElement.style.display = 'none';
            }
        });
    }

    // Atualiza a lista de itens enquanto o usuário digita
    if (searchInput) {
        searchInput.addEventListener('input', function () {
            performSearch(searchInput.value);
        });

        // Executa a busca e redireciona quando a tecla Enter é pressionada
        searchInput.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();  // Evita o comportamento padrão do Enter
                const query = searchInput.value.toLowerCase();
                let found = false;

                sidebarItems.forEach(item => {
                    const text = item.textContent.toLowerCase();
                    if (text.includes(query)) {
                        found = true;
                        // Redireciona para o link correspondente
                        window.location.href = item.getAttribute('href');
                    }
                });

                // Se não encontrar nenhum link correspondente
                if (!found) {
                    alert('No matching item found.');
                }
            }
        });
    }

    const entityInfo = {
        entity1: {
            title: "Entidade 1",
            description: "Descrição completa da entidade 1.",
            cnpj: "00.000.000/0001-00",
            address: "Rua Exemplo, 123, Bairro, Cidade - UF",
            phone: "(00) 0000-0000",
            email: "contato@entidade1.com"
        },
        entity2: {
            title: "Entidade 2",
            description: "Descrição completa da entidade 2.",
            cnpj: "11.111.111/1111-11",
            address: "Rua Exemplo, 456, Bairro, Cidade - UF",
            phone: "(11) 1111-1111",
            email: "contato@entidade2.com"
        },
        entity3: {
            title: "Entidade 3",
            description: "Descrição completa da entidade 3.",
            cnpj: "22.222.222/2222-22",
            address: "Rua Exemplo, 789, Bairro, Cidade - UF",
            phone: "(22) 2222-2222",
            email: "contato@entidade3.com"
        }
    };

    const infoModal = document.getElementById('info-modal');

    function openModal(entity) {
        const info = entityInfo[entity];
        document.getElementById('modal-title').textContent = info.title;
        document.getElementById('modal-description').textContent = info.description;
        document.getElementById('modal-cnpj').textContent = info.cnpj;
        document.getElementById('modal-address').textContent = info.address;
        document.getElementById('modal-phone').textContent = info.phone;
        document.getElementById('modal-email').textContent = info.email;
        infoModal.classList.remove('hidden');
    }

    function closeModal() {
        infoModal.classList.add('hidden');
    }

    // Fechar modal ao clicar fora dele
    infoModal.addEventListener('click', (event) => {
        if (event.target === infoModal) {
            closeModal();
        }
    });

    // Adicione a lógica para os botões "Saiba Mais" nos cards
    document.querySelectorAll('.entity-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const entityId = e.target.getAttribute('data-entity');
            openModal(entityId);
        });
    });

    
    // Functionality for form submission
    const form = document.getElementById('testimony-form');

    const cepInput = document.getElementById('cep');
    const streetInput = document.getElementById('street');
    const numberInput = document.getElementById('number');
    const neighborhoodInput = document.getElementById('neighborhood');
    const stateInput = document.getElementById('state');
    const cityInput = document.getElementById('city');

    if (cepInput) {
        cepInput.addEventListener('blur', async () => {
            const cep = cepInput.value.replace('-', '');
            const url = `https://viacep.com.br/ws/${cep}/json/`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                if (data.erro) {
                    document.getElementById('cepError').classList.remove('hidden');
                } else {
                    document.getElementById('cepError').classList.add('hidden');
                    streetInput.value = data.logradouro;
                    neighborhoodInput.value = data.bairro;
                    cityInput.value = data.localidade;
                    stateInput.value = data.uf;
                    numberInput.focus();
                }
            } catch (error) {
                document.getElementById('cepError').classList.remove('hidden');
                console.error(error);
            }
        });
    }

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevents the form from submitting

            // Clear previous error messages
            document.getElementById('name-error').classList.add('hidden');
            document.getElementById('email-error').classList.add('hidden');
            document.getElementById('testimony-error').classList.add('hidden');

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const testimony = document.getElementById('testimony').value.trim();

            let isValid = true;

            // Validate Name
            if (!name) {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate Email
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate Testimony
            if (!testimony) {
                document.getElementById('testimony-error').classList.remove('hidden');
                isValid = false;
            }

            // Submit form if valid
            if (isValid) {
                Toastify({
                    text: "Testimony submitted successfully!",
                    duration: 2000, // duration of the toast in milliseconds
                    close: true, // close button
                    gravity: "bottom", // position: top or bottom
                    position: "center", // position: left, center, or right
                    backgroundColor: "blue", // background color
                    stopOnFocus: true, // stops closing on focus
                }).showToast();

                setTimeout(function () {
                    form.reset(); // Reset the form after showing the toast
                }, 2000); // wait for the toast duration before resetting
            }
        });
    }
});