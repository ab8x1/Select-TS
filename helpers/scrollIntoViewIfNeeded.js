export default function scrollIntoViewIfNeeded(elem, container) { 
    let rectElem = elem.getBoundingClientRect(), rectContainer=container.getBoundingClientRect();
    if (rectElem.bottom > rectContainer.bottom) elem.scrollIntoView(false);
    if (rectElem.top < rectContainer.top) elem.scrollIntoView();
}