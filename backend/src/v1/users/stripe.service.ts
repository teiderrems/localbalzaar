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

    createCustomer(email:string){
        return this.customers.create({email});
    }

    getCustomers(limit:number){
        return this.customers.list({created:{gte: Date.now()}, limit: limit}).autoPagingToArray({limit:10000});
    }

    customerPayment(email:string,amount:number){
        // return this.paymentIntents.create({
        //     application_fee_amount:amount,
        //     automatic_payment_methods:this.paymentMethods.create()

        // })
    }

    // addPayementMethod(){
    //     return this.paymentMethods.create({
    //         allow_redisplay:'always',
    //         acc
            
    //     })
    // }
}
