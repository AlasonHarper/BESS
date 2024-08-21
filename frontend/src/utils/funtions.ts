export function cloneObject(source: any): any {
  if (Object.prototype.toString.call(source) === '[object Array]') {
    const clone: any[] = [];
    for (let i = 0; i < source.length; i++) {
      clone[i] = cloneObject(source[i]);
    }
    return clone;
  } else if (typeof source === 'object') {
    const clone: any = {};
    for (const prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        clone[prop] = cloneObject(source[prop]);
      }
    }
    return clone;
  } else {
    return source;
  }
}

//
// --------------------
export function checkEqualObject(obj1: any, obj2: any) {
  // Check if both objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }
  // Check if both objects are null
  if (obj1 === null && obj2 === null) {
    return true;
  }
  // Check if both objects are arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!checkEqualObject(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }
  // Check if both objects are objects
  if (typeof obj1 === 'object' && typeof obj2 === 'object') {
    if (obj2 == null || obj1 == null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
      return false;
    }
    for (const key of keys1) {
      if (!checkEqualObject(obj1[key], obj2[key])) {
        return false;
      }
    }
    return true;
  }
  // Check if both objects are primitive values
  return obj1 === obj2;
}
