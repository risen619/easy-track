import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Inject } from "typedi";

import { AuthService } from "src/services/AuthService";

@Middleware({ type: "before" })
export class AuthMiddleware implements ExpressMiddlewareInterface
{
    @Inject() private authService: AuthService;

    use(request: any, response: any, next: (err?: any) => any)
    {
        this.authService.authHandler(request, response, next);
    }
}