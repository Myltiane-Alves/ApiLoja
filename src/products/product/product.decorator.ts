import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ProductType } from './product.type';

export const Product = createParamDecorator(
    (field: string, context: ExecutionContext) => {
        const req = context
            .switchToHttp()
            .getRequest<import('express').Request>()

        if (req['product']) {
            const data =  req['product'] as ProductType;

            data.id = Number(data.id);

            if (field) {
                return data[field];
            } else {
                return data;
            }
        } else {
            return null;
        }
      },



);
