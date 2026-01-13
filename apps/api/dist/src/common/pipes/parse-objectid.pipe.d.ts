import { PipeTransform } from '@nestjs/common';
export declare class ParseObjectIdPipe implements PipeTransform {
    transform(value: string): string;
}
