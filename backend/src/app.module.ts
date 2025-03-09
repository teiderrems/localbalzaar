import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './v1/users/users.module';
import { ProductsModule } from './v1/products/products.module';
import { ShopsModule } from './v1/shops/shops.module';
import { OrdersModule } from './v1/orders/orders.module';
import { PaymentsModule } from './v1/payments/payments.module';
import { DeliveriesModule } from './v1/deliveries/deliveries.module';
import { GroupsModule } from './v1/groups/groups.module';
import { RolesModule } from './v1/roles/roles.module';
import { CategoriesModule } from './v1/categories/categories.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SendmailModule } from './sendmail/sendmail.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    ShopsModule,
    OrdersModule,
    PaymentsModule,
    DeliveriesModule,
    GroupsModule,
    RolesModule,
    CategoriesModule,
    AuthModule,
    ConfigModule,
    SendmailModule,
    EventEmitterModule.forRoot({
      wildcard: true,
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, ConfigService ],
})
export class AppModule {}
