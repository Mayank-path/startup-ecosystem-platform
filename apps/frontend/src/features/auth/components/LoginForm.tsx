import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import {
  loginSchema,
  type LoginSchemaType,
} from "../schemas/login.schema"

import { loginUser } from "../api/auth.api"

import { useAuthStore } from "../store/auth.store"

import Card from "../../../components/ui/Card"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

function LoginForm() {
  const navigate = useNavigate()

  const setUser = useAuthStore((state) => state.setUser)
  const setAccessToken = useAuthStore((state) => state.setAccessToken)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await loginUser(data)

      setUser(response.data.user)
      setAccessToken(response.data.accessToken)

      navigate("/profile")
    } catch (error: any) {
      console.log(error.response?.data || error.message)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <h1 className="mb-6 text-center text-3xl font-bold">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.email?.message}
          </p>
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

        <Button type="submit">
          Login
        </Button>
      </form>
    </Card>
  )
}

export default LoginForm