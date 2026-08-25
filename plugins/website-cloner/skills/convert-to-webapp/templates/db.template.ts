import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

export interface DatabaseSchema {
  users: Array<{ id: string; email: string; name: string; passwordHash: string; createdAt: string }>;
  workspaces: Array<{ id: string; name: string; ownerId: string; plan: string; creditsTotal: number; creditsUsed: number; createdAt: string }>;
  apiKeys: Array<{ id: string; workspaceId: string; name: string; token: string; prefix: string; createdAt: string; lastUsed: string }>;
  crawlJobs: Array<{ id: string; workspaceId: string; url: string; status: "scraping" | "completed" | "failed"; total: number; completed: number; creditsUsed: number; createdAt: string }>;
  scrapeLogs: Array<{ id: string; workspaceId: string; endpoint: string; url: string; status: number; credits: number; time: string; createdAt: string }>;
  inquiries: Array<{ id: string; name: string; email: string; subject: string; message: string; status: "unread" | "read" | "replied"; createdAt: string }>;
}

const DATA_DIR = resolve(process.cwd(), "data");
const DB_FILE = join(DATA_DIR, "db.json");

export class Database {
  private read(): DatabaseSchema {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    if (!existsSync(DB_FILE)) {
      const initial: DatabaseSchema = { users: [], workspaces: [], apiKeys: [], crawlJobs: [], scrapeLogs: [], inquiries: [] };
      writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    try {
      return JSON.parse(readFileSync(DB_FILE, "utf8"));
    } catch {
      return { users: [], workspaces: [], apiKeys: [], crawlJobs: [], scrapeLogs: [], inquiries: [] };
    }
  }

  private write(data: DatabaseSchema): void {
    if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  }

  getApiKeys(workspaceId?: string) {
    const keys = this.read().apiKeys;
    return workspaceId ? keys.filter((k) => k.workspaceId === workspaceId) : keys;
  }

  createApiKey(workspaceId: string, name: string) {
    const db = this.read();
    const hex = Math.random().toString(36).substring(2, 10);
    const newKey = {
      id: `key_${Date.now()}`,
      workspaceId,
      name,
      token: `fc_live_${hex}${Math.random().toString(36).substring(2, 14)}`,
      prefix: `fc_live_${hex}`,
      createdAt: new Date().toISOString(),
      lastUsed: "Never",
    };
    db.apiKeys.push(newKey);
    this.write(db);
    return newKey;
  }

  deleteApiKey(id: string) {
    const db = this.read();
    db.apiKeys = db.apiKeys.filter((k) => k.id !== id);
    this.write(db);
    return true;
  }
}

export const db = new Database();
