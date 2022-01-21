import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  // const [text, setText] = useState("Guess who?");
  // const [width, setWidth] 
  const [styleTable, setStyleTable] = useState({});
  // const [isFirstRender, setIsFirstRender] = useState(true);


  const tableElement = useRef(null);

  const data= [
    { id: 1, name: 'Harsh Singh', is_completed: true, description: 'Dev', isDeleted: false, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 2, name: 'Prakash Barik', is_completed: false, description: 'QA', isDeleted: true, age: 22, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 3, name: 'Muhammad Anees', is_completed: true, description: 'Dev', isDeleted: true, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 4, name: 'Mayank Khajanchi', is_completed: false, description: 'Dev', isDeleted: true, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 5, name: 'Deepak Jena', is_completed: true, description: 'Dev', isDeleted: true, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 6, name: 'Harsh Singh', is_completed: true, description: 'Dev', isDeleted: false, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 7, name: 'Prakash Barik', is_completed: false, description: 'QA', isDeleted: true, age: 22, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 8, name: 'Muhammad Anees', is_completed: true, description: 'Dev', isDeleted: true, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 9, name: 'Mayank Khajanchi', is_completed: false, description: 'Dev', isDeleted: true, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' },
    { id: 10, name: 'Deepak Jena', is_completed: true, description: 'Dev', isDeleted: true, age: 24, gender: 'male', origin: 'IN', passport: 'Yes' }
  ];

  const keys = Object.keys(data[1]);
  const minimumSize = 20;

  const checkData = (incoming) => {
    if(typeof incoming === 'boolean'){
      if(incoming){
        return 'True';
      }else{
        return 'False'
      }
    }
    return incoming;
  }

  const resize = useCallback(
    (col, element, original_width, original_mouse_x, e) => {
      let width = 0;
      if(!!e){
        width = original_width + (e.pageX - original_mouse_x);
      }else{
        width = original_width;
      }
      if (width > minimumSize) {     

        // TODO: I am using stylesheets below
        

        const newColKey = `.column${col}`;
        const newColObj = {};
        newColObj[newColKey] = {width: `${width}px`};
        setStyleTable(state => ({
          ...state,
          ...newColObj
        }));
        // setStyleTable({...styleTable, ...newColObj});
      }

    },
    [],
  )  

  const resizeHandler = (col, e) => {
    const element = tableElement.current.querySelector(`.head${col}`);
    e.preventDefault();
    let original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px',''));
    let original_mouse_x = e.pageX;

    const refFunc = (e) => {
      resize(col, element, original_width, original_mouse_x, e);
    };

    window.addEventListener('mousemove',refFunc, true);
    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', refFunc, true);
    }, true);
  }

  const setInlineStyle = useCallback( () => {
    keys.forEach((col) => {
      const element = tableElement.current.querySelector(`.head${col}`);
      let original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px',''));
      resize(col, element, original_width);
    });
    tableElement.current.removeAttribute("style");
    }, [keys, resize]
  )
  
  const resetHandler = () => {

    // TODO: Make a function that handles the below task. Sending allCells and allHeads as an argument 
    // TODO: to that function should remove the styles.
    tableElement.current.style.width='100%';
    tableElement.current.style.height='100%';
    setStyleTable({});
  }

  useEffect(() => {
    if(Object.keys(styleTable).length === 0){
      setInlineStyle();
    }
  }, [styleTable, setInlineStyle]);

  return (
    <>
    <button onClick={resetHandler}>Reset</button>
    <div className="container">
    <div className="table-container">
    <table ref={tableElement} style={{width: '100%', height: '100%'}}>
      <thead>
        <tr>
          {keys.map((eachKey)=> {
            return (
              <th key={`head${eachKey}`}>
                <div className={`head${eachKey} header_div`}>
                  {eachKey.split("_").map(eachString => (eachString.charAt(0).toUpperCase() + eachString.slice(1))).join(" ")}
                  <div className="bar" onMouseDown={resizeHandler.bind(this, eachKey)}><span>|</span></div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
      {
        data.map((eachEmployee, index) => {
          return (
          <tr key={`row${index}`}>
            {
              keys.map((eachKey) => {
                return (
                <td key={`column${eachKey}`}>
                  <div style={styleTable[`.column${eachKey}`]} className={`column_div`}>
                  {
                    checkData(eachEmployee[eachKey])
                  }
                  </div>
                </td>
                )
              })
            }
          </tr>
          )
        })
      }
      </tbody>
    </table>
    </div>
    </div>
    </>
  );
}

export default App;
