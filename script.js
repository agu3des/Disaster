document.addEventListener('DOMContentLoaded', () => {
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