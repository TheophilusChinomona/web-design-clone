import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";

export interface UserRecord {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  createdAt: string;
}

export interface WorkspaceRecord {
  id: string;
  name: string;
  ownerId: string;
  plan: string;
  creditsTotal: number;
  creditsUsed: number;
  createdAt: string;
}

export interface ApiKeyRecord {
  id: string;
  workspaceId: string;
  name: string;
  token: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
}

export interface CrawlJobRecord {
  id: string;
  workspaceId: string;
  url: string;
  status: "scraping" | "completed" | "failed";
  total: number;
  completed: number;
  creditsUsed: number;
  createdAt: string;
}

export interface ScrapeLogRecord {
  id: string;
  workspaceId: string;
  endpoint: string;
  url: string;
  status: number;
  credits: number;
  time: string;
  createdAt: string;
}

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export interface DatabaseSchema {
  users: UserRecord[];
  workspaces: WorkspaceRecord[];
  apiKeys: ApiKeyRecord[];
  crawlJobs: CrawlJobRecord[];
  scrapeLogs: ScrapeLogRecord[];
  inquiries: InquiryRecord[];
}

const DATA_DIR = resolve(process.cwd(), "data");
const DB_FILE = join(DATA_DIR, "db.json");

function getDefaultData(): DatabaseSchema {
  return {
    users: [
      {
        id: "usr_default",
        email: "executus.ahli@gmail.com",
        name: "Executus Ahli",
        passwordHash: "pbkdf2_sha256$default$demo_password_hash",
        createdAt: "2026-08-25T12:00:00.000Z",
      },
    ],
    workspaces: [
      {
        id: "25bMf9wr6oN",
        name: "Personal Team",
        ownerId: "usr_default",
        plan: "Free",
        creditsTotal: 500,
        creditsUsed: 309,
        createdAt: "2026-08-25T12:00:00.000Z",
      },
    ],
    apiKeys: [
      {
        id: "key_default",
        workspaceId: "25bMf9wr6oN",
        name: "Default Production Key",
        token: "fc_live_79a8e2b9c04d81234f98a76e",
        prefix: "fc_live_79a8e2b9",
        createdAt: "2026-08-25T12:00:00.000Z",
        lastUsed: "Just now",
      },
    ],
    crawlJobs: [
      {
        id: "job_sample_1",
        workspaceId: "25bMf9wr6oN",
        url: "https://example.com",
        status: "completed",
        total: 5,
        completed: 5,
        creditsUsed: 5,
        createdAt: "2026-08-25T13:00:00.000Z",
      },
    ],
    scrapeLogs: [
      {
        id: "log_1",
        workspaceId: "25bMf9wr6oN",
        endpoint: "/v1/scrape",
        url: "https://firecrawl.dev",
        status: 200,
        credits: 1,
        time: "2 mins ago",
        createdAt: new Date().toISOString(),
      },
      {
        id: "log_2",
        workspaceId: "25bMf9wr6oN",
        endpoint: "/v1/scrape",
        url: "https://docs.firecrawl.dev",
        status: 200,
        credits: 1,
        time: "14 mins ago",
        createdAt: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
      },
      {
        id: "log_3",
        workspaceId: "25bMf9wr6oN",
        endpoint: "/v1/map",
        url: "https://news.ycombinator.com",
        status: 200,
        credits: 1,
        time: "1 hour ago",
        createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      },
      {
        id: "log_4",
        workspaceId: "25bMf9wr6oN",
        endpoint: "/v1/crawl",
        url: "https://example.com",
        status: 200,
        credits: 5,
        time: "3 hours ago",
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      },
    ],
    inquiries: [
      {
        id: "inq_sample_1",
        name: "John Carpenter",
        email: "john@woodwork.co.za",
        subject: "Bulk Wood Edging Quote",
        message: "Looking for 50 veneer sheets edged.",
        status: "read",
        createdAt: "2026-08-25T11:00:00.000Z",
      },
    ],
  };
}

class Database {
  private read(): DatabaseSchema {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!existsSync(DB_FILE)) {
      const initial = getDefaultData();
      writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
    try {
      const content = readFileSync(DB_FILE, "utf8");
      return JSON.parse(content);
    } catch {
      const initial = getDefaultData();
      writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }
  }

  private write(data: DatabaseSchema): void {
    if (!existsSync(DATA_DIR)) {
      mkdirSync(DATA_DIR, { recursive: true });
    }
    writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  }

  // Users
  getUsers() {
    return this.read().users;
  }
  findUserByEmail(email: string) {
    return this.read().users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }
  findUserById(id: string) {
    return this.read().users.find((u) => u.id === id);
  }
  createUser(user: Omit<UserRecord, "id" | "createdAt">) {
    const db = this.read();
    const newUser: UserRecord = {
      ...user,
      id: `usr_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    db.users.push(newUser);
    this.write(db);
    return newUser;
  }

  // Workspaces
  getWorkspace(id: string) {
    return this.read().workspaces.find((w) => w.id === id) || this.read().workspaces[0];
  }

  // API Keys
  getApiKeys(workspaceId?: string) {
    const keys = this.read().apiKeys;
    return workspaceId ? keys.filter((k) => k.workspaceId === workspaceId) : keys;
  }
  createApiKey(workspaceId: string, name: string) {
    const db = this.read();
    const hex = Math.random().toString(36).substring(2, 10);
    const token = `fc_live_${hex}${Math.random().toString(36).substring(2, 14)}`;
    const newKey: ApiKeyRecord = {
      id: `key_${Date.now()}`,
      workspaceId,
      name,
      token,
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
    const initialLen = db.apiKeys.length;
    db.apiKeys = db.apiKeys.filter((k) => k.id !== id);
    this.write(db);
    return db.apiKeys.length < initialLen;
  }

  // Crawl Jobs
  getCrawlJobs(workspaceId?: string) {
    const jobs = this.read().crawlJobs;
    return workspaceId ? jobs.filter((j) => j.workspaceId === workspaceId) : jobs;
  }
  createCrawlJob(workspaceId: string, url: string, total: number) {
    const db = this.read();
    const newJob: CrawlJobRecord = {
      id: `job_${Math.random().toString(36).substring(2, 11)}`,
      workspaceId,
      url,
      status: "scraping",
      total,
      completed: 0,
      creditsUsed: 1,
      createdAt: new Date().toISOString(),
    };
    db.crawlJobs.push(newJob);
    this.write(db);
    return newJob;
  }

  // Scrape Logs
  getScrapeLogs(workspaceId?: string) {
    const logs = this.read().scrapeLogs;
    return workspaceId ? logs.filter((l) => l.workspaceId === workspaceId) : logs;
  }
  addScrapeLog(log: Omit<ScrapeLogRecord, "id" | "createdAt">) {
    const db = this.read();
    const newLog: ScrapeLogRecord = {
      ...log,
      id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
    };
    db.scrapeLogs.unshift(newLog);
    // Keep last 100 logs
    if (db.scrapeLogs.length > 100) {
      db.scrapeLogs = db.scrapeLogs.slice(0, 100);
    }
    this.write(db);
    return newLog;
  }

  // Inquiries (EdgeTech Contact Messages)
  getInquiries() {
    return this.read().inquiries;
  }
  createInquiry(inquiry: Omit<InquiryRecord, "id" | "status" | "createdAt">) {
    const db = this.read();
    const newInq: InquiryRecord = {
      ...inquiry,
      id: `inq_${Date.now()}`,
      status: "unread",
      createdAt: new Date().toISOString(),
    };
    db.inquiries.unshift(newInq);
    this.write(db);
    return newInq;
  }
}

export const db = new Database();
