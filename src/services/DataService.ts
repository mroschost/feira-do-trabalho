/// <reference types="vite/client" />
import {
  Edition,
  EditionSlug,
  Highlights,
  Schedule,
  Gallery,
  News,
  IDataService,
  ScheduleDay,
  GalleryPhoto,
  NewsItem,
} from "../types";

// === JSON loader (Vite) ============================================
// Fonte de verdade: /src/data/editions.json, /src/data/schedule.json, /src/data/news.json
// Highlights agora são derivados da programação do dia.

const __DATA__: Record<string, unknown> = (import.meta as any).glob("/src/data/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;


/**
 * Loader "obrigatório": garante que o app falha cedo caso o JSON não exista.
 * Use para arquivos que são fonte de verdade (ex.: editions.json).
 */
function requireJson<T>(basename: string): T {
  const key = Object.keys(__DATA__).find((k) => k.endsWith(`/${basename}.json`));
  if (!key || __DATA__[key] == null) {
    throw new Error(
      `[DataService] Missing required data file: /src/data/${basename}.json`
    );
  }
  return __DATA__[key] as T;
}

/**
 * Valida integridade mínima do editions.json:
 * - slug único
 * - exatamente 1 edição marcada como current
 */
function validateEditions(editions: Edition[]): void {
  const slugs = editions.map((e) => e.slug);
  const unique = new Set(slugs);
  if (unique.size !== slugs.length) {
    throw new Error("[DataService] editions.json has duplicated slug(s)");
  }

  const currentCount = editions.filter((e) => e.isCurrent).length;
  if (currentCount !== 1) {
    throw new Error(
      `[DataService] editions.json must have exactly one isCurrent=true. Found: ${currentCount}`
    );
  }
}

function isRealEdition(edition: Edition | null | undefined): edition is Edition {
  return !!edition && typeof edition.slug === "string" && edition.slug.trim() !== "";
}

function isRealScheduleItem(item: any): boolean {
  if (!item || typeof item !== "object") return false;
  const time = typeof item.time === "string" ? item.time.trim() : "";
  const title = typeof item.title === "string" ? item.title.trim() : "";
  return time !== "" || title !== "";
}

function isRealScheduleDay(day: any): boolean {
  if (!day || typeof day !== "object") return false;
  const date = typeof day.date === "string" ? day.date.trim() : "";
  const items = Array.isArray(day.items) ? day.items.filter(isRealScheduleItem) : [];
  return date !== "" || items.length > 0;
}

function isRealNewsItem(item: any): boolean {
  if (!item || typeof item !== "object") return false;
  const link = typeof item.link === "string" ? item.link.trim() : "";
  return link.length > 0;
}
// ================================================================

// Função para criar deep copy congelada
function deepFreeze<T>(obj: T): Readonly<T> {
  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    const value = (obj as any)[prop];
    if (value && typeof value === "object") {
      deepFreeze(value);
    }
  });

  return obj as Readonly<T>;
}

// Helpers de cópia rasa para reduzir verbosidade
const copy = <T extends object>(obj: T): T => ({ ...obj });
const copyArr = <T extends object>(arr?: readonly T[] | null): T[] =>
  Array.isArray(arr) ? arr.map(copy) : [];

// Validação de entrada (deriva slugs de EDITIONS carregado)
function validateEditionSlug(slug: string): EditionSlug {
  if (!VALID_SLUGS.has(slug as EditionSlug)) {
    throw new Error(`Invalid edition slug: ${slug}`);
  }
  return slug as EditionSlug;
}

// Fonte de verdade: /src/data/editions.json (obrigatório)
const RAW_EDITIONS: Edition[] = requireJson<Edition[]>("editions");
const EDITIONS: Edition[] = RAW_EDITIONS.filter(isRealEdition);
validateEditions(EDITIONS);
// Conjunto pré-computado de slugs válidos (evita recriar Set a cada chamada)
const VALID_SLUGS = new Set<EditionSlug>(
  EDITIONS.map((e) => e.slug as EditionSlug)
);


const SCHEDULE_DATA: Record<EditionSlug, ScheduleDay[]> = requireJson<
  Record<EditionSlug, ScheduleDay[]>
>("schedule");

// "IMG_7147.JPG" -> "Img 7147"
function prettyFromFilename(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b(\w)/g, (m) => m.toUpperCase());
}

function parseEditionSlugStrict(slug: string): { city: string; year: number } {
  const m = slug.match(/^([a-z0-9-]+)-(\d{4})$/);
  if (!m)
    throw new Error(
      `Edition slug inválido: "${slug}" (esperado "<cidade-kebab>-<YYYY>")`
    );
  const [, cityKebab, yearStr] = m;
  const city = cityKebab
    .split("-")
    .map((s) => s[0].toUpperCase() + s.slice(1))
    .join(" ");
  return { city, year: Number(yearStr) };
}

function getTodayIsoLocalDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Varre imagens em: src/assets/images/editions/<editionSlug>/**/<arquivo>
// Aceita extensões comuns em maiúsculas e minúsculas.

export function buildGalleryData(): Record<EditionSlug, GalleryPhoto[]> {
  // ✨ cobre jpg/jpeg/png/webp/avif/gif/svg + maiúsculas
  const modules = (import.meta as any).glob(
    "/src/assets/images/editions/*/**/*.{jpg,jpeg,png,webp,avif,gif,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,SVG}",
    {
      eager: true,
      as: "url",
    }
  ) as Record<string, string>;

  const map = new Map<EditionSlug, GalleryPhoto[]>();

  for (const fullPathRaw in modules) {
    const url = modules[fullPathRaw];

    // Normaliza separador \ -> / (Windows)
    const fullPath = fullPathRaw.replace(/\\/g, "/");
    // Ex.: /src/assets/images/editions/sao-sebastiao-2025/IMG_7147.JPG
    const parts = fullPath.split("/");

    // encontra o índice da pasta "editions" e pega o próximo segmento como slug
    const idx = parts.lastIndexOf("editions");
    if (idx < 0 || idx + 1 >= parts.length) {
      console.warn("[GALLERY_DATA] Caminho inesperado:", fullPath);
      continue;
    }

    const editionSlug = parts[idx + 1] as EditionSlug;
    const filename = parts[parts.length - 1];

    const { city, year } = parseEditionSlugStrict(editionSlug);
    const alt = `${prettyFromFilename(filename)} - ${city} ${year}`;

    const photo: GalleryPhoto = { url, alt, city, year };

    if (!map.has(editionSlug)) map.set(editionSlug, []);
    map.get(editionSlug)!.push(photo);
  }

  // Ordena por URL (estável). Se quiser por nome/numero, adapte aqui.
  for (const [slug, list] of map.entries()) {
    list.sort((a, b) => a.url.localeCompare(b.url));
  }

  return Object.fromEntries(map) as Record<EditionSlug, GalleryPhoto[]>;
}

const GALLERY_DATA = buildGalleryData();

const NEWS_DATA: Record<EditionSlug, NewsItem[]> = requireJson<
  Record<EditionSlug, NewsItem[]>
>("news");

class DataService implements IDataService {
  getEditions(): Readonly<Edition[]> {
    return deepFreeze(copyArr(EDITIONS));
  }

  getCurrentEdition(): Readonly<Edition> {
    const currentEdition = EDITIONS.find((edition) => edition.isCurrent);
    if (!currentEdition) throw new Error("No current edition found");
    return deepFreeze(copy(currentEdition));
  }

  getCurrentEditionSlug(): string {
    const currentEdition = this.getCurrentEdition();
    return currentEdition.slug;
  }

  getHighlights(edition: EditionSlug): Readonly<Highlights> {
    const validatedSlug = validateEditionSlug(edition);
    const scheduleDays = copyArr(SCHEDULE_DATA[validatedSlug] || [])
      .map((d) => ({ ...d, items: copyArr(d.items).filter(isRealScheduleItem) }))
      .filter(isRealScheduleDay);

    // Destaques agora são derivados da programação do dia atual
    // Se não houver programação para hoje, usa o primeiro dia disponível.
    const today = getTodayIsoLocalDate();
    const selectedDay =
      scheduleDays.find((d) => d.date === today) || scheduleDays[0];

    if (!selectedDay) {
      return deepFreeze({
        edition: validatedSlug,
        days: [],
      });
    }

    return deepFreeze({
      edition: validatedSlug,
      days: [
        {
          date: selectedDay.date,
          image: "",
          alt: `Programação do dia ${selectedDay.date}`,
          items: copyArr(selectedDay.items),
        },
      ],
    });
  }

  getSchedule(edition: EditionSlug): Readonly<Schedule> {
    const validatedSlug = validateEditionSlug(edition);
    const days = copyArr(SCHEDULE_DATA[validatedSlug] || [])
      .map((d) => ({ ...d, items: copyArr(d.items).filter(isRealScheduleItem) }))
      .filter(isRealScheduleDay);

    return deepFreeze({
      edition: validatedSlug,
      days,
    });
  }

  getGallery(edition: EditionSlug): Readonly<Gallery> {
    const validatedSlug = validateEditionSlug(edition);
    const photos = GALLERY_DATA[validatedSlug] ?? [];
    return deepFreeze({ edition: validatedSlug, photos: copyArr(photos) });
  }

  getGalleryOld(edition: EditionSlug): Readonly<Gallery> {
    // Mantido por compatibilidade — delega para a versão nova
    return this.getGallery(edition);
  }

  getNews(edition: EditionSlug): Readonly<News> {
    const validatedSlug = validateEditionSlug(edition);
    const items = NEWS_DATA[validatedSlug] || [];

    // Remove placeholders/exemplos
    const filtered = items.filter(isRealNewsItem);

    // Retorna em ordem invertida (sem mutar a origem)
    const reversed = [...filtered].reverse();
    return deepFreeze({ edition: validatedSlug, items: copyArr(reversed) });
  }
}

export const dataService = new DataService();
