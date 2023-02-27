import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";

export default async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return res.status(400).send("not authenticated");

  try {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
      return res.status(500).send("server error");
    }

    const user: any = jwt.verify(refreshToken, refreshTokenSecret);

    const userPlainObj = {
      id: user.id,
      name: user.name,
      citizenshipNumber: user.citizenshipNumber,
      phone: user.phone,
      email: user.email,
      admin: user.admin,
    };

    const accessToken = jwt.sign(userPlainObj, accessTokenSecret, {
      expiresIn: 60, // 10 minutes
    });

    const newRefreshToken = jwt.sign(userPlainObj, refreshTokenSecret, {
      expiresIn: "7d",
    });

    res.cookie("refresh", newRefreshToken, {
      secure: true,
      httpOnly: true,
      expires: dayjs().add(7, "days").toDate(),
    });

    return res.status(200).send({ user: userPlainObj, accessToken });
  } catch (error) {
    return res.status(400).send(error);
  }
};
