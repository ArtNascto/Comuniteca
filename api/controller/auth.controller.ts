import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { validate } from "class-validator";

import config from "../config/config";
import { UserService } from "../service/user.service";
import { APILogger } from "../logger/api.logger";
import User from "../model/user.model";

export class AuthController {
  constructor() {}

  static async login(req: Request, res: Response) {
    const userService: UserService = new UserService();
    const logger: APILogger = new APILogger();
    //Check if email and password are set
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Get user from database
    let user: User;
    try {
      user = await userService.getByEmail(email);
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    //Sing JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: "1h" }
    );

    //Send the jwt in the response
    res.send(token);
  }

  static async changePassword(req: Request, res: Response) {
    const userService: UserService = new UserService();
    const logger: APILogger = new APILogger();

    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database
    let user: User;
    try {
      user = await userService.get(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matches
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password length)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    userService.create(user);

    res.status(204).send();
  }
}
export default AuthController;
