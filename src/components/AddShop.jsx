
import axios from "axios";
import { useEffect, useState } from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";


const AddShop = () => {
    const {
        placesService,
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading
    } = usePlacesService({
        apiKey: `${import.meta.env.VITE_APP_GOOGLE_KEY}`,
    });


    const [savePlaceDetailsToState, setsavePlaceDetailsToState] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState("")



    // --add location--
    const handelSubmit = async (event) => {
        event.preventDefault()
        setloading(true)
        if (savePlaceDetailsToState) {
            try {
                const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/api/add_shop`, savePlaceDetailsToState)
                alert(res.data)
                setsavePlaceDetailsToState(null)

            } catch (error) {
                seterror("somthing went wrong")
            } finally {
                setloading(false)
            }
        } else {
            seterror("Add shop adsress")
            setloading(false)
        }
    }


    // fetch place details for the first element in placePredictions array
    useEffect(() => {
        setsavePlaceDetailsToState(null)
        if (placePredictions.length > 0) {
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                (place) => setsavePlaceDetailsToState({ location: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() })
            )
            seterror("")
        } else {
            seterror("Shop not found")
        }

    }, [placePredictions]);

    return (
        <div className="addShop">
            <form className="form" onSubmit={handelSubmit}>
                <h1 className="heading">Add Shop</h1>
                <div className="field">
                    <label htmlFor="shop">Shop</label>
                    <input
                        placeholder="Enter shop address"
                        onChange={(evt) => {
                            getPlacePredictions({ input: evt.target.value });
                        }}
                        disabled={loading}
                    />
                </div>
                {isPlacePredictionsLoading && <div style={{ color: "darkblue" }}>Fetching...</div>}
                {!isPlacePredictionsLoading && error && <div style={{ color: "red" }}>{error}</div>}
                <br />
                {savePlaceDetailsToState && <div>Selected Shop Location :<span style={{ color: "green" }}> {savePlaceDetailsToState.location}</span></div>}
                <br />
                <button disabled={loading} className="submitBtn">Submit</button>
            </form>
        </div>
    )
}

export default AddShop