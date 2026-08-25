import { z } from "zod";

export const ScrapeRequestSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  formats: z
    .array(z.enum(["markdown", "html", "rawHtml", "links", "screenshot"]))
    .default(["markdown"]),
  onlyMainContent: z.boolean().default(true),
  waitFor: z.number().int().nonnegative().default(0),
});

export const CrawlRequestSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  limit: z.number().int().positive().default(10),
  maxDepth: z.number().int().positive().default(2),
});

export const MapRequestSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  search: z.string().optional(),
  limit: z.number().int().positive().default(100),
});

export const ExtractRequestSchema = z.object({
  url: z.string().url("Please provide a valid URL"),
  prompt: z.string().optional(),
  schema: z.record(z.string(), z.any()),
});

export const CreateKeyRequestSchema = z.object({
  name: z.string().min(1, "Key name is required").max(100),
});

export const ContactRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().optional().default("Inquiry"),
  message: z.string().min(1, "Message is required"),
});
