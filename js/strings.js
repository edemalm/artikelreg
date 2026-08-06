"use strict";

console.debug('Loading strings.js');

// 1. Artikelbenämning, beskrivning och produkt
var helper_artikelbenamning = "Följ beslutad struktur. Se hjälpavsnitt för mer information.";
var helper_beskrivning = "Du kan ange en längre artikelbeskrivning som mer utförligt beskriver hjälpmedlets funktion, konfiguration eller andra egenskaper. Skriv \"Lämna tomt\" för att vara utan beskrivning, annars kan leverantörens beskrivning från Hjälpmedelstjänsten användas.";
var helper_standardprodukt = "Se hjälpavsnitt för mer information";

// 2. Leverantör

// 3. Ansvarigt team
var helper_team = "Detta val kallas Sektor i Sesam";

// 4. Ekonomi
var helper_artikeltyp = "Välj artikeltyp hos DHC. Denna kan avvika från leverantörens artikeltyp i Hjälpmedelstjänsten.";
var helper_artikeltyp_h = "Ett huvudhjälpmedel är ett komplett fungerande hjälpmedel";
var helper_artikeltyp_t = "Ett tillbehör ger extra funktionalitet hos ett huvudhjälpmedel";
var helper_artikeltyp_r = "En reservdel används för att laga och underhålla huvudhjälpmedel och tillbehör";
var helper_debiteringsform = "Välj hur DHC tar betalt för denna artikel";
var helper_debiteringsform_m = "Kunden betalar en löpande månadshyra under hela hyresperioden";
var helper_debiteringsform_a = "Kunden betalar hela försäljningspriset och äger sedan artikeln";
var helper_inventarium_on = "Artikeln är ett hyreshjälpmedel vars anskaffningskostnad fördelas under dess avskrivningstid";
var helper_inventarium_off = "Gäller endast huvudhjälpmedel för uthyrning";
var helper_avskrivningstid_on = "Välj inventariens avskrivningstid";
var helper_avskrivningstid_off = "Gäller endast inventarier";

// 5. Individinställningar
var helper_individartikel = "Gäller endast huvudhjälpmedel";
var helper_individartikel_on = "Hjälpmedlet är individmärkt och spårbart med en egen transaktionshistorik";
var helper_individartikel_off = "Hjälpmedlet är inte individmärkt och därmed ej spårbart";
var helper_serienummer = "Gäller endast individartiklar";
var helper_serienummer_on = "Serienummer måste anges vid registrering av individ";
var helper_serienummer_off = "Hjälpmedlet saknar serienummer";
var helper_haraldrigkomp = "Gäller endast individartiklar";
var helper_haraldrigkomp_on = "Komponenter kan aldrig kopplas till detta hjälpmedel";
var helper_haraldrigkomp_off = "Komponenter kan kopplas till detta hjälpmedel";
var helper_dm = "Gäller endast individartiklar hos PMB";
var helper_dm_on = "Hjälpmedlet har driftsmätare på individkortet (enhet timmar)";
var helper_dm_off = "Hjälpmedlet har ej driftsmätare";

// 6. Visma webSesam
var helper_wspub_on = "Artikeln visas och är sökbar";
var helper_wspub_off = "Artikeln visas inte";
var helper_wsbb_on = "Artikeln kan beställas. Uttag från eget kundlager kan registreras.";
var helper_wsbb_off = "Artikeln kan inte beställas. Uttag från eget kundlager kan inte registreras.";
var helper_wssort =	"Gäller endast publicerade artiklar";
var helper_wssort_on =	"Artikeln tillhör ordinarie sortiment";
var helper_wssort_off = "Artikeln tillhör övrigt sortiment";
// var helper_wskomp = "Gäller endast tillbehör";
// var helper_wskomp_on = "Artikeln kan beställas som komponent till ett hjälpmedel";
// var helper_wskomp_off = "Artikeln kan inte beställas som komponent till ett hjälpmedel";
var helper_wsinfo = "Vid behov ange extra artikelinformation som visas för artikeln i webSesam";

// 7. Lagerhållning
var helper_inkopshantering = "Välj en rekommenderad inköpshantering på valt huvudlager";
var helper_inkopshantering_k = "Artikeln är en beställningsvara. Inköp sker då kundorder finns.";
var helper_inkopshantering_n = "Artikeln är lagerlagd. Inköp sker till lager.";
var helper_liggplats ="Ange en liggplats på valt huvudlager om den är känd i förväg";
var helper_buffertlager = "Ange buffertlager, säkerhetslager och eventuell liggplats på buffertlagret. Buffertlagret försörjs av huvudlagret med hjälp av automatisk lagerpåfyllnad.";
var placeholder_buffertlager = "Lager 220, 3 st, 31-A-123";

// 8. Hantering vid ankomst
var helper_gmi = "Vid behov kan en kortfattad text anges som visas för lagerpersonalen vid godsmottagning";
var placeholder_gmi = "Placera individetiketten på vänster sida. Skruva fast nackstödet.";
var helper_kk_on = "Artikeln ska kontrolleras och godkännas";
var helper_kk_off = "Artikeln har ej kvalitetskontroll";
var helper_kkb = "Beskriv kortfattat vad som skall kontrolleras och av vem. Texten skrivs ut på kvalitetskontrollsunderlaget.";
var placeholder_kkb = "Till SST-tekniker för kontroll av svetsfogar";

// 9. Service och underhåll

// 10. Informationstexter
var helper_iki = "Vid behov kan en kortfattad text anges som visas för orderhandläggaren vid registrering av orderrad";
var placeholder_iki = "Beställning ska alltid handläggas av konsulent";
var placeholder_iki_02 = "Beställning ska alltid handläggas av konsulent i Elrullstolsteamet";
var placeholder_iki_03 = "Beställning ska alltid handläggas av konsulent i Habteamet";
var placeholder_iki_05 = "Beställning ska alltid handläggas av konsulent i KLOK-teamet";
var placeholder_iki_07 = "Beställning ska alltid handläggas av konsulent i PMB-teamet";
var placeholder_iki_08 = "Beställning ska alltid handläggas av konsulent i SST-teamet";
var placeholder_iki_09 = "Beställning ska alltid handläggas av konsulent i ADL-teamet";
var placeholder_iki_10 = placeholder_iki_09;
var placeholder_iki_11 = placeholder_iki_08;
var helper_ipi = "Vid behov kan en kortfattad text anges som visas för lagerpersonalen vid plockning";
var placeholder_ipi = "Hjälpmedlet behöver laddas före utleverans";
var helper_iri_on = "Vid behov kan en kortfattad text anges som visas för returpersonalen vid returtagning";
var helper_iri_off = "Gäller endast huvudhjälpmedel";
var placeholder_iri ="Ska bedömas av tekniker före eventuell rekonditionering";
var placeholder_iri_05 ="Retur till lager 612. Rekonditioneras av KLOK.";
var placeholder_iri_07 ="Retur till lager 613. Rekonditioneras av PMB.";

// 11. Övriga upplysningar
var helper_upplysningar = "Vid behov ange övrig information till inköpspersonalen";
var placeholder_upplysningar = "Artikeln ska ingå i ersättningsgrupp med ...";
