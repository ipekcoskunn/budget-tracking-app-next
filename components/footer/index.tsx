import React from "react";
import Link from "next/link";

const Footer = () => {
    return (
        <div className="relative">
            <div className="w-full absolute mb-0 text-center py-3 text-white bg-slate-500">
                Made with 🖥️ by&nbsp;
                <Link href="https://www.linkedin.com/in/ipekcoskun5941/" target="_blank" className="hover:underline">
                    İpek Coşkun
                </Link>
            </div>
        </div>
    )
}

export default Footer