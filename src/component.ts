import { Editor } from './editor'
import { Subcomponent } from './subcomponent'

/**
 * The valid types a component can take.
 */
export enum ComponentType {
    Paragraph = 'p',
    Heading1 = 'h1',
    UnorderedList = 'ulp',
}

/**
 * Inner-representation of a component element.
 */
export class Component {
    /**
     * The dom element for the component.
     */
    dom_element: Element

    /**
     * Creates a new component from an existing dom element.
     * 
     * @param dom_element The dom element for the component.
     */
    constructor(dom_element: Element) {
        // save the dom element
        this.dom_element = dom_element
    }

    /**
     * Creates a new component from scratch, using only a type.
     * The component created won't be added to the dom automatically.
     * 
     * @param type The type of the new component.
     * @returns A new component.
     */
    static from_scratch(type: ComponentType): Component {
        // create a new element
        let new_element = document.createElement(type)

        // create a new component
        let component = new Component(new_element)

        // return the new component
        return component
    }

    /**
     * Returns the type of the component.
     */
    get type(): ComponentType {
        // get the component tag
        let tag = this.dom_element.tagName.toLowerCase()

        // find the component type
        if (tag === 'p') {
            return ComponentType.Paragraph
        } else if (tag === 'h1') {
            return ComponentType.Heading1
        } else if (tag === 'ulp') {
            return ComponentType.UnorderedList
        } else {
            throw new Error('Unknown component type.')
        }
    }

    /**
     * Returns the editor containing the component.
     */
    get editor(): Editor {
        // get the editor
        let editor = this.dom_element.parentElement

        // if the editor cannot be found, throw an error
        if (editor === null) {
            throw new Error('Could not find the editor.')
        }

        // return the editor
        return new Editor(editor)
    }

    /**
     * Returns the index of the component in the editor.
     */
    get index(): number {
        // get the editor children
        let children = [...this.editor.dom_element.children]

        // get the index of the component
        let index = children.indexOf(this.dom_element)

        // if the component index cannot be found, throw an error
        if (index === -1) {
            throw new Error('Could not find the component index.')
        }

        // return the index
        return index
    }
    
    /**
     * Returns all the subcomponents inside the component.
     */
    subcomponents(): Subcomponent[] {
        return [...this.dom_element.children].map(element => new Subcomponent(element))
    }

    /**
     * Returns the number of subcomponents in the component.
     */
    get size(): number {
        return this.dom_element.childElementCount
    }

    /**
     * Returns the subcomponent at the given index.
     * 
     * @param index The index of the subcomponent to return.
     */
    nth_subcomponent(index: number): Subcomponent {
        return new Subcomponent(this.dom_element.children[index])
    }

    /**
     * Split the component into two components at the given index.
     * The current component will be modified to contain the subcomponents before the split index.
     * The new component will be added after the current component, and will contain the subcomponents after the split index.
     * 
     * @param index The index at which to pslit the component.
     * @returns The new component.
     */
    split(index: number): Component {
        // create a new component
        let new_component = Component.from_scratch(ComponentType.Paragraph)

        // move the subcomponents after the split index to the new component
        let subcomponents = [...this.dom_element.children].slice(index)
        for (let subcomponent of subcomponents) {
            new_component.dom_element.appendChild(subcomponent)
        }

        // add the new component after the current component
        this.dom_element.after(new_component.dom_element)

        // return the new component
        return new_component
    }

    /**
     * Combines the current component with the given component.
     * 
     * @param other The component to combine with.
     */
    combine(other: Component) {
        // get last and first subcomponents
        let last_subcomponent = this.nth_subcomponent(this.size - 1)
        let first_subcomponent = other.nth_subcomponent(0)

        // move the subcomponents of the other component to the current component
        for (let subcomponent of other.dom_element.children) {
            this.dom_element.appendChild(subcomponent)
        }

        // combine the subcomponents
        last_subcomponent.combine(first_subcomponent)            

        // remove the other subcomponent
        other.remove()
    }

    /**
     * Removes the component from the editor.
     */
    remove() {
        this.dom_element.remove()
    }

    /**
     * Removes all the subcomponents before the given index.
     * 
     * @param index The index of the subcomponent to remove.
     */
    remove_before(index: number) {
        [...this.dom_element.children].slice(0, index).forEach(child => child.remove())
    }

    /**
     * Removes all the subcomponents after the given index.
     * 
     * @param index The index of the subcomponent to remove.
     */
    remove_from(index: number) {
        [...this.dom_element.children].slice(index).forEach(child => child.remove())
    }

    /**
     * Removes all the subcomponents between the given indices.
     * 
     * @param start_index The index at which we start to remove.
     * @param end_index The index at which we stop to remove.
     */
     remove_between(start_index: number, end_index: number) {
        if (start_index <= end_index) {
            [...this.dom_element.children].slice(start_index, end_index).forEach(child => child.remove())
        }
    }
}
