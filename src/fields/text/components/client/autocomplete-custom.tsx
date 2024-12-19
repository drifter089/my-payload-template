import React, {useEffect, useState, useCallback, FormEvent} from 'react';
import {useMap, useMapsLibrary} from '@vis.gl/react-google-maps';
import { useField, TextInput } from '@payloadcms/ui'



interface Props {
  onPlaceSelect: (place: google.maps.places.PlaceResult | null) => void
  path?: string
  field: any
}

// This is a custom built autocomplete component using the "Autocomplete Service" for predictions
// and the "Places Service" for place details
export const AutocompleteCustom = ({ onPlaceSelect, path, field }: Props) => {
  const map = useMap()
  const places = useMapsLibrary('places')

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteSessionToken
  const [sessionToken, setSessionToken] = useState<google.maps.places.AutocompleteSessionToken>()

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null)

  // https://developers.google.com/maps/documentation/javascript/reference/places-service
  const [placesService, setPlacesService] = useState<google.maps.places.PlacesService | null>(null)

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([])

  const { value, setValue } = useField<string>({ path: path || field.name })

  useEffect(() => {
    if (!places || !map) return

    setAutocompleteService(new places.AutocompleteService())
    setPlacesService(new places.PlacesService(map))
    setSessionToken(new places.AutocompleteSessionToken())

    return () => setAutocompleteService(null)
  }, [map, places])

  const fetchPredictions = useCallback(
    async (value: string) => {
      if (!autocompleteService || !value) {
        setPredictionResults([])
        return
      }

      const request = { input: value, sessionToken }
      const response = await autocompleteService.getPlacePredictions(request)

      setPredictionResults(response.predictions)
    },
    [autocompleteService, sessionToken],
  )

  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value

      setValue(value)
      fetchPredictions(value)
    },
    [fetchPredictions, setValue],
  )

  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return

      const detailRequestOptions = {
        placeId,
        fields: ['geometry', 'name', 'formatted_address'],
        sessionToken,
      }

      const detailsRequestCallback = (placeDetails: google.maps.places.PlaceResult | null) => {
        onPlaceSelect(placeDetails)
        setPredictionResults([])
        setValue(placeDetails?.formatted_address ?? '')
        setSessionToken(new places.AutocompleteSessionToken())
      }

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback)
    },
    [onPlaceSelect, places, placesService, sessionToken, setValue],
  )

  return (
    <div className="autocomplete-container"  style={{ width: '20vw', marginLeft:'1rem', marginTop:"1rem", borderRadius:"2rem"}}>
      <TextInput value={value} onChange={onInputChange} path={path || field.name} />
      {predictionResults.length > 0 && (
        <ul className="custom-list">
          {predictionResults.map(({ place_id, description }) => {
            return (
              <li
                key={place_id}
                className="custom-list-item"
                onClick={() => handleSuggestionClick(place_id)}
              >
                {description}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
