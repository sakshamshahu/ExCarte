
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  auth_id: 'auth_id',
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  birth_date: 'birth_date',
  explorer_type: 'explorer_type',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.User_preferencesScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  category: 'category',
  interest_level: 'interest_level',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PlacesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  category: 'category',
  latitude: 'latitude',
  longitude: 'longitude',
  address: 'address',
  city: 'city',
  images: 'images',
  tags: 'tags',
  opening_hours: 'opening_hours',
  average_rating: 'average_rating',
  total_reviews: 'total_reviews',
  heat_score: 'heat_score',
  created_at: 'created_at',
  updated_at: 'updated_at',
  googleMapsUri: 'googleMapsUri',
  websiteUri: 'websiteUri',
  nationalPhoneNumber: 'nationalPhoneNumber',
  internationalPhoneNumber: 'internationalPhoneNumber',
  take_out: 'take_out',
  delivery: 'delivery',
  dine_in: 'dine_in',
  reservable: 'reservable',
  serves_breakfast: 'serves_breakfast',
  serves_lunch: 'serves_lunch',
  serves_dinner: 'serves_dinner',
  serves_beer: 'serves_beer',
  serves_wine: 'serves_wine',
  serves_brunch: 'serves_brunch',
  serves_vegetarian_food: 'serves_vegetarian_food',
  outdoor_seating: 'outdoor_seating',
  live_music: 'live_music',
  menu_for_children: 'menu_for_children',
  serves_cocktails: 'serves_cocktails',
  serves_dessert: 'serves_dessert',
  serves_coffee: 'serves_coffee',
  good_for_children: 'good_for_children',
  restroom: 'restroom',
  good_for_groups: 'good_for_groups',
  good_for_watching_sports: 'good_for_watching_sports',
  priceLevel: 'priceLevel',
  timeZone: 'timeZone',
  acceptsCreditCards: 'acceptsCreditCards',
  acceptsDebitCards: 'acceptsDebitCards',
  acceptsCashOnly: 'acceptsCashOnly',
  acceptsNfc: 'acceptsNfc',
  freeParkingLot: 'freeParkingLot',
  freeStreetParking: 'freeStreetParking',
  paidParkingLot: 'paidParkingLot',
  valetParking: 'valetParking',
  wheelchairAccessibleParking: 'wheelchairAccessibleParking',
  wheelchairAccessibleEntrance: 'wheelchairAccessibleEntrance',
  wheelchairAccessibleRestroom: 'wheelchairAccessibleRestroom',
  wheelchairAccessibleSeating: 'wheelchairAccessibleSeating',
  directionsUri: 'directionsUri',
  placeUri: 'placeUri',
  writeAReviewUri: 'writeAReviewUri',
  reviewsUri: 'reviewsUri',
  photosUri: 'photosUri',
  google_average_rating: 'google_average_rating',
  google_total_reviews: 'google_total_reviews'
};

exports.Prisma.ReviewsScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  place_id: 'place_id',
  rating: 'rating',
  comment: 'comment',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  users: 'users',
  user_preferences: 'user_preferences',
  places: 'places',
  reviews: 'reviews'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
