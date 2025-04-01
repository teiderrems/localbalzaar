import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService extends Stripe{

    constructor(private configService:ConfigService){
        super(configService.get<string>('SECRET_KEY_STRIPE') as string,{
            maxNetworkRetries:3,
            protocol:'http'
        });
    }
}
