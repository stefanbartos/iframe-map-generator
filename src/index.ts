import config from '../config.json';
import { CZ_GEO_CENTER, OUTPUT_FILENAME_PATH } from './constants.js';
import { writeOutput } from './utils.js';

console.log(config);

function createIframe({
  markersScript,
  center = CZ_GEO_CENTER,
  zoom = 6,
}: { markersScript: string; center?: [number, number]; zoom?: number }) {
  return `
    <iframe srcdoc="
      <!DOCTYPE html>
      <html>
        <head>
          <link rel='stylesheet' href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' />
          <script src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'></script>
          <style>
            #map { height: 100vh; width: 100%; }
          </style>
        </head>
        <body>
          <div id='map'></div>
          <script>
            var map = L.map('map').setView([${center[0]}, ${center[1]}], ${zoom});
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; OpenStreetMap contributors'
            }).addTo(map);
            ${markersScript}
          </script>
        </body>
      </html>
    " width="100%" height="500" frameborder="0"></iframe>
  `;
}

function run() {
  const { markers } = config;

  let markersScript = '';
  if (markers) {
    markersScript = markers
      .map(
        (marker) => `
        L.marker([${marker.position[0]}, ${marker.position[1]}])
          .addTo(map)${marker.message ? `.bindPopup('${marker.message}')` : ''};
      `,
      )
      .join('\n');
  }

  const generatedIframe = createIframe({ markersScript });

  writeOutput(generatedIframe);
  console.log(`\nGENERATED! Iframe is in the folder: "${OUTPUT_FILENAME_PATH}"`);
}

run();
