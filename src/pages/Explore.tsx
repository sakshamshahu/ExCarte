"use client";

import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store";
import { api } from "../lib/api";
import Map from "../components/Map";
import PlaceCard from "../components/PlaceCard";
import PlaceDetails from "../components/PlaceDetails";
import {
  MapPin,
  Coffee,
  Music,
  Utensils,
  ShoppingBag,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  SlidersHorizontal,
  X,
  Check,
  Truck,
  Calendar,
  Heart,
  Dessert,
  Beer,
  Wine,
  Martini,
  Users,
  Baby,
  Star,
  CreditCard,
  DollarSign,
  Wifi,
  ParkingSquare,
  Accessibility,
} from "lucide-react";
import Spinner from "../components/Spinner";
import { debounce } from "lodash";
import type { Place } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Define amenity groups for advanced search
const amenityGroups = {
  dining: [
    {
      key: "dine_in",
      icon: <Utensils className="h-4 w-4" />,
      label: "Dine-in",
    },
    {
      key: "take_out",
      icon: <ShoppingBag className="h-4 w-4" />,
      label: "Take-out",
    },
    {
      key: "reservable",
      icon: <Calendar className="h-4 w-4" />,
      label: "Reservable",
    },
  ],
  serves: [
    {
      key: "serves_breakfast",
      icon: <Coffee className="h-4 w-4" />,
      label: "Breakfast",
    },
    {
      key: "serves_lunch",
      icon: <Utensils className="h-4 w-4" />,
      label: "Lunch",
    },
    {
      key: "serves_dinner",
      icon: <Utensils className="h-4 w-4" />,
      label: "Dinner",
    },
    {
      key: "serves_brunch",
      icon: <Coffee className="h-4 w-4" />,
      label: "Brunch",
    },
    {
      key: "serves_vegetarian_food",
      icon: <Heart className="h-4 w-4" />,
      label: "Vegetarian",
    },
    {
      key: "serves_coffee",
      icon: <Coffee className="h-4 w-4" />,
      label: "Coffee",
    },
    {
      key: "serves_dessert",
      icon: <Dessert className="h-4 w-4" />,
      label: "Dessert",
    },
    { key: "serves_beer", icon: <Beer className="h-4 w-4" />, label: "Beer" },
    { key: "serves_wine", icon: <Wine className="h-4 w-4" />, label: "Wine" },
    {
      key: "serves_cocktails",
      icon: <Martini className="h-4 w-4" />,
      label: "Cocktails",
    },
  ],
  features: [
    { key: "delivery", icon: <Truck className="h-4 w-4" />, label: "Delivery" },
    {
      key: "outdoor_seating",
      icon: <Users className="h-4 w-4" />,
      label: "Outdoor Seating",
    },
    {
      key: "good_for_children",
      icon: <Baby className="h-4 w-4" />,
      label: "Kid-friendly",
    },
    {
      key: "menu_for_children",
      icon: <Baby className="h-4 w-4" />,
      label: "Kids Menu",
    },
    {
      key: "good_for_groups",
      icon: <Users className="h-4 w-4" />,
      label: "Group-friendly",
    },
    {
      key: "restroom",
      icon: <Users className="h-4 w-4" />,
      label: "Restrooms",
    },
    {
      key: "live_music",
      icon: <Music className="h-4 w-4" />,
      label: "Live Music",
    },
    {
      key: "good_for_watching_sports",
      icon: <Star className="h-4 w-4" />,
      label: "Sports Viewing",
    },
  ],
  payments: [
    {
      key: "acceptsCreditCards",
      icon: <CreditCard className="h-4 w-4" />,
      label: "Credit Cards",
    },
    {
      key: "acceptsDebitCards",
      icon: <CreditCard className="h-4 w-4" />,
      label: "Debit Cards",
    },
    {
      key: "acceptsCashOnly",
      icon: <DollarSign className="h-4 w-4" />,
      label: "Cash Only",
    },
    {
      key: "acceptsNfc",
      icon: <Wifi className="h-4 w-4" />,
      label: "NFC Payments",
    },
  ],
  parking: [
    {
      key: "freeParkingLot",
      icon: <ParkingSquare className="h-4 w-4" />,
      label: "Free Lot",
    },
    {
      key: "freeStreetParking",
      icon: <ParkingSquare className="h-4 w-4" />,
      label: "Free Street",
    },
    {
      key: "paidParkingLot",
      icon: <ParkingSquare className="h-4 w-4" />,
      label: "Paid Lot",
    },
    {
      key: "valetParking",
      icon: <ParkingSquare className="h-4 w-4" />,
      label: "Valet",
    },
  ],
  accessibility: [
    {
      key: "wheelchairAccessibleParking",
      icon: <Accessibility className="h-4 w-4" />,
      label: "Accessible Parking",
    },
    {
      key: "wheelchairAccessibleEntrance",
      icon: <Accessibility className="h-4 w-4" />,
      label: "Accessible Entrance",
    },
    {
      key: "wheelchairAccessibleRestroom",
      icon: <Accessibility className="h-4 w-4" />,
      label: "Accessible Restroom",
    },
    {
      key: "wheelchairAccessibleSeating",
      icon: <Accessibility className="h-4 w-4" />,
      label: "Accessible Seating",
    },
  ],
};

const priceLevelOptions = [
  { value: "PRICE_LEVEL_INEXPENSIVE", label: "Budget-friendly" },
  { value: "PRICE_LEVEL_MODERATE", label: "Mid-range" },
  { value: "PRICE_LEVEL_EXPENSIVE", label: "High-end" },
  { value: "PRICE_LEVEL_VERY_EXPENSIVE", label: "Luxury" },
];

const areaOptions = [
  { value: "jayanagar", label: "Jayanagar" },
  { value: "koramangala", label: "Koramangala" },
  { value: "hsr layout", label: "HSR Layout" },
];

const categories = [
  { id: "all", name: "All Places", icon: MapPin },
  { id: "coffee", name: "Cafes", icon: Coffee },
  { id: "nightlife", name: "Nightlife", icon: Music },
  { id: "dining", name: "Restaurants", icon: Utensils },
  { id: "shopping", name: "Shopping", icon: ShoppingBag },
];

const PAGE_SIZE = 30; // Default page size

const Explore = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { places, setPlaces, selectedPlace, setSelectedPlace } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [placeIds, setPlaceIds] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [goToPage, setGoToPage] = useState("");
  const [isLlmSearching, setIsLlmSearching] = useState(false);
  const [aiButtonActive, setAiButtonActive] = useState(false);
  const [selectedPriceLevel, setSelectedPriceLevel] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");

  const fetchPlacesByIds = async (placeIds: string[]) => {
    setIsLoading(true);
    try {
      setPlaces([]); // Clear previous places
      setPlaceIds(placeIds);
    } catch (error) {
      console.error("Error fetching places:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("placesIds :", placeIds);
  }, [placeIds]);

  // Advanced search filters
  const [advancedFilters, setAdvancedFilters] = useState<
    Record<string, boolean>
  >({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Refs for sticky search bar and modal
  const mapRef = useRef(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Initialize state from URL query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has("search"))
      setSearchQuery(queryParams.get("search") || "");
    if (queryParams.has("category"))
      setActiveCategory(queryParams.get("category") || "all");
    if (queryParams.has("page"))
      setCurrentPage(Number(queryParams.get("page")) || 1);
    if (queryParams.has("priceLevel"))
      setSelectedPriceLevel(queryParams.get("priceLevel") || "");
    if (queryParams.has("area"))
      setSelectedArea(queryParams.get("area") || "all");
    if (queryParams.has("llm"))
      setIsLlmSearching(queryParams.get("llm") === "yes" || false);
    // Handle boolean filters
    const newAdvancedFilters: Record<string, boolean> = {};

    // Iterate through all query parameters
    queryParams.forEach((value, key) => {
      // Check if it's a boolean filter (value is 'true' or 'false')
      if (value === "true" || value === "false") {
        newAdvancedFilters[key] = value === "true";
      }
    });

    if (Object.keys(newAdvancedFilters).length > 0) {
      setAdvancedFilters(newAdvancedFilters);
    }
  }, [location.search]);

  // Update URL when filters change
  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (searchQuery) queryParams.set("search", searchQuery);
    if (activeCategory !== "all") queryParams.set("category", activeCategory);
    if (currentPage > 1) queryParams.set("page", currentPage.toString());
    if (selectedPriceLevel.length > 0)
      queryParams.set("priceLevel", selectedPriceLevel);
    if (selectedArea !== "all") queryParams.set("area", selectedArea);
    // Add boolean filters to query params
    Object.entries(advancedFilters).forEach(([key, value]) => {
      queryParams.set(key, String(value));
    });

    // Update the URL without causing a page reload
    navigate(`${location.pathname}?${queryParams.toString()}`, {
      replace: true,
    });
  }, [
    searchQuery,
    activeCategory,
    currentPage,
    advancedFilters,
    selectedPriceLevel,
    selectedArea,
    navigate,
    location.pathname,
  ]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowAdvancedSearch(false);
      }
    };

    if (showAdvancedSearch) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAdvancedSearch]);

  const debouncedFetchPlaces = useCallback(
    debounce(async (query, category, page, filters, llm, placeIds) => {
      setIsLoading(true);
      try {
        const params: Record<string, string> = {
          page: String(page),
          pageSize: String(PAGE_SIZE),
          llm: llm,
        };

        if (category !== "all") params.category = category;
        if (query) params.search = query;
        if (placeIds.length > 0) params.placeIds = placeIds.join(",");
        // Add boolean filters to params
        Object.entries(filters).forEach(([key, value]) => {
          params[key] = String(value);
        });

        const data = await api.places.getAll(params);
        console.log("Fetched places:", data);
        setPlaces(data.places || []);

        // Update pagination information
        if (data.pagination) {
          setTotalPages(data.pagination.totalPages);
          // In case the API returns a different current page than requested
          setCurrentPage(data.pagination.currentPage);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    [setPlaces]
  );

  // Reset to page 1 and clear placeIds when searchQuery changes
  useEffect(() => {
    setCurrentPage(1);
    if (placeIds.length > 0 && searchQuery.trim() !== "") {
      setPlaceIds([]); // Clear the placeIds array
    }
  }, [searchQuery]);

  // Fetch places when pagination, search or category changes
  useEffect(() => {
    debouncedFetchPlaces(
      searchQuery,
      activeCategory,
      currentPage,
      {
        ...advancedFilters,
        priceLevel: selectedPriceLevel,
        area: selectedArea,
      },
      isLlmSearching,
      placeIds
    );
    return () => debouncedFetchPlaces.cancel();
  }, [
    searchQuery,
    activeCategory,
    selectedPriceLevel,
    selectedArea,
    currentPage,
    advancedFilters,
    debouncedFetchPlaces,
    placeIds,
  ]);

  const handlePlaceSelect = (place: Place) => {
    setSelectedPlace(place);
    setShowDetails(true);
  };

  const handlePageChange = (newPage: number) => {
    // Prevent going below page 1 or above total pages
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // Scroll to top when changing pages
    // window.scrollTo(0, 0)
  };

  const handleGoToPage = () => {
    const pageNum = Number.parseInt(goToPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      handlePageChange(pageNum);
      setGoToPage("");
    }
  };

  const handleLlmSearch = async () => {
    if (!searchQuery.trim()) return;
    // Check if the area is selected
    if (selectedArea === "all") {
      toast.error("Please select an area to perform this action.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
          borderRadius: "8px",
          padding: "16px",
          fontSize: "14px",
        },
      });
      return;
    }
    setIsLoading(true);

    if (isLlmSearching) {
      setIsLlmSearching(false);
      setAiButtonActive(false);
      setIsLoading(false);
      return;
    }
    setIsLlmSearching(true);
    setAiButtonActive(true);

    try {
      // This is a placeholder for the LLM search API call
      // Replace with actual implementation when backend is ready
      console.log("LLM search for:", searchQuery);

      // Simulate LLM search delay
      // const llmResults = await api.places.getLLMResults({
      //   search: searchQuery,
      //   area: selectedArea,
      // });
      // console.log("LLM results:", llmResults);
      // const placeIds = llmResults
      //   .filter((result: { decision: string }) => result.decision === "Yes")
      //   .map((result: { id: string }) => result.id);
      const placeIds = [
        "ChIJRwZR3ZEUrjsR-F0llyJnP4g",
        "ChIJX4W559QVrjsRrodbeit77tA",
        "ChIJlWMXff0VrjsRjBmmWgHsTMA",
        "ChIJs3caMl4VrjsR6FV0kwtUL8w",
        "ChIJTUu3P5wVrjsRvb4C6pAJ63M",
        "ChIJLx3B02cVrjsRKQwchm_wZww",
        "ChIJkdTupJIUrjsRGj4eem-Ndg4",
        "ChIJS3DNGpAUrjsRgssDjbqSaPE",
        "ChIJw5BFMQkVrjsRgDI4_idnYAA",
        "ChIJa-jPFNsVrjsRkXlyYRsufk4"
      ];
      fetchPlacesByIds(placeIds);
      clearAdvancedFilters(false);
      setActiveCategory("all");
      // For now, just use the regular search
      // This will be replaced with actual LLM search results
      debouncedFetchPlaces(
        searchQuery,
        activeCategory,
        1,
        advancedFilters,
        true,
        placeIds
      );
    } catch (error) {
      console.error("Error with LLM search:", error);
    } finally {
      setIsLlmSearching(false);
      setIsLoading(false);
      // Keep the button active to show it was used
      setTimeout(() => setAiButtonActive(false), 2000);
    }
  };

  const toggleAdvancedFilter = (key: any) => {
    setAdvancedFilters((prev) => {
      const updatedFilters = { ...prev };
      if (updatedFilters[key]) {
        delete updatedFilters[key];
      } else {
        updatedFilters[key] = true;
      }
      return updatedFilters;
    });
  };

  const clearAdvancedFilters = (setArea = true) => {
    setAdvancedFilters({});
    setSelectedPriceLevel("");
    if (setArea) {
      setSelectedArea("all");
    }
  };

  const getActiveFilterCount = () => {
    return Object.keys(advancedFilters).length;
  };

  const memoizedMap = useMemo(
    () => (
      <div ref={mapRef}>
        <Map
          places={places}
          onPlaceSelect={(placeId) => {
            const place = places.find((p) => p.id === placeId);
            if (place) handlePlaceSelect(place);
          }}
        />
      </div>
    ),
    [places]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Sticky Search Bar - Enhanced UI */}
        <div className="sticky top-[4rem] z-20">
          <div className="rounded-2xl p-5 transform transition-all duration-300">
            {/* Main Search Bar */}
            <div className="flex flex-col w-full space-y-4 items-center justify-center">
              <div className="relative flex items-center justify-center w-full">
                <div className="relative w-full max-w-[50rem]">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-indigo-600" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-12 pr-20 py-4 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-lg text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                    placeholder="Search for cafes, restaurants, or activities..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                    }}
                  />
                  {/* AI Search Button - Inside Search Bar */}
                  <div className="absolute inset-y-0 right-0 flex gap-2 justify-center items-center pr-2">
                    <button
                      onClick={handleLlmSearch}
                      disabled={!searchQuery.trim()}
                      className={`flex items-center justify-center rounded-full text-sm font-semibold text-white shadow-sm focus-visible:outline p-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 ease-in-out ${
                        isLlmSearching || !searchQuery.trim()
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : aiButtonActive
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                      }`}
                    >
                      {isLlmSearching ? (
                        <Spinner size="sm" className="" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                {/* Filters Button */}
                <motion.button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`flex items-center ml-2 px-5 py-3 rounded-full shadow-md transition-all duration-300 ${
                    getActiveFilterCount() > 0
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                  {getActiveFilterCount() > 0 && (
                    <span className="ml-2 bg-white text-indigo-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {getActiveFilterCount()}
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Category Filters - Enhanced UI */}
              <div className="flex space-x-2 w-fit overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 bg-white/60 px-3 py-2 rounded-full scrollbar-track-transparent">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                    }`}
                  >
                    <category.icon className="h-6 w-6" />
                    {category.name}
                  </motion.button>
                ))}

                {/* Price Level Filter */}
                <div
                  className={`flex items-center px-2 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedPriceLevel !== ""
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <select
                    value={selectedPriceLevel}
                    onChange={(e) => setSelectedPriceLevel(e.target.value)}
                    className={`flex items-center rounded-full whitespace-nowrap transition-all duration-300 bg-transparent ${
                      selectedPriceLevel !== "" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <option value="" className="pr-[3rem]">
                      Price
                    </option>
                    {priceLevelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Area Filter */}
                <div
                  className={`flex items-center px-2 py-2 rounded-full whitespace-nowrap transition-all duration-300 ${
                    selectedArea !== "all"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                  }`}
                >
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className={`flex items-center rounded-full whitespace-nowrap transition-all duration-300 bg-transparent ${
                      selectedArea !== "all" ? "text-white" : "text-gray-700"
                    }`}
                  >
                    <option value="all" className="pr-[3rem]">
                      Area
                    </option>
                    {areaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Search Modal - Floating Modal */}
          <AnimatePresence>
            {showAdvancedSearch && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center p-4">
                <motion.div
                  ref={modalRef}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
                >
                  <div className="p-6 overflow-y-auto max-h-[calc(80vh-4rem)]">
                    <div className="flex justify-between items-center mb-6 bg-white">
                      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Advanced Filters
                      </h3>
                      <div className="flex space-x-4">
                        <motion.button
                          onClick={() => clearAdvancedFilters()}
                          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                        >
                          Clear all
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowAdvancedSearch(false)}
                          className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-200"
                        >
                          <X className="h-5 w-5" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {Object.entries(amenityGroups).map(
                        ([groupName, items]) => (
                          <div key={groupName} className="space-y-3">
                            <h4 className="font-semibold text-gray-800 capitalize border-b pb-2">
                              {groupName}
                            </h4>
                            <div className="space-y-2">
                              {items.map((item) => (
                                <motion.button
                                  key={item.key}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                  onClick={() => toggleAdvancedFilter(item.key)}
                                  className={`flex items-center justify-between w-full px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                                    advancedFilters[item.key]
                                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 border shadow-sm"
                                      : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
                                  }`}
                                >
                                  <div className="flex items-center">
                                    <div
                                      className={`${
                                        advancedFilters[item.key]
                                          ? "text-indigo-600"
                                          : "text-gray-500"
                                      }`}
                                    >
                                      {item.icon}
                                    </div>
                                    <span
                                      className={`ml-3 ${
                                        advancedFilters[item.key]
                                          ? "font-medium text-indigo-900"
                                          : "text-gray-700"
                                      }`}
                                    >
                                      {item.label}
                                    </span>
                                  </div>
                                  {advancedFilters[item.key] && (
                                    <div className="bg-indigo-100 rounded-full p-1">
                                      <Check className="h-4 w-4 text-indigo-600" />
                                    </div>
                                  )}
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Map Section */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
          {memoizedMap}
        </div>

        {/* Places Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner size="lg" className="text-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {places.length > 0 ? (
                places.map((place) => (
                  <motion.div
                    key={place.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <PlaceCard
                      place={place}
                      onClick={() => handlePlaceSelect(place)}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No places found matching your criteria.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Pagination Controls with Go To Page - Enhanced UI */}
        {places.length > 0 && (
          <div className="relative flex justify-center items-center mt-24 mb-5">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center space-x-4 sticky bg-white p-4 rounded-full shadow-lg"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>

              <div className="flex items-center space-x-1">
                {/* Show page numbers */}
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;

                  // Always show first, last, current, and pages around current
                  const showPage =
                    pageNumber === 1 ||
                    pageNumber === totalPages ||
                    (pageNumber >= currentPage - 1 &&
                      pageNumber <= currentPage + 1);

                  // Show ellipsis
                  if (!showPage) {
                    // Show ellipsis only once for each gap
                    if (pageNumber === 2 || pageNumber === totalPages - 1) {
                      return (
                        <span key={pageNumber} className="px-2 text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <motion.button
                      key={pageNumber}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 ${
                        currentPage === pageNumber
                          ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                      }`}
                    >
                      {pageNumber}
                    </motion.button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>

              {/* Go To Page - Enhanced UI */}
              <div className="flex items-center ml-4 border-l pl-4">
                <span className="text-sm text-gray-500 mr-2">Go to:</span>
                <input
                  type="text"
                  value={goToPage}
                  onChange={(e) =>
                    setGoToPage(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  className="w-14 p-2 text-center border rounded-full focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                  placeholder="#"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleGoToPage}
                  disabled={!goToPage}
                  className={`ml-2 px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                    !goToPage
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
                  }`}
                >
                  Go
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Place Details Modal */}
        {showDetails && selectedPlace && (
          <PlaceDetails
            place={selectedPlace}
            onClose={() => {
              setShowDetails(false);
              setSelectedPlace(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Explore;
