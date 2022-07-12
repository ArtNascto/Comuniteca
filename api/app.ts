import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import { APILogger } from "./logger/api.logger";
import { UserController } from "./controller/user.controller";
import * as swaggerUI from "swagger-ui-express";
import * as cors from "cors";
import helmet from "helmet";
import * as fs from "fs";
import "dotenv/config";
import * as swaggerJsdoc from "swagger-jsdoc";
import auth from "./routes/auth";
import user from "./routes/user";
import ConfigController from "./controller/config.controller";
// import { version } from "package.json";

class App {
  public express: express.Application;
  public logger: APILogger;
  public userController: UserController;
  public configController: ConfigController;

  /* Swagger files start */
  private swaggerFile: any = process.cwd() + "/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/swagger/swagger.css",
    "utf8"
  );
  private swaggerDocument = JSON.parse(this.swaggerData);
  options: swaggerJsdoc.Options = {
    definition: {
      info: {
        title: "comuniteca-api",
        version: "1.0.0",
        description: "",
      },
      openapi: "3.0.0",
      components: {
        securitySchemas: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
        security: {
          bearerAuth: [],
        },
      },
    },
    apis: ["../app.ts", "../controller/*.ts"],
  };
  private swaggerSpec = swaggerJsdoc(this.options);
  /* Swagger files end */

  constructor() {
    this.express = express();

    this.middleware();
    this.routes();
    
    this.logger = new APILogger();
    this.userController = new UserController();
    this.configController = new ConfigController();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.express.use("/api/auth", auth);
    this.express.use("/api/user", user);

    this.express.get("/", (req, res, next) => {
      res.send("Typescript App works!!");
    });

    // swagger docs
    // this.express.use(
    //   "/api/docs",
    //   swaggerUi.serve,
    //   swaggerUi.setup(this.swaggerDocument, null, null, this.customCss)
    // );
    this.express.use(
      "/api/docs",
      swaggerUI.serve,
      swaggerUI.setup(this.swaggerSpec)
    );

    this.express.get("docs.json", (req: Request, res: Response) => {
      res.setHeader("Content-Type", "application/json");
      res.send(this.swaggerSpec);
    });

    // handle undefined routes
    this.express.use("*", (req, res, next) => {
      res.send("Make sure url is correct!!!");
    });
  }
}

export default new App().express;
