import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function Map() {
  return (
    <div id="map">
      <MapContainer center={[20.5, -157.510857]} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; "Map data © OpenStreetMap contributors, Esri Community Maps contributors, Map layer by Esri'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <Marker position={[20.5, -157.510857]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}