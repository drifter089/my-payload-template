'use client'
import type { TextFieldClientComponent } from 'payload'
import React, { useState } from 'react'
import {
  APIProvider,
  Map,
  ControlPosition,
  Marker,
  AdvancedMarker,
  MapControl,
} from '@vis.gl/react-google-maps'
import { AutocompleteCustom } from './autocomplete-custom'
import './index.scss'

import MapHandler from './map-handler'

let GOOGLE_MAPS_API_KEY: string | undefined

export type AutocompleteMode = { id: string; label: string }

export const CustomTextFieldClient: TextFieldClientComponent = ({ field, path }) => {
  const [selectedPlace, setSelectedPlace] = useState<google.maps.places.PlaceResult | null>(null)

  console.log('selectedPlace', selectedPlace)

  const API_KEY = (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) ?? GOOGLE_MAPS_API_KEY

  return (
    <>
      <div
        style={{
          width: '100%',
          height: '70vh',
        }}
      >
        <APIProvider apiKey={API_KEY}>
          <Map
            mapId={'bf51a910020fa25a'}
            defaultZoom={7}
            defaultCenter={{ lat: 13.7563, lng: 100.5018 }}
            gestureHandling={'greedy'}
            disableDefaultUI={true}
          >
            <AdvancedMarker position={{ lat: 13.7563, lng: 100.5018 }}>
              <div>Drag me!</div>
            </AdvancedMarker>
            <Marker position={{ lat: 13.7563, lng: 100.5018 }} />
            {selectedPlace?.geometry?.location && (
              <Marker
                position={{
                  lat: selectedPlace.geometry.location.lat(),
                  lng: selectedPlace.geometry.location.lng(),
                }}
              />
            )}
          </Map>
          <MapControl position={ControlPosition.LEFT_TOP}>
            <div className="autocomplete-control">
              <AutocompleteCustom onPlaceSelect={setSelectedPlace} path={path} field={field} />
            </div>
          </MapControl>
          <MapHandler place={selectedPlace} />
        </APIProvider>
      </div>
    </>
  )
}
