import { useEffect, useRef } from 'react'
import {ListContainer, ListItem, ItemText} from './styles/listStyles'
import {ListProps} from './types/customTypes'
import scrollIntoViewIfNeeded from './helpers/scrollIntoViewIfNeeded'

function List({userItems, hovered, selectItem, selected, setHovered, darkTheme}: ListProps){ 
    const listRef: any = useRef();
    const selectedRef: any = useRef();
    const hoveredRef: any = useRef();

    useEffect((): void => {
        if(hoveredRef?.current)
            scrollIntoViewIfNeeded(hoveredRef.current, listRef.current);
    }, [hovered]);

    useEffect((): void => {
            if(selectedRef?.current)
                selectedRef.current.scrollIntoView(false);
    }, [userItems]);

    const hoverListItem = (e: React.MouseEvent<HTMLLIElement>):void => {
        const index: number = Number((e.target as HTMLLIElement).value); 
        setHovered(index);
    }

    return(
        <ListContainer ref={listRef} darkTheme={darkTheme}>
            {
                userItems.map(({label, value, id}, i) =>
                    <ListItem 
                        key={`${value}.${i}`} 
                        value={i} 
                        onClick={selectItem} 
                        ref={id === selected ? selectedRef : i === hovered ? hoveredRef : null }
                        selected={id === selected}
                        hovered={i === hovered}
                        onMouseEnter={hoverListItem}
                        darkTheme={darkTheme}
                    >
                        <ItemText>{label}</ItemText>
                    </ListItem>
                )
            }
        </ListContainer>
    )
}
export default List;