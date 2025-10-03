console.log('Loading strings.js');

let helper_artikelbenamning = "Följ beslutad struktur för artikelbenämning. Se hjälpavsnitt för mer information.";

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

let helper_standardprodukt = "Se hjälpavsnitt för mer information";

let helper_artikeltyp = "Välj artikeltyp hos DHC. Denna kan avvika från leverantörens artikeltyp i Hjälpmedelstjänsten.";
let helper_artikeltyp_h = "Ett huvudhjälpmedel är ett komplett fungerande hjälpmedel";
let helper_artikeltyp_t = "Ett tillbehör utökar funktionaliteten hos ett huvudhjälpmedel";
let helper_artikeltyp_r = "En reservdel används för reparationer och underhåll ett huvudhjälpmedel eller tillbehör";

let helper_debiteringsform = "Välj hur DHC tar betalt för denna artikel";
let helper_debiteringsform_m = "Kunden betalar en löpande månadshyra under hela hyresperioden";
let helper_debiteringsform_a = "Kunden betalar hela försäljningspriset en gång och äger sedan artikeln";

let helper_inventarium = "Ett huvudhjälpmedel för uthyrning vars anskaffningskostnad fördelas under dess avskrivningstid";

let helper_individartikel_on = "Hjälpmedlet är individmärkt och därmed spårbart samt har en egen transaktionshistorik";
let helper_individartikel_off = "Hjälpmedlet är inte individmärkt och därmed ej spårbart";

let helper_serienummer_on = "Serienummer måste anges vid registrering av individ";
let helper_serienummer_off = "Hjälpmedlet saknar serienummer";

let helper_har_aldrig_komp_on = "Komponenter kan ej kopplas till detta huvudhjälpmedel";
let helper_har_aldrig_komp_off = "Komponenter kan kopplas till detta huvudhjälpmedel";

let helper_dtm_on = "Hjälpmedlet har drifttidsmätare i Sesam (enhet timmar)";
let helper_dtm_off = "Hjälpmedlet har ej drifttidsmätare i Sesam";