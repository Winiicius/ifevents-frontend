function MainHeader() {
    return (<nav className="w-screen h-20 bg-green-500 flex justify-between items-center text-white">
        <h3 className="font-bold ml-10 text-4xl">
            <a href="/">IFEvents</a>
        </h3>
        <div className="font-bold mr-6">
            <a href="" className="text-right p-2">
                sobre
            </a>
            <a href="" className="p-2">
                sair
            </a>
        </div>
    </nav>)
}

export default MainHeader;