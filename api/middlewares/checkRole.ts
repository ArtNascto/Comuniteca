import { Request, Response, NextFunction } from "express";
import User from "../model/user.model";
import { UserRepository } from "../repository/user.repository";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepository = new UserRepository();
    const id = res.locals.jwtPayload.userId;
    let user: User;
    try {
      user = await userRepository.get(id);
    } catch (id) {
      res.status(401).send();
    }
    try {
      const userRoles = await userRepository.getUserRole(user.id);
      if (roles.indexOf(userRoles.name) > -1) next();
      else res.status(401).send();
    } catch (ex) {
      res.status(401).send({ errorMessage: ex });
    }
  };
};
