const z = require("zod")

const applyJobSchema = z.object({
  job: z.string(),

  coverLetter: z
    .string()
    .min(10, "Cover letter is too short")
    .optional(),

  resume: z.string().optional(),
})

module.exports = {
  applyJobSchema,
}