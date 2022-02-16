# Specs

<sup>eCat versie: 2.0</sup>  
<sup>Auteur: SoftNaert</sup>

## Inleiding

Artikelbeheer voor de meubelwinkels is een grote uitdaging. Ze hebben veel leveranciers, met vaak
complexe producten. Steeds vaker wil de winkel in zijn software (eMeubel in dit geval) beschikken
over alle artikel informatie. Zodat de klant correct geïnformeerd kan worden (in winkel, op website,
…), maar ook alle medewerkers over alle info beschikken.
Voor het uitwisselen van eenvoudige (platte) artikelstructuur, kan een gewone Excel (CSV) volstaan.
Voor artikelen met opties, configureerbare artikelen, is dit niet zo eenvoudig. Binnen eMeubel
hebben we een XML formaat gedefinieerd, waarin het mogelijk is om zo’n complexe structuur te
definiëren.
Een leverancier die vanuit zijn ERP deze XML kan opbouwen, kan dit rechtstreeks naar de winkel
sturen. De winkel kan dit dan inladen en heeft alle correcte artikelinformatie. Hiervoor werken we
dus niet met een EDI platform dat voor de communicatie zorgt.
Voor leveranciers die niet in de mogelijkheid zijn om zelf deze XML op te bouwen, zijn er 2
mogelijkheden:

- Wij maken een conversie tool op basis van de beschikbare gegevens
- De leverancier beheert zijn catalogus manueel via ons programma ‘eCat’. (Dit wordt
  momenteel al door veel winkels gebruikt om zelf catalogi op te bouwen.)

Indien de leverancier zelf hun catalogi nog wil bekijken vooraleer deze door te sturen naar de
winkels. Of indien hij aan de catalogus nog zaken wil toevoegen (bv multimedia). Dan kan dit ook via
ons ‘eCat’ programma.
De detaillist op zijn beurt, kan dan zijn aankooporders via email of FTP doorsturen naar de
leverancier. De email bevat 2 bijlagen: het order als pdf bestand en het order in XML formaat. Dit
XML order kan door de leverancier worden ingelezen in zijn ERP systeem.
In dit document focussen we ons op de opbouw van de XML catalogus. De structuur van de XML
catalogus leunt aan bij hoe een catalogus in CSA Pricat (EDIFACT) opgebouwd wordt.

## Opbouw

### Basisopbouw

```xml
<catalog>
    <General>…</General>
        <OptionGTINDefinitions>…</OptionGTINDefinitions>
        <ValueGTINDefinitions>…</ValueGTINDefinitions>
    <Programs>…</Programs>
</catalog>
```

### General

Bevat algemene catalogus informatie, zoals bijvoorbeeld de afzender (=leverancier),geldigheidsdatums,
De ID’s van zowel leverancier als detaillist moeten éénduidig zijn. Indien via een EDI platform gewerkt wordt, is een GLN globallocationnumber, 13 cijfers) noodzakelijk en zal het nummer uniek zijn (maar dan moet u lid worden van GS1,…).
Voor leverancier of detaillisten die niet op deze ‘officiële’ manier werken, stellen wij voor te werken met 2000000000000 (= GLN nummerreeks voor intern gebruik) + telefoonnummer. Bv telefoonnummer Soft-Naert is 32 51 30 85 37 dus ID voor SoftNaert wordt dan 2003251308537. Dit zal ook uniek zijn. Deze informatie zal tussen de communicerende partijen moeten uitgewisseld worden.Currency zijn de muntcodes van de catalogus. Dit zijn ISO codes. SalesPrice = detaillistenprijs excl. VAT, RetailPrice = consumentenverkoopprijs incl. VAT. DefaultLanguage is de standaardtaal van de catalogus (dus van de omschrijvingen van artikel, optie, waarden,…). Dit moet een ISO taalcode zijn.

Voorbeeld:

```xml
<General>
    <Sender>
        <ID>2003151308537</ID>
        <Name>Leverancier</Name>
        <GLN>2003251308537</GLN>
    </Sender>
    <Version>Catalog v201106</Version>
    <Validfrom>20110101</Validfrom>
    <Validto>20111231</Validto>
    <Currency>
        <SalesPrice>EUR</SalesPrice>
        <RetailPrice>EUR</RetailPrice>
    </Currency>
    <Settings>
        <DefaultLanguage>NL</DefaultLanguage>
    </Settings>
</General>
```

### GTIN

Ieder item (optie, keuze, artikel,…) in de catalogus heeft een uniek nummer, genaamd GTIN (Global Trade Item Number). Indien uitwisseling van gegevens gebeurt, is het noodzakelijk dat dit een uniek nummer is binnen de catalogus van een leverancier.
De EAN codering is 1 manier om zo’n unieke nummerreeks te verkrijgen. Indien men compatibel wil zijn met andere platformen is het noodzakelijk om zo’n (EAN-13) nummerreeks aan te kopen (en zich dus bij GS1 aan te sluiten). Indien er alleen communicatie is met eMeubel, hoeft deze aansluiting niet. Wel moet u zorgen dat 2 verschillende items binnen uw catalogus niet hetzelfde GTIN hebben!

### OptionGTINDefinitions

Dit zijn de definities van alle opties (ook vraagstelling genoemd). Voorbeelden van opties zijn: ‘uitvoering’, ‘kleur’,’poten’,’Zitcomfort’, ’Lengte’,... De definitie bestaat uit een code (GTIN) en een omschrijving. Ook omschrijvingen in andere talen worden hier opgegeven. De code wordt verder in de catalogus gebruikt (en niet de omschrijving). Ook in eMeubel speelt deze code een belangrijke rol. Het voordeel is dat de omschrijving kan wijzigen, zonder dat dit wordt aanzien als een ‘nieuw’ artikel (omdat de code nog hetzelfde blijft). Verder kan ook nog de referentie van de leverancier worden opgegeven. Als deze gelijk
is aan de code van de optie, is het niet noodzakelijk om deze op te geven. De opties worden dus globaal gedefinieerd en zijn nog niet gerelateerd aan een artikel. Opties kunnen ook al waarden hebben, deze gelden dan altijd en overal waar deze optie
gebruikt wordt, en moeten niet op artikelniveau worden herhaald. Bij deze waarden kan ook de sorteervolgorde toegekend worden (order) en ook aangegeven worden als de waarde als de standaardwaarde is (default). De sorteervolgorde is een numerieke waarde tussen 0 en 999. Indien geen sortering is opgegeven, is de sortering alfabetisch op omschrijving van de optie. Opgepast: het is niet mogelijk om bij deze waarden hier (onder de OptionDefinition) nog eens subwaarden te definiëren.

Voorbeeld:

```xml
<OptionGTINDefinitions>
    <OptionDefinition>
        <GTIN>5412345000001</GTIN>
        <Description>Comfort</Description>
        <Description language="FR">Comfort</Description>
        <Reference>5412345000001</Reference>
        <Values>
            <Value order="010"default="true">5412345000003</Value>
            <Value order="020">5412345000033</Value>
        </Values>
    </OptionDefinition>
    <OptionDefinition>
        <GTIN>5412345000004</GTIN>
        <Description>Stof/Kleur</Description>
        <Description language="FR">Tissue</Description>
        <Reference>5412345000004</Reference>
    </OptionDefinition>
    <OptionDefinition>
        <GTIN>5412345000021</GTIN>
        <Description>Breedte</Description>
        <Description language="FR">Largeur</Description>
        <Reference>5412345000021</Reference>
    </OptionDefinition>
    <OptionDefinition>
        <GTIN>5412345000022</GTIN>
        <Description>Lengte</Description>
        <Description language="FR">Longueur</Description>
        <Reference>5412345000022</Reference>
    </OptionDefinition>
</OptionGTINDefinitions>
```
