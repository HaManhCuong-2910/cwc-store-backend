import { connectDataBase } from 'src/config/database.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AccountModule } from 'src/account/account.module';
import { PostModule } from 'src/post/post.module';
import { AuthModule } from 'src/auth/auth.module';
import { jwtDefaultConfig } from 'src/config/jwt.config';
import { CategoryModule } from 'src/category/category.module';
import { CartModule } from 'src/cart/cart.module';
import { ResponseModule } from 'src/response/response.module';
import { mailDefaultConfig } from 'src/config/mail.config';
export const importApp = [
  ...connectDataBase,
  ...jwtDefaultConfig,
  ...mailDefaultConfig,
  PostModule,
  CategoryModule,
  AuthModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '/public/',
  }),
  AccountModule,
  CartModule,
  ResponseModule,
];
