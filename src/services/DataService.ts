/// <reference types="vite/client" />
import {
  Edition,
  EditionSlug,
  Highlights,
  Schedule,
  Gallery,
  News,
  IDataService,
  HighlightDay,
  ScheduleDay,
  ScheduleItem,
  GalleryPhoto,
  NewsItem,
} from "../types";

// === JSON loader (Vite) ============================================
// Coloque os arquivos em: /src/data/editions.json, /src/data/highlights.json, /src/data/schedule.json, /src/data/news.json
const __DATA__: Record<string, unknown> = (import.meta as any).glob("/src/data/*.json", {
  eager: true,
  import: "default",
}) as Record<string, unknown>;

function loadJsonOr<T>(basename: string, fallback: T): T {
  // procura por /src/data/<basename>.json
  const key = Object.keys(__DATA__).find((k) => k.endsWith(`/${basename}.json`));
  if (key && __DATA__[key] != null) {
    return __DATA__[key] as T;
  }
  return fallback;
}

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
 * - no máximo 1 edição marcada como current
 */
function validateEditions(editions: Edition[]): void {
  const slugs = editions.map((e) => e.slug);
  const unique = new Set(slugs);
  if (unique.size !== slugs.length) {
    throw new Error("[DataService] editions.json has duplicated slug(s)");
  }

  const currentCount = editions.filter((e) => e.isCurrent).length;
  if (currentCount > 1) {
    throw new Error("[DataService] editions.json has more than one isCurrent=true");
  }
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
const copyArr = <T extends object>(arr: readonly T[]): T[] => arr.map(copy);

// Validação de entrada (deriva slugs de EDITIONS carregado)
function validateEditionSlug(slug: string): EditionSlug {
  if (!VALID_SLUGS.has(slug as EditionSlug)) {
    throw new Error(`Invalid edition slug: ${slug}`);
  }
  return slug as EditionSlug;
}

// Fonte de verdade: /src/data/editions.json (obrigatório)
const EDITIONS: Edition[] = requireJson<Edition[]>("editions");
validateEditions(EDITIONS);
// Conjunto pré-computado de slugs válidos (evita recriar Set a cada chamada)
const VALID_SLUGS = new Set<EditionSlug>(
  EDITIONS.map((e) => e.slug as EditionSlug)
);

const HIGHLIGHTS_DATA: Record<EditionSlug, HighlightDay[]> = loadJsonOr<Record<EditionSlug, HighlightDay[]>>(
  "highlights",
  {
    "gama-2025": [
      {
        date: "2025-10-06",
        image: "/assets/images/d1.jpeg",
        alt: "Abertura da Feira do Trabalho e do Campo - Gama 2025",
      },
      {
        date: "2025-10-07",
        image: "/assets/imagens/gama-2025/dia-07.jpg",
        alt: "Segundo dia da Feira - Workshops e Palestras",
      },
      {
        date: "2025-10-08",
        image: "/assets/imagens/gama-2025/dia-08.jpg",
        alt: "Terceiro dia da Feira - Exposições e Demonstrações",
      },
      {
        date: "2025-10-09",
        image: "/assets/imagens/gama-2025/dia-09.jpg",
        alt: "Quarto dia da Feira - Networking e Parcerias",
      },
      {
        date: "2025-10-10",
        image: "/assets/imagens/gama-2025/dia-10.jpg",
        alt: "Quinto dia da Feira - Inovação e Tecnologia",
      },
      {
        date: "2025-10-11",
        image: "/assets/imagens/gama-2025/dia-11.jpg",
        alt: "Encerramento da Feira do Trabalho e do Campo - Gama 2025",
      },
    ],
    "planaltina-2025": [
      {
        date: "2025-09-15",
        image: "/assets/imagens/planaltina-2025/dia-15.jpg",
        alt: "Abertura da Feira - Planaltina 2025",
      },
      {
        date: "2025-09-16",
        image: "/assets/imagens/planaltina-2025/dia-16.jpg",
        alt: "Segundo dia da Feira - Planaltina 2025",
      },
      {
        date: "2025-09-17",
        image: "/assets/imagens/planaltina-2025/dia-17.jpg",
        alt: "Terceiro dia da Feira - Planaltina 2025",
      },
      {
        date: "2025-09-18",
        image: "/assets/imagens/planaltina-2025/dia-18.jpg",
        alt: "Quarto dia da Feira - Planaltina 2025",
      },
      {
        date: "2025-09-19",
        image: "/assets/imagens/planaltina-2025/dia-19.jpg",
        alt: "Quinto dia da Feira - Planaltina 2025",
      },
      {
        date: "2025-09-20",
        image: "/assets/imagens/planaltina-2025/dia-20.jpg",
        alt: "Encerramento da Feira - Planaltina 2025",
      },
    ],
    "sao-sebastiao-2025": [
      {
        date: "2025-08-10",
        image: "/assets/imagens/sao-sebastiao-2025/dia-10.jpg",
        alt: "Abertura da Feira - São Sebastião 2025",
      },
      {
        date: "2025-08-11",
        image: "/assets/imagens/sao-sebastiao-2025/dia-11.jpg",
        alt: "Segundo dia da Feira - São Sebastião 2025",
      },
      {
        date: "2025-08-12",
        image: "/assets/imagens/sao-sebastiao-2025/dia-12.jpg",
        alt: "Terceiro dia da Feira - São Sebastião 2025",
      },
      {
        date: "2025-08-13",
        image: "/assets/imagens/sao-sebastiao-2025/dia-13.jpg",
        alt: "Quarto dia da Feira - São Sebastião 2025",
      },
      {
        date: "2025-08-14",
        image: "/assets/imagens/sao-sebastiao-2025/dia-14.jpg",
        alt: "Quinto dia da Feira - São Sebastião 2025",
      },
      {
        date: "2025-08-15",
        image: "/assets/imagens/sao-sebastiao-2025/dia-15.jpg",
        alt: "Encerramento da Feira - São Sebastião 2025",
      },
    ],
    "samambaia-2025": []
  }
);

const SCHEDULE_DATA: Record<EditionSlug, ScheduleDay[]> = loadJsonOr<Record<EditionSlug, ScheduleDay[]>>(
  "schedule",
  {
    "samambaia-2025": [],
  "gama-2025": [
    {
      date: "2025-10-06",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        { time: "10:00", title: "Abertura Oficial" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
      ],
    },
    {
      date: "2025-10-07",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title: "Oficinas: Tricô coletivo; Meio ambiente e sustentabilidade",
        },
      ],
    },
    {
      date: "2025-10-08",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title: "Oficinas: Tricô coletivo; Meio ambiente e sustentabilidade",
        },
        {
          time: "15:00-16:00",
          title: "Palestra: Fundamentos da Economia Solidária",
        },
      ],
    },
    {
      date: "2025-10-09",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-10:00",
          title: "Oficinas: Precificação para Pequenos Negócios",
        },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-16:00",
          title: "Oficinas: Precificação para Pequenos Negócios",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
      ],
    },
    {
      date: "2025-10-10",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-10:00",
          title: "Oficinas: Meio ambiente e sustentabilidade",
        },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        { time: "17:00-18:00", title: "Apresentação Artística" },
      ],
    },
    {
      date: "2025-10-11",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "09:00-11:00",
          title:
            "Palestra: Direitos do Empreendedor; Aposentadoria Rural do Homem e da Mulher do Campo",
        },
        { time: "11:00-13:00", title: "Apresentação Artística" },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
      ],
    },
  ],
  "planaltina-2025": [
    {
      date: "2025-08-25",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        { time: "10:00", title: "Abertura Oficial" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
      ],
    },
    {
      date: "2025-08-26",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title: "Oficinas: Tricô coletivo; Meio ambiente e sustentabilidade",
        },
      ],
    },
    {
      date: "2025-08-27",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title: "Oficinas: Tricô coletivo; Meio ambiente e sustentabilidade",
        },
        {
          time: "15:00-16:00",
          title: "Palestra: Fundamentos da Economia Solidária",
        },
      ],
    },
    {
      date: "2025-08-28",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-10:00",
          title: "Oficinas: Precificação para Pequenos Negócios",
        },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-16:00",
          title: "Oficinas: Precificação para Pequenos Negócios",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
      ],
    },
    {
      date: "2025-08-29",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-10:00",
          title: "Oficinas: Meio ambiente e sustentabilidade",
        },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        { time: "17:00-18:00", title: "Apresentação Artística" },
      ],
    },
    {
      date: "2025-08-30",
      items: [
        { time: "08:00-18:00", title: "Feira de produtos rurais e artesanato" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "09:00-11:00",
          title:
            "Palestra: Direitos do Empreendedor; Aposentadoria Rural do Homem e da Mulher do Campo",
        },
        { time: "11:00-13:00", title: "Apresentação Artística" },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo, Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
      ],
    },
  ],
  "sao-sebastiao-2025": [
    {
      date: "2025-07-21",
      items: [
        { time: "09:00", title: "Abertura oficial" },
        { time: "08:00-18:00", title: "Exposição de Produtos" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "08:00-10:00",
          title: "Oficinas: Fundamentos do Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo e Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title:
            "Oficinas: Fundamentos do Empreendedorismo - Fuxico Sustentável",
        },
      ],
    },
    {
      date: "2025-07-22",
      items: [
        { time: "08:00-18:00", title: "Exposição de Produtos" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "08:00-10:00",
          title: "Oficinas: Fundamentos do Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo e Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title:
            "Oficinas: Fundamentos do Empreendedorismo - Fuxico Sustentável",
        },
      ],
    },
    {
      date: "2025-07-23",
      items: [
        { time: "08:00-18:00", title: "Exposição de Produtos" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "08:00-10:00",
          title: "Oficinas: Fundamentos do Empreendedorismo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo e Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title:
            "Oficinas: Fundamentos do Empreendedorismo - Fuxico Sustentável",
        },
        {
          time: "15:00-16:00",
          title: "Palestra: Fundamentos da Economia Solidária",
        },
      ],
    },
    {
      date: "2025-07-24",
      items: [
        { time: "08:00-18:00", title: "Exposição de Produtos" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "08:00-10:00",
          title:
            "Oficinas: Fundamentos do Empreendedorismo / Vendas em Redes Sociais / Feiras Solidárias",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo e Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        {
          time: "14:00-16:00",
          title:
            "Oficinas: Fundamentos do Empreendedorismo / Fuxico Sustentável / Vendas em Redes Sociais / Feiras Solidárias",
        },
      ],
    },
    {
      date: "2025-07-25",
      items: [
        { time: "08:00-18:00", title: "Exposição de Produtos" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "08:00-10:00",
          title: "Oficinas: Vendas em Redes Sociais / Feiras Solidárias",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo e Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        { time: "19:00", title: "Apresentação Artística" },
      ],
    },
    {
      date: "2025-07-26",
      items: [
        { time: "08:00-18:00", title: "Exposição de Produtos" },
        {
          time: "08:00-11:00",
          title: "Cursos: Introdução ao Empreendedorismo",
        },
        {
          time: "09:00-10:00",
          title:
            "Palestra: Ferramentas para o empreendedorismo solidário / Aposentadoria Rural – Direitos da Mulher e do Campo",
        },
        {
          time: "14:00-17:00",
          title:
            "Cursos: Inovação, Empreendedorismo e Novos Negócios; Multifuncionalidade da agricultura com foco no Turismo Rural",
        },
        { time: "19:00", title: "Apresentação Artística" },
      ],
    },
  ],
  }
);

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

const NEWS_DATA: Record<EditionSlug, NewsItem[]> = loadJsonOr<Record<EditionSlug, NewsItem[]>>(
  "news",
  {
    "samambaia-2025": [],
    "gama-2025": [
      {
        title: "Feira do Trabalho e do Campo chega ao Gama em outubro",
        summary:
          "A 3ª edição da Feira do Trabalho e do Campo já tem data confirmada: de 6 a 11 de outubro, em frente ao estádio Bezerrão, no Gama. Serão seis dias de atividades gratuitas, incluindo oficinas, cursos, workshops, apresentações culturais e a comercialização de produtos da região.",
        image:
          "https://folhadogama.com.br/wp-content/uploads/2025/09/feira-do-trabalho-e-campo-860x649.webp",
        link: "https://folhadogama.com.br/noticias/feira-do-trabalho-e-do-campo-chega-ao-gama-em-outubro/"
      },
      {
        title:
          "Feira do Trabalho e do Campo no Gama abre inscrições para artistas locais",
        summary:
          "A cidade do Gama (DF) se prepara para receber a 3ª Edição da Feira do Trabalho e do Campo, que acontece entre os dias 6 e 11 de outubro. O evento, que já se consolidou como um espaço de valorização da economia local e da cultura regional, está com inscrições abertas para artistas que queiram se apresentar durante a programação.",
        image:
          "https://i0.wp.com/falacomunidade.net/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-20-at-15.20.00.jpeg?resize=768%2C960&ssl=1",
        link: "https://falacomunidade.net/?p=6107&amp%3Bframe-nonce=a887918422"
      },
      {
        title: "Gama recebe Feira do Trabalho e do Campo a partir de segunda-feira (6)",
        summary:
          "O Gama recebe, de 6 a 11 de outubro, a 3ª edição da Feira do Trabalho e do Campo, realizada pela Secretaria de Desenvolvimento Econômico, Trabalho e Renda (Sedet-DF).O evento é gratuito e promete transformar a cidade em um espaço de oportunidades, aprendizado e celebração da cultura local.",
        image:
          "https://cdn.jornaldebrasilia.com.br/wp-content/uploads/2025/10/04131217/WhatsApp-Image-2025-10-03-at-17.54.14-620x620.jpeg",
        link: "https://jornaldebrasilia.com.br/brasilia/gama-recebe-feira-do-trabalho-e-do-campo-a-partir-de-segunda-feira-6/"
      },
      {
        title: "Gama recebe Feira do Trabalho e do Campo a partir de segunda-feira (6)",
        summary:
          "A Secretaria de Desenvolvimento Econômico, Trabalho e Renda (SEDET), em parceria com o Instituto Acolher, anuncia a abertura das inscrições para artistas locais interessados em participar da 3ª Edição da Feira do Trabalho e do Campo, que acontecerá no Gama. A feira é gratuita, aberta ao público e visa fomentar o empreendedorismo local, promover a inclusão produtiva e valorizar a cultura, a produção artesanal e a agricultura familiar da região.",
        image:
          "https://atividadenews.com.br/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-03-at-17.54.14-860x571.jpeg",
        link: "https://atividadenews.com.br/gama-recebe-feira-do-trabalho-e-do-campo-a-partir-de-segunda-feira-6/"
      },
      {
        title: "Feira do Trabalho e do Campo no Gama abre inscrições para artistas locais",
        summary:
          "A Secretaria de Desenvolvimento Econômico, Trabalho e Renda (SEDET), em parceria com o Instituto Acolher, anuncia a abertura das inscrições para artistas locais interessados em participar da 3ª Edição da Feira do Trabalho e do Campo, que acontecerá no Gama. A feira é gratuita, aberta ao público e visa fomentar o empreendedorismo local, promover a inclusão produtiva e valorizar a cultura, a produção artesanal e a agricultura familiar da região.",
        image:
          "https://dfinfoconews.com.br/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-20-at-15.19.10.jpeg",
        link: "https://dfinfoconews.com.br/feira-do-trabalho-e-do-campo-no-gama-abre-inscricoes-para-artistas-locais/"
      }
    ],
    "planaltina-2025": [
      {
        title:
          "Feira do Trabalho e do Campo movimenta Planaltina até sábado com cursos, oficinas e oportunidades",
        summary:
          "Evento focado na agricultura familiar e desenvolvimento sustentável da região.",
        image:
          "https://tudooknoticias.com.br/wp-content/uploads/2025/08/8d4c0c4b-7787-4cb1-b2ce-290cebd35827-1024x682-jpg.avif",
        link: "https://bsbemdia.com.br/destaque/feira-do-trabalho-e-do-campo-agita-planaltina-ate-sabado-30/"
      }
    ],
    "sao-sebastiao-2025": [
      {
        title:
          "SEDET lança Programa Feira do Trabalho e do Campo para fortalecer economia solidária e cultura local",
        summary:
          "A Secretaria de Estado de Desenvolvimento Econômico, Trabalho e Renda do Distrito Federal (SEDET) lança, na próxima segunda-feira (21), o Programa Feira do Trabalho e do Campo. O evento acontece a partir das 8h, em frente à Administração Regional de São Sebastião, e marca o início de um circuito itinerante que visa fortalecer a economia solidária, o cooperativismo, a agricultura familiar e os negócios locais e sustentáveis.",
        image:
          "https://bsbemdia.com.br/wp-content/uploads/2025/08/Divulgacao-696x464.jpg",
        link: "https://sedet.df.gov.br/w/sedet-lanca-programa-feira-do-trabalho-e-do-campo-para-fortalecer-economia-solidaria-e-cultura-local"
      }
    ]
  }
);

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
    const days = HIGHLIGHTS_DATA[validatedSlug] || [];
    return deepFreeze({ edition: validatedSlug, days: copyArr(days) });
  }

  getSchedule(edition: EditionSlug): Readonly<Schedule> {
    const validatedSlug = validateEditionSlug(edition);
    const days = SCHEDULE_DATA[validatedSlug] || [];
    return deepFreeze({
      edition: validatedSlug,
      days: days.map((d) => ({ ...d, items: copyArr(d.items) })),
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
    // Retorna em ordem invertida (sem mutar a origem)
    const reversed = [...items].reverse();
    return deepFreeze({ edition: validatedSlug, items: copyArr(reversed) });
  }
}

export const dataService = new DataService();
