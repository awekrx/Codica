import { Injectable, NestMiddleware, HttpStatus, Logger } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class Middleware implements NestMiddleware {
    private readonly logger = new Logger(Middleware.name);
    use(req: Request, res: Response, next: NextFunction) {
        this.logger.log("Response: " + req.baseUrl);
        next();
    }
}
