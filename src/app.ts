import { SeedUniversities } from "@app/use-cases/seedUniversities.usecase";
import { AppDataSource } from "@infra/database";
import bodyParser from "body-parser";
import express, { Application, NextFunction, Request, Response } from "express";
import AppError from "./infra/error/AppError";
import { router } from "./infra/http/routes/index.routes";

export class App {
  public app: Application;

  constructor(private port?: number | string) {
    this.app = express();
    this.init();
  }

  private async init(): Promise<void> {
    this.setupExpress();
    this.setupRoutes();
    this.errors();
    await this.databaseSetup();
  }

  private setupExpress() {
    this.app.set("port", this.port || process.env.PORT || 3001);
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private setupRoutes() {
    this.app.use(router);
  }

  private errors() {
    this.app.use(
      (
        err: Error,
        request: Request,
        response: Response,
        next: NextFunction
      ) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({ message: err.message });
        }

        console.log(err);

        return response.status(500).json({
          status: "error",
          message: `Internal server error - ${err.message}`,
        });
      }
    );
  }

  public async databaseSetup(): Promise<void> {
    await AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")
        const seedConstructor = new SeedUniversities()
        await seedConstructor.execte()
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })
  }

  public start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server is running on port", this.app.get("port"));
    });
  }
}