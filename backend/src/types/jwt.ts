import { JwtPayload } from "jsonwebtoken";

export interface CustemJwtPayload extends JwtPayload {
    email: string;
}