import { compare } from "bcryptjs";
import { client } from "../database";
import { AppError } from "../errors";
import { IReqLogin, IResLogin, IUser, IUserResult } from "../interfaces";
import { sign } from "jsonwebtoken";

const create = async ( payload: IReqLogin ): Promise<IResLogin> => {
    const queryString: string = 'SELECT * FROM "users" WHERE "email" = $1;';

    const queryFormat: IUserResult = await client.query( queryString, [payload.email] );

    if ( !queryFormat.rowCount ) {
        throw new AppError("Wrong email/password", 401);
    }

    const user: IUser = queryFormat.rows[0];

    const password: boolean = await compare(payload.password, user.password);

    if ( !password ) {
        throw new AppError("Wrong email/password", 401);
    }

    const token: string = sign(
        { email: user.email, admin: user.admin },
        process.env.SECRET_KEY!,
        { subject: user.id.toString(), expiresIn: process.env.EXPIRES_IN! }
    );

    return { token };
};

export default { create };