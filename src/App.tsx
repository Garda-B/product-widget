import { useEffect, useState } from 'react';
import './App.css'
import Logo from './assets/Logo'
import info from './assets/info.svg'

interface Widget {
  id: number,
  type: string,
  amount: number,
  action: string,
  active: boolean,
  linked: boolean,
  selectedColor: string
}


function App() {

  const [data, setData] = useState<Widget[]>([]);
  const [linked, setLinked] = useState([true, true, true])
  const [color, setColor] = useState(["", "", ""])
  const [active, setActive] = useState([true, true, true])




  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/product-widget/src/widget-data.json');
        const widgetData = await response.json();
        setData(widgetData);

        setLinked(widgetData.map((widget: Widget) => widget.linked));
        setColor(widgetData.map((widget: Widget) => widget.selectedColor));
        setActive(widgetData.map((widget: Widget) => widget.active));
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);


  type ColorKey = 'green' | 'blue' | 'beige' | 'black' | 'white';

  const colors: Record<ColorKey, string> = {

    green: "var(--green)",
    blue: "var(--blue)",
    beige: "var(--beige)",
    white: "var(--white)",
    black: "var(--black)"

  }

  const handleCheck = (i: number) => {
    setLinked((prevLinked) => prevLinked.map((value, index) => (index === i ? !value : value)));
  };

  const handleColor = (value: string, i: number) => {

    setColor((prevColor) => prevColor.map((color, index) => (index === i ? value : color)));
  }

  const handleActive = (i: number) => {
    setActive((prevActive) => prevActive.map((widget, index) => (index === i ? !widget : false)));
  };





  return (

    <>

      <div className='main-wrapper'>


        <section className='main'>
          <div className='heading'>
            <h3>Per product widgets</h3>
          </div>

          <div className='widgets'>


            {data.map((widget, i) => (

              <div className='widget' key={widget.id.toString()} id={widget.id.toString()}>
                <div className='upper' style={{ backgroundColor: colors[color[i] as ColorKey] }}>
                  <div className='logo-container'>
                    <Logo fill={color[i] === "beige" || color[i] === "white" ? "var(--green)" : "var(--main-bkg)"} />
                  </div>

                  <div className='title' style={{ color: color[i] === "beige" || color[i] === "white" ? "var(--green)" : "var(--main-bkg)" }}>
                    <p className='paragraph-regular'>This product {widget.action}</p>
                    <p className='paragraph-big'>{widget.amount}{i === 2 ?"kgs of" : null} {widget.type}</p>

                  </div>

                </div>


                <div className="lower">

                  <div className='link'>
                    <div className='public'>
                      <p>Link to Public Profile</p>
                      <img className="info-img" src={info}></img>
                      <div className='tooltip'>
                      <p>This widget links directly to your public profile so that you can easily share your impact with your customers. Turn it off here if you do not want the badge to link to it.</p>
                      <a href="/">View Public Profile</a>
                      </div>
                    </div>
                    <input type='checkbox' checked={linked[i]} onChange={() => handleCheck(i)} />
                  </div>


                  <div className='badge'>
                    <p>Badge colour</p>
                    <div className='colors'>
                      <div className='color-squares'>
                        <div className='color-square' style={{ backgroundColor: "var(--blue)", border: color[i] === "blue" ? "2px solid var(--separator)" : "none" }} onClick={() => handleColor("blue", i)}></div>
                        <div className='color-square' style={{ backgroundColor: "var(--green)", border: color[i] === "green" ? "2px solid var(--separator)" : "none" }} onClick={() => handleColor("green", i)}></div>
                        <div className='color-square' style={{ backgroundColor: "var(--beige)", border: color[i] === "beige" ? "2px solid var(--separator)" : "none" }} onClick={() => handleColor("beige", i)}></div>
                        <div className='color-square' style={{ backgroundColor: "var(--white)", border: color[i] === "white" ? "2px solid var(--separator)" : "none" }} onClick={() => handleColor("white", i)}></div>
                        <div className='color-square' style={{ backgroundColor: "var(--black)", border: color[i] === "black" ? "2px solid var(--separator)" : "none" }} onClick={() => handleColor("black", i)}></div>
                      </div>
                    </div>

                  </div>

                  <div className='activate'>
                    <p>Activate badge</p>
                    <div className={active[i] ? "switch-on" : "switch-off"} onClick={() => handleActive(i)}></div>
                  </div>

                </div>

              </div>


            ))}

          </div>


        </section>
      </div>



    </>

  )
}

export default App
