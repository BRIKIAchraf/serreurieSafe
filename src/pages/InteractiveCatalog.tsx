import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Search,
  Filter,
  Grid,
  List,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Eye,
  Lock,
  Shield,
  Award,
  Clock,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
} from "lucide-react";
import { useSounds } from "./SoundManager";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  images: string[];
  isNew: boolean;
  isPopular: boolean;
  isOnSale: boolean;
  availability: "in-stock" | "low-stock" | "out-of-stock";
  specifications: Record<string, string>;
  animations: {
    openClose: boolean;
    zoom: boolean;
    rotation: boolean;
  };
}

const InteractiveCatalog: React.FC = () => {
  const { t } = useTranslation();
  const { playUnlockSound, playKeySound } = useSounds();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [showFilters, setShowFilters] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    {
      id: "all",
      name: "Tous les produits",
      icon: <Grid className="w-4 h-4" />,
    },
    { id: "locks", name: "Serrures", icon: <Lock className="w-4 h-4" /> },
    { id: "security", name: "Sécurité", icon: <Shield className="w-4 h-4" /> },
    {
      id: "accessories",
      name: "Accessoires",
      icon: <Award className="w-4 h-4" />,
    },
    { id: "tools", name: "Outils", icon: <Clock className="w-4 h-4" /> },
  ];

  const sortOptions = [
    { id: "name", name: "Nom" },
    { id: "price-low", name: "Prix croissant" },
    { id: "price-high", name: "Prix décroissant" },
    { id: "rating", name: "Note" },
    { id: "newest", name: "Plus récent" },
  ];

  useEffect(() => {
    // Mock products data
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Serrure 3 Points Haute Sécurité",
        category: "locks",
        price: 299,
        originalPrice: 399,
        rating: 4.8,
        reviews: 127,
        description:
          "Serrure 3 points certifiée A2P pour une sécurité maximale. Installation facile et résistance exceptionnelle.",
        features: [
          "Certifiée A2P",
          "3 points de verrouillage",
          "Résistance aux effractions",
          "Garantie 5 ans",
        ],
        images: [
          "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg",
          "https://images.pexels.com/photos/4792509/pexels-photo-4792509.jpeg",
        ],
        isNew: true,
        isPopular: true,
        isOnSale: true,
        availability: "in-stock",
        specifications: {
          Matériau: "Acier inoxydable",
          Certification: "A2P",
          "Points de verrouillage": "3",
          Garantie: "5 ans",
        },
        animations: {
          openClose: true,
          zoom: true,
          rotation: true,
        },
      },
      {
        id: "2",
        name: "Cylindre de Sécurité Anti-Perçage",
        category: "locks",
        price: 89,
        rating: 4.6,
        reviews: 89,
        description:
          "Cylindre haute sécurité résistant au perçage et au crochetage.",
        features: [
          "Anti-perçage",
          "Anti-crochetage",
          "Installation facile",
          "Garantie 2 ans",
        ],
        images: [
          "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg",
        ],
        isNew: false,
        isPopular: false,
        isOnSale: false,
        availability: "in-stock",
        specifications: {
          Matériau: "Laiton",
          Résistance: "Anti-perçage",
          Garantie: "2 ans",
        },
        animations: {
          openClose: true,
          zoom: true,
          rotation: false,
        },
      },
      {
        id: "3",
        name: "Système d'Alarme Sans Fil",
        category: "security",
        price: 199,
        rating: 4.7,
        reviews: 156,
        description:
          "Système d'alarme complet avec détecteurs de mouvement et capteurs d'ouverture.",
        features: [
          "Sans fil",
          "Application mobile",
          "Détecteurs multiples",
          "Installation facile",
        ],
        images: [
          "https://images.pexels.com/photos/277559/pexels-photo-277559.jpeg",
        ],
        isNew: true,
        isPopular: true,
        isOnSale: false,
        availability: "low-stock",
        specifications: {
          Type: "Sans fil",
          Portée: "100m",
          Autonomie: "2 ans",
          Garantie: "3 ans",
        },
        animations: {
          openClose: false,
          zoom: true,
          rotation: true,
        },
      },
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return b.isNew ? 1 : -1;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    playUnlockSound();
  };

  const handleAnimationToggle = (
    productId: string,
    animationType: keyof Product["animations"]
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? {
              ...product,
              animations: {
                ...product.animations,
                [animationType]: !product.animations[animationType],
              },
            }
          : product
      )
    );
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "in-stock":
        return "text-green-600 bg-green-100";
      case "low-stock":
        return "text-orange-600 bg-orange-100";
      case "out-of-stock":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case "in-stock":
        return "En stock";
      case "low-stock":
        return "Stock limité";
      case "out-of-stock":
        return "Rupture de stock";
      default:
        return "Indisponible";
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Catalogue{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              interactif
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos produits avec des animations interactives et des
            fonctionnalités avancées
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white shadow-sm"
                    : "hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Nouveau
                    </span>
                  )}
                  {product.isPopular && (
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Populaire
                    </span>
                  )}
                  {product.isOnSale && (
                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Promo
                    </span>
                  )}
                </div>

                {/* Animation Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  {product.animations.openClose && (
                    <button
                      onClick={() =>
                        handleAnimationToggle(product.id, "openClose")
                      }
                      className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                    >
                      <Lock className="w-4 h-4" />
                    </button>
                  )}
                  {product.animations.zoom && (
                    <button
                      onClick={() => handleAnimationToggle(product.id, "zoom")}
                      className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  )}
                  {product.animations.rotation && (
                    <button
                      onClick={() =>
                        handleAnimationToggle(product.id, "rotation")
                      }
                      className="w-8 h-8 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Availability */}
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${getAvailabilityColor(
                      product.availability
                    )}`}
                  >
                    {getAvailabilityText(product.availability)}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews} avis)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {product.price}€
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        {product.originalPrice}€
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleProductClick(product)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Voir détails</span>
                  </button>
                  <button className="p-2 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedProduct.name}
                    </h2>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Product Images */}
                    <div className="space-y-4">
                      <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={selectedProduct.images[0]}
                          alt={selectedProduct.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {selectedProduct.images.map((image, index) => (
                          <div
                            key={index}
                            className="h-20 bg-gray-100 rounded-lg overflow-hidden"
                          >
                            <img
                              src={image}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="flex">
                            {renderStars(selectedProduct.rating)}
                          </div>
                          <span className="text-gray-600">
                            ({selectedProduct.reviews} avis)
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">
                          {selectedProduct.description}
                        </p>
                      </div>

                      {/* Features */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Caractéristiques :
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {selectedProduct.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-sm text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Specifications */}
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">
                          Spécifications :
                        </h3>
                        <div className="space-y-2">
                          {Object.entries(selectedProduct.specifications).map(
                            ([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-sm text-gray-600">
                                  {key}:
                                </span>
                                <span className="text-sm font-medium text-gray-900">
                                  {value}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="border-t pt-6">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-3xl font-bold text-gray-900">
                              {selectedProduct.price}€
                            </span>
                            {selectedProduct.originalPrice && (
                              <span className="text-xl text-gray-500 line-through">
                                {selectedProduct.originalPrice}€
                              </span>
                            )}
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${getAvailabilityColor(
                              selectedProduct.availability
                            )}`}
                          >
                            {getAvailabilityText(selectedProduct.availability)}
                          </span>
                        </div>

                        <div className="flex space-x-4">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                            <ShoppingCart className="w-5 h-5" />
                            <span>Ajouter au panier</span>
                          </button>
                          <button className="px-4 py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                            <Heart className="w-5 h-5" />
                          </button>
                          <button className="px-4 py-3 border border-gray-300 hover:border-gray-400 rounded-lg transition-colors">
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default InteractiveCatalog;
