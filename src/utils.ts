export {}

// export function get_editor(): Element {
//     let element = document.querySelector('.editor')
//     if (element === null) {
//         throw new Error('Could not find editor')
//     }
//     return element
// }

// export function is_selection_empty(): boolean {
//     let selection = get_selection()
//     return selection.isCollapsed
// }

// export function is_editor_selected(): boolean {
//     let selection = get_selection()
//     return selection.anchorNode === get_editor()
// }

// export function get_ranges(): Range[] {
//     let selection = get_selection()
//     let ranges: Range[] = []
//     for (let i = 0; i < selection.rangeCount; i++) {
//         ranges.push(selection.getRangeAt(i))
//     }
//     return ranges
// }

// export function delete_ranges() {
//     for (let range of get_ranges()) {
//         delete_range(range)
//     }
// }

// export function delete_range(range: Range) {
//     range.deleteContents()
// }

// export function split() {
//     let selection = get_selection()
//     let style_node = selection.focusNode?.parentElement
//     if (style_node === undefined || style_node === null) {
//         throw new Error('No focus node')
//     }
//     let style_node_content = style_node.textContent
//     if (style_node_content === null) {
//         throw new Error('No focus node')
//     }
//     let caret_offset = selection.focusOffset
//     let content_before_caret = style_node_content.slice(0, caret_offset)
//     let content_after_caret = style_node_content.slice(caret_offset)
//     style_node.textContent = content_before_caret
//     let new_style_node = document.createElement('span')
//     new_style_node.classList.add(...Array.from(style_node.classList))
//     new_style_node.textContent = content_after_caret
//     style_node.parentElement?.insertBefore(new_style_node, style_node.nextSibling)

//     let new_paragraph = document.createElement('p')
//     while (true) {
//         let next_sibling = style_node.nextSibling
//         if (next_sibling === null) {
//             break
//         }
//         new_paragraph.appendChild(next_sibling)
//     }
//     style_node.parentElement?.parentElement?.insertBefore(new_paragraph, style_node.parentElement?.nextSibling)
// }
