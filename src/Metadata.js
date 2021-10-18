import React from 'react';
import {AiOutlineColumnHeight, AiOutlineColumnWidth, CgTimelapse} from "react-icons/all";

const Metadata = (props) => {

  const {width, height, duration} = props;

  const renderWidth = () => {
    if (width) {
      return (
        <div className={"ms-3 me-3"}>
          <AiOutlineColumnWidth size={24} style={{marginRight:5}}/>
          {width} px
        </div>
      );
    }
  }

  const renderHeight = () => {
    if (height) {
      return (
        <div className={"ms-3 me-3"}>
          <AiOutlineColumnHeight size={24} style={{marginRight:5}}/>
          {height} px
        </div>
      );
    }
  }

  const renderDuration = () => {
    if (duration) {
      return (
        <div className={"ms-3 me-3"}>
          <CgTimelapse size={24} style={{}} style={{marginRight:5}}/>
          {duration} s
        </div>
      );
    }
  }


  return (
    <div className={"offset-4 col-4 text-start"}>
      <div className={"d-flex"}>
        {renderWidth()}
        {renderHeight()}
        {renderDuration()}
      </div>
    </div>
  );
};

export default Metadata;