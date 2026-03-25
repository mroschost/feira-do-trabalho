import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();

const EDITIONS_PATH = path.join(ROOT, "src/data/editions.json");
const NEWS_PATH = path.join(ROOT, "src/data/news.json");
const SCHEDULE_PATH = path.join(ROOT, "src/data/schedule.json");
const EDITIONS_IMAGES_DIR = path.join(ROOT, "src/assets/images/editions");

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf-8"));
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

async function main() {
  const editions = await readJson(EDITIONS_PATH);

  if (!Array.isArray(editions) || editions.length === 0) {
    throw new Error("editions.json inválido.");
  }

  const latestEdition = getLatestEdition(editions);
  const slugs = editions.map(e => e.slug);

  // Apenas a edição com maior endDate fica destacada
  for (const edition of editions) {
    edition.featured = edition.slug === latestEdition.slug;
  }

  // Persiste o editions.json atualizado
  await writeJson(EDITIONS_PATH, editions);

  const news = await readJson(NEWS_PATH);
  const schedule = await readJson(SCHEDULE_PATH);

  const created = { news: [], schedule: [], folders: [] };

  for (const slug of slugs) {
    if (!Array.isArray(news[slug]) || news[slug].length === 0) {
      news[slug] = [createExampleNewsItem()];
      created.news.push(slug);
    }
    if (!schedule[slug]) {
      schedule[slug] = [];
      created.schedule.push(slug);
    }
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
  }

  console.log("[sync:editions] Sync concluído. Edição destacada:", latestEdition.slug);
  if (created.news.length) console.log("Criado em news (com item de exemplo):", created.news);
  if (created.schedule.length) console.log("Criado em schedule:", created.schedule);
  if (created.folders.length) console.log("Pastas criadas:", created.folders);
}

main().catch(err => {
  console.error("[sync:editions] ERRO:", err.message);
  process.exit(1);
});
