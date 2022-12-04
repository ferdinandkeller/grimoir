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

    set_caret(subcomponent: Subcomponent, offset: number) {
        // get the range
        let range = document.createRange()

        // set the range
        range.setStart(subcomponent.dom_element, offset)
        range.collapse(true)

        // set the selection
        this.selection_object.removeAllRanges()
        this.selection_object.addRange(range)
    }
}

