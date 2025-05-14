# Project Title

Smoothie App "Froots"

## Description

Our goal is to create a smoothie recipe app that is fun, fresh, and accessible to users of all ages.
The app allows users to browse a collection of smoothie recipes complete with nutritional information, and also create and save their own recipes. The purpose of our app is to help smoothie enthusiasts keep track of their favourite blends, support their health goals, and discover new flavour combinations with ease.
We identified a niche for a recipe app that’s both playful in design and practical for smoothies. By combining clear visuals, nutritional insights, and personal recipe creation, Froots fills the gap between casual browsing and health-conscious nutrient tracking.

<hr>

The user story is divided into two sections, **Level 1 - Basic** is the standard we're aiming for in this project. **Level 2 - Advanced** has partially been fulfilled in the project, but were planned as additional features to impliment considering time constraints and the real project timeline.

**Level 1 - Basic _(Completed)_**

As the (small screen) user, I want to click the recipe name button within a recipe card and open the expanded recipe page.
In the recipe page, I can see the recipe ingredients, nutritional information, and read/add/modify notes.
As the (large screen) user, I can browse the full recipes on the screen.
As the user I can use the search bar to find a recipe of my choosing from the listing.

**Level 2 - Advanced _(Partially Completed)_**

As the user, I can click the New Smoothie button, and create a smoothie in that page (with custom title, preparation time, ingredients, and notes, and save it to my recipes.
In addition, I can also see my recipe ingredients dynamically update nutritional information while creating a new smoothie.
As the user, I may also edit and save the notes within ready recipes.
In addition to above, as the user, I can upload a custom picture when creating a new recipe.
As the user, I am able to favourite recipes, and view my favourites.
As the user, I am able to view separate tabs (for example; browse recipes, my recipes, favourites, and create recipe)
As the user, I am able to delete recipes, and edit premade recipes.

## Getting Started

### Dependencies

- Node.js, Svelte 5, TailwindCSS, Globals, TypeScript, Vite

### Installing

- Run following commands inside your preferred Terminal:

```
git clone https://github.com/jamktiko/smoothie_testi
```

```
cd .\smoothie_testi\
```

```
npm install
```

- once done move on to "Executing program"

### Executing program

- To start using the app simply run following command:

```
npm run dev
```

- Vite should open a port which will enable you to run the app inside browser.
- If it doesn't open a browser window automatically, open your preferred browser and go to http://localhost:5173/
- (Now you should be able to use the app inside browser)

<hr>

- Alternatively, you can also use our deployed version here (no installation required):
- https://froots-smoothies.netlify.app/

## Help

All new created smoothies are stored inside LocalStorage, so if you decide to delete your recipes you have to clear cache and cookies from your browser. This will make it so the application starts like first time - with only template recipes showing.

## Authors

- **Jun Fengari** - _Lead designer, responsible for writing, organizing, and maintaining project documentation, ensuring clarity and consistency throughout the development process._
- **Lauri Makkonen** - _Lead developer, responsible for managing the Git repository, handling version control, and coordinating code integration._
- **Janika Rahikainen** - _Developer, versaw testing and publishing processes to maintain app quality and ensure reliable final deployment._
- **Teemu Sairi** - _Designer, handled bug fixing, task planning, team coordination, and progress tracking to ensure smooth project execution and deadline alignment._

## Version History

- v1.2.3
  - Updated projektisuunnitelma.md & README.md. Updated package.json to correct version.
- v1.2.2
  - Updated dependancies, fixed fonts and material icons, added title, updated README.md
- v1.2.1
  - Updated documentation & code cleanup.
- v1.2.0
  - Image clipping fixed. Docs updated, added screenshots.
- v1.1.4
  - Added fixed nutritional information and footer.
- v1.1.3
  - SmoothieCards mobile search fix.
- v1.1.1
  - Modal-window scrollbar fix try.
- v1.1.0
  - Fixed image paths. Added new styles.
- v1.0.6
  - Background fix try.
- v1.0.5
  - Small LocalStorage fix.
- v1.0.4
  - Added favicon.
- v1.0.3
  - Added LocalStorage and now all new smoothie-objects are added as first element.
- v1.0.2
  - Cleaned up code + fixed Smoothietime.svelte filename error.
- v1.0.1
  - Fixed footer inside new smoothie recipe page.
- v1.0.0
  - First stable version.

## License

This project is licensed under the CC BY-SA 4.0 License - see the LICENSE.md file for details

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png

## Acknowledgments

- Original Fruit Data from [Fruityvice API](https://fruityvice.com) modified by developers.
- Icon assets from [Google Material Symbols](https://fonts.google.com/icons).
- Font from [Google Fonts](https://fonts.google.com/icons).
- Recipes generated by ChatGPT and Copilot, modified by developers.
- Smoothie Images from [Pixabay](https://pixabay.com/) and [Unsplash](https://unsplash.com/)
- Logo & Placeholder & Favicon Image Art by Jun Fengari
- Background image by <a href="https://unsplash.com/@pawel_czerwinski?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Pawel Czerwinski</a> on <a href="https://unsplash.com/photos/white-and-blue-abstract-painting-mfIplTZLE6E?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
