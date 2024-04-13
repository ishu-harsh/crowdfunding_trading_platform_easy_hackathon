import { AdvancedChart } from "react-tradingview-embed";
import { useState } from "react";
import Dashboard from "./Dashboard";

const Chart = () => {
    const [search, setSearch] = useState("AAPL");

    return (
        <div className="h-screen w-screen border-r border-gray-900 relative flex flex-col justify-center items-center">
            <Dashboard/>
            {/* Input box */}
          

            {/* Background color wrapper */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-800"></div>

            {/* Chart component */}
            <div className="absolute inset-0" style={{ height: "calc(100% - 40px)" }}>
                <AdvancedChart widgetProps={{ "symbol": `NASDAQ:${search}`, "theme": "dark" }} />
            </div>
        </div>
    );
};

export default Chart;
