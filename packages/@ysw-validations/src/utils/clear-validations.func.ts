import { Prop } from '../models/prop.model';

export function clearValidations (srcObj: any, object: any) {
	if (typeof object === 'object') {
		if (object instanceof Array) {
			object.forEach((element, index) => {
				if (typeof element === 'object') {
					clearValidations(element, srcObj[index]);
				}
			});
		} else if (typeof object === 'object') {
			for (let key in object) {
				if (typeof object[key] === 'object') {
					if (object[key] instanceof Prop) {
						const element: Prop = object[key];
            element.resetValidation();
					} else {
						clearValidations(object[key], srcObj[key]);
					}
				}
			}
		}
	}
  return [srcObj, object];
}
