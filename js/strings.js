console.debug('Loading strings.js');

// 1. Artikelbenämning och produkt
let helper_artikelbenamning = "Följ beslutad struktur för artikelbenämning. Se hjälpavsnitt för mer information.";
let helper_standardprodukt = "Se hjälpavsnitt för mer information";
let helper_artikelbenamning_array = [
	'Rullstol SpeedKing sb45 sd50 silver inkl arm- o benstöd',
	'Arbetsstol Ergomax h/s h45-65 trögrullande hjul blå',
	'Hjullyft HaulMaster exkl lyftbygel 250kg',
	'Kryckkäpp GåLätt h85-125 inkl isdubb',
	'Hygienstol PoopEasy tb55 inkl stänkskydd 130kg',
	'Sittdyna SuperSoft 45x45 inkl hygienöverdrag',
	'Inhalator AirMan portabel 12V/220V',
	'Kalender HandyPad 24 timmar talande inkl batteriladdare',
	'Rollator SpeedStepper b62 fyra stora hjul exkl korg',
	'Kontaktlins ClearVision flergångs 10-pack',
	'Madrass UltraComfy 90x200x12 m bomullsöverdrag'
];

// 2. Leverantör

// 3. Ansvarigt team

// 4. Ekonomi
let helper_artikeltyp = "Välj artikeltyp hos DHC. Denna kan avvika från leverantörens artikeltyp i Hjälpmedelstjänsten.";
let helper_artikeltyp_h = "Ett huvudhjälpmedel är ett komplett fungerande hjälpmedel";
let helper_artikeltyp_t = "Tillbehör ger extra funktionalitet hos ett huvudhjälpmedel";
let helper_artikeltyp_r = "Reservdelar används för reparation och underhåll av huvudhjälpmedel och tillbehör";
let helper_debiteringsform = "Välj hur DHC tar betalt för denna artikel";
let helper_debiteringsform_m = "Kunden betalar en löpande månadshyra under hela hyresperioden";
let helper_debiteringsform_a = "Kunden betalar hela försäljningspriset en gång och äger sedan artikeln";
let helper_inventarium_on = "Artikeln är ett hyreshjälpmedel vars anskaffningskostnad fördelas under dess avskrivningstid";
let helper_inventarium_off = "Artikeln är ingen inventarie";
let helper_avskrivningstid_on = "Välj inventariens avskrivningstid";
let helper_avskrivningstid_off = "Parametern gäller endast inventarier";

// 5. Individinställningar
let helper_individartikel = "Parametern gäller endast huvudhjälpmedel";
let helper_individartikel_on = "Hjälpmedlet är individmärkt och spårbart med en egen transaktionshistorik";
let helper_individartikel_off = "Hjälpmedlet är inte individmärkt och därmed ej spårbart";
let helper_serienummer = "Parametern gäller endast individartiklar";
let helper_serienummer_on = "Serienummer måste anges vid registrering av individ";
let helper_serienummer_off = "Hjälpmedlet saknar serienummer";
let helper_haraldrigkomp = "Parametern gäller endast individartiklar";
let helper_haraldrigkomp_on = "Komponenter kan aldrig kopplas till detta hjälpmedel";
let helper_haraldrigkomp_off = "Komponenter kan kopplas till detta hjälpmedel";
let helper_dtm = "Parametern gäller endast individartiklar";
let helper_dtm_on = "Hjälpmedlet har drifttidsmätare i Sesam (enhet timmar)";
let helper_dtm_off = "Hjälpmedlet har ej drifttidsmätare i Sesam";

// 6. Visma webSesam
let helper_wspub_on = "Artikeln visas och är sökbar";
let helper_wspub_off = "Artikeln visas inte";
let helper_wsbb_on = "Artikeln kan beställas. Uttag från eget kundlager kan registreras.";
let helper_wsbb_off = "Artikeln kan inte beställas. Uttag från eget kundlager kan inte registreras.";
let helper_wssort_on =	"Artikeln ingår i ordinarie sortiment och visas vid artikelsökning";
let helper_wssort_off = "Artikeln tillhör övrigt sortiment och visas inte som standard vid artikelsöknig";
let helper_wskomp = "Parametern gäller endast tillbehör";
let helper_wskomp_on = "Artikeln kan beställas som komponent till ett hjälpmedel";
let helper_wskomp_off = "Artikeln kan inte beställas som komponent till ett hjälpmedel";
let helper_wsinfo = "Vid behov, ange extra artikelinformation som visas för artikeln i webSesam";

// 7. Lagerhållning
let helper_inkopshantering = "Ange en rekommenderad inköpshantering";
let helper_inkopshantering_k = "Artikeln är en beställningsvara. Inköp sker då behov finns.";
let helper_inkopshantering_n = "Artikeln är lagerlagd. Inköp sker till lager.";
let helper_liggplats ="Ange en liggplats om den är känd i förväg";
let helper_buffertlager = "Ange buffertlager, säkerhetslager och eventuell liggplats på buffertlagret";
let placeholder_buffertlager = "Exempel: Lager 220, 3 st, 31-A-123";

// 8. Hantering vid ankomst
let helper_gmi = "Ange en kortfattad text som visas för lagerpersonalen vid godsmottagning";
let placeholder_gmi = "Exempel: Placera individetiketten på vänster sida. Skruva fast nackstödet.";
let helper_kk_on = "Artikeln ska kontrolleras och godkännas";
let helper_kk_off = "Artikeln har ej kvalitetskontroll";
let helper_kkb = "Beskriv kortfattat vad som skall kontrolleras och av vem. Texten skrivs ut på kvalitetskontrollsunderlaget.";
let placeholder_kkb = "Exempel: Till SST-tekniker för kontroll av svetsfogar";

// 9. Service och underhåll

// 10. Informationstexter
let helper_iki = "Vid behov, ange en kortfattad text som visas för orderhandläggaren vid registrering av orderrad";
let placeholder_iki ="Exempel: Skall alltid handläggas av konsulent";
let helper_ipi = "Vid behov, ange en kortfattad text som visas för lagerpersonalen vid plockning";
let placeholder_ipi = "Exempel: Hjälpmedlet behöver laddas före utleverans";
let helper_iri_on = "Vid behov, ange en kortfattad text som visas för returpersonalen vid returtagning. Det är möjligt att formattera texten med avvikande färg och layout för ökad tydlighet. Se exempel i hjälpavsnittet.";
let helper_iri_off = "Parametern gäller endast huvudhjälpmedel och tillbehör";
let placeholder_iri ="Exempel: Skall bedömas av tekniker före eventuell rekonditionering.";
let placeholder_iri_05 ="Exempel: Retur till lager 612. Rekonditioneras av KLOK.";
let placeholder_iri_07 ="Exempel: Retur till lager 613. Rekonditioneras av PMB.";

// 11. Övriga upplysningar
let helper_upplysningar = "Vid behov, ange övrig information till inköpspersonalen";
let placeholder_upplysningar = "Exempel: Artikeln ska ingå i ersättningsgrupp med ...";
