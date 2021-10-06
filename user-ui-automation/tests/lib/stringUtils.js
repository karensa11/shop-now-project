module.exports = {

    toCammelCase(string) {
        const parts = string.split(' ');
        let newString = "";
        parts.forEach((part, index) => {
            if (this.stringNotEmpty(part)) {
                if (this.stringEmpty(newString)) {
                    newString += part.toLowerCase();
                } else {
                    newString += part.substring(0, 1).toUpperCase() + part.substring(1, part.length);
                }
            }
        });
        return newString;
    },

    stringEmpty(string) {
        return !string || string.trim() === "";
    },

    stringNotEmpty(string) {
        return string && string.trim() !== "";
    },

    stringEqualIgnoreCase(string1, string2) {
        return string1.toLowerCase() === string2.toLowerCase();
    },

    removeSpaces(string) {
        return string.replace(/[ ]/g, "");
    }
};