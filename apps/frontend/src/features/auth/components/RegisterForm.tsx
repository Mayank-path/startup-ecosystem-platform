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

function RegisterForm() {
  const navigate = useNavigate()

  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver:
      zodResolver(
        registerSchema
      ),
  })

  const onSubmit = async (
    data: RegisterSchemaType
  ) => {
    try {
      await registerUser(data)

      navigate("/login")
    } catch (error: any) {
      console.log(
        error.response?.data ||
          error.message
      )
    }
  }

  return (
    <Card className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold"> Create Acount</h1>

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
        className="flex flex-col gap-4"
      >
        <div>
          <Input
            type="text"
            placeholder="Name"
            {...register("name")}
          />

          <p className="mt-1 text-sm text-red-500">
            {
              errors.name
                ?.message
            }
          </p>
        </div>

        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />

          <p className="mt-1 text-sm text-red-500">
            {
              errors.email
                ?.message
            }
          </p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register(
              "password"
            )}
          />

          <p className="mt-1 text-sm text-red-500">
            {
              errors.password
                ?.message
            }
          </p>
        </div>

        <div>
          <Input
            type="password"
            placeholder="Confirm Password"
            {...register(
              "confirmPassword"
            )}
          />

          <p className="mt-1 text-sm text-red-500">
            {
              errors
                .confirmPassword
                ?.message
            }
          </p>
        </div>

        <Button type="submit">
          Register
        </Button>
      </form>
    </Card>
  )
}

export default RegisterForm