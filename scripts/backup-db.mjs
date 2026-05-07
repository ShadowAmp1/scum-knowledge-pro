import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL не задан — backup невозможен.");
  console.error("Укажи DATABASE_URL в .env или переменных окружения хостинга.");
  process.exit(1);
}

const root = process.cwd();
const backupDir = path.join(root, "backups");
fs.mkdirSync(backupDir, { recursive: true });

const stamp = new Date().toISOString().replace(/[:.]/g, "-");
const outputFile = path.join(backupDir, `scumdbpro-${stamp}.sql`);

const dump = spawn("pg_dump", [process.env.DATABASE_URL, "--file", outputFile, "--format", "plain", "--no-owner", "--no-privileges"], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

dump.on("error", (error) => {
  console.error("Не удалось запустить pg_dump.");
  console.error("Проверь, что PostgreSQL client tools установлены на сервере/ПК.");
  console.error(error.message);
  process.exit(1);
});

dump.on("close", (code) => {
  if (code !== 0) {
    console.error(`pg_dump завершился с ошибкой: ${code}`);
    process.exit(code ?? 1);
  }
  console.log(`Backup готов: ${outputFile}`);
});
