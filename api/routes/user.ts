import { Router, Request, Response } from "express";
import express = require("express");
import { UserController } from "../controller/user.controller";
import { APILogger } from "../logger/api.logger";
import { checkJwt } from "../middlewares/checkJwt";
import { checkRole } from "../middlewares/checkRole";

const logger = new APILogger();
const router = Router();
const userController = new UserController();

router.post(
  "",
  [checkJwt, checkRole(["ADMIN"])],
  (req: Request, res: Response) => {
    userController
      .create(req.body)
      .then((data) => res.json(data))
      .catch((ex) => {
        console.log(ex);
        res.sendStatus(500).send({ errorMessage: ex });
      });
  }
);

router.put(
  "",
  [checkJwt, checkRole(["ADMIN"])],
  (req: Request, res: Response) => {
    userController.update(req.body).then((data) => res.json(data));
  }
);

router.delete(
  "/:id([0-9]+)",
  [checkJwt, checkRole(["ADMIN"])],
  (req: Request, res: Response) => {
    userController
      .delete(Number.parseInt(req.params.id))
      .then((data) => res.json(data));
  }
);
export default router;
