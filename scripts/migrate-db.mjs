if (!process.env.DATABASE_URL) {
  console.log("DATABASE_URL не задан — миграция БД пропущена.");
  process.exit(0);
}

const pg = await import("pg");
const { Pool } = pg.default ?? pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false },
});

const sql = `
CREATE TABLE IF NOT EXISTS content_items (
  id BIGSERIAL PRIMARY KEY,
  entity TEXT NOT NULL,
  key TEXT NOT NULL,
  data JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(entity, key)
);
CREATE INDEX IF NOT EXISTS content_items_entity_idx ON content_items(entity);
CREATE TABLE IF NOT EXISTS admin_audit_log (
  id BIGSERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  entity TEXT,
  key TEXT,
  username TEXT,
  meta JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS admin_audit_log_created_at_idx ON admin_audit_log(created_at);
CREATE INDEX IF NOT EXISTS admin_audit_log_entity_idx ON admin_audit_log(entity);
CREATE OR REPLACE FUNCTION set_updated_at() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS content_items_set_updated_at ON content_items;
CREATE TRIGGER content_items_set_updated_at
BEFORE UPDATE ON content_items
FOR EACH ROW EXECUTE FUNCTION set_updated_at();
`;

try {
  await pool.query(sql);
  console.log("Миграция PostgreSQL выполнена успешно.");
} catch (error) {
  console.error(error);
  process.exit(1);
} finally {
  await pool.end();
}
