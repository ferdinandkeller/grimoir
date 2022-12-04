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

    // subcomponents(): Subcomponent[] {
    //     // get the subcomponent elements
    //     let subcomponent_elements = this.dom_element.querySelectorAll('span')

    //     // convert the subcomponent elements into subcomponents
    //     let subcomponents = Array.from(subcomponent_elements).map((element) => {
    //         return new Subcomponent(element as HTMLSpanElement)
    //     })

    //     // return the subcomponents
    //     return subcomponents
    // }

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

    index_of_subcomponent(subcomponent: Subcomponent): number {
        // get the component children
        let children = [...this.dom_element.children]

        // get the index of the subcomponent
        let index = children.indexOf(subcomponent.dom_element)

        // if the subcomponent index cannot be found, throw an error
        if (index === -1) {
            throw new Error('Could not find the subcomponent index.')
        }

        // return the index of the subcomponent
        return index
    }

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
}
