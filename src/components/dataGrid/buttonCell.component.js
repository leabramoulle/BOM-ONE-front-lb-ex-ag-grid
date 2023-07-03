import React, {useState, useRef} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import './buttonCell.scss'
import Tippy from '@tippyjs/react';

library.add(faClock);

export default (p) => {
  const gridRef = useRef();
  const tippyRef = useRef();
  const cellValue = p.valueFormatted ? p.valueFormatted : p.value;
  const [displayCellOptions, setDisplayCellOptioins] = useState(false);

  const [visible, setVisible] = useState(false);
  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const dropDownContent = (
    <div className="btn-options-container">
      <div onClick={() => console.log("create")} className="btn-options-item">
        Create New Row
      </div>
      <div onClick={() => console.log("edit")} className="btn-options-item">
        Edit Row
      </div>
      <div onClick={() => console.log("delete")} className="btn-options-item">
        Delete Row
      </div>
    </div>
  );

  const onClickHandler = (option) => {
    hide();
  };

  const buttonClicked = () => {
    console.log("cell clicked")
    setDisplayCellOptioins(!displayCellOptions);
  };

  return (
    <div className='btn-cell-container'>
      <Tippy
      ref={tippyRef}
      content={dropDownContent}
      visible={visible}
      onClickOutside={hide}
      allowHTML={true}
      arrow={false}
      appendTo={document.body}
      interactive={true}
      placement="right"
    >
       <FontAwesomeIcon icon={faClock} onClick={visible ? hide : show} className='btn-cell-icon'/>
    </Tippy>
    </div>
  );
};