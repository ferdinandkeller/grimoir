import { Editor } from './editor'

// create a new editor
let editor_element = document.querySelector('editor')
if (editor_element === null) {
    throw new Error('Could not find an editor in the loaded document.')
} else {
    new Editor(editor_element)
}
