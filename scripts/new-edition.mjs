import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

const ROOT = process.cwd();

const EDITIONS_PATH = path.join(ROOT, "src/data/editions.json");
const NEWS_PATH = path.join(ROOT, "src/data/news.json");
const SCHEDULE_PATH = path.join(ROOT, "src/data/schedule.json");
const EDITIONS_IMAGES_DIR = path.join(ROOT, "src/assets/images/editions");

function removeTrailingCommas(text) {
  return text.replace(/,\s*([}\]])/g, "$1");
}

function sanitizeJsonText(text) {
  return removeTrailingCommas(text).replace(/^\uFEFF/, "").trim();
}

async function readJson(file) {
  const raw = await fs.readFile(file, "utf-8");

  try {
    return JSON.parse(raw);
  } catch {
    const sanitized = sanitizeJsonText(raw);
    try {
      const parsed = JSON.parse(sanitized);

      // Persiste a versão reparada para manter os JSONs consistentes no repositório
      await writeJson(file, parsed);
      console.warn(`[sync:editions] JSON sanitizado e persistido automaticamente: ${file}`);

      return parsed;
    } catch (error) {
      throw new Error(`Falha ao ler JSON em ${file}: ${error.message}`);
    }
  }
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fileExists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}

function isImageFile(fileName) {
  return /\.(jpg|jpeg|png|webp|avif)$/i.test(fileName);
}

async function getFileHash(filePath) {
  const buffer = await fs.readFile(filePath);
  return crypto.createHash("sha1").update(buffer).digest("hex");
}

function getSequentialGalleryIndex(fileName, slug) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = fileName.match(new RegExp(`^${escapedSlug}-(\\d+)\\.[^.]+$`, "i"));
  return match ? Number(match[1]) : null;
}

function buildSequentialGalleryName(slug, index, ext) {
  return `${slug}-${index}${ext.toLowerCase()}`;
}

async function normalizeEditionImages(slug) {
  const dir = path.join(EDITIONS_IMAGES_DIR, slug);
  if (!(await fileExists(dir))) return;

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const imageFiles = entries
    .filter((entry) => entry.isFile() && isImageFile(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const seenHashes = new Map();
  const keptFiles = [];

  for (const fileName of imageFiles) {
    const absolutePath = path.join(dir, fileName);
    const hash = await getFileHash(absolutePath);

    if (seenHashes.has(hash)) {
      await fs.unlink(absolutePath);
      console.log(`[dedupe] [${slug}] removida duplicada: ${fileName} (igual a ${seenHashes.get(hash)})`);
      continue;
    }

    seenHashes.set(hash, fileName);
    keptFiles.push(fileName);
  }

  const existingStandardIndexes = keptFiles
    .map((fileName) => getSequentialGalleryIndex(fileName, slug))
    .filter((index) => index !== null)
    .sort((a, b) => a - b);

  let nextIndex = existingStandardIndexes.length
    ? existingStandardIndexes[existingStandardIndexes.length - 1] + 1
    : 1;

  const nonStandardFiles = keptFiles.filter(
    (fileName) => getSequentialGalleryIndex(fileName, slug) === null
  );

  for (const fileName of nonStandardFiles) {
    const ext = path.extname(fileName);
    let newName = buildSequentialGalleryName(slug, nextIndex, ext);

    while (await fileExists(path.join(dir, newName))) {
      nextIndex += 1;
      newName = buildSequentialGalleryName(slug, nextIndex, ext);
    }

    await fs.rename(path.join(dir, fileName), path.join(dir, newName));
    console.log(`[rename] [${slug}] ${fileName} → ${newName}`);
    nextIndex += 1;
  }
}

function getLatestEdition(editions) {
  if (!Array.isArray(editions) || editions.length === 0) {
    throw new Error("editions.json must contain at least one edition");
  }

  const latest = [...editions].sort((a, b) => {
    const aDate = new Date(a.endDate).getTime();
    const bDate = new Date(b.endDate).getTime();
    return bDate - aDate;
  })[0];

  if (!latest?.slug) {
    throw new Error("Could not determine latest edition from editions.json");
  }

  return latest;
}

function createExampleNewsItem() {
  return {
    title: "",
    summary: "",
    image: "",
    link: ""
  };
}

function createExampleScheduleItem() {
  return {
    time: "",
    title: ""
  };
}

function createExampleScheduleDay(date = "") {
  return {
    date,
    items: [
      createExampleScheduleItem(),
      createExampleScheduleItem(),
      createExampleScheduleItem(),
      createExampleScheduleItem()
    ]
  };
}

function formatIsoDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createExampleScheduleForEdition(edition) {
  const start = new Date(`${edition.startDate}T00:00:00`);

  if (Number.isNaN(start.getTime())) {
    return Array.from({ length: 6 }, () => createExampleScheduleDay(""));
  }

  return Array.from({ length: 6 }, (_, index) => {
    const current = new Date(start);
    current.setDate(start.getDate() + index);
    return createExampleScheduleDay(formatIsoDate(current));
  });
}

function createExampleEdition() {
  return {
    slug: "",
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    artistSignup: {
      formUrl: "",
      startDate: "",
      endDate: ""
    }
  };
}

async function main() {
  const editions = await readJson(EDITIONS_PATH);

  // Remove qualquer edição de exemplo anterior (slug vazio)
  const realEditions = editions.filter(e => e.slug && e.slug.trim() !== "");

  if (!Array.isArray(realEditions) || realEditions.length === 0) {
    throw new Error("editions.json inválido.");
  }

  const latestEdition = getLatestEdition(realEditions);
  const slugs = realEditions.map(e => e.slug);

  // Apenas a edição com maior endDate fica marcada como atual
  for (const edition of realEditions) {
    edition.isCurrent = edition.slug === latestEdition.slug;
    delete edition.featured;
  }

  // Reinsere o objeto de exemplo no final
  const finalEditions = [...realEditions, createExampleEdition()];
  await writeJson(EDITIONS_PATH, finalEditions);

  const news = await readJson(NEWS_PATH);
  const schedule = await readJson(SCHEDULE_PATH);

  const created = { news: [], schedule: [], folders: [] };

  for (const slug of slugs) {
    if (!Array.isArray(news[slug])) {
      news[slug] = [];
      created.news.push(slug);
    }
    if (!Array.isArray(schedule[slug])) {
      schedule[slug] = [];
      created.schedule.push(slug);
    }

    // Remove placeholder anterior e garante um novo no final
    const realNews = news[slug].filter((item) => {
      if (!item || typeof item !== "object") return false;
      return [item.title, item.summary, item.image, item.link].some(
        (value) => typeof value === "string" && value.trim() !== ""
      );
    });
    news[slug] = [...realNews, createExampleNewsItem()];

    const realSchedule = schedule[slug].filter((day) => {
      if (!day || typeof day !== "object") return false;
      const hasDate = typeof day.date === "string" && day.date.trim() !== "";
      const hasItems = Array.isArray(day.items) && day.items.some((item) => {
        if (!item || typeof item !== "object") return false;
        return [item.time, item.title].some(
          (value) => typeof value === "string" && value.trim() !== ""
        );
      });
      return hasDate || hasItems;
    });
    const edition = realEditions.find((e) => e.slug === slug);
    const placeholderSchedule = edition
      ? createExampleScheduleForEdition(edition)
      : Array.from({ length: 6 }, () => createExampleScheduleDay(""));

    schedule[slug] = [...realSchedule, ...placeholderSchedule];
  }

  await writeJson(NEWS_PATH, news);
  await writeJson(SCHEDULE_PATH, schedule);

  for (const slug of slugs) {
    const dir = path.join(EDITIONS_IMAGES_DIR, slug);
    if (!(await fileExists(dir))) {
      await ensureDir(dir);
      await fs.writeFile(path.join(dir, ".gitkeep"), "");
      created.folders.push(slug);
    }

    await normalizeEditionImages(slug);
  }

  console.log("[sync:editions] Sync concluído. Edição atual:", latestEdition.slug);
  if (created.news.length) console.log("Criado em news (com item de exemplo):", created.news);
  if (created.schedule.length) console.log("Criado em schedule:", created.schedule);
  if (created.folders.length) console.log("Pastas criadas:", created.folders);
}

main().catch(err => {
  console.error("[sync:editions] ERRO:", err.message);
  process.exit(1);
});
