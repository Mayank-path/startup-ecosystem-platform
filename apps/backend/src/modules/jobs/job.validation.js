const z = require("zod")

const createJobSchema = z.object({
  startup: z.string(),

  title: z
    .string()
    .min(3, "Job title is required"),

  description: z
    .string()
    .min(10, "Description is too short"),

  roleType: z.enum([
    "FULL_TIME",
    "PART_TIME",
    "INTERNSHIP",
    "CONTRACT",
  ]),

  location: z.string(),

  skillsRequired: z.array(z.string()),

  salary: z.string().optional(),

  applicationDeadline: z.string().optional(),
})

module.exports = {
  createJobSchema,
}