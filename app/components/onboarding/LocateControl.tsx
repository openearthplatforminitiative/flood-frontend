import { createControlComponent } from '@react-leaflet/core';
import L, {
  Control as LeafletControl,
  ControlPosition,
  LatLngExpression,
  LocationEvent,
  Map,
} from 'leaflet';
import React, { MutableRefObject, useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import ReactDOM from 'react-dom/client';
import { PlaceOutlined } from '@mui/icons-material';

type MyCustomControlProps = {
  position: ControlPosition;
  map: Map;
};
const createLeafletElement = (props: MyCustomControlProps): LeafletControl => {
  const control = new L.Control({ position: props.position });

  control.onAdd = () => {
    const container = L.DomUtil.create('div');
    const button = L.DomUtil.create(
      'button',
      'leaflet-control-button',
      container
    );
    button.setAttribute(
      'style',
      ' width: 30px; height: 30px; cursor: pointer; display: flex; justify-content: center; align-items: center; border: none'
    );
    container.setAttribute('style', 'border: 2px solid rgba(0,0,0,0.2)');

    button.addEventListener('mouseover', function () {
      this.style.backgroundColor = '#f4f4f4';
    });
    button.addEventListener('mouseout', function () {
      this.style.backgroundColor = 'white';
    });

    const root = ReactDOM.createRoot(button);
    root.render(<PlaceOutlined sx={{ width: '23px', height: '23px' }} />);
    L.DomEvent.disableClickPropagation(container);
    return container;
  };

  return control;
};

const MyCustomControl = createControlComponent(createLeafletElement);

interface LocateControlProps {
  position: ControlPosition;
  setPosition: (value: LatLngExpression) => void;
}

const LocateControl = ({ position, setPosition }: LocateControlProps) => {
  const map = useMap();
  const controlRef: MutableRefObject<LeafletControl | null> = useRef(null);

  useEffect(() => {
    const control = controlRef.current;
    if (control === null) {
      return;
    }

    const handleClick = () => {
      map.locate();
    };

    map.on('locationfound', function (e: LocationEvent) {
      setPosition(e.latlng);
      map.setView(e.latlng, map.getZoom());
    });

    const container = control.getContainer();
    if (container) {
      const button = container.querySelector('button');
      if (button) {
        L.DomEvent.on(button, 'click', handleClick);
      }
    }

    return () => {
      if (container) {
        const button = container.querySelector('button');
        if (button) {
          L.DomEvent.off(button, 'click', handleClick);
        }
      }
    };
  }, [map, setPosition]);

  return <MyCustomControl ref={controlRef} position={position} map={map} />;
};

export default LocateControl;
