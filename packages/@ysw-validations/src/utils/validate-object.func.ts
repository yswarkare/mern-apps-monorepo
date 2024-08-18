import { Prop } from '../models/prop.model';
import { validateProp } from './validate-prop.func';

export function validateObject(srcObj: any, object: any) {
	let resultsArr: boolean[] = [];
	if (typeof object === 'object') {
		if (object instanceof Array) {
			object.forEach((element, index) => {
				if (typeof element === 'object') {
					validateObject(element, srcObj[index]);
				}
			});
		} else if (typeof object === 'object') {
			for (let key in object) {
				if (typeof object[key] === 'object') {
					if (object[key] instanceof Prop) {
						const element: Prop = object[key];
						object[key] = validateProp(element, srcObj[key]);
						resultsArr.push(object[key].valid);
					} else {
						validateObject(object[key], srcObj[key]);
					}
				}
			}
		}
	}
	let result = !resultsArr.includes(false)
	return [object, result];
}
