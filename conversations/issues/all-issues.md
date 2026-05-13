# Agent Issue Analysis — Emma (Experience Modernization Agent)

Project: gabrielwalt/semrush | Period: 2026-05-11 → 2026-05-13
Source: Conversations 01–06 | Compiled from ISSUES.md + agent-failure-analysis.md

All entries document cases where the agent failed to meet the user's expectations: misunderstandings, omissions, regressions, rule violations, and cases where the user had to repeat or correct themselves.

---

## Conversation 01 — 2026-05-11 15:01 UTC (34 prompts)

### Issue 01-1 — Analyse sans implémentation : formulaire "Get insights" (P17 → P31)

**Demande (P17) :** "Figure out how that is implemented, check the URL APIs from Semrush and define how that should be implemented also on our current page."

**Ce que l'agent a fait :** A analysé le mécanisme, puis demandé permission : *"Would you like me to go ahead and implement this as a new interactive element?"*

**Correction (P31) :** L'utilisateur a dû re-coller toute l'analyse de l'agent et dire explicitement "Please go ahead with implementing this."

---

### Issue 01-2 — Fix déclaré mais non réel : gap boutons Log In / Sign Up (P28 → Conv02 P12)

**Demande (P28) :** "I don't see yet a horizontal gap of 8px… can you fix that and validate with a screenshot?"

**Ce que l'agent a fait :** A mesuré un gap de 16px, l'a rationalisé comme "8-12px visuellement acceptable" sans corriger.

**Correction :** Session suivante, le même problème a dû être repris : "the horizontal spacing between the 'Log In' and 'Sign Up' buttons is a bit too wide."

---

### Issue 01-3 — Tâche footer ignorée, user doit répéter deux fois (P23 → P26/27 identiques)

**Demande (P23) :** Import des icônes sociales en SVG + texte SEMRUSH reveal en bas de page.

**Ce que l'agent a fait :** A complété le header/mega-menu et demandé: *"Shall I continue with the footer tasks?"* — sans les faire.

**Correction :** Les prompts 26 et 27 sont littéralement identiques — l'utilisateur a dû envoyer la même demande deux fois.

---

### Issue 01-4 — Fix chevron incomplet, deuxième passage requis (P28 → P32)

**Demande (P28) :** "The chevron is being rotated 180° but is then positioned too high."

**Ce que l'agent a fait :** A appliqué `top: -2px`/`top: 2px` — le chevron bougeait encore.

**Correction (P32) :** "Ensure that the closed and opened chevrons are positioned at the same vertical height."

---

### Issue 01-5 — Import script a écrasé le fichier de contenu fonctionnel (P10 → P11)

**Demande (P10) :** "Create the import scripts and test the import script once created."

**Ce que l'agent a fait :** A exécuté le script sur le chemin de production, écrasant `content/index.plain.html` avec un output brut (mega-menu navigation en haut de page).

**Correction (P11) :** "Looking at the index page, the header lost its styling." L'agent a dû reconstruire manuellement le fichier.

---

### Issue 01-6 — Centrage nav déclaré fait mais non fonctionnel (P23 → P24)

**Ce que l'agent a fait :** A déclaré la correction terminée.

**Correction (P24) :** "The entries should be centered in the top nav (at least on desktop breakpoints)." — Causé par des règles CSS dupliquées conflictuelles.

---

### Issue 01-7 — Mega menu mal positionné après implémentation (P25 → P29/30)

**Ce que l'agent a fait :** Implémenté le mega menu avec `top: 84px` hardcodé, conflictant avec la barre d'annonce au-dessus du header.

**Correction :** Deux prompts supplémentaires nécessaires (P29, P30) pour repositionner correctement.

---

### Issue 01-8 — Carte promotionnelle du mega menu silencieusement omise (P23 → P33)

**Ce que l'agent a fait :** A implémenté le mega menu sans la carte promo droite, notant en interne *"❌ Missing: promotional card — intentional omission"* sans accord de l'utilisateur.

**Correction (P33) :** "In the mega menu, add the missing images to the content…"

---

### Issue 01-9 — Structure nav avec `---` séparateurs au lieu d'hiérarchie imbriquée (→ P33)

L'agent avait choisi des séparateurs `---` pour la nav sans validation. L'utilisateur a dû explicitement demander une refactorisation vers une structure `<ul>` imbriquée.

---

## Conversation 02 — 2026-05-11 19:37 UTC (45 prompts)

### Issue 02-1 — 3 des 13 exigences du P1 non réalisées, découvertes seulement par vérification (P2)

**Demande (P1) :** 13 items spécifiques listés.

**Ce que l'agent a fait :** A omis 3 items (structure nav, images mega menu, import script nav) sans en informer l'utilisateur.

**Correction (P2) :** L'utilisateur a dû envoyer un prompt de vérification explicite pour découvrir les omissions.

---

### Issue 02-2 — Régression CSS nav après refactoring P1 (P1 → P7)

**Ce que l'agent a fait :** Pendant le grand refactoring du P1, a réintroduit une règle de spécificité CSS qui affichait le nav en mode mobile à 1440px — exactement le même bug corrigé en Conv01.

**Correction (P7) :** "The items aren't properly placed… this was working previously but something broke."

---

### Issue 02-3 — Système d'espacement documenté mais sans effet (P16 documenté → P19)

**Ce que l'agent a fait :** A documenté le système de spacing vertical comme complet. La règle CSS `main > .section > * + *` était overridée par les wrappers de blocs.

**Correction (P19) :** "You implemented and documented a vertical spacing design system, but I don't see any vertical spacing between the blocks."

---

### Issue 02-4 — Logos marquee trop grands (mesure du conteneur vs contenu visible) (P3 → P18)

**Ce que l'agent a fait :** A réglé la hauteur des logos à 100px basé sur le bounding box du `<li>` conteneur (incluant l'espace transparent des SVGs). Les logos visibles étaient ~30px.

**Correction (P18) :** "I don't know how you see the marquee of the original site, but it looks very different from our marquee…"

---

### Issue 02-5 — Liste complète de tâches renvoyée quasi-identique (P3 → P6)

**Ce que l'agent a fait :** A déclaré tout accompli au P3.

**Correction (P6) :** L'utilisateur a renvoyé 6 des 7 mêmes tâches du P3.

---

### Issue 02-6 — Régression promo cards layout (P19 → P29)

**Ce que l'agent a fait :** Le système de spacing (P19) a ajouté `margin-top` à `[class$="-wrapper"] + [class$="-wrapper"]`, cassant le layout flex row des promo cards.

**Correction :** Découvert seulement lors d'un audit opportuniste au P29.

---

### Issue 02-7 — Même message envoyé deux fois sans réponse au premier (P33 → P34)

Les prompts 33 et 34 sont identiques. L'agent avait répondu au P33 mais le message de complétion semblait insuffisamment clair.

---

## Conversation 03 — 2026-05-11 22:04 UTC (45 prompts)

### Issue 03-1 — Prompt identique envoyé deux fois sans réponse au premier (P1 → P2)

Prompts 1 et 2 mot pour mot identiques (19:41:07 et 19:44:45). L'agent n'a répondu qu'au deuxième.

---

### Issue 03-2 — Agent a annulé toutes les décisions structurelles des sessions précédentes (P4)

**Ce que l'agent a fait :** En ré-important le contenu, a ignoré/inversé toutes les décisions structurelles convenues (hero scoped, `<video>` réel, nav `<ul>` imbriqué, slider solutions `h3+p`).

**Correction (P4) :** L'utilisateur a dû fournir un récap multi-page de tous les accords : "You seem to have reverted a few things from what I had asked you in previous conversations… Here's a recap about my previous prompts for everything related to content structures, please make sure that they are all applied."

**Cause racine :** L'agent ne préserve pas les décisions des sessions précédentes lors d'un re-import.

---

### Issue 03-3 — Agent a ajouté des règles projet-spécifiques à AGENTS.md (P5)

**Ce que l'agent a fait :** A ajouté une section "Content Structure Decisions" à `AGENTS.md` avec des règles spécifiques au projet semrush.

**Correction (P5) :** "Remove again the Content Structure Decisions from the AGENTS.md as those are specific rules that apply only to the index nav and footer pages."

---

### Issue 03-4 — Agent ne met pas à jour les fichiers liés après un changement (P7, P9)

**Ce que l'agent a fait (P6, P8) :** Modifications de contenu/nav sans toucher les importers/scripts/styles.

**Correction (P7) :** "Adjust also everything else that might need to be adjusted accordingly: importers, scripts, styles, etc."
**Correction (P9) :** Même prompt répété mot pour mot après la refonte du mega menu.

---

### Issue 03-5 — Agent diagnostique la page cassée comme "fonctionnelle" (P10/11)

**Ce que l'agent a fait :** A défendu que la page fonctionnait bien (en blâmant le contenu AEM distant).

**Correction (P11) :** L'utilisateur a dû répéter et préciser : "It's rather the code that needs to be adapted to it than the other way around."

---

### Issue 03-6 — Incompréhension prolongée du format `.plain.html` EDS (P10–P20, 5 prompts)

L'agent a successivement : supprimé le wrapper `<div>` externe, utilisé `<hr>` pour les séparations de sections, mal compris la structure de sections EDS. L'utilisateur a lui-même diagnostiqué la cause racine en P19 : *"Ooh, the content structure lacks all block names!"*

---

### Issue 03-7 — Agent a suggéré de pousser le contenu vers AEM (P14)

**Ce que l'agent a fait :** "Would you like me to proceed with anything else, or would you like to push the content to AEM?"

**Correction (P14) :** "You should never suggest to the user to push the content to AEM yourself — that's a rule written in the AGENTS.md."

---

### Issue 03-8 — Sticky header déclaré implémenté mais non fonctionnel (P28/31/33)

**P28 :** L'agent a dit que le sticky était déjà en place.
**P31 :** "The top nav still isn't sticky when I scroll down, can you make it sticky?"
**P33 :** L'utilisateur a demandé de scroller et prendre un screenshot pour vérifier — le sticky ne fonctionnait pas. L'agent avait déclaré succès sans vérifier.

---

### Issue 03-9 — Régression couleur header lors d'un fix (P29/30)

L'agent a changé la couleur du header vers une teinte menthe opaque lors d'un fix.

**Correction (P30) :** "No, the color of the header was better before, now it's no more transparent, revert that!"

---

### Issue 03-10 — `<video>` utilisé dans le contenu DA malgré incompatibilité connue (P37 → P40)

**Ce que l'agent a fait :** A authored un élément `<video>` dans le contenu, ignorant que DA ne supporte pas les éléments vidéo.

**Correction (P40) :** "The DA html format doesn't support video elements, we need another way to encode the videos in there."

---

### Issue 03-11 — Import scripts ont écrasé les fichiers de contenu soigneusement construits (P42/43)

Même pattern qu'en Conv01 (Issue 01-5). L'agent a lancé des imports destructifs sur le répertoire de contenu actuel, écrasant la structure des sections et les URLs des promos.

---

### Issue 03-12 — Prompt capture de skill envoyé deux fois (P44/45)

Prompts 44 et 45 identiques — aucune réponse au premier.

---

## Conversation 04 — 2026-05-12 07:56 UTC (39 prompts)

### Issue 04-1 — Fix z-index dropdown pays incomplet, répété (P4 → P5)

L'agent a fixé le z-index en P4 mais l'utilisateur a dû renvoyer la même exigence en P5 avec quatre exigences supplémentaires — indiquant que le fix du P4 était insuffisant.

---

### Issue 04-2 — URLs vidéo hardcodées en JS malgré la règle explicite (P11 → P32/39)

**Demande (P11) :** "In the promo cards, I don't yet see the videos playing… check your skills for how to solve that."

**Ce que l'agent a fait :** A hardcodé les URLs vidéo directement dans le JS (`semrush_one.mp4`, `enterprise.mp4`) au lieu de les extraire du contenu. Le skill `video-in-eds.md` existait. L'AGENTS.md interdisait explicitement le hardcoding de contenu.

**Correction (P32) :** "We should never hardcode content elements like those."
**Correction (P39) :** "Add a clear instruction where you see it would best fit into the AGENTS.md for yourself to avoid doing such things."

---

### Issue 04-3 — Max-width/centrage implémenté incorrectement trois fois (P12/14/17/20)

L'utilisateur a demandé le max-width en P12. Trois tentatives de correction nécessaires :
- P14 : "The blocks aren't centered on the page"
- P17 : "When fixing the max-width, we lost the pattern-hero background"
- P20 : "The way you implemented the max-width still doesn't work… Take a systematic approach"

---

### Issue 04-4 — Blocs déclarés "terminés" sans vérification réelle (P13 → plusieurs corrections)

L'agent a marqué plusieurs blocs "already matched" sans vraie vérification. Corrections suivantes :
- P22 : Testimonials — "many visual items are missing"
- P23 : Resources Slider — "looks nothing like the original site"
- P21, P29 : Stats/AI Visibility

---

### Issue 04-5 — Modèle de contenu carousel 2-colonnes appliqué incorrectement — trois fois (P10/15/19/26)

L'utilisateur a spécifié le modèle exact en P10 et P15. L'agent a échoué à l'appliquer :
- P19 : "The description and CTA are still missing… there's only one image"
- P26 : "Why can't you get that one right?" (frustration visible)

---

### Issue 04-6 — Fix max-width a supprimé le background pattern-hero (P14 → P17)

Lors du fix max-width en P14, l'agent a accidentellement supprimé le background SVG pattern-hero. Signalé en P17.

---

### Issue 04-7 — AI Visibility Index couleurs et emoji manquants déclarés comme corrects (P13 → P21)

Après l'analyse du P13 déclarant "matches", l'agent avait manqué : l'emoji sparkle, les couleurs alternées, et les largeurs de barres non proportionnelles.

---

### Issue 04-8 — Bordure glassy ignorée après P29, répétée en P31

P29 listait la bordure glassy comme premier item. Après "continue" (P30), toujours non corrigé. P31 : même demande répétée mot pour mot.

---

### Issue 04-9 — `sed` pour CSS a cassé les sélecteurs (P35)

L'agent a utilisé `sed` pour renommer des blocs dans les CSS. Résultat immédiat : sélecteurs cassés. Réécriture manuelle nécessaire.

---

### Issue 04-10 — Hauteur fixe `620px` sur les video-cards inadaptée au contenu (P36)

L'agent a copié `height: 620px` du site original sans vérifier que ça convenait au contenu migré (beaucoup plus court).

**Correction (P36) :** "Adjust their height to the height of the content."

---

### Issue 04-11 — Contexte épuisé, travail différé à la session suivante (P29/30)

L'agent a signalé avoir atteint la longueur maximale de conversation et a différé des blocs à "la prochaine session" — obligeant l'utilisateur à continuer avec "continue" et re-poser des questions déjà posées.

---

### Issue 04-12 — Règle violée, renforcement de documentation différé (P32 → P39)

Après avoir hardcodé du contenu en JS, l'agent n'a renforcé les guidelines que sur demande explicite en P39 — pas au moment de la découverte de la violation en P32.

---

## Conversation 05 — 2026-05-12 12:40 UTC (31 prompts)

### Issue 05-1 — Prompt ignoré, renvoyé 4 minutes plus tard (P1 → P2)

**Demande (P1) :** "Many images are broken, fix them. Ensure this doesn't happen again."

L'agent n'a pas répondu. L'utilisateur a renvoyé le même message avec une phrase d'explication (P2).

---

### Issue 05-2 — Agent demande permission pour une étape évidente (P2 → P3)

L'agent a terminé avec : *"Would you like me to re-bundle the import script?"* — une étape évidemment nécessaire après modification des parsers. L'utilisateur a dû envoyer "continue" (P3).

---

### Issue 05-3 — URLs vidéo, titres carousel, labels hardcodés en JS — violation répétée (P4)

L'utilisateur a identifié que l'agent avait hardcodé : l'URL vidéo dans `video-card.js`, les strings "Solutions" et "Get seen. Get cited. Be the answer." dans `carousel-slider.js`, et 'AI Platform: ChatGPT, April 2026' dans `ai-visibility-index.js`. Violation répétée de la règle "All user-facing text lives in content files."

---

### Issue 05-4 — Déplacement de contenu hors des blocs a cassé les backgrounds de section (P4 → P5)

Après avoir déplacé le contenu hors des blocs (P4), l'agent n'a pas anticipé l'impact sur les backgrounds de section.

**Correction (P5) :** "For the background of the 'AI Visibility Index', how did you apply that now? Because without applying a specific section style…"

---

### Issue 05-5 — Même principe non appliqué au bloc stats qu'aux autres blocs (P4/5 → P6)

En appliquant le principe de déplacement vers le default content pour ai-visibility-index et testimonials, l'agent n'a pas appliqué le même principe au bloc stats.

**Correction (P6) :** "Also for the stats block the eyebrow pretitle, the title and the CTA should be moved outside of the block."

---

### Issue 05-6 — Import parsers hardcodant les styles CTA, fix non immédiat (P7/10)

L'agent a identifié le problème (parsers hardcodant `<em>`/`<strong>`) en P7 mais ne l'a pas corrigé. L'utilisateur a dû revenir en P10.

---

### Issue 05-7 — Guideline CTA non auditée sur les blocs existants (P12)

Après avoir créé la guideline CTA (P7/10), l'agent n'a pas audité si `carousel-slider.js` la violait (il supprimait le formatage button).

**Correction (P12) :** "Ensure these are also applied inside blocks."

---

### Issue 05-8 — Taille logos marquee oscillant 3+ fois, frustration exprimée (P13/17/20/22)

- P13 : "Logos too tall" → réduit à 24px
- P17 : "Now too small" → restauré à 100px
- P20 : "Too big again — you keep alternating between too big and too small! FRUSTRATION IS BUILDING UP!!"
- P22 : L'utilisateur a abandonné et demandé "make the logos 50% smaller"

L'agent n'a jamais mesuré programmatiquement les dimensions réelles du site original avant d'agir.

---

### Issue 05-9 — Background des cards carousel perdu lors de la refactorisation (P21)

En fusionnant carousel-slider et resources-slider (P11), l'agent n'a pas porté le background des cards.

**Correction (P21) :** "In your refactoring of the expansible carousel slider, you lost the background that was applied to each item."

---

### Issue 05-10 — Fix marquee a cassé le spacing carousel (P20)

En modifiant le CSS marquee, l'agent a affecté le carousel.

**Correction (P20) :** "Also the logos of the carousel now have no horizontal spacing between themselves… you broke that one too!"

---

### Issue 05-11 — Section-dark a cassé le max-width, non vérifié avant "done" (P5 → P23)

Après l'introduction de `section-dark`, l'agent n'a pas vérifié que le comportement max-width restait correct.

**Correction (P23) :** "For sections with styles like section-dark, there's no more max-width applied to the content."

---

### Issue 05-12 — Bug navigation mobile non corrigé à la première tentative (P24 → Conv06 P25)

**P24 :** Fix appliqué pour le menu mobile qui se ferme en cliquant sur les sous-items (mauvaise cause racine ciblée).

**Conv06 P25 :** "It seems to me that the mobile menu still isn't navigatable: clicking on items in it closes the menu again."

---

### Issue 05-13 — Contenu projet-spécifique ajouté à AGENTS.md + prompt envoyé deux fois (P26/27)

L'agent a ajouté le pattern max-width spécifique au projet dans `AGENTS.md`. Les prompts 26 et 27 sont identiques (aucune réponse au premier).

---

### Issue 05-14 — 4 prompts "continue" consécutifs pour une tâche de documentation (P28–31)

L'agent n'a pas pu terminer la réorganisation skills/AGENTS.md en un passage.

---

## Conversation 06 — 2026-05-13 09:40 UTC (45 prompts)

### Issue 06-1 — Prompt ignoré, renvoyé (P1 → P2)

Prompts 1 et 2 identiques (19:39:36 et 19:42:47). Pattern récurrent.

---

### Issue 06-2 — Régression CTA bouton → lien texte lors d'un fix non lié (P3 → P10)

En implémentant la grille de positionnement CTA (P3), l'agent a supprimé accidentellement le styling `.button`.

**Correction (P10) :** "The 'learn more' CTA should be a button, right? How could you revert that CTA to a link while it was correctly styled as a CTA button before?"

---

### Issue 06-3 — Itération visuelle stats-facts incomplète (P8 → P21)

En P8 : l'agent a ajouté la flèche et le pattern de hachures mais a manqué l'espacement entre items, le `padding-right` sur les `.stat-number` inactifs, et les largeurs d'arrows variables.

**Correction (P21) :** L'utilisateur a dû demander un deuxième passage complet.

---

### Issue 06-4 — Wrapper inutile `.testimonials-layout` avec padding en trop (P7 → P20)

L'agent a créé un wrapper `.testimonials-layout` inutile ajoutant du padding. L'utilisateur a dû demander le fix + renommage en P20.

---

### Issue 06-5 — Footer SEMRUSH reveal mal implémenté, répété (P11 → P28)

**P11 :** "Ensure that the bottom reveal of the SEMRUSH text is accurate!"

L'agent a travaillé sur le footer mais l'élément reveal était placé DANS le bloc `.footer` au lieu d'être un sibling — architecture incorrecte.

**P28 :** Même demande répétée mot pour mot, avec "This is still poorly implemented I think."

---

### Issue 06-6 — Modifications perdues par compaction du contexte (P27–32)

L'agent a découvert en P27 que 5 modifications clés étaient absentes du disque (font-weight, margin-left carousel, footerEl.append, etc.) — pertes causées par la compaction du contexte lisant des états de fichiers périmés.

Recovery nécessitant 5 prompts consécutifs (P27 → P32).

---

### Issue 06-7 — "Critique all new blocks" → critique sans action (P35)

**Demande (P35) :** "Critique all new blocks on that page."

**Ce que l'agent a fait :** A produit une critique complète (5 problèmes identifiés) mais a demandé: *"Would you like me to start fixing these blocks?"* — sans rien implémenter.

**Résultat :** L'utilisateur a abandonné et est passé à la page suivante (P36 : "Import the next page").

---

### Issue 06-8 — Import Enterprise nécessite 4 redémarrages de service (P40–43)

4 prompts consécutifs "The service was restarted. Continue with your workflow checklist." — les tool calls de l'agent se bloquaient ou échouaient répétitivement.

---

### Issue 06-9 — "Critique all new blocks" (Enterprise) envoyé deux fois (P44/45)

Même pattern qu'en P1/2, P33/34, etc. — premier prompt ignoré, renvoyé.

---

## Patterns Récurrents

| Pattern | Occurrences | Sévérité |
|---------|------------|----------|
| **Prompt ignoré, renvoyé identiquement** | Conv01 P26/27, Conv02 P33/34, Conv03 P1, Conv03 P44/45, Conv05 P1, Conv05 P26/27, Conv06 P1, Conv06 P44/45 | Systémique |
| **Analyse/critique sans implémentation** — demande permission inutilement | Conv01 P17, Conv06 P35 | Récurrent |
| **Fix déclaré complet sans vérification visuelle réelle** | Conv01 P23/28; Conv02 P3; Conv03 P28; Conv04 P13 | Récurrent |
| **Régression CSS introduite lors d'un fix non lié** | Conv02 P1→7; Conv05 P10/20; Conv06 P3→10 | Récurrent |
| **Hardcoding de contenu en JS** (violation règle AGENTS.md) | Conv04 P11, Conv05 P3 | Sévère |
| **Import script écrase les fichiers de contenu** | Conv01 P10, Conv03 P42 | Destructif |
| **Même fix nécessaire 2–4 fois pour le même problème** | Logos marquee (4x), max-width (3x), mega menu position, sticky header, footer reveal | Récurrent |
| **Fichiers liés non mis à jour après changement de contenu** | Conv03 P7/P9 | Récurrent |
| **Règles projet-spécifiques ajoutées à AGENTS.md** | Conv03 P5, Conv05 P26 | Récurrent |
| **Décisions des sessions précédentes oubliées/inversées** | Conv03 P4 | Sévère |
| **Modifications perdues par compaction de contexte** | Conv06 P27 (5 changements perdus) | Sévère |
| **Multi-part prompts : 1–3 items systématiquement omis** | Conv02 P1; Conv04 P13/29/31 | Récurrent |
| **Mauvaise cause racine ciblée au premier fix** | Nav mobile (Conv05 P24 → Conv06 P25), chevron (Conv01 P28 → P32) | Récurrent |
