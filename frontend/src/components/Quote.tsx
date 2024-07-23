import React from "react";

const Quote:React.FC = () => {
    return <div className="bg-slate-200 w-full h-full flex justify-center items-center p-2">
        <div className="max-w-md">
            <div className="text-3xl font-bold text-center">"Don't let the noise of other's opinion drown you own inner voice"</div>
            <div className="text-xl font-bold mt-2 text-center">Steve Jobs</div>
            <div className="font-light text-sm text-slate-600 text-center">CoFounder, CEO Apple</div>
        </div>
    </div>
}

export default Quote;