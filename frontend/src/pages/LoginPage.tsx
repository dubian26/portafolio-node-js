import { LoginFeatures } from "@/components/login/LoginFeatures"
import { LoginForm } from "@/components/login/LoginForm"
import { Fragment } from "react"

export const LoginPage = () => {
   return (
      <Fragment>
         <LoginForm />
         <LoginFeatures />
      </Fragment>
   )
}
