import AuthLayout from "../../../layouts/AuthLayout"

import LoginForm from "../components/LoginForm"

function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Login to continue your startup journey."
      footerText="Don't have an account?"
      footerLinkText="Register"
      footerLinkTo="/register"
    >
      <LoginForm />
    </AuthLayout>
  )
}

export default LoginPage