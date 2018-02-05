"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This metadata contains validation rules.
 */
var ValidationMetadata = /** @class */ (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function ValidationMetadata(args) {
        /**
         * Validation groups used for this validation.
         */
        this.groups = [];
        /**
         * Indicates if validation must be performed always, no matter of validation groups used.
         */
        this.always = false;
        /**
         * Specifies if validated value is an array and each of its item must be validated.
         */
        this.each = false;
        this.type = args.type;
        this.target = args.target;
        this.propertyName = args.propertyName;
        this.constraints = args.constraints;
        this.constraintCls = args.constraintCls;
        this.validationTypeOptions = args.validationTypeOptions;
        if (args.validationOptions) {
            this.message = args.validationOptions.message;
            this.groups = args.validationOptions.groups;
            this.always = args.validationOptions.always;
            this.each = args.validationOptions.each;
        }
    }
    return ValidationMetadata;
}());
exports.ValidationMetadata = ValidationMetadata;

//# sourceMappingURL=ValidationMetadata.js.map
