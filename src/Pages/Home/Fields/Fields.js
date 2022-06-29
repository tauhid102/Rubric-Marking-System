import React, { useState } from "react";
import InputFields from "./InputFields";

const Fields = () => {
  const [fields, setFields] = useState();
  const [fields2, setFields2] = useState();
  const [f1, set1] = useState(0);
  const [f2, set2] = useState(0);

  const createInputFields = (e) => {
    e.preventDefault();
    set1(fields);
    set2(fields2);
  };
  new Array(f2);
  console.log(f1, f2);
  return (
    <div>
      <div>
        <form action="" onSubmit={createInputFields}>
          <input
            type="text"
            placeholder="Enter Row"
            onBlur={(e) => setFields(parseInt(e.target.value))}
          />
          <input
            type="text"
            placeholder="Enter Coloum"
            onBlur={(e) => setFields2(parseInt(e.target.value))}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div>
        {
          new Array(f1).map((items,index)=>{
            return(
              {
                // items.map((subitems,sIndex)=>{
                //   <InputFields></InputFields>
                // })
              }
            )
          })
        }
      </div>
    </div>
  );
};

export default Fields;
