const _ = require('lodash');

module.exports = {

    addElementDeep(array, element) {
        const arrayUpdated = _.cloneDeep(array);
        arrayUpdated.push(element);
        return arrayUpdated;
    },

    removeElement(array, index) {
        const newArr = [];
        for (let i = 0; i < array.length; i++) {
            if (i !== index) {
                newArr.push(array[i]);
            }
        }
        return newArr;
    },

    cloneOrCreateEmptyDeep(arr) {
        let result;
        if (arr) {
            result = _.cloneDeep(arr);
        } else {
            result = [];
        }
        return result;
    },

    diffObject(object1, object2) {

        const jsonDiff = require('json-diff');
        const diff = jsonDiff.diffString(object1, object2);
        return diff === "";
    },

    getElementByIndex(items, index) {
        let selectedItem;
        items.map((item, iteratorIndex) => {
            if (iteratorIndex === index) {
                selectedItem = item;
            }
            return item;
        })
        return selectedItem;
    },

    switchElementsDeep(array, index1, index2) {
        const newArray = _.cloneDeep(array);
        const temp = newArray[index1];
        newArray[index1] = newArray[index2];
        newArray[index2] = temp;
        return newArray;
    },


    sortUp(object, field)
    {
        object.sort((value1, value2) => {
            if(value1[field]>value2[field]){
                return 1;
            }
            else{
                return -1;
            }
        });
    },

    sortDown(object, field)
    {
        object.sort((value1, value2) => {
            if(value1[field]>value2[field]){
                return -1;
            }
            else{
                return 1;
            }
        });
    },

    isSame(object1, object2) {
        if (!object1 && !object2) {
            return true;
        } else if (!object1 || !object2) {
            return false;
        } else {
            return JSON.stringify(object1) === JSON.stringify(object2);
        }
    },

    createEnum(values){
        return values.reduce((previousValue, currentValue) => {
            previousValue[currentValue] = currentValue;
            return previousValue;
        }, {});
    }
}

