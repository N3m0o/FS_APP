import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('x-api-key');

    // For demonstration, we use a hardcoded key. 
    // In production, this would come from an environment variable or database.
    const validApiKey = process.env.API_KEY || 'nest-ems-key-2026';

    if (apiKey !== validApiKey) {
      throw new UnauthorizedException('Invalid or missing API Key');
    }

    return true;
  }
}
