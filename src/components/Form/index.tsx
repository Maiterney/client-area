import { FormControllerInput } from "./FormControllerInput";
import { FormRow } from "./FormRow";
import { FormControllerTextArea } from "./FormControllerTextArea";
import { FormSubmitButton } from "./FormSubmitButton";
import { FormRoot } from "./FormRoot";
import { FormControllerSelect } from "./FormControllerSelect";


export const MyForm = {
    Root: FormRoot,
    Row: FormRow,
    SubmitButton: FormSubmitButton,
    InputController: FormControllerInput,
    TextAreaController: FormControllerTextArea,
    SelectController: FormControllerSelect,
}