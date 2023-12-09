import React, {useState} from 'react';
import Cron from "react-cron-generator";
// import Cron from "react-js-cron";
// import 'react-js-cron/dist/styles.css'

export const Settings = () => {
    const [value, setValue] = useState('0 */15 * * * ? *')

    console.log(value)

    return (
        <div className="space-y-2">
            <Cron value={value} onChange={setValue} showResultCron={true} showResultText={true}/>
        </div>
    );
};