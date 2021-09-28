const INPUT_TYPES = {
    PASSWORD: "password",
    CONFIRM_PASSWORD: "confirmPassword",
    EMAIL: "email",
    USERNAME: "username",
    NAME: "name",
    NUMBER: "number"
};
const INPUT_TYPES_DATA = {};
INPUT_TYPES_DATA[INPUT_TYPES.EMAIL] = {
    formType: "text",
    validatorExpression: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    validationMessage: "invalid email"
};
INPUT_TYPES_DATA[INPUT_TYPES.USERNAME] = {
    formType: "text",
    validatorExpression: /^[a-zA-Z][a-zA-Z0-9_]{3,10}$/,
    validationMessage: "username should contain 4-11 ABC/abc/0-9 characters, 1st character should be a letter"
};
INPUT_TYPES_DATA[INPUT_TYPES.PASSWORD] = {
    formType: "password",
    validatorExpression: /^[a-zA-Z]{6,8}$/,
    validationMessage: "password should contain 6-8 ABC/abc characters"
};
INPUT_TYPES_DATA[INPUT_TYPES.CONFIRM_PASSWORD] = INPUT_TYPES_DATA[INPUT_TYPES.PASSWORD];
INPUT_TYPES_DATA[INPUT_TYPES.NAME] = {
    formType: "text",
    validatorExpression: /^[a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?$/,
    validationMessage: "invalid name"
};
INPUT_TYPES_DATA[INPUT_TYPES.NUMBER] = {
    formType: "text",
    validatorExpression: /^[0-9]+$/,
    validationMessage: "invalid number"
};

export {INPUT_TYPES, INPUT_TYPES_DATA};
