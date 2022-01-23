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

### Architektura
Část aplikace přímo komunikující s uživatelem (frontend) je tvořená pomocí javascriptového frameworku React pro tvorbu dynamických webových aplikací, UI je tvořeno CSS frameworkem Ant design.
Backend využívá technologie jako je dříve zmíněná databáze MySQL společně s frameworkem Spring boot 2.4 s Javou verze 15

### Frontend struktura

### Backend struktura
