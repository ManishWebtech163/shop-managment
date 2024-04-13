
import { useContext, useEffect, useState } from 'react';

import { DirectionsRenderer, DirectionsService, GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api'
import PropTypes from 'prop-types'
import { ShopDataContext } from '../context/ShopDataContext_File';



const containerStyle = {
    width: '100%',
    height: '100%'
};



const ShopsMap = ({ mapCenter }) => {
    const shopDataContext = useContext(ShopDataContext)



    const [directions, setdirections] = useState(null)
    const [directionsSetStatus, setdirectionsSetStatus] = useState(false)
    // --location from to--
    const [startLocation, setstartLocation] = useState(null)
    const [endLocation, setendLocation] = useState(null)

    // --
    const onDirectionsServiceSuccess = (response) => {
        setdirectionsSetStatus(true)
        if (!directionsSetStatus) setdirections(response)
    };

    const onDirectionsServiceError = (response) => {
        // Handle any errors from the DirectionsService
        console.error(response);
    };



    // --set location--
    const setDistanceLocation = (data) => {

        setdirectionsSetStatus(false)
        setendLocation(data)
    }


    // --getCurrentLocation--
    useEffect(() => {
        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    !startLocation && setstartLocation({ lat: latitude, lng: longitude })
                });
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
        getCurrentLocation()
    }, [])

    const center = {
        lat: 22.907803,
        lng: 72.639787
    };





    return (
        <div>
            <LoadScript googleMapsApiKey={`${import.meta.env.VITE_APP_GOOGLE_KEY}`}>
                <GoogleMap mapContainerStyle={containerStyle} center={mapCenter ?? startLocation ?? center} zoom={mapCenter ? 15 : 10}>

                    {/* --show shop path-- */}
                    {startLocation && endLocation &&
                        <>
                            <DirectionsService options={{
                                origin: startLocation,
                                destination: endLocation,
                                travelMode: "DRIVING",
                            }}
                                callback={onDirectionsServiceSuccess}
                                onError={onDirectionsServiceError} />
                            {directions && <DirectionsRenderer directions={directions} />}


                        </>

                    }
                    {/* --show current location marker-- */}
                    {startLocation && <MarkerF position={startLocation}
                        icon={{

                            url: '/person.svg',
                            scale: 1,
                        }}

                    />}
                    {/* --markers-- */}
                    {shopDataContext.shopDataState.data && shopDataContext.shopDataState.data.map(e => (
                        <MarkerF key={e.location} position={{ lat: e.lat, lng: e.lng }}
                            icon={{

                                url: '/store.svg',
                                scale: 1,
                            }}

                            onClick={(e) => setDistanceLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })} />
                    ))}

                </GoogleMap>
            </LoadScript></div>
    )
}

// --
ShopsMap.propTypes = {
    mapCenter: PropTypes.object
}

export default ShopsMap