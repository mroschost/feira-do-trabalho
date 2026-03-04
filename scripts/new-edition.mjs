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

function validateSingleCurrent(editions) {
  const current = editions.filter(e => e.isCurrent === true);
  if (current.length !== 1) {
    const list = current.map(e => e.slug).join(", ");
    throw new Error(
      `Deve existir exatamente 1 edição com isCurrent=true. Encontrado: ${current.length} (${list})`
    );
  }
  return current[0];
}

async function main() {
  const editions = await readJson(EDITIONS_PATH);

  if (!Array.isArray(editions) || editions.length === 0) {
    throw new Error("editions.json inválido.");
  }

  const current = validateSingleCurrent(editions);
  const slugs = editions.map(e => e.slug);

  const news = await readJson(NEWS_PATH);
  const schedule = await readJson(SCHEDULE_PATH);

  const created = { news: [], schedule: [], folders: [] };

  for (const slug of slugs) {
    if (!news[slug]) {
      news[slug] = [];
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

  console.log("[sync:editions] Sync concluído. Edição atual:", current.slug);
  if (created.news.length) console.log("Criado em news:", created.news);
  if (created.schedule.length) console.log("Criado em schedule:", created.schedule);
  if (created.folders.length) console.log("Pastas criadas:", created.folders);
}

main().catch(err => {
  console.error("[sync:editions] ERRO:", err.message);
  process.exit(1);
});
