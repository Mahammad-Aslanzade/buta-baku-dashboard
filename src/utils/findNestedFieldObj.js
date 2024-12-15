export const findNestedField=(obj, fieldPath)=> {
    return fieldPath.reduce((nestedObj, key) => {
        return nestedObj && nestedObj[key] !== undefined ? nestedObj[key] : undefined;
    }, obj);
}