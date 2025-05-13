# Documentation

## Overview
- Project Name: Smoothie App "Froots"
- Project Duration: 22.4.2025 - 16.5.2025
- Team Members:
  - Designers: Jun Fengari, Teemu Sairi
  - Developers: Lauri Makkonen, Janika Rahikainen
- Overall Project Intro:
  Fun & Fresh Smoothie Recipe App: Froots.  
  View and create new fun recipes!

---

## Goals 
Our goal is to create a smoothie recipe app that is fun, fresh, and accessible to users of all ages.   
The app allows users to browse a collection of smoothie recipes complete with nutritional information, and also create and save their own recipes. The purpose of our app is to help smoothie enthusiasts keep track of their favourite blends, support their health goals, and discover new flavour combinations with ease.  
We identified a niche for a recipe app that’s both playful in design and practical for smoothies. By combining clear visuals, nutritional insights, and personal recipe creation, Froots fills the gap between casual browsing and health-conscious nutrient tracking.


## User Story  
The user story is divided into two sections, Level 1 - Basic is the standard we're aiming for in this project. Level 2 - Advanced has partially been fulfilled in the project, but were planned as additional features to impliment considering time constraints and the real project timeline.  

Level 1 - Basic (Completed)
- As the (small screen) user, I want to click the recipe name button within a recipe card and open the expanded recipe page. 
- In the recipe page, I can see the recipe ingredients, nutritional information, and read/add/modify notes. 
- As the (large screen) user, I can browse the full recipes on the screen. 
- As the user I can use the search bar to find a recipe of my choosing from the listing.


Level 2 - Advanced (Partially Completed)
- As the user, I can click the New Smoothie button, and create a smoothie in that page (with custom title, preparation time, ingredients, and notes, and save it to my recipes.
- In addition, I can also see my recipe ingredients dynamically update nutritional information while creating a new smoothie.
- As the user, I may also edit and save the notes within ready recipes.
- In addition to above, as the user, I can upload a custom picture when creating a new recipe.
- As the user, I am able to favourite recipes, and view my favourites.
- As the user, I am able to view separate tabs (for example; browse recipes, my recipes, favourites, and create recipe)
- As the user, I am able to delete recipes, and edit premade recipes.


---

## Design Process 
- Our design goals revolved around making a fun, fruity and fresh smoothie recipe app. We aimed for clear card design and thematic colors. Practical goals included designing the app responsively with layouts for both mobile and web views, focusing on a mobile first design process. The initial designs were completed within figma, and then built and tested on tailwind play, after which they were integrated and tested on the final platform. This led to minor changes to accomodate for browser functionality. 
The links to each stage of design are provided below. 

- Figma Link: (SmoothieSovellus Sivu): https://www.figma.com/design/hZwyYLCWlpHUJq7bY1xdAD/App-Ideas?node-id=12-65&t=BHifgodVZk2YNkAH-1  
- Key Screens in Tailwind Play:
  - First Page (Home Page): https://play.tailwindcss.com/B2aLLigQWT
  - Second Page (Modal-window / Smoothie Recipe opened): https://play.tailwindcss.com/BtG0TDeeBk
  - Third page (Make a new Smoothie): https://play.tailwindcss.com/T0FU2d1kU2
    
- Challenges: The main challenges within the design process concerned finding solutions which looked agreeable and also complied with usability best practices. These solutions also needed to fit the overall theme of the application. Practically integrating Tailwind into the readily prepared code from the developer team presented a learning curve, but became easier as the project progressed, and particularly as styles could be replicated throughout the different views. This highlighted the importance of spending more time on the initial design of the application before implimenting styles. 
Opting to use Tailwind also revealed peculiarities in its capabilities and functionality, but overall was more efficient to use than CSS. 
  
## Development Process
- Tech Stack
  - Frontend: Typescript, Svelte 5, Vite, ESLint, Prettier, Git
  - UX/UI: Fignma, Tailwind, CSS, HTML
  - Deployment: Netlify, GitHub
  - Backend: N/A  
- Component Structure
  - 
  - x
  - x
- Challenges & Solutions
  - CORS issue with FruityVice API: Due to missing backend, fixed by replicating data to Local JSON.
  - Integrating code and styles functionally and seamlessly.
  - Component building and functionality (SmoothieCard & NewRecipePage in particular)

## Tasks by Role
- Jun Fengari - Lead designer, responsible for writing, organizing, and maintaining project documentation, ensuring clarity and consistency throughout the development process. 
- Lauri Makkonen - Lead developer, responsible for managing the Git repository, handling version control, and coordinating code integration. 
- Janika Rahikainen - Developer, versaw testing and publishing processes to maintain app quality and ensure reliable final deployment.
- Teemu Sairi - Designer, handled bug fixing, task planning, team coordination, and progress tracking to ensure smooth project execution and deadline alignment.
  

## Credits:
- Original Fruit Data from [Fruityvice API](https://fruityvice.com), modified by developers.
- Icon assets from [Google Material Symbols](https://fonts.google.com/icons).
- Font from [Google Fonts](https://fonts.google.com/icons).
- Recipes generated by ChatGPT and Copilot, modified by developers. 
- Smoothie Images from [Pixabay](https://pixabay.com/) and [Unsplash](https://unsplash.com/)
- Logo & Placeholder & Favicon Image Art by Jun Fengari
- Background image by <a href="https://unsplash.com/@pawel_czerwinski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pawel Czerwinski</a> on <a href="https://unsplash.com/photos/white-and-blue-abstract-painting-mfIplTZLE6E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>

---

## Future Development Possibilities
- Improvement features: custom image uploads, editing premade recipes, AI enhanced suggestions, advanced search, allergens, multi-language support, barcode scanning.
- Community features: favourites, reviews, user profiles, sharing recipes, recipe of the week. 
- Integration with fitness / nurtition / grocery apps.
- Collaboration / sales opportunities with smoothie bars and grocery retailers. 
