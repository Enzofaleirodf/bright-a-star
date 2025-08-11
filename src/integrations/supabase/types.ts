export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      leiloeiros: {
        Row: {
          _id: number
          name: string | null
          state: string | null
          website: string | null
          website_image: string | null
        }
        Insert: {
          _id: number
          name?: string | null
          state?: string | null
          website?: string | null
          website_image?: string | null
        }
        Update: {
          _id?: number
          name?: string | null
          state?: string | null
          website?: string | null
          website_image?: string | null
        }
        Relationships: []
      }
      lots_property: {
        Row: {
          _id: string
          appraised_value: number | null
          city: string | null
          discount_percentage_calculated: number | null
          docs: string[] | null
          end_date: string | null
          format: string | null
          href: string | null
          image: string | null
          initial_bid_value: number | null
          modality: string | null
          origin: string | null
          property_address: string | null
          property_address_raw: string | null
          property_category: string | null
          property_type: string | null
          property_type_std1: string | null
          stage: string | null
          start_date: string | null
          state: string | null
          title: string | null
          updated: string | null
          useful_area: string | null
          useful_area_m2: number | null
          website: string | null
          website_image: string | null
        }
        Insert: {
          _id: string
          appraised_value?: number | null
          city?: string | null
          discount_percentage_calculated?: number | null
          docs?: string[] | null
          end_date?: string | null
          format?: string | null
          href?: string | null
          image?: string | null
          initial_bid_value?: number | null
          modality?: string | null
          origin?: string | null
          property_address?: string | null
          property_address_raw?: string | null
          property_category?: string | null
          property_type?: string | null
          property_type_std1?: string | null
          stage?: string | null
          start_date?: string | null
          state?: string | null
          title?: string | null
          updated?: string | null
          useful_area?: string | null
          useful_area_m2?: number | null
          website?: string | null
          website_image?: string | null
        }
        Update: {
          _id?: string
          appraised_value?: number | null
          city?: string | null
          discount_percentage_calculated?: number | null
          docs?: string[] | null
          end_date?: string | null
          format?: string | null
          href?: string | null
          image?: string | null
          initial_bid_value?: number | null
          modality?: string | null
          origin?: string | null
          property_address?: string | null
          property_address_raw?: string | null
          property_category?: string | null
          property_type?: string | null
          property_type_std1?: string | null
          stage?: string | null
          start_date?: string | null
          state?: string | null
          title?: string | null
          updated?: string | null
          useful_area?: string | null
          useful_area_m2?: number | null
          website?: string | null
          website_image?: string | null
        }
        Relationships: []
      }
      lots_vehicle: {
        Row: {
          _id: string
          appraised_value: number | null
          brand: string | null
          city: string | null
          color: string | null
          discount_percentage_calculated: number | null
          docs: string[] | null
          end_date: string | null
          format: string | null
          href: string | null
          image: string | null
          initial_bid_value: number | null
          mileage: string | null
          modality: string | null
          model: string | null
          origin: string | null
          stage: string | null
          start_date: string | null
          state: string | null
          title: string | null
          updated: string | null
          vehicle_category: string | null
          vehicle_type: string | null
          vehicle_type_std: string | null
          website: string | null
          website_image: string | null
          year: string | null
        }
        Insert: {
          _id: string
          appraised_value?: number | null
          brand?: string | null
          city?: string | null
          color?: string | null
          discount_percentage_calculated?: number | null
          docs?: string[] | null
          end_date?: string | null
          format?: string | null
          href?: string | null
          image?: string | null
          initial_bid_value?: number | null
          mileage?: string | null
          modality?: string | null
          model?: string | null
          origin?: string | null
          stage?: string | null
          start_date?: string | null
          state?: string | null
          title?: string | null
          updated?: string | null
          vehicle_category?: string | null
          vehicle_type?: string | null
          vehicle_type_std?: string | null
          website?: string | null
          website_image?: string | null
          year?: string | null
        }
        Update: {
          _id?: string
          appraised_value?: number | null
          brand?: string | null
          city?: string | null
          color?: string | null
          discount_percentage_calculated?: number | null
          docs?: string[] | null
          end_date?: string | null
          format?: string | null
          href?: string | null
          image?: string | null
          initial_bid_value?: number | null
          mileage?: string | null
          modality?: string | null
          model?: string | null
          origin?: string | null
          stage?: string | null
          start_date?: string | null
          state?: string | null
          title?: string | null
          updated?: string | null
          vehicle_category?: string | null
          vehicle_type?: string | null
          vehicle_type_std?: string | null
          website?: string | null
          website_image?: string | null
          year?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      debug_auction_dates: {
        Args: Record<PropertyKey, never>
        Returns: {
          total_vehicles: number
          future_vehicles: number
          latest_end_date: string
          sample_brands: string[]
        }[]
      }
      get_area_range_filtered: {
        Args: {
          location_filter?: string
          category_filter?: string
          type_filter?: string
        }
        Returns: {
          min_area_value: number
          max_area_value: number
        }[]
      }
      get_area_range_property: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_area_value: number
          max_area_value: number
        }[]
      }
      get_distinct_brands: {
        Args: Record<PropertyKey, never>
        Returns: {
          brand: string
        }[]
      }
      get_distinct_categories: {
        Args: { table_name: string; field_name: string }
        Returns: {
          category: string
        }[]
      }
      get_distinct_categories_by_location: {
        Args: {
          table_name: string
          field_name: string
          location_value?: string
        }
        Returns: {
          category: string
        }[]
      }
      get_distinct_cities_property: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
        }[]
      }
      get_distinct_cities_vehicle: {
        Args: Record<PropertyKey, never>
        Returns: {
          city: string
        }[]
      }
      get_distinct_colors: {
        Args: Record<PropertyKey, never>
        Returns: {
          color: string
        }[]
      }
      get_distinct_data_filtered: {
        Args: {
          table_name: string
          field_name: string
          location_filter?: string
          category_filter?: string
          type_filter?: string
        }
        Returns: {
          value: string
        }[]
      }
      get_distinct_models: {
        Args: Record<PropertyKey, never>
        Returns: {
          model: string
        }[]
      }
      get_distinct_models_by_brand: {
        Args: { brand_name: string }
        Returns: {
          model: string
        }[]
      }
      get_distinct_property_categories: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
        }[]
      }
      get_distinct_property_types: {
        Args: Record<PropertyKey, never>
        Returns: {
          type: string
        }[]
      }
      get_distinct_states_property: {
        Args: Record<PropertyKey, never>
        Returns: {
          state: string
        }[]
      }
      get_distinct_states_vehicle: {
        Args: Record<PropertyKey, never>
        Returns: {
          state: string
        }[]
      }
      get_distinct_types: {
        Args: {
          table_name: string
          type_field: string
          category_field: string
          category_value?: string
        }
        Returns: {
          type_value: string
        }[]
      }
      get_distinct_vehicle_categories: {
        Args: Record<PropertyKey, never>
        Returns: {
          category: string
        }[]
      }
      get_distinct_vehicle_types: {
        Args: Record<PropertyKey, never>
        Returns: {
          type: string
        }[]
      }
      get_value_range_filtered: {
        Args: {
          table_name: string
          location_filter?: string
          category_filter?: string
          type_filter?: string
        }
        Returns: {
          min_bid_value: number
          max_bid_value: number
          min_appraised_value: number
          max_appraised_value: number
        }[]
      }
      get_value_range_property: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_bid_value: number
          max_bid_value: number
          min_appraised_value: number
          max_appraised_value: number
        }[]
      }
      get_value_range_vehicle: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_bid_value: number
          max_bid_value: number
          min_appraised_value: number
          max_appraised_value: number
        }[]
      }
      get_year_range_filtered: {
        Args: {
          location_filter?: string
          category_filter?: string
          type_filter?: string
        }
        Returns: {
          min_year: number
          max_year: number
        }[]
      }
      get_year_range_vehicle: {
        Args: Record<PropertyKey, never>
        Returns: {
          min_year: number
          max_year: number
        }[]
      }
      unaccent: {
        Args: { "": string }
        Returns: string
      }
      unaccent_init: {
        Args: { "": unknown }
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
