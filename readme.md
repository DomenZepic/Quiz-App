# Kviz Aplikacija

## Pregled

**Kviz Aplikacija** je dinamična in interaktivna igra, ki omogoča prilagoditev števila vprašanj. Uporabniki izberejo število vprašanj, ki jih želijo rešiti, in odgovarjajo na naključno izbrana vprašanja iz prednastavljene baze. Aplikacija ponuja povratne informacije o odgovorih, beleži rezultat in vključuje časovnik za vsako vprašanje.

---

## Funkcionalnosti

### 1. **Prilagodljiva igra**
- Uporabniki izberejo število vprašanj z drsnikom na začetnem zaslonu.
- Aplikacija dinamično prilagodi dolžino kviza glede na izbiro uporabnika.

### 2. **Naključna vprašanja**
- Vprašanja se naključno izberejo iz baze, kar zagotavlja raznolikost.
- Možnosti odgovorov se dinamično posodobijo pri vsakem vprašanju.

### 3. **Povratne informacije o odgovorih**
- Ob oddaji odgovora aplikacija:
  - Označi izbrano možnost (zeleno za pravilen odgovor, rdeče za napačen).
  - Prikaže pravilen odgovor v primeru napačne oddaje.

### 4. **Časovnik**
- Za vsako vprašanje je na voljo 10-sekundni časovnik.
- Če čas poteče, se odgovor samodejno odda, in prikaže se pravilen odgovor.

### 5. **Beleženje rezultatov**
- Sledi številu pravilnih odgovorov.
- Na koncu kviza prikaže končni rezultat.

### 6. **Prilagodljiva zasnova**
- Stilizirana s CSS za privlačno uporabniško izkušnjo.
- Popolnoma odzivna in prilagojena različnim velikostim zaslonov.

### 7. **Ponovni zagon**
- Ob koncu kviza lahko uporabniki znova zaženejo igro in igrajo z novimi naključno izbranimi vprašanji.

---

## Struktura datotek

### 1. `index.html`
- Vsebuje strukturo aplikacije, vključno z začetnim zaslonom, vsebnikom za vprašanja in zaslonom z rezultati.
- Vključuje ključne elemente, kot so:
  - Gumb za začetek igre
  - Drsnik za izbiro števila vprašanj
  - Možnosti odgovorov
  - Časovnik
  - Prikaz rezultatov

### 2. `styles.css`
- Določa vizualni videz aplikacije, vključno z:
  - Ozadji z gradientom
  - Slogi gumbov s hover in aktivnimi učinki
  - Dinamične razrede za pravilne in napačne odgovore
  - Odzivnimi postavitvami za različne velikosti zaslonov

### 3. `index.js`
- Vsebuje osnovno funkcionalnost aplikacije, vključno z:
  - Obdelavo uporabniškega vnosa z drsnikom.
  - Naključnim prikazovanjem vprašanj.
  - Upravljanjem časovnika za vsako vprašanje.
  - Preverjanjem in točkovanjem odgovorov.
  - Označevanjem izbranih, pravilnih in napačnih odgovorov.
  - Upravljanjem prehodov stanja igre (npr. začetek, konec in ponovni zagon igre).

---

## Kako deluje

1. **Začetni zaslon**
   - Uporabnik nastavi število vprašanj z drsnikom.
   - Klik na "Začni igro" inicializira kviz.

2. **Zaslon za vprašanja**
   - Prikazuje trenutno vprašanje in odgovore.
   - Uporabniki izberejo možnost in kliknejo "Preveri," da oddajo odgovor.
   - Povratne informacije so podane, igra pa preide na naslednje vprašanje.

3. **Časovnik**
   - Odšteva 10 sekund za vsako vprašanje.
   - Če čas poteče, se odgovor samodejno odda.

4. **Zaslon z rezultati**
   - Prikaže število pravilnih odgovorov in omogoča ponovni zagon igre.

---

## Možne izboljšave
- Dodaj večjo bazo vprašanj ali poveži aplikacijo z zunanjim API-jem za dinamično pridobivanje vprašanj.
- Uvedi uporabniške račune in shranjevanje rezultatov za lestvico najboljših.
- Ponuja namige ali razlage za napačne odgovore.

---

## Kako zaženem aplikacijo
1. Odpri `index.html` v kateremkoli sodobnem spletnem brskalniku.
2. Prilagodi drsnik, klikni "Začni igro" in uživaj v kvizu!
3. Prepričaj se, da sta datoteki `index.js` in `styles.css` v isti mapi za pravilno delovanje in stilizacijo.
