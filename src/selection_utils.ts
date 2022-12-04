import { Subcomponent } from "./subcomponent"
import { Component } from "./component"

export class SelectionUtils {
    selection_object: Selection

    constructor() {
        // get the selection object
        let selection = window.getSelection()

        // if the selection object cannot be found, throw an error
        if (selection === null) {
            throw new Error('Could not find the selection object.')
        }

        // save the selection
        this.selection_object = selection
    }

    anchor_subcomponent(): Subcomponent {
        // get the anchor node (a node is not an element)
        let anchor = this.selection_object.anchorNode

        // if the anchor node cannot be found, throw an error
        if (anchor === null) {
            throw new Error('Could not find the selection anchor node.')
        }

        // get the anchor subcomponent
        let anchor_subcomponent = anchor.parentElement

        // if the anchor subcomponent cannot be found, throw an error
        if (anchor_subcomponent === null) {
            throw new Error('Could not find the selection anchor subcomponent.')
        }

        // return the anchor subcomponent
        return new Subcomponent(anchor_subcomponent)
    }

    focus_subcomponent(): Subcomponent {
        // get the focus node (a node is not an element)
        let focus = this.selection_object.focusNode

        // if the focus node cannot be found, throw an error
        if (focus === null) {
            throw new Error('Could not find the selection focus node.')
        }

        // get the focus subcomponent
        let focus_subcomponent = focus.parentElement

        // if the focus subcomponent cannot be found, throw an error
        if (focus_subcomponent === null) {
            throw new Error('Could not find the selection focus subcomponent.')
        }

        // return the focus subcomponent
        return new Subcomponent(focus_subcomponent)
    }

    anchor_component(): Component {
        return this.anchor_subcomponent().component
    }

    focus_component(): Component {
        return this.focus_subcomponent().component
    }

    anchor_offset(): number {
        return this.selection_object.anchorOffset
    }

    focus_offset(): number {
        return this.selection_object.focusOffset
    }

    get ranges(): RangeUtils[] {
        // create an array to store the ranges
        let ranges: RangeUtils[] = []

        // add the ranges to the array
        for (let i = 0; i < this.selection_object.rangeCount; i++) {
            ranges.push(new RangeUtils(this.selection_object.getRangeAt(i)))
        }

        // return the ranges
        return ranges
    }

    set_caret(subcomponent: Subcomponent, offset: number) {
        // create a new range
        let range = document.createRange()

        // set the range
        range.setStart(subcomponent.text_node, offset)
        range.collapse(true)

        // set the selection
        this.selection_object.removeAllRanges()
        this.selection_object.addRange(range)
    }

    /**
     * Remove everything in the selection.
     */
    remove() {
        // get the caret subcomponent and offset
        let caret_subcomponent = this.anchor_subcomponent()
        let caret_offset = this.anchor_offset()
        
        // get the ranges
        let ranges = this.ranges
        
        // remove each range in the selection
        for (let range of ranges) {
            range.remove()
        }
        
        // reset the caret
        this.set_caret(caret_subcomponent, caret_offset)
    }
}

export class RangeUtils {
    range_object: Range

    constructor(range: Range) {
        // save the range
        this.range_object = range
    }

    start_subcomponent(): Subcomponent {
        // get the start node (a node is not an element)
        let start_node = this.range_object.startContainer

        // if the start node cannot be found, throw an error
        if (start_node === null) {
            throw new Error('Could not find the range start node.')
        }

        // get the start subcomponent
        let start_subcomponent = start_node.parentElement

        // if the start subcomponent cannot be found, throw an error
        if (start_subcomponent === null) {
            throw new Error('Could not find the range start subcomponent.')
        }

        // return the start subcomponent
        return new Subcomponent(start_subcomponent)
    }

    end_subcomponent(): Subcomponent {
        // get the end node (a node is not an element)
        let end_node = this.range_object.endContainer

        // if the end node cannot be found, throw an error
        if (end_node === null) {
            throw new Error('Could not find the range end node.')
        }

        // get the end subcomponent
        let end_subcomponent = end_node.parentElement

        // if the end subcomponent cannot be found, throw an error
        if (end_subcomponent === null) {
            throw new Error('Could not find the range end subcomponent.')
        }

        // return the end subcomponent
        return new Subcomponent(end_subcomponent)
    }

    start_component(): Component {
        return this.start_subcomponent().component
    }

    end_component(): Component {
        return this.end_subcomponent().component
    }

    get start_offset(): number {
        return this.range_object.startOffset
    }

    get end_offset(): number {
        return this.range_object.endOffset
    }

    /**
     * Remove everything in the range.
     */
    remove() {
        // get relevant components
        let editor = this.start_component().editor

        let start_component = this.start_component()
        let end_component = this.end_component()

        let start_subcomponent = this.start_subcomponent()
        let end_subcomponent = this.end_subcomponent()

        let start_offset = this.start_offset
        let end_offset = this.end_offset

        // if components are differents
        if (start_component.dom_element !== end_component.dom_element) {
            // delete the components in the range
            editor.remove_between(start_component.index + 1, end_component.index)
            
            // delete the subcomponents in the range
            start_component.remove_from(start_subcomponent.index + 1)
            end_component.remove_before(end_subcomponent.index)

            // delete the text in the range
            start_subcomponent.remove_from(start_offset)
            end_subcomponent.remove_before(end_offset)

            // combine the components
            start_component.combine(end_component)
        }
        
        // if subcomponents are differents
        else if (start_subcomponent.dom_element !== end_subcomponent.dom_element) {
            // delete the subcomponents in the range
            start_component.remove_between(start_subcomponent.index + 1, end_subcomponent.index)

            // delete the text in the range
            start_subcomponent.remove_from(start_offset)
            end_subcomponent.remove_before(end_offset)

            // combine the subcomponents
            start_subcomponent.combine(end_subcomponent)
        }
        
        // if the range is within a single subcomponent
        else {
            // delete the text in the range
            start_subcomponent.remove_between(start_offset, end_offset)
        }
    }
}
