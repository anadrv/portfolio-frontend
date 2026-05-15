# 📚 Planner Acadêmico – Plataforma de Organização de Planos de Ensino

Projeto desenvolvido para auxiliar no gerenciamento do planner acadêmico e dos planos de ensino da instituição.

## 🎯 Contexto

O projeto surgiu da necessidade de substituir o uso de planilhas no gerenciamento do planner e dos planos de ensino utilizados pelos professores e pela gestão acadêmica. A proposta da aplicação é centralizar as informações acadêmicas em um ambiente digital mais organizado, facilitando o acesso, atualização e acompanhamento dos conteúdos.

A plataforma busca tornar o gerenciamento acadêmico mais prático e eficiente para:

- Professores
- Coordenação acadêmica
- Gestão institucional

Entre as principais funcionalidades da aplicação estão:

- Organização de competências
- Gerenciamento de conteúdos acadêmicos
- Visualização estruturada do planner
- Centralização das informações acadêmicas
- Melhor acompanhamento das atividades

---

## 💫 Tecnologias Utilizadas

O frontend do projeto foi desenvolvido utilizando as seguintes tecnologias:

- JavaScript
- React
- Vite
- Tailwind CSS

---

## 🗂️ Arquitetura do Projeto

```plaintext
PORTFOLIO-FRONTEND/
│
├─ node_modules/                # Dependências do projeto
├─ public/                      # Arquivos públicos
│
├─ src/                         # Código-fonte principal
│   ├─ assets/                  # Arquivos estáticos
│   │   ├─ icons/
│   │   │   ├─ courses/
│   │   │   ├─ planner-icon.png
│   │   │   ├─ planner-white-icon.png
│   │   │   ├─ unifacisa-blue-icon.svg
│   │   │   └─ unifacisa-icon.png
│   │   │
│   │   └─ images/
│   │
│   ├─ components/              # Componentes reutilizáveis
│   │   ├─ CourseCard.jsx
│   │   ├─ CreateCourseModal.jsx
│   │   ├─ CreateSubjectModal.jsx
│   │   ├─ DocumentCard.jsx
│   │   ├─ FilterInfo.jsx
│   │   ├─ FilterSelect.jsx
│   │   ├─ InfoModal.jsx
│   │   ├─ Menu.jsx
│   │   ├─ NotificationCard.jsx
│   │   ├─ NotificationCardPage.jsx
│   │   ├─ PrimaryButton.jsx
│   │   ├─ SearchBar.jsx
│   │   ├─ Subject.jsx
│   │   └─ UpdateInfoButton.jsx
│   │
│   ├─ context/                 # Gerenciamento de estado global
│   │   └─ AuthContext.jsx                 
│   │
│   ├─ Layout/                  
│   │   └─ Layout.jsx
│   │
│   ├─ mock/
│   │    └─ currentUser.js                    
│   │
│   ├─ pages/                   # Páginas da aplicação
│   │   ├─ Home/
│   │   │   └─ Home.jsx
│   │   ├─ Login/
│   │   │   └─ Login.jsx
│   │   ├─ Notifications/
│   │   │   └─ Notifications.jsx
│   │   └─ Subjects/
│   │       └─ Subjects.jsx
│   │
│   ├─ routes/                  # Gerenciamento de rotas
│   │   └─ AppRoutes.jsx
│   │
│   ├─ services/                # Integração e serviços
│   │   └─ subjectService.js      
│   │
│   ├─ utils/                   # Funções auxiliares
│   │   └─ showFeedback.js
│   │
│   ├─ validations/             # Validações de formulários
│   │   └─ validateSubject.js               
│   │
│   ├─ App.css
│   ├─ App.jsx
│   ├─ index.css
│   └─ main.jsx
│
├─ .gitignore
├─ eslint.config.js
├─ index.html
├─ package-lock.json
├─ package.json
├─ vite.config.js
├─ .gitattributes
├─ LICENSE
└─ README.md
```

## 🔄 Comunicação da Aplicação

A arquitetura do projeto foi organizada de forma modular para facilitar a manutenção e a escalabilidade da aplicação.

## Frontend (React)

O frontend foi desenvolvido utilizando componentes reutilizáveis e separação por responsabilidades.

- Components: responsáveis pelos elementos reutilizáveis da interface.
- Pages: representam as páginas principais da aplicação.
- Routes: gerenciam a navegação entre páginas.
- Data: armazena dados mockados utilizados durante o desenvolvimento.
- Validations: realiza validações de formulários e entradas do usuário.
- Utils: contém funções auxiliares reutilizáveis.

## 🚀 Como executar o projeto

### Front-end
1. Abra o terminal na pasta do frontend.
```plaintext
cd portfolio
```
2. Instale as dependências:
``` plaintext
npm install
```
3. Inicie o servidor em modo desenvolvimento:
``` plaintext
npm run dev
```
4. O frontend rodará em: 
``` plaintext
http://localhost:5173/
```

## 💡 Funcionalidades Implementadas
- Login de usuários
- Organização de competências
- Visualização de cursos
- Sistema de notificações
- Interface organizada para gerenciamento acadêmico
- Estruturação digital do planner acadêmico

## ✅ Conclusão

O projeto propõe uma solução digital para auxiliar no gerenciamento do planner acadêmico e dos planos de ensino da instituição.

A aplicação busca facilitar a organização, centralização e atualização das informações acadêmicas, oferecendo uma alternativa mais prática em relação ao modelo baseado em planilhas.

Além disso, o sistema foi estruturado de forma modular, permitindo futuras expansões e melhorias conforme as necessidades da instituição.
