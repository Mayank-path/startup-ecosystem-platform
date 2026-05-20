import { z } from "zod"

export const registerSchema =
  z
    .object({
      name: z
        .string()
        .min(
          3,
          "Name must be at least 3 characters"
        ),

      email: z
        .email(
          "Invalid email format"
        ),
      
        role: z.enum([
          "STUDENT",
          "ENTREPRENEUR",
          "INVESTOR",
          "FREELANCER",
        ]),

      password: z
        .string()
        .min(
          8,
          "Password must be at least 8 characters"
        )

        .regex(
          /[A-Z]/,
          "Password must contain uppercase letter"
        )

        .regex(
          /[a-z]/,
          "Password must contain lowercase letter"
        )

        .regex(
          /[0-9]/,
          "Password must contain a number"
        )

        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain special character"
        ),

      confirmPassword:
        z.string(),
    })

    .refine(
      (data) =>
        data.password ===
        data.confirmPassword,
      {
        message:
          "Passwords do not match",

        path: [
          "confirmPassword",
        ],
      }
    )

export type RegisterSchemaType =
  z.infer<
    typeof registerSchema
  >