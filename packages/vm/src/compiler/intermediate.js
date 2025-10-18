// @ts-check

const Cast = require("../util/cast");
const { InputOpcode, InputType } = require("./enums.js");
const log = require("../util/log");

/**
 * @fileoverview Common intermediates shared amongst parts of the compiler.
 */

/**
 * Describes a 'stackable' block (eg. show)
 */
class IntermediateStackBlock {
    /**
     * @param {import("./enums").StackOpcode} opcode
     * @param {Object} inputs
     * @param {boolean} yields
     */
    constructor(opcode, inputs = {}, yields = false) {
        /**
         * The type of the stackable block.
         * @type {import("./enums").StackOpcode}
         */
        this.opcode = opcode;

        /**
         * The inputs of this block.
         * @type {Object}
         */
        this.inputs = inputs;

        /**
         * Does this block cause a yield
         * @type {boolean}
         */
        this.yields = yields;

        /**
         * Should state changes made by this stack block be ignored? Used for testing.
         * @type {boolean}
         */
        this.ignoreState = false;

        /**
         * @type {import("./iroptimizer").TypeState?}
         */
        this.entryState = null;

        /**
         * @type {import("./iroptimizer").TypeState?}
         */
        this.exitState = null;
    }
}

/**
 * Describes an input to a block.
 * This could be a constant, variable or math operation.
 */
class IntermediateInput {
    static getNumberInputType(number) {
        if (typeof number !== "number") throw new Error("Expected a number.");
        if (number === Infinity) return InputType.NUMBER_POS_INF;
        if (number === -Infinity) return InputType.NUMBER_NEG_INF;
        if (number < 0)
            return Number.isInteger(number)
                ? InputType.NUMBER_NEG_INT
                : InputType.NUMBER_NEG_FRACT;
        if (number > 0)
            return Number.isInteger(number)
                ? InputType.NUMBER_POS_INT
                : InputType.NUMBER_POS_FRACT;
        if (Number.isNaN(number)) return InputType.NUMBER_NAN;
        if (Object.is(number, -0)) return InputType.NUMBER_NEG_ZERO;
        return InputType.NUMBER_ZERO;
    }

    /**
     * @param {InputOpcode} opcode
     * @param {InputType} type
     * @param {Object} inputs
     * @param {boolean} yields
     */
    constructor(opcode, type, inputs = {}, yields = false) {
        /**
         * @type {InputOpcode}
         */
        this.opcode = opcode;

        /**
         * @type {InputType}
         */
        this.type = type;

        /**
         * @type {Object}
         */
        this.inputs = inputs;

        /**
         * @type {boolean}
         */
        this.yields = yields;
    }

    /**
     * Is this input a constant whos value equals value.
     * @param {*} value The value
     * @returns {boolean}
     */
    isConstant(value) {
        if (this.opcode !== InputOpcode.CONSTANT) return false;
        let equal = this.inputs.value === value;
        if (!equal && typeof value === "number")
            equal = +this.inputs.value === value;
        return equal;
    }

    /**
     * Is the type of this input guaranteed to always be the type at runtime.
     * @param {InputType} type
     * @returns {boolean}
     */
    isAlwaysType(type) {
        return (this.type & type) === this.type;
    }

    /**
     * Is it possible for this input to be the type at runtime.
     * @param {InputType} type
     * @returns
     */
    isSometimesType(type) {
        return (this.type & type) !== 0;
    }

    /**
     * Converts this input to a target type.
     * If this input is a constant the conversion is performed now, at compile time.
     * If the input changes, the conversion is performed at runtime.
     * @param {InputType} targetType
     * @returns {IntermediateInput} An input with the new type.
     */
    toType(targetType) {
        let castOpcode;
        switch (targetType) {
            case InputType.BOOLEAN:
                castOpcode = InputOpcode.CAST_BOOLEAN;
                break;
            case InputType.NUMBER:
                castOpcode = InputOpcode.CAST_NUMBER;
                break;
            case InputType.NUMBER_INDEX:
                castOpcode = InputOpcode.CAST_NUMBER_INDEX;
                break;
            case InputType.NUMBER_OR_NAN:
                castOpcode = InputOpcode.CAST_NUMBER_OR_NAN;
                break;
            case InputType.STRING:
                castOpcode = InputOpcode.CAST_STRING;
                break;
            case InputType.COLOR:
                castOpcode = InputOpcode.CAST_COLOR;
                break;
            default:
                log.warn(`Cannot cast to type: ${targetType}`, this);
                throw new Error(`Cannot cast to type: ${targetType}`);
        }

        if (this.isAlwaysType(targetType)) return this;

        if (this.opcode === InputOpcode.CONSTANT) {
            // If we are a constant, we can do the cast here at compile time
            switch (castOpcode) {
                case InputOpcode.CAST_BOOLEAN:
                    this.inputs.value = Cast.toBoolean(this.inputs.value);
                    this.type = InputType.BOOLEAN;
                    break;
                case InputOpcode.CAST_NUMBER:
                case InputOpcode.CAST_NUMBER_INDEX:
                case InputOpcode.CAST_NUMBER_OR_NAN: {
                    if (this.isAlwaysType(InputType.BOOLEAN_INTERPRETABLE)) {
                        this.type = InputType.NUMBER;
                        this.inputs.value = +Cast.toBoolean(this.inputs.value);
                    }
                    const numberValue = +this.inputs.value;
                    if (numberValue) {
                        this.inputs.value = numberValue;
                    } else if (Object.is(numberValue, -0)) {
                        /* numberValue is one of 0, -0, or NaN */ this.inputs.value =
                            -0;
                    } else {
                        this.inputs.value = 0; // Convert NaN to 0
                    }
                    if (castOpcode === InputOpcode.CAST_NUMBER_INDEX) {
                        // Round numberValue to an integer
                        this.inputs.value |= 0;
                    }
                    this.type = IntermediateInput.getNumberInputType(
                        this.inputs.value
                    );
                    break;
                }
                case InputOpcode.CAST_STRING:
                    this.inputs.value += "";
                    this.type = InputType.STRING;
                    break;
                case InputOpcode.CAST_COLOR:
                    this.inputs.value = Cast.toRgbColorList(this.inputs.value);
                    this.type = InputType.COLOR;
                    break;
            }
            return this;
        }

        return new IntermediateInput(castOpcode, targetType, { target: this });
    }
}

/**
 * A 'stack' of blocks, like the contents of a script or the inside
 * of a C block.
 */
class IntermediateStack {
    /**
     * @param {IntermediateStackBlock[]} [blocks]
     */
    constructor(blocks) {
        /** @type {IntermediateStackBlock[]} */
        this.blocks = blocks ?? [];
    }
}

/**
 * An IntermediateScript describes a single script.
 * Scripts do not necessarily have hats.
 */
class IntermediateScript {
    constructor() {
        /**
         * The ID of the top block of this script.
         * @type {string?}
         */
        this.topBlockId = null;

        /**
         * List of nodes that make up this script.
         * @type {IntermediateStack?}
         */
        this.stack = null;

        /**
         * Whether this script is a procedure.
         * @type {boolean}
         */
        this.isProcedure = false;

        /**
         * This procedure's variant, if any.
         * @type {string}
         */
        this.procedureVariant = "";

        /**
         * This procedure's code, if any.
         * @type {string}
         */
        this.procedureCode = "";

        /**
         * List of names of arguments accepted by this function, if it is a procedure.
         * @type {string[]}
         */
        this.arguments = [];

        /**
         * Whether this script should be run in warp mode.
         * @type {boolean}
         */
        this.isWarp = false;

        /**
         * Whether this script can `yield`
         * If false, this script will be compiled as a regular JavaScript function (function)
         * If true, this script will be compiled as a generator function (function*)
         * @type {boolean}
         */
        this.yields = true;

        /**
         * Whether this script should use the "warp timer"
         * @type {boolean}
         */
        this.warpTimer = false;

        /**
         * List of procedure IDs that this script needs.
         * @readonly
         */
        this.dependedProcedures = [];

        /**
         * Cached result of compiling this script.
         * @type {Function|null}
         */
        this.cachedCompileResult = null;

        /**
         * Cached result of analysing this script.
         * @type {import("./iroptimizer").TypeState|null}
         */
        this.cachedAnalysisEndState = null;

        /**
         * Whether the top block of this script is an executable hat.
         * @type {boolean}
         */
        this.executableHat = false;
    }
}

/**
 * An IntermediateRepresentation contains scripts.
 */
class IntermediateRepresentation {
    /**
     *
     * @param {IntermediateScript} entry
     * @param {Object.<string, IntermediateScript>} procedures
     */
    constructor(entry, procedures) {
        /**
         * The entry point of this IR.
         * @type {IntermediateScript}
         */
        this.entry = entry;

        /**
         * Maps procedure variants to their intermediate script.
         * @type {Object.<string, IntermediateScript>}
         */
        this.procedures = procedures;
    }

    /**
     * Gets the first procedure with the given proccode.
     * @param {string} proccode
     * @returns {IntermediateScript | undefined}
     */
    getProcedure(proccode) {
        return Object.values(this.procedures).find(
            procedure => procedure.procedureCode === proccode
        );
    }
}

module.exports = {
    IntermediateStackBlock,
    IntermediateInput,
    IntermediateStack,
    IntermediateScript,
    IntermediateRepresentation,
};
