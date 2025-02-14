import type {
  Restaurant,
  RestaurantLocation,
  BusinessHours,
  Tag,
  Theme,
} from "./schema";

export interface ApiRestaurant extends Restaurant {
  restaurant_locations?: RestaurantLocation[];
  business_hours?: BusinessHours[];
  restaurant_tags?: { tags: Tag }[];
  restaurant_themes?: { themes: Theme }[];
}

export interface ApiRestaurantWithDistance extends ApiRestaurant {
  distance: number;
}

export interface ApiTheme extends Theme {
  image_url?: string;
  slug: string;
}
