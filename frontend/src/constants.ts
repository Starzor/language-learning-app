import { IStringIndex } from "./models/IStringIndex";

export const DIFFICULTY_LIST = ["A1", "A2", "B1", "B2", "C1", "C2"];

export const LANGUAGE_LIST = [
  "Angličtina",
  "Španělština",
  "Němčina",
  "Francouzština",
  "Japonština",
  "Ruština",
];

export const LANGUAGE_MAP: IStringIndex = {
  Angličtina: "English",
  Španělština: "Spanish",
  Němčina: "German",
  Francouzština: "French",
  Japonština: "Japanese",
  Ruština: "Russian",
};

export const NON_LATIN_SCRIPT_LANGUAGES = ["Japonština", "Ruština"];

export const TOPICS = [
  "Objednávka v Restauraci",
  "Ptaní se na cestu",
  "Rezervace hotelu",
  "Překvap mě! (Náhodné téma)",
];

export const IMAGE_NAMES = [
  "00_home_screen.png",
  "01_chat_input.png",
  "02_topic_picker.png",
  "03_settings_bar.png",
  "04_message_buttons_check.png",
  "05_message_check_tab.png",
  "06_message_reform_tab.png",
  "07_message_buttons_translate.png",
  "08_translate_tab.png",
  "09_vocabulary_tab.png",
];

export const IMAGE_NOTES = [
  "Vítejte v tutoriálu pro Chatovací aplikaci pro výuku jazyků. Pro orientaci v tutoriálu použijte šipky ve spodní části obrazovky nebo klávesy šipek. Tutoriál můžete kdykoliv zavřít křížkem v pravém horním rohu.",
  "Pro spuštění konverzace napište zprávu do textového pole.",
  "Můžete si také vybrat z pár přednastavených témat, na která stačí kliknout.",
  "V panelu nastavení si můžete vybrat jazyk a úroveň jazyka. Můžete také spustit test, který vám dle vašich odpovědí na otázku určí úroveň automaticky. V levé straně panelu je tlačítko s ikonkou restartu, sloužící pro načetí nové konverzace.",
  'Zprávy uživatele obsahují dvě tlačítka: "Kontrola" a "Reformulovat".',
  'Tlačítko "Kontrola" v levém postranním panelu zobrazí případné chyby ve zprávě uživatele poté, co dostane odpověď od systému. Systém automaticky zobrazuje kontrolu pro každou novou zprávu od uživatele.',
  'Při zmáčknutí tlačítka "Reformulovat" se v levém postranním panelu zobrazí nová verze zprávy uživatele, která by měla být více syntakticky správná a jednodušší na pochopení.',
  'Zprávy systému obsahují tlačítka "Přeložit" a "Slovník".',
  'Při zmáčknutí tlačítka "Přeložit" se v pravém postranním panelu objeví překlad zprávy systému.',
  'Tlačítko "Slovník" zobrazí v pravém postranním panelu seznam slov, které systém použil ve zprávě, spolu s překladem těchto slov. Při kliknutí checkboxu vedle slova jej označíte jako nové slovo. Systém se pak bude snažit tyto slova používat častěji.',
];
