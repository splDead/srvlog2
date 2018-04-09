import React from 'react';

const Statistics = () => 
    <div>
        <div>
            <div>Logs statistics</div>
            <div>
                <button>this week</button>
                <button>last week</button>
                <button>this month</button>
                <button>last month</button>
            </div>
            <div>
                <div>
                    <div>Number of logs by severity</div>
                    <div>
                        <div><span>EMERGENCY</span><span>00</span></div>
                        <div><span>ALERT</span><span>00</span></div>
                        <div><span>CRITICAL</span><span>00</span></div>
                        <div><span>ERROR</span><span>00</span></div>
                        <div><span>WARN</span><span>00</span></div>
                        <div><span>NOTICE</span><span>00</span></div>
                        <div><span>INFO</span><span>00</span></div>
                        <div><span>DEBUG</span><span>00</span></div>
                    </div>
                </div>
                <div>
                    <div>Number of logs by date</div>
                    <div>something chart</div>
                </div>
            </div>
        </div>
    </div>

export default Statistics;