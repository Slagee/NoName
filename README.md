# Dokumentační systém Slezské Diakonie
*Aplikace pro dokumentaci je rozpracovaná s chybějícími featurami. Některé sekce nebudou kompletní z důvodu dodělávání projektu v dalším semestru.*

Dokumentační systém Slezské Diakonie (dále SD) je aplikace sloužící jako evidence zaměstnanců pro tuto organizaci. Mezi hlavní funkcionality patří možnost ukládání .pdf dokumentů patřící k jednotlivým zaměstnancům na server prostřednictvím webové aplikace a také jejich následné mazání. Taktéž nabízí přehled dokumentů celé organizace z pohledu jednotlivých zaměstnanců.

## Technické specifikace

### Databáze a přihlašování do databáze
Na serveru běží databáze MySQL
- Login: Root
- Heslo: sd_S6253_dx

### Využité programy programy
- Xampp pro zprovoznění modulů (Tomcat, Apache, MySQL)
- IntelliJ Idea (IDE pro zapnutí aplikačního serveru)
- Node.js (správa frontendového kódu)
- jakýkoliv lightweight textový editor s možností příkazového řádku (VS Code, Sublime text)
- Postman pro testování HTTP požadavků
- Github desktop klient nebo MINGW64 pro manipulaci s git repozitářem

### Architektura
Část aplikace přímo komunikující s uživatelem (frontend) je tvořená pomocí javascriptového frameworku React pro tvorbu dynamických webových aplikací, UI je tvořeno CSS frameworkem Ant design.
Backend využívá technologie jako je dříve zmíněná databáze MySQL společně s frameworkem Spring boot 2.4.1 s Javou běžící na openJDK 17.0.1.

![image](https://user-images.githubusercontent.com/61951915/150696097-029acbd0-4921-40f6-a69d-4bcaf2010998.png)

### Frontend struktura

![image](https://user-images.githubusercontent.com/61951915/150696243-d032dc86-0525-49e5-9230-636dcf7c6cee.png)

- index.js - "inicializační" soubor, zaslaný do prohlížeče uživatele jako první prvek, jeho podřazené prvky (například App.js) se načítají kaskádově
- App.js - Tento soubor obsahuje definice rozhraní a routing pro zobrazení obsahu aplikace, tedy jednotlivých funkcí
- /components/layout - Prvky které se zobrazují uživateli nezávisle na zrovna zvolené funkci
- /components/login - login screen s asynchronní funkcí pro potvrzení přihlášení
- /components/home - Hlavní komponenta, obsahuje náhled na seznam zaměstnanců a asynchronní funkce pro získání tohoto seznamu ze serveru
- ostatní adresáře v /components/ jsou komponenty poskytující ostatní funkce, detail zaměstnance, jeho edit a podobně
- /services/ - adresář s funkcemi pro komunikaci s backendem - obsahuje tedy http požadavky, např. přihlášení uživatele, http požadavek pro stažení souboru apod. Zároveň tyto funkce mohou, ale nemusí být využity v komponentech, které jim dále poskytují vyšší funkcionalitu.

### Backend struktura

![image](https://user-images.githubusercontent.com/61951915/150696348-90101bcb-b7e6-4278-b3b0-2044e5236343.png)

## Použití aplikace

**Login Screen**
![image](https://user-images.githubusercontent.com/61951915/151391602-71ee27d5-71e5-41c5-bbab-7abbc6a8f22d.png)
Na „Login screenu/Přihlašovací stránce“ se uživatel/administrátor přihlásí do systému pomocích svých přihlašovacích údajů a potvrdí tlačítkem „Přihlásit se“.
Pokud je přihlášení úspěšné uživatel/administrátor je přesměrovaný na „Main page/Hlavní stránku“.
V případě chybného jména nebo hesla vyskočí validátory pro upozornění.

**Main Page**
![image](https://user-images.githubusercontent.com/61951915/151391782-ade4312f-fb1c-4af8-a9b7-b76352fd11e6.png)
Na hlavní stránce uživatel/administrátor může pomocí vyhledávacího okna vyhledat zaměstnance pomocí jména/příjmení.
Dále si může zobrazit detaily o konkrétním zaměstnanci pomocí tlačítka zobrazit, které se nachází u jednotlivých zaměstnanců.
Při volbě tlačítka „Zobrazit“ systém přesměruje uživatele/administrátora na stránku „Detail existujícího zaměstnance“.
Chce-li uživatel/administrátor přidat nového zaměstnance, stiskne tlačítko „Přidat zaměstnace“, systém přesměruje uživatele/administrátora na stránku „Přidání nového zaměstnance“. 

**Přidání nového zaměstnance**
![image](https://user-images.githubusercontent.com/61951915/151391894-7254cb9c-013e-420b-9189-a94cf71d8338.png)
Uživatel vyplní následující údaje: jméno, příjmení, středisko a rodné číslo.
Provedené akce potvrdí tlačítkem „Uložit“.

**Detail existujícího zaměstnance**
![image](https://user-images.githubusercontent.com/61951915/151392107-0ca7e486-211e-4850-9a00-d6d997cf29e7.png)
Pokud uživatel/administrátor zvolil na „Hlavní stránce“ tlačítko „Zobrazit“, systém přesměruje uživatele/administrátora na stránku „Detail existujícího zaměstnance“.
Na této stránce se zobrazí následující informace o uživateli: jméno, příjmení, rodné číslo, středisko a soubory vztahující se k jednotlivému zaměstnanci.
Uživatel/administrátor může stahovat jednotlivé soubory.
V případě potřeby změny údajů nebo souborů uživatel/administrátor vybere tlačítko „Upravit“, díky kterému je systém přesměruje na stránku „Úprava existujícího zaměstnance“.

**Úprava existujícího zaměstnance**
![image](https://user-images.githubusercontent.com/61951915/151392190-e7fd12da-9477-4396-a786-ec4cdd36cd0a.png)
Na této stránce může uživatel/administrátor měnit potřebné atributy: jméno, příjmení, rodné číslo, středisko, ale i soubory.
Nebo pokud je potřeba smazat daného zaměstnance, vybere uživatel/administrátor tlačítko „Odstranit“, které se nachází dole vedle tlačítka „Uložit“.
Se soubory se můžou provádět následující operace:
  -	zaškrtnutím radio buttonu, které zajistí, že se jedná o soubor v rámci projektu, kde tato volba slouží pro speciální nastavování a změnu datumu skartace
  -	odstranění souboru pomocí tlačítka „Odstranit“
  -	přidání nových souborů pomocí políčka pro nahrání nových souborů


