import { Component } from "./component"

/**
 * Inner-representation of an editor element.
 */
export class Editor {
    /**
     * The dom element for the editor.
     */
    dom_element: Element

    /**
     * Creates a new editor from an existing dom element.
     * 
     * @param dom_element The dom element for the editor.
     */
    constructor(dom_element: Element) {
        // save the dom element
        this.dom_element = dom_element
    }

    /**
     * Returns the components inside the editor.
     */
    components(): Component[] {
        return [...this.dom_element.children].map(child => new Component(child))
    }

    /**
     * Returns the number of components inside the editor.
     */
    get size(): number {
        return this.dom_element.childElementCount
    }

    /**
     * Returns the component at the given index.
     * 
     * @param index The index of the component to return.
     */
    nth_component(index: number): Component {
        return new Component(this.dom_element.children[index])
    }

    /**
     * Removes all the components before the given index.
     * 
     * @param index The index of the component to remove.
     */
    remove_before(index: number) {
        [...this.dom_element.children].slice(0, index).forEach(child => child.remove())
    }

    /**
     * Removes all the components after the given index.
     * 
     * @param index The index of the component to remove.
     */
    remove_from(index: number) {
        [...this.dom_element.children].slice(index).forEach(child => child.remove())
    }

    /**
     * Removes all the components between the given indices.
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
