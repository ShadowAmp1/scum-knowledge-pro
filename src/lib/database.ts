type QueryResult<T> = { rows: T[]; rowCount: number | null };
type PoolLike = {
  query<T = unknown>(text: string, params?: unknown[]): Promise<QueryResult<T>>;
};

const globalForPg = globalThis as unknown as { scumPgPool?: PoolLike };

export function hasDatabaseUrl() {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): PoolLike {
  if (!process.env.DATABASE_URL)
    throw new Error("DATABASE_URL is not configured");
  if (!globalForPg.scumPgPool) {
    const runtimeRequire = eval("require") as NodeRequire;
    const { Pool } = runtimeRequire("pg") as typeof import("pg");
    globalForPg.scumPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_URL.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
      max: 5,
    }) as unknown as PoolLike;
  }
  return globalForPg.scumPgPool;
}

export async function dbQuery<T = unknown>(
  text: string,
  params: unknown[] = [],
) {
  return getPool().query<T>(text, params);
}
