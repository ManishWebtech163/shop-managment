import axios from "axios";
import { createContext, useEffect, useReducer } from "react"
import PropTypes from 'prop-types'

export const ShopDataContext = createContext(null)

// --

const initialTodos = {
    data: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_SHOPS_DATA": return {
            ...state,
            data: action.payload
        };

        default:
            return state;
    }
};



const ShopDataContext_File = ({ children }) => {
    const [shopDataState, dispatch] = useReducer(reducer, initialTodos);


    // --fetch shops data--
    async function fetchShops() {
        try {
            const res = await axios.get("/api/shop_data")
            dispatch({ type: "SET_SHOPS_DATA", payload: res.data })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchShops()
    }, [])

    // --delete shop--
    const deleteShop = async (e) => {

        try {
            await axios.post("/api/delete_shop", {
                location: e
            })
            fetchShops()
        } catch (error) {
            console.log(error);
        }
    }


    // --add shop--

    return (
        <>
            <ShopDataContext.Provider value={{ shopDataState, dispatch, deleteShop }}>
                {children}
            </ShopDataContext.Provider>
        </>
    )
}

// --
ShopDataContext_File.propTypes = {
    children: PropTypes.node
}

export default ShopDataContext_File