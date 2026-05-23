import AuthLayout from "../../../layouts/AuthLayout"

import RegisterForm from "../components/RegisterForm"

function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join the startup ecosystem and explore opportunities."
      footerText="Already have an account?"
      footerLinkText="Login"
      footerLinkTo="/login"
    >
      <RegisterForm />
    </AuthLayout>
  )
}

export default RegisterPage