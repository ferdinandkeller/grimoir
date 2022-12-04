import { Component } from './component'

/**
 * The valid types a subcomponent can take.
 */
export enum SubcomponentType {
    Normal = 'normal',
    Bold = 'bold',
    Italic = 'italic',
}

/**
 * Inner-representation of a subcomponent element.
 */
export class Subcomponent {
    /**
     * The dom element for the subcomponent.
     */
    dom_element: Element

    /**
     * Creates a new subcomponent from an existing dom element.
     * 
     * @param dom_element The dom element for the subcomponent.
     */
    constructor(dom_element: Element) {
        // save the dom element
        this.dom_element = dom_element
    }

    /**
     * Creates a new subcomponent from scratch, using only a type and inner text.
     * The subcomponent created won't be added to the dom automatically.
     * 
     * @param type The type of the new subcomponent.
     * @param text The text to display inside the new subcomponent.
     * @returns A new subcomponent.
     */
    static from_scratch(type: SubcomponentType, text: string): Subcomponent {
        // create a new span element
        let new_element = document.createElement('span')

        // add the appropriate class to the new span element
        new_element.classList.add(type)

        // create a new subcomponent
        let subcomponent = new Subcomponent(new_element)

        // set the subcomponent text
        subcomponent.text = text

        // return the new subcomponent
        return subcomponent
    }

    /**
     * Returns the text inside the subcomponent.
     */
    get text(): string {
        // get the subcomponent text
        let text = this.dom_element.textContent

        // if the subcomponent text cannot be found, throw an error
        if (text === null) {
            throw new Error('Could not find the subcomponent text.')
        }

        // return the anchor subcomponent text
        return text
    }

    /**
     * Sets the text inside the subcomponent.
     */
    set text(text: string) {
        // set the subcomponent text
        this.dom_element.textContent = text
    }

    /**
     * Returns the type of the subcomponent.
     */
    get type(): SubcomponentType {
        // find the subcomponent type
        if (this.dom_element.classList.contains('normal')) {
            return SubcomponentType.Normal
        } else if (this.dom_element.classList.contains('bold')) {
            return SubcomponentType.Bold
        } else if (this.dom_element.classList.contains('italic')) {
            return SubcomponentType.Italic
        } else {
            throw new Error('Could not find the subcomponent type.')
        }
    }

    /**
     * Sets the type of the subcomponent.
     */
    set type(type: SubcomponentType) {
        // remove all subcomponent type classes
        this.dom_element.classList.remove(...this.dom_element.classList)

        // add the appropriate class to the subcomponent
        this.dom_element.classList.add(type)
    }

    /**
     * Returns the component containing the subcomponent.
     */
    get component(): Component {
        // get the component
        let component = this.dom_element.parentElement

        // if the component cannot be found, throw an error
        if (component === null) {
            throw new Error('Could not find the subcomponent component.')
        }

        // return the component
        return new Component(component)
    }

    /**
     * Returns the index of the subcomponent in the component.
     */
    get index(): number {
        // get the component children
        let children = [...this.component.dom_element.children]

        // get the index of the subcomponent
        let index = children.indexOf(this.dom_element)

        // if the subcomponent index cannot be found, throw an error
        if (index === -1) {
            throw new Error('Could not find the subcomponent index.')
        }

        // return the index
        return index
    }

    /**
     * Returns the text node of the subcomponent.
     */
    get text_node(): Node {
        // get the text node
        let text_node = this.dom_element.firstChild

        // if the text node cannot be found, throw an error
        if (text_node === null) {
            throw new Error('Could not find the subcomponent text node.')
        }

        // return the text node
        return text_node
    }

    /**
     * Split the subcomponent in two at the given index.
     * The current subcomponent will be updated to contain the text before the index.
     * A new subcomponent will be added after the current subcomponent, containing the text after the index.
     * 
     * @param index The index at which to split the subcomponent.
     * @returns The new subcomponent.
     */
    split(index: number): Subcomponent {
        // find the subcomponent text
        let text = this.text

        // split the text at the given index
        let text_before = text.substring(0, index)
        let text_after = text.substring(index)
        
        // update the subcomponent text
        this.text = text_before

        // create a new subcomponent with the text after the caret
        let new_subcomponent = Subcomponent.from_scratch(this.type, text_after)

        // insert the new subcomponent after the current subcomponent
        this.dom_element.after(new_subcomponent.dom_element)

        // return the new subcomponent
        return new_subcomponent
    }

    /**
     * Combines the current subcomponent with the given subcomponent.
     * The combining only happens if the subcomponents have the same type.
     * 
     * @param other The subcomponent to combine with.
     */
    combine(other: Subcomponent) {
        if (this.type === other.type) {
            // combine the subcomponents text
            this.text += other.text
    
            // remove the other subcomponent
            other.remove()
        }
    }

    /**
     * Removes the subcomponent from the dom.
     */
    remove() {
        this.dom_element.remove()
    }

    /**
     * Removes all the text before the given index.
     * 
     * @param index The index before witch to remove the text.
     */
    remove_before(index: number) {
        this.text = this.text.substring(index)
    }

    /**
     * Removes all the text after the given index.
     * 
     * @param index The index after witch to remove the text.
     */
    remove_from(index: number) {
        this.text = this.text.substring(0, index)
    }

    /**
     * Removes the text between the given indices.
     * 
     * @param start_index The index at which we start to remove.
     * @param end_index The index at which we stop to remove.
     */
     remove_between(start_index: number, end_index: number) {
        if (start_index <= end_index) {
            this.text = this.text.substring(0, start_index) + this.text.substring(end_index)
        }
    }
}
