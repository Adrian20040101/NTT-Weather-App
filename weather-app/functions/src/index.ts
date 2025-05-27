import * as functions from "firebase-functions/v1";
import fetch from "node-fetch";
import cors from "cors";

const corsHandler = cors({origin: true});
const GOOGLE_API_KEY = functions.config().google.api_key;

export const autocomplete = functions
  .region("us-central1")
  .https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      const input = req.query.input as string;

      if (!input) {
        res.status(400).json({error: "Missing input parameter"});
        return;
      }

      try {
        const url =
        "https://maps.googleapis.com/maps/api/place/autocomplete/json?" +
        `input=${encodeURIComponent(input)}` +
        `&language=en&key=${GOOGLE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();
        const cities = data.predictions.filter(
          (pred: { types: string[] }) =>
            pred.types.includes("locality") ||
            pred.types.includes("administrative_area_level_3") ||
            pred.types.includes("postal_town") ||
            pred.types.includes("sublocality")
        );

        res.json({cities});
      } catch (error) {
        console.error("Autocomplete error:", error);
        res.status(500).json({error: "Server error"});
      }
    });
  });

export const geocode = functions
  .region("us-central1")
  .https.onRequest((req, res) => {
    corsHandler(req, res, async () => {
      const placeId = req.query.place_id as string;

      if (!placeId) {
        res.status(400).json({error: "Missing place_id parameter"});
        return;
      }

      try {
        const url =
          "https://maps.googleapis.com/maps/api/geocode/json?" +
          `place_id=${encodeURIComponent(placeId)}` +
          `&key=${GOOGLE_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
          res.status(404).json({error: "No geocode results found"});
          return;
        }

        const location = data.results[0].geometry.location;

        res.json({
          lat: location.lat,
          lng: location.lng,
        });
      } catch (error) {
        console.error("Geocode error:", error);
        res.status(500).json({error: "Server error"});
      }
    });
  });
