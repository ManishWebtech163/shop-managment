import { useContext, useState } from "react"
import ShopList from "../../components/ShopList"
import ShopsMap from "../../components/ShopsMap"

import { ShopDataContext } from "../../context/ShopDataContext_File"

const Home = () => {
    const shopDataContext = useContext(ShopDataContext)
    // --demoData--
    const [mapCenter, setmapCenter] = useState(null)

    return (
        <div className="homePage">
            <ShopList shopData={shopDataContext.shopDataState
                .data} setmapCenter={setmapCenter} />
            <ShopsMap shopData={shopDataContext.shopDataState.data} mapCenter={mapCenter} />
        </div>
    )
}

export default Home