import React from 'react';

const Toolbar = ({
  blockDropdown,
  fontButtons,
  sceneNumberButton,
  blockButtons,
}) => {
  return (
    <table className='ui celled padded table'>
      <thead>
        <tr>
          <th className='two wide'>Format Selector</th>
          <th className='two wide'>{blockDropdown}</th>
          {/* <th>{blockButtons}</th> */}
          <th className='twelve wide'>
            {fontButtons} {sceneNumberButton}
          </th>
        </tr>
      </thead>
    </table>
    // <div className='ui horizontal segments'>
    //   <div className='ui segment'>Format Selector</div>
    //   <div className='ui segment'>{blockDropdown}</div>
    //   {/* <div className='ui segment'>{blockButtons}</div> */}
    //   <div className='ui segment'>
    //     {fontButtons} {sceneNumberButton}
    //   </div>
    // </div>
  );
};

export default Toolbar;
