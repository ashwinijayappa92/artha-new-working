import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'LockFilter'
})

export class FilterPipe implements PipeTransform {
    transform(value: any, args?: any): any {
  console.log("value",value);
  console.log("args",args)
        if(!value)return null;
        if(!args)return value;

        args = args.toLowerCase();

        return value.filter(function(item){
            console.log('name',JSON.stringify(item).toLowerCase().includes(args));
            return JSON.stringify(item).toLowerCase().includes(args);
        });
    }
}