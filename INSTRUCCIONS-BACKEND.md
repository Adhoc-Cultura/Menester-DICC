# Registre d'avaluacions a Google Sheets

Aquesta guia explica com fer que cada avaluació de GNOSI quedi registrada en un
full de càlcul de Google, a més del desat local al navegador.

El sistema funciona així: l'app envia les dades a un petit programa (Google Apps
Script) que les escriu en una fila del teu full. Tot és gratuït.

## Pas 1 — Crear el full de càlcul

1. Ves a https://sheets.google.com i crea un full de càlcul nou.
2. Posa-li un nom (p. ex. "GNOSI — Registre d'avaluacions").
3. No cal crear capçaleres: l'script les escriu sol la primera vegada.

## Pas 2 — Afegir l'Apps Script

1. Dins del full, ves al menú **Extensions → Apps Script**.
2. Esborra tot el codi que hi hagi.
3. Obre el fitxer `apps-script/Codi.gs` d'aquest projecte, copia'n TOT el
   contingut i enganxa'l a l'editor d'Apps Script.
4. Clica la icona de desar (o Ctrl/Cmd + S).

## Pas 3 — Implementar com a aplicació web

1. A dalt a la dreta, clica **Implementa → Nova implementació**.
2. Clica l'engranatge i tria **Aplicació web**.
3. Configura:
   - **Descripció:** GNOSI (o el que vulguis)
   - **Executa com a:** Jo mateix (el teu compte)
   - **Qui hi té accés:** Qualsevol
4. Clica **Implementa**.
5. Google et demanarà autoritzar permisos: accepta (potser et sortirà un avís
   de "app no verificada" → Configuració avançada → Vés a... → Permet).
6. Copia la **URL de l'aplicació web** que apareix (acaba amb `/exec`).

## Pas 4 — Connectar l'app

1. Obre `src/GNOSI.jsx`.
2. A dalt, dins del bloc `CONFIG`, busca la línia:
   ```
   endpoint: "",
   ```
3. Enganxa-hi la URL entre les cometes:
   ```
   endpoint: "https://script.google.com/macros/s/XXXXX/exec",
   ```
4. Desa, fes `npm run build` i torna a publicar (push a GitHub).

A partir d'ara, cada cop que algú completi una avaluació, apareixerà una fila
nova al teu full amb: data, institució, puntuació global, context i la puntuació
de cada àmbit (OBRIR, CONNECTAR, COCREAR, EXPERIMENTAR, ARRELAR).

## Comprovacions

- Per verificar que l'script està viu, obre la URL `/exec` al navegador:
  hauria de mostrar `{"ok":true,"missatge":"GNOSI backend actiu"}`.
- Si no apareixen files: revisa que "Qui hi té accés" sigui **Qualsevol** i que
  hagis copiat la URL que acaba en `/exec` (no la d'edició de l'script).
- Si canvies el codi de l'script, has de tornar a **Implementa → Gestiona
  implementacions → editar → Nova versió** perquè els canvis tinguin efecte.

## Privacitat

Aquest registre centralitza les respostes de tothom qui fa servir l'eina al teu
full. Si la compartiu públicament, informeu les institucions que les dades
es desen, i eviteu recollir dades personals (el nom de la institució és opcional).

## Desactivar el registre

Deixa `endpoint: ""` (buit) al CONFIG. L'app tornarà a funcionar només amb el
desat local al navegador, sense enviar res enlloc.
