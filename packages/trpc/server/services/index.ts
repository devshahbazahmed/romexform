import UserService from "@repo/services/user/index";
import FormService from "@repo/services/form/index";
import FormFieldService from "@repo/services/form-field/index";

export const userService = new UserService();
export const formService = new FormService();
export const formFieldService = new FormFieldService();
