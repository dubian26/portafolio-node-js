import { UserInfo } from "@/domain/models/UserInfo"
import jwt from "jsonwebtoken"
import ms from "ms"

interface Props {
   tipoToken: "access" | "refresh"
   userInfo: UserInfo
}

export const tokenBuilder = ({ tipoToken, userInfo }: Props) => {
   const jwtSecret = process.env.JWT_SECRET || ""
   const jwtEmisor = process.env.JWT_EMISOR || ""
   const expAccessToken = process.env.EXPIRE_ACCESS_TOKEN || "15m"
   const expRefreshToken = process.env.EXPIRE_REFRESH_TOKEN || "2d"
   const expToken = tipoToken === "access" ? expAccessToken : expRefreshToken
   const expTokenMs = ms(expToken as any) as unknown as number

   const token = jwt.sign(userInfo, jwtSecret, {
      expiresIn: expTokenMs,
      issuer: jwtEmisor
   })

   return { token, expTokenMs }
}
