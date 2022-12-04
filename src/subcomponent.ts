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
    dom_element: HTMLSpanElement

    /**
     * Creates a new subcomponent from an existing dom element.
     * 
     * @param dom_element The dom element for the subcomponent.
     */
    constructor(dom_element: HTMLSpanElement) {
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

    get index(): number {
        // get the component
        let component = this.component

        // get the component subcomponents
        return component.index_of_subcomponent(this)
    }

    /**
     * Split the subcomponent in two at the given index.
     * 
     * @param index The index at which to split the subcomponent.
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
}
