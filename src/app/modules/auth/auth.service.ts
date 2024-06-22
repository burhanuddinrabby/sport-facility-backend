import config from "../../config";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import jwt from "jsonwebtoken";
import { isPasswordMatched } from "./auth.util";

const signup = async (payload: TUser) => {
    // if user email already exists
    const userEmailExist = await User.findOne({ email: payload.email });
    if (userEmailExist) {
        throw new Error("User email already exists!");
    }

    // if phone number already exists
    const userPhoneExist = await User.findOne({ phone: payload.phone });
    if (userPhoneExist) {
        throw new Error("Phone number is already taken!");
    }

    const result = await User.create(payload);
    return result;
};

const login = async (payload: TLoginUser) => {
    // check user exist or not
    if (! await User.isUserExist(payload.email)) {
        throw new Error("User Not Found!");
    }
    
    // get user details
    const user: TUser = await User.isUserExist(payload.email);

    // check password is matched or not
    const passwordMatch = await isPasswordMatched(
        payload.password,
        user?.password as string
    );

    //error for incorrect password
    if (!passwordMatch) {
        throw new Error("Password not matched!");
    }

    // jwt payload
    const jwtPayload = {
        email: user?.email,
        role: user?.role,
    };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
        expiresIn: config.jwt_access_expires_in,
    });

    const refreshToken = jwt.sign(
        jwtPayload,
        config.jwt_refresh_secret as string,
        {
            expiresIn: config.jwt_access_expires_in,
        }
    );

    return {
        accessToken,
        refreshToken,
        user: await User.findOne({ email: payload.email })
    };
};

export const authServices = {
    signup,
    login,
};
