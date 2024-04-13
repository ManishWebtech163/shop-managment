
import ShopDataContext_File from './context/ShopDataContext_File'
import { Outlet } from 'react-router-dom'

const Root = () => {
    return (
        <>
            <ShopDataContext_File>
                <Outlet />
            </ShopDataContext_File>
        </>
    )
}

export default Root