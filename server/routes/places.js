import express from "express";
import { SupabasePrismaClient } from "../lib/prisma.js";
import placesData from "../config/places.json" assert { type: "json" };
import { getPrimaryClient } from "../lib/avaliablity.js";

const router = express.Router();
const PrismaClient = await getPrimaryClient();
// handling large datasets (20,000+ places)
// Optimized seeder that handles both GCP and Supabase databases
const SUPABASE_BATCH_SIZE = 100; // Smaller batch size to avoid timeout
const BATCH_SIZE = 100; // Process 100 records at a time

function checkIfNotValid(value) {
  return (
    typeof value !== "string" ||
    value.trim() === "" ||
    value === null ||
    value === undefined
  );
}
function prepareCreateData(place, id = null) {
  return {
    id: id || place.id, // Use the provided ID or fallback to the place's ID
    name: place.name,
    latitude: parseFloat(place.latitude) || 0,
    longitude: parseFloat(place.longitude) || 0,
    description: place.description || "",
    category: place.category || "",
    address: place.address || "",
    city: place.city || "",
    images: place.images ? JSON.parse(place.images) : [],
    tags: place.tags ? JSON.parse(place.tags) : [],
    opening_hours: place.opening_hours ? JSON.parse(place.opening_hours) : [],
    googleMapsUri: !checkIfNotValid(place.googleMapsUri)
      ? place.googleMapsUri
      : "",
    websiteUri: !checkIfNotValid(place.websiteUri) ? place.websiteUri : "",
    nationalPhoneNumber: place.nationalPhoneNumber || null,
    internationalPhoneNumber: place.internationalPhoneNumber || null,
    take_out: place.take_out === "TRUE" || place.take_out === true || false,
    delivery: place.delivery === "TRUE" || place.delivery === true || false,
    dine_in: place.dine_in === "TRUE" || place.dine_in === true || false,
    reservable:
      place.reservable === "TRUE" || place.reservable === true || false,
    serves_breakfast:
      place.serves_breakfast === "TRUE" ||
      place.serves_breakfast === true ||
      false,
    serves_lunch:
      place.serves_lunch === "TRUE" || place.serves_lunch === true || false,
    serves_dinner:
      place.serves_dinner === "TRUE" || place.serves_dinner === true || false,
    serves_beer:
      place.serves_beer === "TRUE" || place.serves_beer === true || false,
    serves_wine:
      place.serves_wine === "TRUE" || place.serves_wine === true || false,
    serves_brunch:
      place.serves_brunch === "TRUE" || place.serves_brunch === true || false,
    serves_vegetarian_food:
      place.serves_vegetarian_food === "TRUE" ||
      place.serves_vegetarian_food === true ||
      false,
    outdoor_seating:
      place.outdoor_seating === "TRUE" ||
      place.outdoor_seating === true ||
      false,
    live_music:
      place.live_music === "TRUE" || place.live_music === true || false,
    menu_for_children:
      place.menu_for_children === "TRUE" ||
      place.menu_for_children === true ||
      false,
    serves_cocktails:
      place.serves_cocktails === "TRUE" ||
      place.serves_cocktails === true ||
      false,
    serves_dessert:
      place.serves_dessert === "TRUE" || place.serves_dessert === true || false,
    serves_coffee:
      place.serves_coffee === "TRUE" || place.serves_coffee === true || false,
    good_for_children:
      place.good_for_children === "TRUE" ||
      place.good_for_children === true ||
      false,
    restroom: place.restroom === "TRUE" || place.restroom === true || false,
    good_for_groups:
      place.good_for_groups === "TRUE" ||
      place.good_for_groups === true ||
      false,
    good_for_watching_sports:
      place.good_for_watching_sports === "TRUE" ||
      place.good_for_watching_sports === true ||
      false,
    priceLevel: !checkIfNotValid(place.priceLevel)
      ? place.priceLevel
      : "PRICE_LEVEL_UNSPECIFIED",
    timeZone: !checkIfNotValid(place.timeZone)
      ? place.timeZone
      : "Asia/Kolkata",
    acceptsCreditCards:
      place.acceptsCreditCards === "TRUE" ||
      place.acceptsCreditCards === true ||
      false,
    acceptsDebitCards:
      place.acceptsDebitCards === "TRUE" ||
      place.acceptsDebitCards === true ||
      false,
    acceptsCashOnly:
      place.acceptsCashOnly === "TRUE" ||
      place.acceptsCashOnly === true ||
      false,
    acceptsNfc:
      place.acceptsNfc === "TRUE" || place.acceptsNfc === true || false,
    freeParkingLot:
      place.freeParkingLot === "TRUE" || place.freeParkingLot === true || false,
    freeStreetParking:
      place.freeStreetParking === "TRUE" ||
      place.freeStreetParking === true ||
      false,
    paidParkingLot:
      place.paidParkingLot === "TRUE" || place.paidParkingLot === true || false,
    valetParking:
      place.valetParking === "TRUE" || place.valetParking === true || false,
    wheelchairAccessibleParking:
      place.wheelchairAccessibleParking === "TRUE" ||
      place.wheelchairAccessibleParking === true ||
      false,
    wheelchairAccessibleEntrance:
      place.wheelchairAccessibleEntrance === "TRUE" ||
      place.wheelchairAccessibleEntrance === true ||
      false,
    wheelchairAccessibleRestroom:
      place.wheelchairAccessibleRestroom === "TRUE" ||
      place.wheelchairAccessibleRestroom === true ||
      false,
    wheelchairAccessibleSeating:
      place.wheelchairAccessibleSeating === "TRUE" ||
      place.wheelchairAccessibleSeating === true ||
      false,
    directionsUri: !checkIfNotValid(place.directionsUri)
      ? place.directionsUri
      : "",
    placeUri: !checkIfNotValid(place.directionsUri) ? place.placeUri : "",
    writeAReviewUri: !checkIfNotValid(place.writeAReviewUri)
      ? place.writeAReviewUri
      : "",
    reviewsUri: !checkIfNotValid(place.reviewsUri) ? place.reviewsUri : "",
    photosUri: !checkIfNotValid(place.photosUri) ? place.photosUri : "",
    google_average_rating: parseFloat(place.average_rating) || 0,
    google_total_reviews: parseInt(place.total_reviews) || 0,
    heat_score: parseFloat(place.heat_score) || 0,
    area: place.area || ""
  };
}

router.post("/seed", async (req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
  });
  const { dbSeed = "true" } = req.query;
  const seedInSupabase = dbSeed === "true" ? true : false;
  try {
    const totalPlaces = placesData.places.length;
    let processedCount = 0;
    let successCount = 0;
    let errorCount = 0;

    const successfulPlaces = [];

    for (let i = 0; i < totalPlaces; i += BATCH_SIZE) {
      const batch = placesData.places.slice(i, i + BATCH_SIZE);

      await PrismaClient.client.$transaction(async (tx) => {
        const batchPromises = batch.map(async (place) => {
          try {
            const placeData = prepareCreateData(place);

            const existingPlace = await tx.places.findFirst({
              where: { id: place.id },
            });

            if (existingPlace) {
              await tx.places.update({
                where: { id: existingPlace.id },
                data: placeData,
              });
            } else {
              await tx.places.create({
                data: placeData,
              });
            }

            successfulPlaces.push(place);
            successCount++;
          } catch (placeError) {
            errorCount++;
            console.error(
              `Error processing place "${place.name}" in Localhost:`,
              placeError
            );
          }
        });

        await Promise.all(batchPromises);
      });

      processedCount += batch.length;

      console.log(
        `Processed ${processedCount}/${totalPlaces} places in Localhost`
      );
      res.write(
        JSON.stringify({
          progress: {
            processed: processedCount,
            total: totalPlaces,
            percentage: Math.round((processedCount / totalPlaces) * 100),
            success: successCount,
            errors: errorCount,
          },
        }) + "\n"
      );
    }

    res.end(
      JSON.stringify({
        message: "Primary database seeding completed",
        stats: {
          total: totalPlaces,
          success: successCount,
          errors: errorCount,
        },
        secondaryDb: "Seeding started in background for backup database",
      })
    );

    if (PrismaClient.useLocalhost && seedInSupabase) {
      seedSupabaseInBackground(successfulPlaces).catch((error) => {
        console.error("Background Supabase seeding error:", error);
      });
    }
  } catch (error) {
    console.error("Fatal error seeding primary database:", error);
    if (!res.writableEnded) {
      res.end(
        JSON.stringify({
          error: "Failed to complete seeding process for primary database",
          message: error.message,
        })
      );
    }
  }
});

// Modified function to handle background Supabase seeding without hitting transaction timeouts
async function seedSupabaseInBackground(places) {
  const totalPlaces = places.length;
  let processedCount = 0;
  let successCount = 0;
  let errorCount = 0;
  let failedPlaces = [];

  console.log(`Starting background Supabase seeding for ${totalPlaces} places`);

  for (let i = 0; i < totalPlaces; i += SUPABASE_BATCH_SIZE) {
    const batch = places.slice(i, i + SUPABASE_BATCH_SIZE);

    for (const place of batch) {
      try {
        const placeData = prepareCreateData(place, place.id);

        const existingPlace = await SupabasePrismaClient.places.findFirst({
          where: { id: place.id },
        });

        if (existingPlace) {
          await SupabasePrismaClient.places.update({
            where: { id: existingPlace.id },
            data: placeData,
          });
        } else {
          await SupabasePrismaClient.places.create({
            data: placeData,
          });
        }
        console.log(
          `Successfully processed place "${place.name}" in Supabase`
        );
        successCount++;
      } catch (placeError) {
        errorCount++;
        failedPlaces.push(place);
        console.error(
          `Error processing place "${place.name}" in Supabase:`,
          placeError
        );
      }
    }

    processedCount += batch.length;

    if (
      processedCount % (SUPABASE_BATCH_SIZE * 5) === 0 ||
      processedCount === totalPlaces
    ) {
      console.log(
        `Supabase background seeding progress: ${processedCount}/${totalPlaces} (${Math.round(
          (processedCount / totalPlaces) * 100
        )}%)`
      );
    }

    if (i + SUPABASE_BATCH_SIZE < totalPlaces) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  console.log(
    `Completed background Supabase seeding. Success: ${successCount}, Errors: ${errorCount}`
  );

  if (failedPlaces.length > 0) {
    global.failedSupabasePlaces = failedPlaces;
    console.log(
      `Stored ${failedPlaces.length} failed places for potential retry`
    );
  }

  return {
    total: totalPlaces,
    success: successCount,
    errors: errorCount,
  };
}

// Add a separate endpoint for retrying failed Supabase seeds
router.post("/retry-supabase-seed", async (req, res) => {
  try {
    if (
      !global.failedSupabasePlaces ||
      global.failedSupabasePlaces.length === 0
    ) {
      return res.json({
        message: "No failed places to retry",
        count: 0,
      });
    }

    const placesToRetry = [...global.failedSupabasePlaces];
    global.failedSupabasePlaces = []; // Clear the failed places

    console.log(`Retrying Supabase seeding for ${placesToRetry.length} places`);

    // Start retry in background
    seedSupabaseInBackground(placesToRetry).catch((error) => {
      console.error("Error during Supabase retry:", error);
    });

    res.json({
      message: "Retrying Supabase seeding in background",
      count: placesToRetry.length,
    });
  } catch (error) {
    console.error("Error initiating Supabase retry:", error);
    res.status(500).json({
      error: "Failed to initiate Supabase retry",
      message: error.message,
    });
  }
});
// Get all places with filters
// Get paginated places
router.get("/", async (req, res) => {
  try {
    const {
      category,
      search,
      page = 1, // Default to page 1
      pageSize = 30, // Default 30 places per page
      priceLevel,
      placeIds,
      area,
      ...booleanFilters
    } = req.query;

    const skip = (page - 1) * pageSize; // Calculate offset for pagination

    const placeIdParse = placeIds ? placeIds.split(",") : null;
    let whereClause = {};

    if (category) {
      whereClause = {
        ...whereClause,
        category,
      };
    }
    console.log("placeIds", placeIdParse);
    if (search && !placeIdParse) {
      whereClause = {
        ...whereClause,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };
    } else if (placeIdParse && placeIdParse.length > 0) {
      whereClause = {
        ...whereClause,
        id: {
          in: placeIdParse,
        },
      };
    }

    // Add boolean filters
    Object.entries(booleanFilters).forEach(([key, value]) => {
      // Only add if it's a boolean field and has a valid boolean value
      if (
        typeof value === "string" &&
        (value === "true" || value === "false") &&
        // Check if the key exists in the Place model schema
        [
          "take_out",
          "delivery",
          "dine_in",
          "reservable",
          "serves_breakfast",
          "serves_lunch",
          "serves_dinner",
          "serves_brunch",
          "serves_vegetarian_food",
          "serves_beer",
          "serves_wine",
          "serves_cocktails",
          "serves_dessert",
          "serves_coffee",
          "outdoor_seating",
          "live_music",
          "menu_for_children",
          "good_for_children",
          "restroom",
          "good_for_groups",
          "good_for_watching_sports",
          "acceptsCreditCards",
          "acceptsDebitCards",
          "acceptsCashOnly",
          "acceptsNfc",
          "freeParkingLot",
          "freeStreetParking",
          "paidParkingLot",
          "valetParking",
          "wheelchairAccessibleParking",
          "wheelchairAccessibleEntrance",
          "wheelchairAccessibleRestroom",
          "wheelchairAccessibleSeating",
        ].includes(key)
      ) {
        whereClause[key] = value === "true"
      }
    });

    if (area && area !== "" && area.toLowerCase() !== "all") {
      const lowerCaseArea = area.toLowerCase();
      let areaArray = [lowerCaseArea];
      if (lowerCaseArea === "hsr layout") {
        areaArray.push("hsr layout 5th sector");
      }
      whereClause = {
        ...whereClause,
        area: {
          in: areaArray,
        },
      };
    }
    if(priceLevel) {
      whereClause = {
        ...whereClause,
        priceLevel: {
          equals: priceLevel,
        },
      };
    }
    // Fetch total count for pagination
    const totalPlaces = await PrismaClient.client.places.count({
      where: whereClause,
    });

    // Fetch paginated places
    const places = await PrismaClient.client.places.findMany({
      where: whereClause,
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
      skip,
      take: parseInt(pageSize),
      orderBy: {
        heat_score: "desc",
      },
    });

    const totalPages = Math.ceil(totalPlaces / pageSize);

    res.json({
      places,
      pagination: {
        totalPlaces,
        totalPages,
        currentPage: parseInt(page),
        pageSize: parseInt(pageSize),
      },
    });
  } catch (error) {
    console.error("Error fetching paginated places:", error);
    res.status(500).json({ error: "Failed to fetch paginated places" });
  }
});

// Get total pages for a query
router.get("/total-pages", async (req, res) => {
  try {
    const {
      category,
      search,
      pageSize = 30, // Default 30 places per page
    } = req.query;

    let whereClause = {};

    if (category) {
      whereClause = {
        ...whereClause,
        category,
      };
    }

    if (search) {
      whereClause = {
        ...whereClause,
        OR: [
          { name: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      };
    }

    // Fetch total count for pagination
    const totalPlaces = await PrismaClient.client.places.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(totalPlaces / pageSize);

    res.json({
      totalPlaces,
      totalPages,
      pageSize: parseInt(pageSize),
    });
  } catch (error) {
    console.error("Error fetching total pages:", error);
    res.status(500).json({ error: "Failed to fetch total pages" });
  }
});

// Get heatmap data
router.get("/heatmap", async (req, res) => {
  try {
    const {
      category,
      lat,
      lng,
      radius = 10000, // Default 10km radius
    } = req.query;

    let whereClause = {};

    if (category) {
      whereClause.category = category;
    }

    const places = await PrismaClient.client.places.findMany({
      where: whereClause,
      select: {
        id: true,
        latitude: true,
        longitude: true,
        heat_score: true,
        category: true,
      },
    });

    const heatmapData = places.map((place) => ({
      location: { lat: place.latitude, lng: place.longitude },
      weight: place.heat_score,
    }));

    res.json(heatmapData);
  } catch (error) {
    console.error("Error fetching heatmap data:", error);
    res.status(500).json({ error: "Failed to fetch heatmap data" });
  }
});

// Get place by ID with reviews
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const place = await PrismaClient.client.places.findUnique({
      where: { id },
      include: {
        reviews: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!place) {
      return res.status(404).json({ error: "Place not found" });
    }

    res.json(place);
  } catch (error) {
    console.error("Error fetching place:", error);
    res.status(500).json({ error: "Failed to fetch place" });
  }
});

export default router;
