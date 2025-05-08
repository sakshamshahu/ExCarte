import {
  Star,
  MapPin,
  Clock,
  ArrowLeft,
  Phone,
  Globe,
  Coffee,
  Utensils,
  DollarSign,
  Truck,
  ShoppingBag,
  Users,
  Music,
  Baby,
  Martini,
  Heart,
  Wifi,
  CreditCard,
  Beer,
  Wine,
  Dessert,
  ParkingSquare,
  Accessibility,
  Calendar,
} from "lucide-react";

// Define a type for amenity items
type AmenityItem = {
  key: string;
  icon: JSX.Element;
  label: string;
};

// Define a type for amenity groups
type AmenityGroups = {
  [category: string]: AmenityItem[];
};

// Group amenities by category
export const amenityGroups: AmenityGroups = {
  dining: [
    { key: "dine_in", icon: <Utensils className="h-4 w-4" />, label: "Dine-in" },
    { key: "take_out", icon: <ShoppingBag className="h-4 w-4" />, label: "Take-out" },
    { key: "reservable", icon: <Calendar className="h-4 w-4" />, label: "Reservable" },
  ],
  serves: [
    { key: "serves_breakfast", icon: <Coffee className="h-4 w-4" />, label: "Breakfast" },
    { key: "serves_lunch", icon: <Utensils className="h-4 w-4" />, label: "Lunch" },
    { key: "serves_dinner", icon: <Utensils className="h-4 w-4" />, label: "Dinner" },
    { key: "serves_brunch", icon: <Coffee className="h-4 w-4" />, label: "Brunch" },
    { key: "serves_vegetarian_food", icon: <Heart className="h-4 w-4" />, label: "Vegetarian" },
    { key: "serves_coffee", icon: <Coffee className="h-4 w-4" />, label: "Coffee" },
    { key: "serves_dessert", icon: <Dessert className="h-4 w-4" />, label: "Dessert" },
    { key: "serves_beer", icon: <Beer className="h-4 w-4" />, label: "Beer" },
    { key: "serves_wine", icon: <Wine className="h-4 w-4" />, label: "Wine" },
    { key: "serves_cocktails", icon: <Martini className="h-4 w-4" />, label: "Cocktails" },
  ],
  features: [
    { key: "delivery", icon: <Truck className="h-4 w-4" />, label: "Delivery" },
    { key: "outdoor_seating", icon: <Users className="h-4 w-4" />, label: "Outdoor Seating" },
    { key: "good_for_children", icon: <Baby className="h-4 w-4" />, label: "Kid-friendly" },
    { key: "menu_for_children", icon: <Baby className="h-4 w-4" />, label: "Kids Menu" },
    { key: "good_for_groups", icon: <Users className="h-4 w-4" />, label: "Group-friendly" },
    { key: "restroom", icon: <Users className="h-4 w-4" />, label: "Restrooms" },
    { key: "live_music", icon: <Music className="h-4 w-4" />, label: "Live Music" },
    { key: "good_for_watching_sports", icon: <Star className="h-4 w-4" />, label: "Sports Viewing" },
  ],
  payments: [
    { key: "acceptsCreditCards", icon: <CreditCard className="h-4 w-4" />, label: "Credit Cards" },
    { key: "acceptsDebitCards", icon: <CreditCard className="h-4 w-4" />, label: "Debit Cards" },
    { key: "acceptsCashOnly", icon: <DollarSign className="h-4 w-4" />, label: "Cash Only" },
    { key: "acceptsNfc", icon: <Wifi className="h-4 w-4" />, label: "NFC Payments" },
  ],
  parking: [
    { key: "freeParkingLot", icon: <ParkingSquare className="h-4 w-4" />, label: "Free Lot" },
    { key: "freeStreetParking", icon: <ParkingSquare className="h-4 w-4" />, label: "Free Street" },
    { key: "paidParkingLot", icon: <ParkingSquare className="h-4 w-4" />, label: "Paid Lot" },
    { key: "valetParking", icon: <ParkingSquare className="h-4 w-4" />, label: "Valet" },
  ],
  accessibility: [
    { key: "wheelchairAccessibleParking", icon: <Accessibility className="h-4 w-4" />, label: "Accessible Parking" },
    { key: "wheelchairAccessibleEntrance", icon: <Accessibility className="h-4 w-4" />, label: "Accessible Entrance" },
    { key: "wheelchairAccessibleRestroom", icon: <Accessibility className="h-4 w-4" />, label: "Accessible Restroom" },
    { key: "wheelchairAccessibleSeating", icon: <Accessibility className="h-4 w-4" />, label: "Accessible Seating" },
  ],
};