const z = require("zod")

const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),

  bio: z.string().max(300).optional(),

  college: z.string().max(100).optional(),

  github: z.string().optional(),

  linkedin: z.string().optional(),

  skills: z.array(z.string()).optional(),
})

module.exports = {
  updateProfileSchema,
}