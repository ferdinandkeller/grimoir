// editor
//  -> component
//      -> subcomponent

import { SelectionUtils } from "./selection_utils"
import { Editor } from "./editor"
import { Component, ComponentType } from "./component"
import { Subcomponent, SubcomponentType } from "./subcomponent"

export class EditorController {
    editor: Editor
    selection_utils: SelectionUtils
    
    constructor(editor_element: Element) {
        // create the editor
        this.editor = new Editor(editor_element)

        // create the selection utils
        this.selection_utils = new SelectionUtils()

        // register the key press and key release events
        document.addEventListener('keydown', (event) => {
            this.key_pressed(event)
        })
        document.addEventListener('keyup', (event) => {
            this.key_released(event)
        })

        // make the editor editable
        this.editor.dom_element.setAttribute('contenteditable', 'true')
        this.editor.dom_element.setAttribute('spellcheck', 'false')
    }

    key_pressed(event: KeyboardEvent) {
        // if the user is typing in the editor
        if (this.is_focused()) {
            // get the key that was pressed
            let key = event.key

            // handle the key press
            switch (key) {
                case 'Enter':
                    event.preventDefault()
                    this.new_line_pressed()
            }
        }
    }

    key_released(event: KeyboardEvent) {
    }

    is_focused(): boolean {
        return document.activeElement === this.editor.dom_element
    }

    new_line_pressed() {
        // delete selected text
        this.selection_utils.remove()

        // // break the current subcomponent into two
        // let caret_subcomponent = this.selection_utils.focus_subcomponent()
        // let caret_offset = this.selection_utils.focus_offset()
        // let new_subcomponent = caret_subcomponent.split(caret_offset)
        
        // // break the current component into two
        // let subcomponent_index = caret_subcomponent.index
        // caret_subcomponent.component.split(subcomponent_index + 1)

        // // move the caret to the new line
        // this.selection_utils.set_caret(new_subcomponent, 0)
    }
}
