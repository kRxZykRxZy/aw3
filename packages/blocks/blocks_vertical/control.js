/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2016 Massachusetts Institute of Technology
 * All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

goog.provide("Blockly.Blocks.control");

goog.require("Blockly.Blocks");
goog.require("Blockly.Colours");
goog.require("Blockly.ScratchBlocks.VerticalExtensions");

Blockly.Blocks["control_forever"] = {
    /**
     * Block for repeat n times (external number).
     * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#5eke39
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            id: "control_forever",
            message0: Blockly.Msg.CONTROL_FOREVER,
            message1: "%1", // Statement
            message2: "%1", // Icon
            lastDummyAlign2: "RIGHT",
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            args2: [
                {
                    type: "field_image",
                    src:
                        Blockly.mainWorkspace.options.pathToMedia +
                        "repeat.svg",
                    width: 24,
                    height: 24,
                    alt: "*",
                    flip_rtl: true,
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_repeat"] = {
    /**
     * Block for repeat n times (external number).
     * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            id: "control_repeat",
            message0: Blockly.Msg.CONTROL_REPEAT,
            message1: "%1", // Statement
            message2: "%1", // Icon
            lastDummyAlign2: "RIGHT",
            args0: [
                {
                    type: "input_value",
                    name: "TIMES",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            args2: [
                {
                    type: "field_image",
                    src:
                        Blockly.mainWorkspace.options.pathToMedia +
                        "repeat.svg",
                    width: 24,
                    height: 24,
                    alt: "*",
                    flip_rtl: true,
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_if"] = {
    /**
     * Block for if-then.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            type: "control_if",
            message0: Blockly.Msg.CONTROL_IF,
            message1: "%1", // Statement
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_if_else"] = {
    /**
     * Block for if-else.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            type: "control_if_else",
            message0: Blockly.Msg.CONTROL_IF,
            message1: "%1",
            message2: Blockly.Msg.CONTROL_ELSE,
            message3: "%1",
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            args3: [
                {
                    type: "input_statement",
                    name: "SUBSTACK2",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_ternary"] = {
    /**
     * Block for ternary operators.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            type: "control_ternary",
            message0: "if %1 then %2 else %3",
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean",
                },
                {
                    type: "input_value",
                    name: "LEFT",
                },
                {
                    type: "input_value",
                    name: "RIGHT",
                },
            ],
            category: Blockly.Categories.control,
            output: null,
            extensions: ["colours_control", "shape_round"],
        });
    },
};

Blockly.Blocks["control_stop"] = {
    /**
     * Block for stop all scripts.
     * @this Blockly.Block
     */
    init: function () {
        var ALL_SCRIPTS = "all";
        var THIS_SCRIPT = "this script";
        var OTHER_SCRIPTS = "other scripts in sprite";
        var stopDropdown = new Blockly.FieldDropdown(
            function () {
                if (
                    this.sourceBlock_ &&
                    this.sourceBlock_.nextConnection &&
                    this.sourceBlock_.nextConnection.isConnected()
                ) {
                    return [[Blockly.Msg.CONTROL_STOP_OTHER, OTHER_SCRIPTS]];
                }
                return [
                    [Blockly.Msg.CONTROL_STOP_ALL, ALL_SCRIPTS],
                    [Blockly.Msg.CONTROL_STOP_THIS, THIS_SCRIPT],
                    [Blockly.Msg.CONTROL_STOP_OTHER, OTHER_SCRIPTS],
                ];
            },
            function (option) {
                // Create an event group to keep field value and mutator in sync
                // Return null at the end because setValue is called here already.
                Blockly.Events.setGroup(true);
                var oldMutation = Blockly.Xml.domToText(
                    this.sourceBlock_.mutationToDom()
                );
                this.sourceBlock_.setNextStatement(option == OTHER_SCRIPTS);
                var newMutation = Blockly.Xml.domToText(
                    this.sourceBlock_.mutationToDom()
                );
                Blockly.Events.fire(
                    new Blockly.Events.BlockChange(
                        this.sourceBlock_,
                        "mutation",
                        null,
                        oldMutation,
                        newMutation
                    )
                );
                this.setValue(option);
                Blockly.Events.setGroup(false);
                return null;
            }
        );
        this.appendDummyInput()
            .appendField(Blockly.Msg.CONTROL_STOP)
            .appendField(stopDropdown, "STOP_OPTION");
        this.setCategory(Blockly.Categories.control);
        this.setColour(
            Blockly.Colours.control.primary,
            Blockly.Colours.control.secondary,
            Blockly.Colours.control.tertiary,
            Blockly.Colours.control.quaternary
        );
        this.setPreviousStatement(true);
    },
    mutationToDom: function () {
        var container = document.createElement("mutation");
        container.setAttribute("hasnext", this.nextConnection != null);
        return container;
    },
    domToMutation: function (xmlElement) {
        var hasNext = xmlElement.getAttribute("hasnext") == "true";
        this.setNextStatement(hasNext);
    },
};

Blockly.Blocks["control_wait"] = {
    /**
     * Block to wait (pause) stack.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            id: "control_wait",
            message0: Blockly.Msg.CONTROL_WAIT,
            args0: [
                {
                    type: "input_value",
                    name: "DURATION",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_wait_until"] = {
    /**
     * Block to wait until a condition becomes true.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_WAITUNTIL,
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_repeat_until"] = {
    /**
     * Block to repeat until a condition becomes true.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_REPEATUNTIL,
            message1: "%1",
            message2: "%1",
            lastDummyAlign2: "RIGHT",
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            args2: [
                {
                    type: "field_image",
                    src:
                        Blockly.mainWorkspace.options.pathToMedia +
                        "repeat.svg",
                    width: 24,
                    height: 24,
                    alt: "*",
                    flip_rtl: true,
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_while"] = {
    /**
     * Block to repeat until a condition becomes false.
     * (This is an obsolete "hacked" block, for compatibility with 2.0.)
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_WHILE,
            message1: "%1",
            message2: "%1",
            lastDummyAlign2: "RIGHT",
            args0: [
                {
                    type: "input_value",
                    name: "CONDITION",
                    check: "Boolean",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            args2: [
                {
                    type: "field_image",
                    src:
                        Blockly.mainWorkspace.options.pathToMedia +
                        "repeat.svg",
                    width: 24,
                    height: 24,
                    alt: "*",
                    flip_rtl: true,
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_for_each"] = {
    /**
     * Block for for-each. This is an obsolete block that is implemented for
     * compatibility with Scratch 2.0 projects.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            type: "control_for_each",
            message0: Blockly.Msg.CONTROL_FOREACH,
            message1: "%1",
            message2: "%1",
            lastDummyAlign2: "RIGHT",
            args0: [
                {
                    type: "field_variable",
                    name: "VARIABLE",
                },
                {
                    type: "input_value",
                    name: "VALUE",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            args2: [
                {
                    type: "field_image",
                    src:
                        Blockly.mainWorkspace.options.pathToMedia +
                        "repeat.svg",
                    width: 24,
                    height: 24,
                    alt: "*",
                    flip_rtl: true,
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_start_as_clone"] = {
    /**
     * Block for "when I start as a clone" hat.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            id: "control_start_as_clone",
            message0: Blockly.Msg.CONTROL_STARTASCLONE,
            args0: [],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_hat"],
        });
    },
};

Blockly.Blocks["control_create_clone_of_menu"] = {
    /**
     * Create-clone drop-down menu.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "%1",
            args0: [
                {
                    type: "field_dropdown",
                    name: "CLONE_OPTION",
                    options: [
                        [Blockly.Msg.CONTROL_CREATECLONEOF_MYSELF, "_myself_"],
                    ],
                },
            ],
            extensions: ["colours_control", "output_string"],
        });
    },
};

Blockly.Blocks["control_create_clone_of"] = {
    /**
     * Block for "create clone of..."
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            id: "control_start_as_clone",
            message0: Blockly.Msg.CONTROL_CREATECLONEOF,
            args0: [
                {
                    type: "input_value",
                    name: "CLONE_OPTION",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_delete_this_clone"] = {
    /**
     * Block for "delete this clone."
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_DELETETHISCLONE,
            args0: [],
            category: Blockly.Categories.control,
            extensions: ["colours_control"],
        });

        // Add both shapes — set default
        this.setPreviousStatement(true);
        this.setNextStatement(true);

        this.updateShape_(); // shape based on context
    },

    /**
     * Inline function to determine the top block and update shape.
     */
    updateShape_: function () {
        let topBlock = this;
        while (topBlock.getPreviousBlock()) {
            topBlock = topBlock.getPreviousBlock();
        }

        const isCloneTop =
            topBlock && topBlock.type === "control_start_as_clone";

        this.setNextStatement(!isCloneTop); // if top is clone, make this an "end" block
        this.setPreviousStatement(true);

        // Save internal state for mutation persistence
        this.isEndShape_ = isCloneTop;
    },

    /**
     * React to changes in the workspace (e.g., moved, connected).
     */
    onchange: function () {
        // Avoid errors when not attached to a workspace (e.g., in flyout)
        if (!this.workspace || this.isInFlyout) return;
        this.updateShape_();
    },

    mutationToDom: function () {
        const container = document.createElement("mutation");
        container.setAttribute("isend", this.isEndShape_ ? "true" : "false");
        return container;
    },

    domToMutation: function (xmlElement) {
        const isEnd = xmlElement.getAttribute("isend") === "true";
        this.isEndShape_ = isEnd;
        this.setNextStatement(!isEnd);
        this.setPreviousStatement(true);
    },
};

Blockly.Blocks["control_is_clone"] = {
    /**
     * Block for "clone?"
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            id: "control_is_clone",
            message0: Blockly.Msg.CONTROL_ISCLONE,
            category: Blockly.Categories.control,
            extensions: ["colours_control", "output_boolean"],
        });
    },
};

Blockly.Blocks["control_get_counter"] = {
    /**
     * Block to get the counter value. This is an obsolete block that is
     * implemented for compatibility with Scratch 2.0 projects.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_COUNTER,
            category: Blockly.Categories.control,
            extensions: ["colours_control", "output_number"],
        });
    },
};

Blockly.Blocks["control_incr_counter"] = {
    /**
     * Block to add one to the counter value. This is an obsolete block that is
     * implemented for compatibility with Scratch 2.0 projects.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_INCRCOUNTER,
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_clear_counter"] = {
    /**
     * Block to clear the counter value. This is an obsolete block that is
     * implemented for compatibility with Scratch 2.0 projects.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_CLEARCOUNTER,
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_all_at_once"] = {
    /**
     * Block to run the contained script. This is an obsolete block that is
     * implemented for compatibility with Scratch 2.0 projects. Note that
     * this was originally designed to run all of the contained blocks
     * (sequentially, like normal) within a single frame, but this feature
     * was removed in place of custom blocks marked "run without screen
     * refresh". The "all at once" block was changed to run the contained
     * blocks ordinarily, functioning the same way as an "if" block with a
     * reporter that is always true (e.g. "if 1 = 1"). Also note that the
     * Scratch 2.0 spec for this block is "warpSpeed", but the label shows
     * "all at once".
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_ALLATONCE,
            message1: "%1", // Statement
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_async"] = {
    /**
     * amp: Runs the contained script asyncronously.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_ASYNC,
            message1: "%1",
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_switch"] = {
    /**
     * amp: Block for "switch".
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_SWITCH,
            message1: "%1",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                    check: "case",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_statement"],
        });
    },
};

Blockly.Blocks["control_case"] = {
    /**
     * amp: Block for "case".
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: Blockly.Msg.CONTROL_CASE,
            message1: "%1",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                },
            ],
            args1: [
                {
                    type: "input_statement",
                    name: "SUBSTACK",
                },
            ],
            category: Blockly.Categories.control,
            extensions: ["colours_control", "shape_switch_case"],
        });
    },
    onchange: function (event) {
        if (!this.workspace || this.isInFlyout) return;

        let parentBlock = this.getSurroundParent();
        let isChildOfSwitch = false;

        if (parentBlock && parentBlock.type === "control_switch") {
            isChildOfSwitch = true;
        }

        if (!isChildOfSwitch) {
            this.setWarningText(Blockly.Msg.CONTROL_SWITCH_BAD_SYNTAX, this.id);
        } else {
            this.setWarningText(null, this.id);
        }
    },
};
