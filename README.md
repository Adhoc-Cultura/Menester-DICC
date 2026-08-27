# GNOSI — Diagnòstic d'Innovació Ciutadana en Cultura

Eina d'autoavaluació per a institucions culturals (museus, biblioteques, centres
cívics, fàbriques de creació, equipaments patrimonials). Un model propi d'AdHoc
Cultura per descobrir on posar esforços per avançar cap a la innovació ciutadana.

La institució respon primer **3 factors de context** (recursos, governança, suport
extern, que no puntuen però emmarquen el resultat) i després **20 preguntes**
repartides en **5 àmbits** —OBRIR, CONNECTAR, COCREAR, EXPERIMENTAR, ARRELAR— en
una escala 1–4. El resultat és un gràfic pentagonal amb els colors de cada àmbit,
la puntuació global i recomanacions d'accions per als tres àmbits més fluixos. Els
resultats es desen al navegador per veure'n l'evolució.

## Desenvolupament local

```bash
npm install
npm run dev
```

## Publicar a GitHub Pages

### Opció A — Automàtic amb GitHub Actions (recomanada)

1. Puja aquests fitxers a un repositori de GitHub:
   git init && git add . && git commit -m "GNOSI"
   git branch -M main
   git remote add origin https://github.com/EL_TEU_USUARI/EL_TEU_REPO.git
   git push -u origin main
2. Settings -> Pages -> Source: GitHub Actions.
3. Cada push a main publica automaticament.
4. URL: https://EL_TEU_USUARI.github.io/EL_TEU_REPO/

### Opció B — Manual amb gh-pages

   npm run deploy

## Notes

- vite.config.js fa servir base "./" (rutes relatives): funciona a qualsevol
  subcarpeta de GitHub Pages o domini propi sense canviar res.
- La persistencia fa servir localStorage (dades al navegador de cada usuari).
- Tot el contingut (context, ambits, preguntes, recomanacions, colors, textos i
  logo) es a src/GNOSI.jsx. Els textos d'inici i el logo es canvien al bloc CONFIG.

## Sobre el model

GNOSI es un model experimental, obert i subjecte a millores. Els cinc ambits son una
reelaboracio propia d'AdHoc Cultura a partir de bibliografia del sector cultural
(Abrir instituciones desde dentro, Platform Design Toolkit, Mesoc Handbook, The
Power of Civic Ecosystems, Labcraft, Feral Labs, Co-creacion en espacios
d'aprenentatge, Art in Context). Vegeu el document de bases metodologiques.
