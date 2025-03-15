import { HelpCircle } from "lucide-react";

function HelpTooltip({ text }) {
    return (
        <div className="group relative inline-block ml-2">
            <HelpCircle className="w-4 h-4 text-gray-500 cursor-pointer" />
            <span className="absolute left-1/2 bottom-full mb-2 w-40 text-xs bg-black text-white p-2 rounded opacity-0 group-hover:opacity-100 transition">
                {text}
            </span>
        </div>
    );
}

export default HelpTooltip;