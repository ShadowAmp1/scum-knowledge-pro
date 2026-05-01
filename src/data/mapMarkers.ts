export type MapMarker = {
  name: string;
  type: "Бункер" | "Торговец" | "Транспорт" | "Лут" | "База";
  sector: string;
  x: number;
  y: number;
  note: string;
};

export const mapMarkers: MapMarker[] = [
  { name: "Бункер A1", type: "Бункер", sector: "A1", x: 18, y: 24, note: "Военный фарм, высокий риск." },
  { name: "Бункер C2", type: "Бункер", sector: "C2", x: 49, y: 42, note: "Редкий лут, нужна подготовка." },
  { name: "Бункер Z3", type: "Бункер", sector: "Z3", x: 74, y: 76, note: "Средний риск, хороший PvE маршрут." },
  { name: "Промзона", type: "Лут", sector: "B2", x: 38, y: 55, note: "Болты, инструменты, ремкомплекты." },
  { name: "Гаражи", type: "Транспорт", sector: "C1", x: 58, y: 30, note: "Шанс деталей и транспорта." },
  { name: "Место под базу", type: "База", sector: "B3", x: 44, y: 72, note: "Удобно для PvE дуо и гаража." }
];
