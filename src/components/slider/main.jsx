import { Fragment, useState } from "react"
import 'components/slider/style.css'

const Slider = ({ icon, min, max, value, showValue, onChangeValue }) => {
    // const [sliderValue, _setSliderValue] = useState(value)
    // console.log(value, max, sliderValue)

    const handleChange = (event) => {
        const newValue = event.target.value
        // setSliderValue(newValue)
        if (onChangeValue) {
            onChangeValue(newValue)
        }
    }

    return (
        <Fragment>
            <div className="range-slider">
                {icon &&
                    <div className="range-icon">
                        {icon}
                    </div>
                }
                <input className="range-slider__range"
                    type="range"
                    value={value}
                    onChange={handleChange}
                    step={1}
                    min={min} max={max} />
                {showValue &&
                <span className="range-slider__value">{value}</span>
                }
            </div>
        </Fragment>
    )
}

export default Slider
