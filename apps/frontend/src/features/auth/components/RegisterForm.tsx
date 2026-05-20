import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  registerSchema,
  type RegisterSchemaType,
} from "../schemas/register.schema"

import { registerUser } from "../api/auth.api"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

const roles = [
  {
    label: "Student",
    value: "STUDENT",
    description: "Explore startups, jobs, internships, and opportunities.",
  },
  {
    label: "Founder",
    value: "ENTREPRENEUR",
    description: "Create your startup profile and connect with talent.",
  },
  {
    label: "Investor",
    value: "INVESTOR",
    description: "Discover startups and investment opportunities.",
  },
  {
    label: "Freelancer",
    value: "FREELANCER",
    description: "Offer services and resources to startups.",
  },
] as const

function RegisterForm() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "STUDENT",
    },
  })

  const selectedRole = watch("role")

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      await registerUser(data)
      navigate("/login")
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <h1 className="mb-2 text-center text-3xl font-bold">
        Create Account
      </h1>

      <p className="mb-6 text-center text-gray-600">
        Choose your role and join the startup ecosystem.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input type="text" placeholder="Name" {...register("name")} />
          <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
        </div>

        <div>
          <Input type="email" placeholder="Email" {...register("email")} />
          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">I am a</p>

          <div className="grid gap-3 sm:grid-cols-2">
            {roles.map((role) => {
              const isSelected = selectedRole === role.value

              return (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setValue("role", role.value)}
                  className={`rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <h3 className="font-semibold">{role.label}</h3>
                  <p
                    className={`mt-1 text-sm ${
                      isSelected ? "text-gray-200" : "text-gray-500"
                    }`}
                  >
                    {role.description}
                  </p>
                </button>
              )
            })}
          </div>

          <input type="hidden" {...register("role")} />

          <p className="mt-1 text-sm text-red-500">{errors.role?.message}</p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <Button type="submit">Register</Button>
      </form>
    </Card>
  )
}

export default RegisterForm