export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      clients: {
        Row: {
          address: string | null
          client_type: string
          commissioner_details: Json | null
          company_address: string | null
          company_founding_date: string | null
          company_name: string | null
          company_nib: string | null
          company_npwp: string | null
          company_phone: string | null
          company_registration_number: string | null
          company_sk_kemenkumham: string | null
          corporate_documents_url: string[] | null
          created_at: string
          created_by: string
          director_ktp: string | null
          director_npwp: string | null
          email: string | null
          full_name: string
          id: string
          kk_url: string | null
          ktp_url: string | null
          marriage_certificate_url: string | null
          nik: string | null
          npwp: string | null
          npwp_url: string | null
          phone: string | null
          rups_approval_details: Json | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          client_type: string
          commissioner_details?: Json | null
          company_address?: string | null
          company_founding_date?: string | null
          company_name?: string | null
          company_nib?: string | null
          company_npwp?: string | null
          company_phone?: string | null
          company_registration_number?: string | null
          company_sk_kemenkumham?: string | null
          corporate_documents_url?: string[] | null
          created_at?: string
          created_by: string
          director_ktp?: string | null
          director_npwp?: string | null
          email?: string | null
          full_name: string
          id?: string
          kk_url?: string | null
          ktp_url?: string | null
          marriage_certificate_url?: string | null
          nik?: string | null
          npwp?: string | null
          npwp_url?: string | null
          phone?: string | null
          rups_approval_details?: Json | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          client_type?: string
          commissioner_details?: Json | null
          company_address?: string | null
          company_founding_date?: string | null
          company_name?: string | null
          company_nib?: string | null
          company_npwp?: string | null
          company_phone?: string | null
          company_registration_number?: string | null
          company_sk_kemenkumham?: string | null
          corporate_documents_url?: string[] | null
          created_at?: string
          created_by?: string
          director_ktp?: string | null
          director_npwp?: string | null
          email?: string | null
          full_name?: string
          id?: string
          kk_url?: string | null
          ktp_url?: string | null
          marriage_certificate_url?: string | null
          nik?: string | null
          npwp?: string | null
          npwp_url?: string | null
          phone?: string | null
          rups_approval_details?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      deed_drafts: {
        Row: {
          approved_by: string | null
          created_at: string
          created_by: string
          deed_number: string | null
          draft_content: string | null
          id: string
          reviewed_by: string | null
          service_id: string
          signature_scheduled_at: string | null
          signed_at: string | null
          status: string
          updated_at: string
          version: number
        }
        Insert: {
          approved_by?: string | null
          created_at?: string
          created_by: string
          deed_number?: string | null
          draft_content?: string | null
          id?: string
          reviewed_by?: string | null
          service_id: string
          signature_scheduled_at?: string | null
          signed_at?: string | null
          status?: string
          updated_at?: string
          version?: number
        }
        Update: {
          approved_by?: string | null
          created_at?: string
          created_by?: string
          deed_number?: string | null
          draft_content?: string | null
          id?: string
          reviewed_by?: string | null
          service_id?: string
          signature_scheduled_at?: string | null
          signed_at?: string | null
          status?: string
          updated_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "deed_drafts_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      document_categories: {
        Row: {
          category_type: string
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          parent_id: string | null
          sort_order: number | null
        }
        Insert: {
          category_type: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Update: {
          category_type?: string
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          parent_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "document_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "document_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      document_templates: {
        Row: {
          applicable_for: Json | null
          created_at: string
          description: string | null
          document_category_id: string | null
          document_name: string
          id: string
          is_required: boolean
          service_type_id: string | null
          sort_order: number | null
        }
        Insert: {
          applicable_for?: Json | null
          created_at?: string
          description?: string | null
          document_category_id?: string | null
          document_name: string
          id?: string
          is_required?: boolean
          service_type_id?: string | null
          sort_order?: number | null
        }
        Update: {
          applicable_for?: Json | null
          created_at?: string
          description?: string | null
          document_category_id?: string | null
          document_name?: string
          id?: string
          is_required?: boolean
          service_type_id?: string | null
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "document_templates_document_category_id_fkey"
            columns: ["document_category_id"]
            isOneToOne: false
            referencedRelation: "document_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_templates_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      legality_verifications: {
        Row: {
          created_at: string
          details: string | null
          id: string
          service_id: string
          status: string
          verification_type: string
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          details?: string | null
          id?: string
          service_id: string
          status?: string
          verification_type: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          details?: string | null
          id?: string
          service_id?: string
          status?: string
          verification_type?: string
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "legality_verifications_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          employee_id: string | null
          full_name: string
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          employee_id?: string | null
          full_name: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          employee_id?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          type?: string
        }
        Relationships: []
      }
      service_documents: {
        Row: {
          created_at: string
          document_name: string
          document_type: string
          file_url: string | null
          id: string
          notes: string | null
          service_id: string
          uploaded_at: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          document_type: string
          file_url?: string | null
          id?: string
          notes?: string | null
          service_id: string
          uploaded_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          document_type?: string
          file_url?: string | null
          id?: string
          notes?: string | null
          service_id?: string
          uploaded_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "service_documents_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_timeline: {
        Row: {
          action_type: string
          created_at: string
          description: string
          id: string
          metadata: Json | null
          performed_by: string
          service_id: string
        }
        Insert: {
          action_type: string
          created_at?: string
          description: string
          id?: string
          metadata?: Json | null
          performed_by: string
          service_id: string
        }
        Update: {
          action_type?: string
          created_at?: string
          description?: string
          id?: string
          metadata?: Json | null
          performed_by?: string
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_timeline_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      service_types: {
        Row: {
          category: string
          created_at: string
          description: string | null
          document_template: Json | null
          id: string
          is_active: boolean
          name: string
          required_fields: Json | null
          updated_at: string
          workflow_steps: Json | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          document_template?: Json | null
          id?: string
          is_active?: boolean
          name: string
          required_fields?: Json | null
          updated_at?: string
          workflow_steps?: Json | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          document_template?: Json | null
          id?: string
          is_active?: boolean
          name?: string
          required_fields?: Json | null
          updated_at?: string
          workflow_steps?: Json | null
        }
        Relationships: []
      }
      services: {
        Row: {
          actual_completion_date: string | null
          assigned_to: string | null
          category_id: string
          client_id: string
          completed_at: string | null
          created_at: string
          created_by: string
          description: string | null
          document_checklist_complete: boolean | null
          estimated_completion_date: string | null
          fee_amount: number | null
          fee_status: string | null
          id: string
          legality_verified: boolean | null
          missing_documents: string[] | null
          notes: string | null
          priority: string | null
          received_documents: string[] | null
          reference_number: string
          required_documents: string[] | null
          service_type_id: string | null
          started_at: string | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          actual_completion_date?: string | null
          assigned_to?: string | null
          category_id: string
          client_id: string
          completed_at?: string | null
          created_at?: string
          created_by: string
          description?: string | null
          document_checklist_complete?: boolean | null
          estimated_completion_date?: string | null
          fee_amount?: number | null
          fee_status?: string | null
          id?: string
          legality_verified?: boolean | null
          missing_documents?: string[] | null
          notes?: string | null
          priority?: string | null
          received_documents?: string[] | null
          reference_number: string
          required_documents?: string[] | null
          service_type_id?: string | null
          started_at?: string | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          actual_completion_date?: string | null
          assigned_to?: string | null
          category_id?: string
          client_id?: string
          completed_at?: string | null
          created_at?: string
          created_by?: string
          description?: string | null
          document_checklist_complete?: boolean | null
          estimated_completion_date?: string | null
          fee_amount?: number | null
          fee_status?: string | null
          id?: string
          legality_verified?: boolean | null
          missing_documents?: string[] | null
          notes?: string | null
          priority?: string | null
          received_documents?: string[] | null
          reference_number?: string
          required_documents?: string[] | null
          service_type_id?: string | null
          started_at?: string | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "service_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_service_type_id_fkey"
            columns: ["service_type_id"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_roles: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "super_admin" | "administrator" | "staf_ppat" | "staf_notaris"
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
    Enums: {
      app_role: ["super_admin", "administrator", "staf_ppat", "staf_notaris"],
    },
  },
} as const
