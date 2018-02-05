import { Validator } from "./Validator";
import { ValidationError } from "./ValidationError";
import { ValidationMetadata } from "../metadata/ValidationMetadata";
import { ValidatorOptions } from "./ValidatorOptions";
/**
 * Executes validation over given object.
 */
export declare class ValidationExecutor {
    private validator;
    private validatorOptions;
    awaitingPromises: Promise<any>[];
    ignoreAsyncValidations: boolean;
    private metadataStorage;
    constructor(validator: Validator, validatorOptions?: ValidatorOptions);
    execute(object: Object, targetSchema: string, validationErrors: ValidationError[]): void;
    whitelist(object: any, groupedMetadatas: {
        [propertyName: string]: ValidationMetadata[];
    }, validationErrors: ValidationError[]): void;
    stripEmptyErrors(errors: ValidationError[]): ValidationError[];
    private generateValidationError(object, value, propertyName);
    private conditionalValidations(object, value, metadatas);
    private defaultValidations(object, value, metadatas, errorMap);
    private customValidations(object, value, metadatas, errorMap);
    private nestedValidations(value, metadatas, errors);
    private createValidationError(object, value, metadata, customValidatorMetadata?);
}
