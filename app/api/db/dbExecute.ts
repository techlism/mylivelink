import { createClient } from "@libsql/client";

const client = createClient({
  url: process.env.TURSO_URL!,
  authToken: process.env.TURSO_AUTH!,
});

const dbExecute = async (sqlStatement: string, params: any[] = []) => {
  const result = await client.execute({
    sql: sqlStatement,
    args: params,
  });
  return result;
}
export default dbExecute;