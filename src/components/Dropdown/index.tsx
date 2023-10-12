import { useEffect, useRef, KeyboardEvent, useState } from "react"
import { Wrapper, ActivatorButton, DropdownList } from "./styles";

interface IDropdownItem {
  id: number;
  value: string;
  text: string;
}

interface IProps {
  activatorText?: string;
  items?: IDropdownItem[];
  onChange?: any;
}

const dropdownItems = [
  {
    id: 1,
    text: "Compra",
    value: "buy",
  },
  {
    id: 2,
    text: "Venda",
    value: "sell",
  },
  // {
  //   id: 3,
  //   text: "option3",
  //   value: "op3",
  // },
  // {
  //   id: 4,
  //   text: "option4",
  //   value: "op4",
  // }
];

const defaultChangeFunction = (event : any) => {};

const Dropdown = ({
  items = dropdownItems,
  onChange = defaultChangeFunction,
}: IProps) => {
  const activatorRef = useRef<HTMLButtonElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [activatorText, setActivatorText] = useState("Dropdown")

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const keyHandler = (event: KeyboardEvent) => {
    if (isOpen) {
      switch (event.key) {
        case "Escape":
          setIsOpen(false);
          break;
        case "ArrowDown":
          const nodeList = listRef.current!.querySelectorAll("a");
          if (activeIndex === items.length - 1) return;
          nodeList[activeIndex + 1].focus();
          break;
        case "ArrowUp":
          const nodeList2 = listRef.current!.querySelectorAll("a");
          if (activeIndex === 0) return;
          nodeList2[activeIndex - 1].focus();
          break;
      }
    }
  };

  const handleClickOutside = (event: any) => {
    if (
      listRef.current!.contains(event.target) ||
      activatorRef.current!.contains(event.target)
    ) {
      return;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      listRef.current!.querySelector("a")!.focus();
      document.addEventListener("mouseup", handleClickOutside);
    } else {
      document.removeEventListener("mouseup", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(-1);
    }
  }, [isOpen]);

  const focusHandler = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <Wrapper onKeyUp={keyHandler}>
      <ActivatorButton
        aria-haspopup="true"
        type="button"
        aria-controls="dropdown1"
        onClick={handleClick}
        ref={activatorRef}
        onFocus={() => setActiveIndex(-1)}
      >
        {activatorText}
      </ActivatorButton>
      
      <DropdownList id="dropdown1" ref={listRef} active={isOpen} role="list" onChange={(event) => console.log(event)}>
        {items.map((item, index) => (
          <li key={item.id}>
            <a onFocus={() => focusHandler(index)} onClick={(event) => { setActivatorText(item.text); setIsOpen(false); onChange(item.value) }}>
              {item.text}
            </a>
          </li>
        ))}
      </DropdownList>
    </Wrapper>
  );
};

export default Dropdown;
