/* import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler } from "@angular/common/http";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const Token = JSON.parse(localStorage.getItem('user')!).token;
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + Token
            }
        });
        return next.handle(req);
    }
} */
