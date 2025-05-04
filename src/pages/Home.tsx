import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import bangaloreMap from "../../assets/bangalore-map.png";
import {
  Search,
  Coffee,
  Music,
  ShoppingBag,
  Utensils,
  Map,
  Star,
  MapPin,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Compass,
} from "lucide-react";

// Custom hook for intersection observer
const useInView = (
  options = {}
): [React.MutableRefObject<HTMLElement | null>, boolean] => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return [ref, isInView];
};

// Featured places data
const featuredPlaces = [
  {
    id: 1,
    name: "Third Wave Coffee",
    rating: 4.3,
    reviews: 3738,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipM2cbQ8uTPsOxxKj-gU-rwWamKsrtU4wUkdeJGT=w900-h900-p-k-no",
    tags: [
      "cafe",
      "coffee_shop",
      "food_store",
      "store",
      "food",
      "point_of_interest",
      "establishment",
    ],
    description:
      "I Ordered my regular coffee with almond milk and a croissant and chicken puff at Third Wave Coffee. This is one of my go-to places as they offer coffee with vegan milk, which is great since I’m lactos...",
  },
  {
    id: 2,
    name: "Oasis Centre",
    rating: 4.2,
    reviews: 8676,
    image:
      "https://lh3.googleusercontent.com/gps-cs-s/AC9h4npMoVkCAyNgimsLohHz-uooMtqeUUqETW1VsG9McqcIdWMPW7znGpR8A3bUK82RDoaMXJjdvDPMCyrDRk-PzvRvcdtZo2xtCFkM8bLmj3VJ3pO77yCsc76p0HcPXAgyj8U2rDVs=w900-h900-p-k-no",
    tags: ["shopping_mall", "point_of_interest", "establishment"],
    description:
      "Went to Magique restaurant in this building. Downstairs they have Soch and Kushal’s store. Third floor they have pub. All floor they have something I didn’t explore. Very nice place , parking is avail...",
  },
  {
    id: 3,
    name: "Meghana Foods",
    rating: 4.3,
    reviews: 33585,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMUaXQ3YNosQh8_GC_znm06KY3NbPsRwT5cTJ4K=w900-h900-p-k-no",
    tags: [
      "indian_restaurant",
      "restaurant",
      "food",
      "point_of_interest",
      "establishment",
    ],
    description:
      "Best for it's biryani, no other biryani is as good as them in entire Bangalore... It's like North is in south after eating it.",
  },
  {
    id: 4,
    name: "Oyster, Bar & Kitchen",
    rating: 4.6,
    reviews: 7682,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipObpKxRUZVY_8ULx_j1Qp6sDOcjGX7ENePVUipu=w900-h900-p-k-no",
    tags: [
      "bar",
      "pub",
      "seafood_restaurant",
      "night_club",
      "bar_and_grill",
      "buffet_restaurant",
      "restaurant",
      "food",
      "point_of_interest",
      "establishment",
    ],
    description:
      "Had an amazing time at Oyster Bar & Kitchen. The ambience is very good, with a nice greenish theme. They are pet-friendly, which is a big plus for pet owners. The hygiene is top-notch, and the staff ...",
  },
];

// Categories data
const categoriesShowcase = [
  {
    id: 1,
    name: "Cafes & Restaurants",
    icon: <Coffee className="w-8 h-8" />,
    count: 201,
  },
  {
    id: 2,
    name: "Nightlife & Entertainment",
    icon: <Music className="w-8 h-8" />,
    count: 102,
  },
  {
    id: 3,
    name: "Shopping & Markets",
    icon: <ShoppingBag className="w-8 h-8" />,
    count: 409,
  },
  {
    id: 4,
    name: "Food & Dining",
    icon: <Utensils className="w-8 h-8" />,
    count: 325,
  },
];

// Neighborhoods data
const neighborhoods = [
  { id: 1, name: "HSR layout", count: 1427 },
  { id: 2, name: "Jayanagar", count: 579 },
  { id: 3, name: "Kormangala", count: 102 },
  // { id: 4, name: "Whitefield", count: 92 },
  // { id: 5, name: "JP Nagar", count: 64 },
];

// Animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemFadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const scaleUp = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
};

const areaOptions = [
  { value: "jayanagar", label: "Jayanagar" },
  { value: "koramangala", label: "Koramangala" },
  { value: "hsr layout", label: "HSR Layout" },
];

const priceLevelOptions = [
  { value: "PRICE_LEVEL_INEXPENSIVE", label: "Budget-friendly" },
  { value: "PRICE_LEVEL_MODERATE", label: "Mid-range" },
  { value: "PRICE_LEVEL_EXPENSIVE", label: "High-end" },
  { value: "PRICE_LEVEL_VERY_EXPENSIVE", label: "Luxury" },
];

const categories = [
  { value: "all", name: "All Places"},
  { value: "coffee", name: "Cafes" },
  { value: "nightlife", name: "Nightlife"},
  { value: "dining", name: "Restaurants"},
  { value: "shopping", name: "Shopping"},
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [categoriesRef, categoriesInView] = useInView({ threshold: 0.1 });
  const [featuredRef, featuredInView] = useInView({ threshold: 0.1 });
  const [mapRef, mapInView] = useInView({ threshold: 0.1 });
  const [personalizedRef, personalizedInView] = useInView({ threshold: 0.1 });
  const [selectedPriceLevel, setSelectedPriceLevel] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [category, setCategory] = useState("");
  const [queryInput, setQueryInput] = useState("");
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main>
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="relative py-20 md:py-32 overflow-hidden"
        >
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-300 filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-purple-300 filter blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-indigo-600 mb-6 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Discover your perfect spot in Bangalore</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Find Your <span className="text-indigo-600">Perfect Place</span>{" "}
                in Bangalore
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
              >
                New to town? Let us guide you to the perfect places based on
                your interests. From cozy cafes to vibrant nightlife, we've got
                you covered.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative max-w-2xl mx-auto"
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-12 pr-20 py-4 rounded-full border-0 bg-white/90 backdrop-blur-sm shadow-lg text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search for cafes, restaurants, or activities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      window.location.href = `/explore?search=${encodeURIComponent(
                        searchQuery
                      )}`;
                    }}
                  >
                    Search
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mt-6 text-sm text-gray-500"
              >
                Try: "Best coffee shops", "Romantic dinner spots", "Live music
                venues"
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Categories Section */}
        <motion.section
          ref={categoriesRef}
          initial="hidden"
          animate={categoriesInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <motion.h2
              variants={itemFadeIn}
              className="text-3xl font-bold text-center mb-12"
            >
              What interests you?
            </motion.h2>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {categoriesShowcase.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemFadeIn}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => setActiveCategory(category.id)}
                >
                  <div
                    className={`p-8 flex flex-col items-center text-center ${
                      activeCategory === category.id ? "bg-indigo-50" : ""
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {category.count} places
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemFadeIn} className="mt-12 text-center">
              <a
                href="/explore"
                className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
              >
                View all categories
                <ChevronRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Places */}
        <motion.section
          ref={featuredRef}
          initial="hidden"
          animate={featuredInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <motion.h2 variants={itemFadeIn} className="text-3xl font-bold">
                Featured Places
              </motion.h2>

              <motion.div variants={itemFadeIn}>
                <a
                  href="/explore"
                  className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700"
                >
                  View all
                  <ChevronRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredPlaces.map((place) => (
                <motion.div
                  key={place.id}
                  variants={itemFadeIn}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={place.image || "/placeholder.svg"}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 stroke-yellow-400" />
                      {place.rating}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                      {place.name}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {place.tags.slice(0, 5).map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {tag.replace(/_/g, " ").slice(0, 15)}
                        </span>
                      ))}
                    </div>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {place.description}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">
                        {place.reviews} reviews
                      </span>
                      <a
                        href={`/place/${place.id}`}
                        className="text-indigo-600 text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        View details
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Map Section */}
        <motion.section
          ref={mapRef}
          initial="hidden"
          animate={mapInView ? "visible" : "hidden"}
          variants={scaleUp}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-2">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <h2 className="text-3xl font-bold mb-6">
                      Explore Neighborhoods
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Discover the unique character of Bangalore's diverse
                      neighborhoods, each with its own charm and attractions.
                    </p>

                    <div className="space-y-4">
                      {neighborhoods.map((neighborhood) => (
                        <motion.div
                          key={neighborhood.id}
                          whileHover={{ x: 5 }}
                          className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                            <span className="font-medium">
                              {neighborhood.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {neighborhood.count} places
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="lg:col-span-3 relative min-h-[400px] rounded-xl overflow-hidden shadow-lg">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0 bg-gray-200"
                  >
                    <img
                      src={bangaloreMap}
                      alt="Bangalore Map"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

                    {/* Map pins */}
                    <div className="absolute top-1/4 left-1/3 animate-pulse">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="absolute top-1/3 left-1/2 animate-pulse">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="absolute top-1/3 left-1/4 animate-pulse">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-1/2 right-1/4 animate-pulse">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-2/3 right-1/2 animate-pulse">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-2/3 right-1/3 animate-pulse">
                      <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                        <h3 className="font-bold mb-2">Discover Bangalore</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          Interactive map with 500+ curated locations across the
                          city
                        </p>
                        <button
                          className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                          onClick={() => {
                            window.location.href = "/explore";
                          }}
                        >
                          <Map className="w-4 h-4" />
                          Open full map
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Personalized Recommendations */}
        <motion.section
          ref={personalizedRef}
          initial="hidden"
          animate={personalizedInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="py-16 bg-indigo-50"
        >
          <div className="container mx-auto px-4">
            <motion.div
              variants={itemFadeIn}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Personalized Recommendations
              </h2>
              <p className="text-gray-600">
                Tell us what you like, and our AI will suggest the perfect
                places for you in Bangalore.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <motion.div variants={itemFadeIn} className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      I'm looking for
                    </label>
                    <select className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    value={category}
                      onChange={(e) => setCategory(e.target.value)}>
                      <option value="" className="pr-[3rem]">
                        Your Place
                      </option>
                      {categories.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemFadeIn} className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      The Area is
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                    >
                      <option value="all" className="pr-[3rem]">
                        All
                      </option>
                      {areaOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div variants={itemFadeIn} className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      My budget is
                    </label>
                    <select
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={selectedPriceLevel}
                      onChange={(e) => setSelectedPriceLevel(e.target.value)}
                    >
                      <option value="" className="pr-[3rem]">
                        Your Budget
                      </option>
                      {priceLevelOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                <motion.div variants={itemFadeIn} className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or describe what you're looking for
                  </label>
                    <textarea
                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    placeholder="E.g., I'm looking for a quiet cafe with good Wi-Fi where I can work for a few hours"
                    value={queryInput}
                    onChange={(e) => setQueryInput(e.target.value)}
                    ></textarea>
                </motion.div>

                <motion.div
                  variants={itemFadeIn}
                  className="flex justify-center"
                >
                  <button className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                   onClick={() => {
                    const queryParams = [];
                    if (queryInput !== "") {
                      queryParams.push(`search=${encodeURIComponent(queryInput)}`);
                      queryParams.push(`llm=yes`)
                    }
                    if (category !== "") queryParams.push(`category=${encodeURIComponent(category)}`);
                    if (selectedPriceLevel !== "") queryParams.push(`priceLevel=${encodeURIComponent(selectedPriceLevel)}`);
                    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
                    window.location.href = `/explore${queryString}`;
                   }}
                  >
                    <Compass className="w-5 h-5" />
                    Find My Perfect Places
                  </button>
                </motion.div>
              </div>

              <motion.div
                variants={itemFadeIn}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6" />
                  <p className="font-medium">
                    Our AI analyzes 10,000+ places to find your perfect match
                  </p>
                </div>
                {/* <a
                  href="/how-it-works"
                  className="text-white/80 hover:text-white underline text-sm"
                >
                  How it works
                </a> */}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Explore Bangalore?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Start discovering places that match your preferences and
                  interests.
                </p>
                <a
                  href="/explore"
                  className="inline-flex items-center gap-2 bg-indigo-600 text-white px-8 py-4 rounded-full font-medium hover:bg-indigo-700 transition-colors text-lg shadow-lg hover:shadow-xl"
                >
                  Start Exploring
                  <ArrowRight className="w-5 h-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4 gap-2  flex items-center">
                <Map className="h-8 w-8" />
                ExCarte
              </div>
              <p className="text-gray-400 mb-4">
                Discover your perfect spot in Bangalore with personalized
                recommendations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Explore</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/explore"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    All Places
                  </a>
                </li>
                <li>
                  <a
                    href="/explore"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Explore
                  </a>
                </li>
                <li>
                  <a
                    href="/user/reviews"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Your Reviews
                  </a>
                </li>
                <li>
                  <a
                    href="/profile"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/press"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Press
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/terms"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/cookies"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} ExCarte. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
