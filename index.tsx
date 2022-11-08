import { useRef, useState, useEffect } from 'react'
import {SelectProps, listItem, inputItem} from './types/customTypes'
import {Container, Control, InputControl, Input, PlaceholderContainer, Magnifier, Clear, ArrowContainer} from './styles/selectStyles' 
import magnifierImage from './imgs/magnifier.svg'
import chevronDown from './imgs/chevron-down.png'
import clearImage from './imgs/clear.svg'
import List from './List'
import Loading from './Loading'
import OnClickOutside from './helpers/onClickOutside'

const emptyItem: inputItem = {label: '', value: '', query: ''};

function Select({items, isSearchable, onChange, Placeholder, isLoading, darkTheme, searchIcon, customStyles}: SelectProps){
    const [listOpened, setListOpened] = useState(false); 
    const [listItems, setListItems] = useState<listItem[]>([]);  //filtered items
    const [selected, setSelected] = useState<number | undefined>(); //currently selected item id 
    const [hovered, setHovered] = useState<number>(0); //currently hovered item id 
    const [inputItem, setInputItem] = useState<inputItem>(emptyItem); //input from user
    const inputRef: any = useRef();
    const listRef: any = useRef();
    const placeholderValue = inputItem.value && !inputItem.query ? inputItem.label : '';

    const closeList = (): void => {
        setListOpened(false);
    }

    const toogleList = (): void => {
        setListOpened(prevState => !prevState);
    }

    OnClickOutside(listRef, closeList);

    useEffect((): void => {
        if(!listOpened){
            setInputItem(oldSt => ({...oldSt, query: ''}));
            setListItems(items); 
            setHovered(selected || 0);
        }
    }, [listOpened])

    const updateQuery = (e: React.ChangeEvent<HTMLInputElement>):void => {
        const val: string = e.target.value;
        const searchVal = val.toLocaleLowerCase();
        const filteredItems = items.filter(item => item.value.toLowerCase().includes(searchVal));
        setInputItem(oldSt => ({...oldSt, query: val}));
        setListItems(filteredItems);
        setHovered(filteredItems.findIndex(el => el.id === selected)); //if current selected is in filtered results, keep it hover
        if(!listOpened) setListOpened(true);
    }

    const keyDownListener = (e: React.KeyboardEvent<HTMLInputElement>):void => {
        let newHovered = hovered;
        if(e.key === "ArrowDown" && hovered + 1 < listItems.length){
            newHovered = hovered + 1;
            setHovered(newHovered);
        }
        else if(e.key === "ArrowUp" && hovered - 1 >= 0 ){
            newHovered = hovered - 1;
            setHovered(newHovered);
        }
        else if(e.key === "Enter"){
            if(newHovered >= 0)
                selectItem(newHovered);
            else
                search();
        }
    }

    const selectItem = (e: React.MouseEvent<HTMLLIElement> | number): void => {
        const index: number = typeof e === "number" ? e : Number((e.target as HTMLLIElement).value); 
        const choosenItem = listItems[index];
        search(choosenItem);
        setSelected(choosenItem.id);
        setHovered(choosenItem.id);
    }

    const search = (choosenItem?: listItem): void => {
        if(choosenItem || inputItem?.query){ //if there is a value to search for
            let newInputItem: inputItem = {...inputItem};
            if(choosenItem) newInputItem = {...choosenItem, query: ''}; // if item from the list 
            else { // if item from the input
                newInputItem = {value: inputItem?.query, label: inputItem?.query, query: ''};
                const userItemIsInListIndex: number = listItems.findIndex(it => it.label.toLowerCase() === inputItem?.query?.toLowerCase()); //if user typed something that exists in list
                setSelected(userItemIsInListIndex >= 0 ? listItems[userItemIsInListIndex].id : undefined); //set it as selected
            }
            onChange({value: newInputItem.value, label: newInputItem.label});
            setInputItem(newInputItem);
            setListItems(items);
            closeList();
        }
        else 
            inputRef.current.focus();
    }

    const clear = (): void => {
        setInputItem(emptyItem);
        setSelected(undefined);
        setHovered(-1)
        onChange(null);
        inputRef.current.focus();
    }
 
    return(
        <Container ref={listRef}>
            <Control darkTheme={darkTheme} customStyles={customStyles?.['control']}>
                {searchIcon ? 
                    <Magnifier src={magnifierImage.src} onClick={() => search(undefined)}/>
                    : <ArrowContainer onClick={toogleList} customStyles={customStyles?.['arrowContainer']}>
                            <img src={chevronDown.src}/>
                    </ArrowContainer>
                }
                <InputControl>
                    {!inputItem.query && !placeholderValue && 
                        <PlaceholderContainer>{typeof Placeholder === "string" ? Placeholder : <Placeholder/>}</PlaceholderContainer>
                    }
                    <Input 
                        readOnly={!isSearchable}
                        ref={inputRef}
                        type="text" 
                        placeholder={placeholderValue} 
                        value={inputItem.query} 
                        onClick={toogleList} 
                        onInput={isSearchable ? updateQuery : undefined}
                        onKeyDown={keyDownListener}
                        isSearchable={isSearchable}
                    />
                    {isLoading ? <Loading/> : inputItem.value && <Clear darkTheme={darkTheme} src={clearImage.src} onClick={clear} alt="Clear input"/>}
                </InputControl>
            </Control>
            { listOpened && listItems.length > 0 &&
                <List 
                    userItems={listItems} 
                    selectItem={selectItem} 
                    selected={selected}
                    hovered={hovered}
                    setHovered={setHovered}
                    darkTheme={darkTheme}
                /> 
            }
        </Container>

    )
}
export default Select;