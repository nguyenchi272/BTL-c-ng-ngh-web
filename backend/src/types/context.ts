import { CustemJwtPayload } from "./jwt";

export interface Context {
    JwtPayload: CustemJwtPayload | null;
}
