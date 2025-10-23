# Fluide et Libre

A personal blog prototype built with **Vanilla JavaScript**, **PHP**, **SQL**, **HTML**, and **CSS**.  
This project is an evolving work-in-progress designed as both a **technical playground** and a **personal space for reflection and expression** on stuttering and fluency.

---

## 🧠 Overview

**Fluide et Libre** is a minimalist blog application combining front-end interactivity and a dynamic PHP/SQL backend.  
The architecture focuses on modularity and clarity — each section of the website is handled through PHP components dynamically loaded in the main `index.php` via a URL parameter switch.

---

## 🏗️ Project Structure

```
backend/ → server-side logic and PHP controllers
components/ → modular PHP components included in index.php
database/ → SQL export and related files
node_modules/ → dependencies for frontend tools
scripts/ → JavaScript logic (dynamic search, breathing exercise, etc.)
styles/ → CSS files and Hamburgers library for the menu
```
---

## ⚙️ Core Features

### **Homepage**
- Displays **random articles** from the database to create a dynamic entry experience.
- Clean and accessible layout for readers.

### **Article List Page**
- Lists **all published articles**.
- Includes **live search** and **filtering** features powered by JavaScript for instant results.

### **Exercise Page**
- Interactive breathing exercise built with JavaScript.
- Expanding and contracting **animated circle** guides the user to inhale and exhale.
- Simple and relaxing interface for mindful breathing.

---

## 🧩 Technical Details

- **Dynamic routing** via `$_GET` parameter and `switch` in `index.php`.
- **Modular PHP structure**: each component (header, footer, article list, etc.) is imported via `include`.
- **Hamburger Menu Animation**: integrated from  
  [Hamburgers by Jonathan Suh](https://github.com/jonsuh/hamburgers).
- **SQL Database**: stores articles and metadata (title, content, category, date).
- **Vanilla JS** used for:
  - Dynamic filtering and search.
  - Animation logic for the breathing exercise.
  - UI interactions and transitions.

---

## 🧰 Tech Stack

| Layer        | Technology |
|---------------|-------------|
| Front-end     | HTML, CSS, Vanilla JavaScript |
| Back-end      | PHP |
| Database      | SQL (local server) |
| UI Components | Hamburgers CSS Library |

---

## 🚧 Work in Progress

- Improving responsive design across all devices.  
- Adding admin dashboard for article creation and editing.  
- Expanding interactive exercises and personalization options.  
- Future integration of API endpoints and database migration.

---

## 📜 License

This project is currently private and under active development.  
All rights reserved © Nicolas Lavarde.

---

## 👤 Author

**Nicolas Lavarde**  
Web Developer (PHP / JavaScript / SQL)  
[GitHub – ThreeFrogs511](https://github.com/ThreeFrogs511)
.gitignore.txt → ignored files
index.php → main entry point with dynamic content loading
package.json → project dependencies and metadata
