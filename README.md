# Dokumentační systém Slezské Diakonie
*Aplikace pro dokumentaci je rozpracovaná s chybějícími featurami, některé sekce nebudou kompletní z důvodu dodělávání projektu v dalším semestru*

Dokumentační systém Slezské Diakonie (dále SD) je aplikace sloužící jako evidence zaměstanců pro tuto organizaci. Mezi hlavní funkcionality patří možnost ukládání .pdf dokumentů patřící k jednotlivým zaměstnancům na server z prostřednictví webové aplikace. Dále také mazání této dokumentace a celkově nabízí přehled dokumentů celé organizace z pohledu jednotlivých zaměstnanců.

## Technické specifikace

### Databáze  a přihlašování do databáze
Na serveru běží databáze MySQL
- Login: Root
- Heslo: sd_S6253_dx

### Využité programy programy
- Xampp pro zprovoznění modulů (Tomcat, Apache, MySQL)
- IntelliJ Idea (IDE pro zapnutí aplikačního serveru)
- Node.js (správa frontendového kódu)
- Jakýkoliv lightweight textový editor s možností příkazového řádku (VS Code, Sublime text)
- Postman pro testování HTTP požadavků
- Github desktop klient nebo MINGW64 pro manipulaci s git repozitářem

### Architektura
Část aplikace přímo komunikující s uživatelem (frontend) je tvořená pomocí javascriptového frameworku React pro tvorbu dynamických webových aplikací, UI je tvořeno CSS frameworkem Ant design.
Backend využívá technologie jako je dříve zmíněná databáze MySQL společně s frameworkem Spring boot 2.4 s Javou verze 15

![image](https://user-images.githubusercontent.com/61951915/150696097-029acbd0-4921-40f6-a69d-4bcaf2010998.png)

### Frontend struktura

![image](https://user-images.githubusercontent.com/61951915/150696243-d032dc86-0525-49e5-9230-636dcf7c6cee.png)

### Backend struktura

![image](https://user-images.githubusercontent.com/61951915/150696348-90101bcb-b7e6-4278-b3b0-2044e5236343.png)
