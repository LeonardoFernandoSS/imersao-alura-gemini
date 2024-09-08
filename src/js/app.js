// Função para inicializar a lista de serviços
function initServices() {
  const servicesList = document.getElementById("services-list");

  let servicesResult = "";

  for (const item of services) {
    servicesResult += getStringServiceItemElement(item);
  }

  // Verifica se há serviços encontrados
  if (!servicesResult) {
    servicesList.innerHTML = `<p>Nenhum projeto encontrado.</p>`;
    return;
  }

  // Atualiza o conteúdo da lista de serviços
  servicesList.innerHTML = servicesResult;
}

// Função para inicializar a lista de projetos e a paginação
function initProjects(pageNumber = 1) {
  const projectsList = document.getElementById("projects-list");
  const pagination = document.getElementById("pagination");

  let projectsResult = "";
  let paginationResult = "";

  // Filtra os projetos para a página atual
  for (const item of filterPage(pageNumber)) {
    projectsResult += getStringProjectItemElement(item);
  }

  // Verifica se há projetos encontrados
  if (!projectsResult) {
    projectsList.innerHTML = `<p>Nenhum projeto encontrado.</p>`;
    pagination.innerHTML = paginationResult;
    return;
  }

  // Calcula o total de páginas
  const totalPages = getTotalPages();

  // Cria o HTML para a paginação
  paginationResult = getStringPaginationElement(totalPages, pageNumber);

  // Atualiza o conteúdo da lista de projetos e da paginação
  projectsList.innerHTML = projectsResult;
  pagination.innerHTML = paginationResult;
}

const itensPorPagina = 3;  // Define o número de itens por página

function filterPage(pageNumber) {
  // Calcula o índice inicial da página
  const indiceInicial = (pageNumber - 1) * itensPorPagina;

  // Calcula o índice final da página
  const indiceFinal = indiceInicial + itensPorPagina;
  
  // Retorna uma fatia do array projects com os itens da página atual
  return projects.slice(indiceInicial, indiceFinal);
}

function getTotalPages() {
  // Calcula o total de páginas dividindo o tamanho do array projects 
  // pelo número de itens por página e arredondando para cima com Math.ceil
  return Math.ceil(projects.length / itensPorPagina);
}

function getStringServiceItemElement(service) {
  // Constrói o HTML para um item de serviço
  return `
    <article class="card horizontal-card">
      <img src="${service.image?.path}" alt="${service.image?.alt}" srcset="" />
      <div class="card-body">
        <h3>${service.title}</h3>
        <p class="subheading">${service.subtitle}</p>
        <p>${service.content}</p>
      </div>
    </article>
  `;
}

function getStringProjectItemElement(project) {
  // Constrói o HTML para um item de projeto
  return `
    <figure class="project-figure">
      <img src="${project.images[0]?.path}" alt="${project.images[0]?.alt}" />
      <figcaption>
        <a href="#project" onclick="selectProject(${project.id})" class="animate-scroll">
          <h3>${project.title}</h3>
        </a>
      </figcaption>
    </figure>
  `;
}

function getStringPaginationElement(totalPages, pageNumber) {
  // Verifica se há página anterior
  const previousPage = pageNumber > 1 ? pageNumber - 1 : 1;

  // Verifica se há próxima página
  const nextPage = pageNumber < totalPages ? pageNumber + 1 : totalPages;

  // Inicia o HTML da paginação com o botão 'Anterior'
  let result = `<button class="button" onclick="initProjects(${previousPage})">Anterior</button>`;

  // Loop para criar os botões de numeração de páginas
  for (let index = 1; index <= totalPages; index++) {
    // Define a classe 'secondary-button' para a página atual
    const buttonClass = pageNumber === index ? "secondary-button" : "";

    // Adiciona o botão de numeração ao HTML
    result += `<button class="button ${buttonClass}" onclick="initProjects(${index})">${index}</button>`;
  }

  // Finaliza o HTML da paginação com o botão 'Próxima'
  result += `<button class="button" onclick="initProjects(${nextPage})">Próxima</button>`;

  return result;
}

function selectProject(id) {
  // Busca a seção do projeto atualmente exibido
  let oldProject = document.getElementById("project");

  // Remove a seção do projeto antigo, se existir
  if (oldProject) {
    oldProject.remove();
  }

  // Localiza o projeto selecionado no array projects
  const project = projects.find((item) => item.id === id);

  // Verifica se o projeto foi encontrado
  if (!project) {
    return;
  }

  // Obtém a lista de projetos
  const projectsList = document.getElementById("projects");

  // Gera o HTML para o projeto selecionado
  const stringProject = getStringProjectElement(project); // Função não fornecida

  // Cria a nova seção do projeto
  const newProject = createProjectSectionElement(stringProject); // Função não fornecida

  // Obtém o elemento pai da lista de projetos
  const parentNode = projectsList.parentNode;

  // Insere a nova seção do projeto após a lista de projetos
  parentNode.insertBefore(newProject, projectsList.nextSibling);
}

function createProjectSectionElement(stringProject) {
  // Cria um elemento de seção para o projeto
  let projectElement = document.createElement("section");

  // Adiciona a classe "project-section-container" ao elemento
  projectElement.classList.add("project-section-container");

  // Define o identificador "project" para o elemento
  projectElement.id = "project";

  // Define o conteúdo HTML do projeto
  projectElement.innerHTML = stringProject;

  // Retorna o elemento de seção do projeto
  return projectElement;
}

function getStringProjectElement(project) {
  // Constrói o HTML para a seção do projeto selecionado
  return `
    <article>
      <div>
        <h2>${project.title}</h2>
        <p class="subheading">${project.measures}</p>
      </div>
      <p>
        <strong>Estilo:</strong> ${project.style}
      </p>
      <p>
        <strong>Funcionalidade:</strong> ${project.functionality}
      </p>
      <p>
        <strong>Personalização:</strong> ${project.personalization}
      </p>
    </article>
    <figure class="project-figure">
      <img src="${project.images[0]?.path}" alt="${project.images[0]?.alt}" />
    </figure>
  </section>
  `;
}

// Inicializa a lista de serviços
initServices();

// Inicializa a lista de projetos e a paginação
initProjects();
