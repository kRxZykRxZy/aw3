/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2025 AmpElectrecuted
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

goog.require("Blockly.Blocks");
goog.require("Blockly.Colours");
goog.require("Blockly.constants");
goog.require("Blockly.ScratchBlocks.VerticalExtensions");

Blockly.Blocks["arrays_item_of"] = {
    /**
     * Block for getting an item from an array.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "item %1 of %2",
            args0: [
                {
                    type: "input_value",
                    name: "INDEX",
                },
                {
                    type: "input_value",
                    name: "VALUE",
                    check: "Array",
                },
            ],
            output: null,
            extensions: ["colours_data_lists", "shape_round"],
        });
    },
};

Blockly.Blocks["arrays_item_no_of"] = {
    /**
     * Block for getting the index of an item in an array.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "item # of %1 in %2",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                },
                {
                    type: "input_value",
                    name: "ARRAY",
                    check: "Array",
                },
            ],
            extensions: ["colours_data_lists", "output_number"],
        });
    },
};

Blockly.Blocks["arrays_contains"] = {
    /**
     * Block for checking if a list contains a value.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "%1 contains %2?",
            args0: [
                {
                    type: "input_value",
                    name: "ARRAY",
                    check: "Array",
                },
                {
                    type: "input_value",
                    name: "VALUE",
                },
            ],
            extensions: ["colours_data_lists", "output_boolean"],
        });
    },
};

Blockly.Blocks["arrays_length"] = {
    /**
     * Block for getting the length of a list.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "length of %1",
            args0: [
                {
                    type: "input_value",
                    name: "VALUE",
                    check: "Array",
                },
            ],
            output: "Number",
            extensions: ["colours_data_lists", "output_number"],
        });
    },
};

Blockly.Blocks["arrays_empty_array"] = {
    /**
     * Block for creating an empty list.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "empty array",
            output: "Array",
            extensions: ["colours_data_lists", "shape_square"],
        });
    },
};

Blockly.Blocks["arrays_delimited_to_array"] = {
    /**
     * Block for creating a list from a text.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "array from %1 separated by %2",
            args0: [
                {
                    type: "input_value",
                    name: "TEXT",
                },
                {
                    type: "input_value",
                    name: "DELIM",
                },
            ],
            output: "Array",
            extensions: ["colours_data_lists", "shape_square"],
        });
    },
};

// The 2 blocks below are swapped due to a mistake during development.

Blockly.Blocks["arrays_in_front_of"] = {
    /**
     * Block for reporting a list with an item added to the top.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "add %1 to %2",
            args0: [
                {
                    type: "input_value",
                    name: "ITEM",
                },
                {
                    type: "input_value",
                    name: "ARRAY",
                    check: "Array",
                },
            ],
            output: "Array",
            extensions: ["colours_data_lists", "shape_square"],
        });
    },
};

Blockly.Blocks["arrays_behind"] = {
    /**
     * Block for reporting a list with an item added to the bottom.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "%1 in front of %2",
            args0: [
                {
                    type: "input_value",
                    name: "ITEM",
                },
                {
                    type: "input_value",
                    name: "ARRAY",
                    check: "Array",
                },
            ],
            output: "Array",
            extensions: ["colours_data_lists", "shape_square"],
        });
    },
};

Blockly.Blocks["arrays_at"] = {
    /**
     * Block for reporting a list with an item at a specific position.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "insert %1 at %2 of %3",
            args0: [
                {
                    type: "input_value",
                    name: "ITEM",
                },
                {
                    type: "input_value",
                    name: "INDEX",
                },
                {
                    type: "input_value",
                    name: "ARRAY",
                    check: "Array",
                },
            ],
            output: "Array",
            extensions: ["colours_data_lists", "shape_square"],
        });
    },
};

Blockly.Blocks["arrays_range"] = {
    /**
     * Block for creating a list with a range.
     * @this Blockly.Block
     */
    init: function () {
        this.jsonInit({
            message0: "list from %1 to %2",
            args0: [
                {
                    type: "input_value",
                    name: "START",
                    check: "Number",
                },
                {
                    type: "input_value",
                    name: "END",
                    check: "Number",
                },
            ],
            output: "Array",
            extensions: ["colours_data_lists", "shape_square"],
        });
    },
};
