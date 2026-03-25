import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  type Category = {
    #mens;
    #womens;
  };

  module Category {
    public func toText(category : Category) : Text {
      switch (category) {
        case (#mens) { "MENS" };
        case (#womens) { "WOMENS" };
      };
    };
  };

  public type Product = {
    id : Text;
    name : Text;
    price : Nat;
    category : Category;
    description : Text;
    imageKey : Text;
    sizes : [Text];
    colors : [Text];
    isNewArrival : Bool;
    isFeatured : Bool;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.id, product2.id);
    };

    public func compareByName(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.name, product2.name);
    };

    public func compareByPrice(product1 : Product, product2 : Product) : Order.Order {
      if (product1.price == product2.price) {
        Text.compare(product1.name, product2.name);
      } else if (product1.price < product2.price) {
        #less;
      } else { #greater };
    };
  };

  public type UserProfile = {
    name : Text;
  };

  // Mixins
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Product storage
  let products = Map.empty<Text, Product>();

  // User profile storage
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Populate with sample products
  let sampleProducts = [
    (
      "sweatpantMen",
      "Men's Gym Joggers",
      4999,
      #mens,
      "Comfortable gym joggers for men.",
      "mens-gym-joggers",
      ["S", "M", "L", "XL"],
      ["Black", "Grey"],
      true,
      false,
    ),
    (
      "yogaLeggingsWomen",
      "Women's Yoga Leggings",
      3999,
      #womens,
      "Stretchy yoga leggings for women.",
      "womens-yoga-leggings",
      ["XS", "S", "M", "L"],
      ["Black", "Grey"],
      true,
      true,
    ),
    (
      "workoutShortsMen",
      "Men's Workout Shorts",
      2999,
      #mens,
      "Breathable workout shorts for men.",
      "mens-workout-shorts",
      ["S", "M", "L", "XL"],
      ["Black", "Blue"],
      false,
      true,
    ),
    (
      "sportsBraWomen",
      "Women's Sports Bra",
      2499,
      #womens,
      "Supportive sports bra for women.",
      "womens-sports-bra",
      ["XS", "S", "M"],
      ["Black", "White", "Pink"],
      false,
      false,
    ),
    (
      "gymTShirtMen",
      "Men's Gym T-Shirt",
      3499,
      #mens,
      "Moisture-wicking t-shirt for men.",
      "mens-gym-tshirt",
      ["S", "M", "L", "XL"],
      ["Grey", "Blue"],
      true,
      true,
    ),
    (
      "tankTopWomen",
      "Women's Tank Top",
      2999,
      #womens,
      "Lightweight tank top for women.",
      "womens-tank-top",
      ["XS", "S", "M", "L"],
      ["White", "Pink", "Blue"],
      true,
      false,
    ),
  ];

  for (product in sampleProducts.values()) {
    products.add(product.0, {
      id = product.0;
      name = product.1;
      price = product.2;
      category = product.3;
      description = product.4;
      imageKey = product.5;
      sizes = product.6;
      colors = product.7;
      isNewArrival = product.8;
      isFeatured = product.9;
    });
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product query functions (public - no authorization needed)
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByCategory(category : Category) : async [Product] {
    products.values().toArray().filter(func(product) { product.category == category }).sort();
  };

  public query ({ caller }) func getNewArrivals() : async [Product] {
    products.values().toArray().filter(func(product) { product.isNewArrival }).sort();
  };

  public query ({ caller }) func getFeaturedProducts() : async [Product] {
    products.values().toArray().filter(func(product) { product.isFeatured }).sort();
  };

  // Product management functions (admin-only)
  public shared ({ caller }) func addProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    if (products.containsKey(product.id)) { Runtime.trap("Product already exists") };
    products.add(product.id, product);
  };

  public shared ({ caller }) func updateProduct(product : Product) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    switch (products.get(product.id)) {
      case (null) { Runtime.trap("Product does not exist") };
      case (?existingProduct) {
        products.add(product.id, product);
      };
    };
  };

  public shared ({ caller }) func deleteProduct(productId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    if (not products.containsKey(productId)) { Runtime.trap("Product does not exist") };
    products.remove(productId);
  };
};
