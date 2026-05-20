const z = require("zod")

const createStartupSchema = z.object({
  name: z.string().min(2, "Startup name is required"),

  tagline: z
    .string()
    .min(5, "Tagline must be at least 5 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters"),

  industry: z.string().min(2, "Industry is required"),

  fundingStage: z
    .enum(["IDEA", "MVP", "SEED", "SERIES_A", "GROWTH"])
    .optional(),

  location: z.string().optional(),

  website: z.string().optional(),

  techStack: z.array(z.string()).optional(),
})

module.exports = {
  createStartupSchema,
}