// time zone para lógica de data do carrossel
export const TIME_ZONE = "America/Sao_Paulo";

export type EditionSlug = string;

export interface ArtistSignup {
  formUrl: string;
  startDate: `${number}-${number}-${number}` | "";
  endDate: `${number}-${number}-${number}` | "";
}

export interface Edition {
  slug: EditionSlug;
  name: string;
  location?: string;
  startDate: `${number}-${number}-${number}` | ""; // ISO YYYY-MM-DD
  endDate: `${number}-${number}-${number}` | "";
  isCurrent: boolean;
  artistSignup?: ArtistSignup | null;
}

export interface HighlightDay {
  date: `${number}-${number}-${number}`; // ISO
  image: string; // URL (path local de asset permitido)
  alt: string;
  items?: ReadonlyArray<Readonly<ScheduleItem>>;
}

export interface Highlights {
  edition: EditionSlug;
  days: ReadonlyArray<Readonly<HighlightDay>>;
}

export interface ScheduleItem {
  time: string;   // "09:00", "08:00-11:00" ou "Em breve"
  title: string;
}

export interface ScheduleDay {
  date: `${number}-${number}-${number}`;
  items: ReadonlyArray<Readonly<ScheduleItem>>;
}

export interface Schedule {
  edition: EditionSlug;
  days: ReadonlyArray<Readonly<ScheduleDay>>;
}

export interface GalleryPhoto {
  url: string;  // /assets/imagens/{edition}/xx.jpg
  alt: string;
  city: string;
  year: number;
}

export interface Gallery {
  edition: EditionSlug;
  photos: ReadonlyArray<Readonly<GalleryPhoto>>;
}

export interface NewsItem {
  title: string;
  summary: string;
  image: string;  // path local em /assets/imagens/news/...
  link: string;   // URL externa
}

export interface News {
  edition: EditionSlug;
  items: ReadonlyArray<Readonly<NewsItem>>;
}

export interface IDataService {
  getCurrentEdition(): Readonly<Edition>;
  getHighlights(edition: EditionSlug): Readonly<Highlights>;
  getSchedule(edition: EditionSlug): Readonly<Schedule>;
  getGallery(edition: EditionSlug): Readonly<Gallery>;
  getNews(edition: EditionSlug): Readonly<News>;
}
