# Vishu Portfolio (React)

Professional, dark-themed tech portfolio built with React and plain CSS.

## Local Development

- `npm install`
- `npm start`
- open `http://localhost:3000`

## Build

- `npm run build`

## Maintainability Notes

- Portfolio content is data-driven in `src/App.js` (profile, skills, experiences, projects).
- To add a new project or role, append one object in the corresponding array.
- Years of experience auto-updates every year using:
  - `new Date().getFullYear() - CAREER_START_YEAR`

## Free Vercel Deployment

1. Push this project to GitHub.
2. In Vercel, click **Add New Project** and import the repo.
3. Keep defaults for CRA:
   - Build command: `npm run build`
   - Output directory: `build`
4. Deploy.

Vercel Hobby plan is sufficient for a personal portfolio.
