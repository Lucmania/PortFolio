// Navegación fluida
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        // Cerrar menú móvil si está abierto
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// Menú móvil
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Efecto de escritura
const typingText = document.querySelector('.typing-text');
const words = ["Lucas Costamagna", "Desarrollador Web", "Diseñador UI/UX", "Freelancer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        const typingSpeed = isDeleting ? 80 : 150;
        setTimeout(type, typingSpeed);
    }
}

window.onload = () => {
    type();
    loadManualProjects();

    // EmailJS
    emailjs.init("LNCGEc7pfdb8yMx-t");
};

// Navegación activa
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const id = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Filtro de portfolio
function initializePortfolioFilters() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            document.querySelectorAll('.portfolio-item').forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Formulario de contacto con EmailJS
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    emailjs.sendForm('service_19z7waj', 'template_wyv37l1', this)
        .then(() => {
            alert('¡Mensaje enviado correctamente! Te responderé pronto.');
            this.reset();
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }, (error) => {
            console.log('Error al enviar el mensaje:', error);
            alert('Error al enviar el mensaje. Por favor, intenta de nuevo.');
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Categorias
function getProjectCategory(clase) {
    if (!clase) return 'other';

    clase = clase.toLowerCase();

    if (['web'].includes(clase)) {
        return 'web';
    } else if (['app'].includes(clase)) {
        return 'app';
    } else {
        return 'other';
    }
}

// GitHub
function loadManualProjects() {
    const projects = [
        {
            name: "Visualizador de código",
            description: "Un visualizador de código que permite ver el resultado de HTML, CSS y JavaScript en tiempo real.",
            clase: "Web",
            image: "img/Visualizador_de_codigo.PNG",
            demoUrl: "https://lucmania.github.io/Visualizador-de-codigo/",
            githubUrl: "https://github.com/Lucmania/Visualizador-de-codigo"
        },
        {
            name: "WeatherNow",
            description: "Aplicación que muestra el clima actual y pronóstico utilizando una API externa, permitiendo a su vez, la visualización del mapa y el contacto al desarrollador para cualquier caso que se requiera.",
            clase: "Web",
            image: "img/WeatherNow.PNG",
            demoUrl: "https://lucmania.github.io/WeatherNow/",
            githubUrl: "https://github.com/Lucmania/WeatherNow"
        },
        {
            name: "Web E-commerce",
            description: "E-commerce desarrollado con HTML, CSS y JavaScript. Permite la busqueda y filtrado de los productos, y como administrador, el poder modificar, eliminar o agregar productos. (No hay demo ya que requiere ejecución de un servidor local con la base de datos creada en su ordenador).",
            clase: "Web",
            image: "img/Web_E-commerce.PNG",
            githubUrl: "https://github.com/Lucmania/Web-ecommerce-proyecto-1"
        },
        {
            name: "Crud Personas",
            description: "Aplicación CRUD para gestionar personas. Permite crear, leer, actualizar y eliminar registros. (No se encuentra disponible la demo ya que requiere ejecutar el server).",
            clase: "Web",
            image: "img/Crud_Personas.PNG",
            githubUrl: "https://github.com/Lucmania/Proyecto-API_Json_CORS"
        },
        {
            name: "Landing Page",
            description: "Landing page de un proyecto realizado para una sodería como práctica. (se puede acceder al login, pero no a la parte de administración por el servidor).",
            clase: "Web",
            image: "img/Ezevem_landing_page.PNG",
            demoUrl: "https://lucmania.github.io/Trabajo-practico-soderia/",
            githubUrl: "https://github.com/Lucmania/Trabajo-practico-soderia"
        },
        {
            name: "Gestor de pedidos",
            description: "Aplicación para gestionar pedidos de una sodería. Permite crear, leer, actualizar y eliminar pedidos. (No se encuentra disponible la demo ya que requiere ejecutar el server para ejecutar sus funcionalidades).",
            clase: "Web",
            image: "img/Gestion_pedidos.PNG",
            githubUrl: "https://github.com/Lucmania/Trabajo-practico-soderia"
        },
        {
            name: "Landing Page Games",
            description: "Landing page prototipo de una tienda de videojuegos.",
            clase: "Web",
            image: "img/LCGames.PNG",
            demoUrl: "https://lucmania.github.io/LCGames/",
            githubUrl: "https://github.com/Lucmania/LCGames"
        }
    ];

    const portfolioContainer = document.querySelector('.portfolio-container');

    portfolioContainer.innerHTML = '';

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'portfolio-item';
        projectElement.setAttribute('data-category', getProjectCategory(project.clase));

        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.name}" class="portfolio-img" />
            <div class="portfolio-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="portfolio-links">
                    ${project.demoUrl ? `<a href="${project.demoUrl}" class="btn" target="_blank">Ver Demo</a>` : ''}
                    <a href="${project.githubUrl}" class="btn" target="_blank">GitHub</a>
                </div>
            </div>
        `;

        portfolioContainer.appendChild(projectElement);
    });

    initializePortfolioFilters();
}

// Cambiar el tema
function toggleTheme() {
    const body = document.body;

    body.classList.toggle('dark-mode');

    // Guardado de preferencia
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    updateThemeIcon();
}

// Actualizar el icono según el tema actual
function updateThemeIcon() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Verificar tema actual
    const isDarkMode = document.body.classList.contains('dark-mode');

    // Icono
    themeToggle.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
}

// Botón de cambio de tema
function createThemeToggle() {
    if (document.querySelector('.theme-toggle')) return;

    const themeButton = document.createElement('div');
    themeButton.className = 'theme-toggle';

    themeButton.innerHTML = '<i class="fas fa-moon"></i>';

    themeButton.addEventListener('click', toggleTheme);
    document.body.appendChild(themeButton);
}

// Tema guardado
function applyTheme() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }

    updateThemeIcon();
}

// Inicializar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolioFilters();
    createThemeToggle();
    applyTheme();
});
