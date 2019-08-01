import { Middleware, ExpressErrorMiddlewareInterface, Req, Res } from "routing-controllers";
import { NextFunction } from "express";

@Middleware({ type: 'before' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface
{
    error(error: any, @Req() request: any, @Res() response: any, next: NextFunction): void
    {
        response.status(500).send(error);
    }
    
}