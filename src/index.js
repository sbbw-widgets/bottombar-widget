import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'index.css';

import { ReactComponent as SoundIcon } from 'assets/soundwave.svg'
import { ReactComponent as BrightnessIcon } from 'assets/brightness-high.svg'
import Clock from 'components/clock/main.jsx';
import Slider from 'components/slider/main';


const exec = ({ file, args }) => {
    return new Promise((resolve, reject) => {
        fetch("sbbw://exec", {
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            method: 'POST',
            body: JSON.stringify({ file, args })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.status == 200)
                    resolve(data.data)
                else
                    reject(data)
            })
            .catch(reject)
    });
}


const Bar = () => {
    const [volume, setVolume] = useState(0);
    const [brightness, setBrightness] = useState(0);
    const [maxBrightness, setMaxBrightness] = useState(255);

    useEffect(() => {
        exec({ file: 'brightnessctl', args: ['get'] }).then(b => setBrightness(b.trim()))
        exec({ file: 'brightnessctl', args: ['max'] }).then(b => setMaxBrightness(b.trim()))

        exec({ file: './volume', args: ['get'] }).then(v => setVolume(parseInt(v.replace('%', '').trim())))
    }, [brightness, maxBrightness, volume])

    const onChangeBrightness = (v) => {
        setBrightness(v)
        window.rpc.call('exec', { file: 'brightnessctl', args: ['set', `${v}`] })
    }

    const onChangeVolume = (v) => {
        setVolume(v)
        window.rpc.call('exec', { file: './volume', args: ['set', `${v}`] })
    }

    return (
        <div className="bar">
            <div className='left-bar'>
                <Slider value={brightness}
                    onChangeValue={onChangeBrightness}
                    icon={<BrightnessIcon />}
                    min={0} max={maxBrightness}
                    showValue={false} />

                <Slider value={volume}
                    onChangeValue={onChangeVolume}
                    icon={<SoundIcon />}
                    min={0} max={100}
                    showValue={false} />
            </div>
            <Clock />
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <Bar />
    </React.StrictMode>,
    document.getElementById('root')
);
