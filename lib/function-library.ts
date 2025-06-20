export interface FunctionDefinition {
  name: string
  description: string
  category: string
  inputs: Record<string, string>
  outputs: string[]
}

export const functionLibrary: FunctionDefinition[] = [
  // Data Management Functions
  {
    name: "retrieve_invoices",
    description: "Retrieve invoices from database based on date range or filters",
    category: "Data",
    inputs: {
      start_date: "YYYY-MM-DD",
      end_date: "YYYY-MM-DD",
      status: "paid|pending|overdue",
      customer_id: "string",
    },
    outputs: ["invoice_list", "total_count"],
  },
  {
    name: "retrieve_customers",
    description: "Get customer information from database",
    category: "Data",
    inputs: {
      customer_id: "string",
      email: "string",
      status: "active|inactive",
      last_purchase_before: "YYYY-MM-DD",
    },
    outputs: ["customer_data", "customer_count"],
  },
  {
    name: "retrieve_products",
    description: "Fetch product information and inventory data",
    category: "Data",
    inputs: {
      product_id: "string",
      category: "string",
      in_stock: "boolean",
      price_range: "min-max",
    },
    outputs: ["product_list", "inventory_status"],
  },
  {
    name: "retrieve_orders",
    description: "Get order information from database",
    category: "Data",
    inputs: {
      order_id: "string",
      customer_id: "string",
      date_range: "start_date,end_date",
      status: "pending|shipped|delivered|cancelled",
    },
    outputs: ["order_data", "order_summary"],
  },
  {
    name: "update_database",
    description: "Update records in database with new information",
    category: "Data",
    inputs: {
      table: "string",
      record_id: "string",
      update_data: "object",
      conditions: "object",
    },
    outputs: ["update_status", "affected_rows"],
  },

  // Communication Functions
  {
    name: "send_email",
    description: "Send email to specified recipients with content",
    category: "Communication",
    inputs: {
      recipients: "email_list",
      subject: "string",
      body: "string",
      attachments: "file_list",
      template: "string",
    },
    outputs: ["send_status", "delivery_confirmation"],
  },
  {
    name: "send_sms",
    description: "Send SMS messages to phone numbers",
    category: "Communication",
    inputs: {
      phone_numbers: "phone_list",
      message: "string",
      sender_id: "string",
    },
    outputs: ["send_status", "message_id"],
  },
  {
    name: "create_notification",
    description: "Create system notifications for users",
    category: "Communication",
    inputs: {
      user_ids: "user_list",
      title: "string",
      message: "string",
      priority: "low|medium|high",
      type: "info|warning|error|success",
    },
    outputs: ["notification_id", "delivery_status"],
  },
  {
    name: "schedule_reminder",
    description: "Schedule automated reminders for future dates",
    category: "Communication",
    inputs: {
      recipients: "contact_list",
      message: "string",
      schedule_date: "YYYY-MM-DD HH:MM",
      reminder_type: "email|sms|push",
    },
    outputs: ["reminder_id", "schedule_confirmation"],
  },

  // File Operations
  {
    name: "generate_report",
    description: "Generate reports in various formats (PDF, Excel, CSV)",
    category: "File",
    inputs: {
      data_source: "string",
      report_type: "sales|financial|inventory|customer",
      format: "pdf|excel|csv|html",
      date_range: "start_date,end_date",
      filters: "object",
    },
    outputs: ["report_file", "file_path", "report_summary"],
  },
  {
    name: "convert_file_format",
    description: "Convert files between different formats",
    category: "File",
    inputs: {
      source_file: "file_path",
      target_format: "pdf|docx|xlsx|csv|json|xml",
      conversion_options: "object",
    },
    outputs: ["converted_file", "conversion_status"],
  },
  {
    name: "upload_to_cloud",
    description: "Upload files to cloud storage services",
    category: "File",
    inputs: {
      file_path: "string",
      destination: "aws|gcp|azure|dropbox",
      folder: "string",
      permissions: "public|private",
    },
    outputs: ["upload_url", "file_id", "upload_status"],
  },
  {
    name: "compress_files",
    description: "Compress files or folders into archives",
    category: "File",
    inputs: {
      file_paths: "file_list",
      compression_type: "zip|tar|gzip",
      compression_level: "1-9",
      password: "string",
    },
    outputs: ["archive_file", "compression_ratio"],
  },
  {
    name: "backup_data",
    description: "Create backups of data or files",
    category: "File",
    inputs: {
      source: "database|files|folder",
      destination: "local|cloud|remote",
      backup_type: "full|incremental|differential",
      encryption: "boolean",
    },
    outputs: ["backup_file", "backup_status", "backup_size"],
  },

  // Calculation Functions
  {
    name: "calculate_totals",
    description: "Calculate sums, averages, and other mathematical operations",
    category: "Calculation",
    inputs: {
      data_array: "number_list",
      operation: "sum|average|median|min|max|count",
      group_by: "string",
      filters: "object",
    },
    outputs: ["calculated_value", "calculation_details"],
  },
  {
    name: "financial_analysis",
    description: "Perform financial calculations and analysis",
    category: "Calculation",
    inputs: {
      financial_data: "object",
      analysis_type: "profit_loss|cash_flow|roi|growth_rate",
      period: "monthly|quarterly|yearly",
      comparison_period: "string",
    },
    outputs: ["analysis_result", "financial_metrics", "recommendations"],
  },
  {
    name: "statistical_analysis",
    description: "Perform statistical calculations on datasets",
    category: "Calculation",
    inputs: {
      dataset: "data_array",
      analysis_type: "descriptive|correlation|regression|trend",
      confidence_level: "number",
      variables: "string_list",
    },
    outputs: ["statistics", "analysis_report", "visualizations"],
  },
  {
    name: "tax_calculation",
    description: "Calculate taxes based on income and jurisdiction",
    category: "Calculation",
    inputs: {
      income: "number",
      jurisdiction: "string",
      tax_year: "YYYY",
      deductions: "object",
      filing_status: "single|married|head_of_household",
    },
    outputs: ["tax_amount", "effective_rate", "tax_breakdown"],
  },

  // Data Processing Functions
  {
    name: "summarize_data",
    description: "Create summaries of large datasets or text content",
    category: "Data",
    inputs: {
      data_source: "dataset|text|file",
      summary_type: "statistical|textual|visual",
      length: "brief|detailed|comprehensive",
      key_metrics: "string_list",
    },
    outputs: ["summary_text", "key_insights", "summary_data"],
  },
  {
    name: "filter_data",
    description: "Filter datasets based on specified criteria",
    category: "Data",
    inputs: {
      dataset: "data_array",
      filter_criteria: "object",
      sort_by: "string",
      sort_order: "asc|desc",
      limit: "number",
    },
    outputs: ["filtered_data", "filter_count", "excluded_count"],
  },
  {
    name: "merge_datasets",
    description: "Combine multiple datasets based on common fields",
    category: "Data",
    inputs: {
      primary_dataset: "data_array",
      secondary_datasets: "data_array_list",
      join_type: "inner|left|right|full",
      join_keys: "string_list",
    },
    outputs: ["merged_data", "merge_statistics", "data_quality_report"],
  },
  {
    name: "validate_data",
    description: "Validate data quality and identify issues",
    category: "Data",
    inputs: {
      dataset: "data_array",
      validation_rules: "object",
      error_handling: "strict|lenient|report_only",
      data_types: "object",
    },
    outputs: ["validation_report", "error_list", "clean_data"],
  },

  // Search Functions
  {
    name: "search_records",
    description: "Search for records using various criteria",
    category: "Search",
    inputs: {
      search_term: "string",
      search_fields: "string_list",
      data_source: "database|files|api",
      search_type: "exact|fuzzy|wildcard|regex",
    },
    outputs: ["search_results", "result_count", "relevance_scores"],
  },
  {
    name: "find_duplicates",
    description: "Identify duplicate records in datasets",
    category: "Search",
    inputs: {
      dataset: "data_array",
      comparison_fields: "string_list",
      similarity_threshold: "number",
      algorithm: "exact|fuzzy|phonetic",
    },
    outputs: ["duplicate_groups", "duplicate_count", "unique_records"],
  },
  {
    name: "pattern_detection",
    description: "Detect patterns and anomalies in data",
    category: "Search",
    inputs: {
      dataset: "data_array",
      pattern_type: "trend|seasonal|anomaly|correlation",
      sensitivity: "low|medium|high",
      time_window: "string",
    },
    outputs: ["detected_patterns", "pattern_strength", "anomaly_list"],
  },

  // User Management Functions
  {
    name: "create_user_account",
    description: "Create new user accounts with specified permissions",
    category: "User",
    inputs: {
      username: "string",
      email: "string",
      password: "string",
      role: "admin|user|guest",
      permissions: "string_list",
      profile_data: "object",
    },
    outputs: ["user_id", "account_status", "activation_link"],
  },
  {
    name: "update_user_profile",
    description: "Update user profile information and settings",
    category: "User",
    inputs: {
      user_id: "string",
      profile_updates: "object",
      notification_preferences: "object",
      privacy_settings: "object",
    },
    outputs: ["update_status", "updated_fields", "profile_data"],
  },
  {
    name: "manage_user_permissions",
    description: "Grant or revoke user permissions and roles",
    category: "User",
    inputs: {
      user_id: "string",
      action: "grant|revoke|update",
      permissions: "string_list",
      role: "string",
      effective_date: "YYYY-MM-DD",
    },
    outputs: ["permission_status", "current_permissions", "audit_log"],
  },
  {
    name: "authenticate_user",
    description: "Authenticate user credentials and manage sessions",
    category: "User",
    inputs: {
      username: "string",
      password: "string",
      authentication_method: "password|2fa|sso|biometric",
      session_duration: "number",
    },
    outputs: ["auth_token", "session_id", "user_profile", "auth_status"],
  },

  // Scheduling Functions
  {
    name: "schedule_task",
    description: "Schedule tasks for future execution",
    category: "Scheduling",
    inputs: {
      task_name: "string",
      execution_time: "YYYY-MM-DD HH:MM",
      task_type: "function_call|script|api_request",
      parameters: "object",
      recurrence: "once|daily|weekly|monthly",
    },
    outputs: ["task_id", "schedule_status", "next_execution"],
  },
  {
    name: "create_calendar_event",
    description: "Create calendar events and appointments",
    category: "Scheduling",
    inputs: {
      title: "string",
      start_time: "YYYY-MM-DD HH:MM",
      end_time: "YYYY-MM-DD HH:MM",
      attendees: "email_list",
      location: "string",
      description: "string",
    },
    outputs: ["event_id", "calendar_link", "invitation_status"],
  },
  {
    name: "manage_appointments",
    description: "Schedule, reschedule, or cancel appointments",
    category: "Scheduling",
    inputs: {
      action: "create|update|cancel|reschedule",
      appointment_id: "string",
      new_datetime: "YYYY-MM-DD HH:MM",
      participant_ids: "string_list",
      reason: "string",
    },
    outputs: ["appointment_status", "confirmation_sent", "updated_schedule"],
  },

  // System Functions
  {
    name: "monitor_system_health",
    description: "Monitor system performance and health metrics",
    category: "System",
    inputs: {
      metrics: "cpu|memory|disk|network|database",
      time_range: "string",
      alert_thresholds: "object",
      monitoring_interval: "number",
    },
    outputs: ["health_status", "performance_metrics", "alert_list"],
  },
  {
    name: "generate_logs",
    description: "Generate and manage system logs",
    category: "System",
    inputs: {
      log_level: "debug|info|warning|error|critical",
      component: "string",
      time_range: "start_time,end_time",
      filter_criteria: "object",
    },
    outputs: ["log_entries", "log_file", "log_summary"],
  },
  {
    name: "configure_settings",
    description: "Update system configuration settings",
    category: "System",
    inputs: {
      setting_category: "security|performance|ui|integration",
      setting_name: "string",
      setting_value: "string",
      apply_immediately: "boolean",
    },
    outputs: ["config_status", "previous_value", "restart_required"],
  },
  {
    name: "execute_maintenance",
    description: "Perform system maintenance tasks",
    category: "System",
    inputs: {
      maintenance_type: "cleanup|optimization|update|backup",
      target_components: "string_list",
      maintenance_window: "start_time,end_time",
      notify_users: "boolean",
    },
    outputs: ["maintenance_status", "completion_time", "maintenance_report"],
  },

  // Integration Functions
  {
    name: "api_request",
    description: "Make HTTP requests to external APIs",
    category: "Integration",
    inputs: {
      url: "string",
      method: "GET|POST|PUT|DELETE|PATCH",
      headers: "object",
      body: "object",
      authentication: "object",
    },
    outputs: ["response_data", "status_code", "response_headers"],
  },
  {
    name: "webhook_handler",
    description: "Handle incoming webhook requests",
    category: "Integration",
    inputs: {
      webhook_url: "string",
      payload: "object",
      signature: "string",
      event_type: "string",
    },
    outputs: ["processing_status", "response_data", "event_log"],
  },
  {
    name: "sync_data",
    description: "Synchronize data between different systems",
    category: "Integration",
    inputs: {
      source_system: "string",
      target_system: "string",
      sync_type: "full|incremental|bidirectional",
      data_mapping: "object",
      conflict_resolution: "source_wins|target_wins|manual",
    },
    outputs: ["sync_status", "records_synced", "conflict_report"],
  },

  // Analytics Functions
  {
    name: "generate_analytics",
    description: "Generate analytics and insights from data",
    category: "Analytics",
    inputs: {
      data_source: "string",
      metrics: "string_list",
      dimensions: "string_list",
      time_period: "string",
      comparison_period: "string",
    },
    outputs: ["analytics_report", "key_insights", "trend_analysis"],
  },
  {
    name: "create_dashboard",
    description: "Create interactive dashboards and visualizations",
    category: "Analytics",
    inputs: {
      data_sources: "string_list",
      chart_types: "bar|line|pie|scatter|heatmap",
      filters: "object",
      refresh_interval: "number",
      sharing_permissions: "object",
    },
    outputs: ["dashboard_url", "dashboard_id", "widget_list"],
  },
  {
    name: "predictive_analysis",
    description: "Perform predictive analysis using machine learning",
    category: "Analytics",
    inputs: {
      historical_data: "data_array",
      prediction_target: "string",
      model_type: "regression|classification|time_series",
      prediction_horizon: "string",
      confidence_level: "number",
    },
    outputs: ["predictions", "model_accuracy", "feature_importance"],
  },

  // Security Functions
  {
    name: "encrypt_data",
    description: "Encrypt sensitive data using various algorithms",
    category: "Security",
    inputs: {
      data: "string|file",
      encryption_algorithm: "AES|RSA|DES",
      key_size: "128|256|512",
      encryption_key: "string",
    },
    outputs: ["encrypted_data", "encryption_key", "algorithm_used"],
  },
  {
    name: "audit_security",
    description: "Perform security audits and vulnerability assessments",
    category: "Security",
    inputs: {
      audit_scope: "system|network|application|data",
      audit_type: "compliance|vulnerability|penetration",
      standards: "string_list",
      severity_threshold: "low|medium|high|critical",
    },
    outputs: ["audit_report", "vulnerability_list", "compliance_status"],
  },
  {
    name: "manage_access_control",
    description: "Manage access control and authorization policies",
    category: "Security",
    inputs: {
      resource: "string",
      user_group: "string",
      access_level: "read|write|admin|deny",
      policy_type: "role_based|attribute_based|rule_based",
      effective_period: "start_date,end_date",
    },
    outputs: ["policy_id", "access_status", "policy_conflicts"],
  },

  // Workflow Functions
  {
    name: "create_workflow",
    description: "Create automated workflows with multiple steps",
    category: "Workflow",
    inputs: {
      workflow_name: "string",
      trigger_conditions: "object",
      workflow_steps: "step_array",
      error_handling: "stop|continue|retry",
      notification_settings: "object",
    },
    outputs: ["workflow_id", "workflow_status", "execution_schedule"],
  },
  {
    name: "execute_workflow",
    description: "Execute predefined workflows with parameters",
    category: "Workflow",
    inputs: {
      workflow_id: "string",
      input_parameters: "object",
      execution_mode: "immediate|scheduled|triggered",
      priority: "low|normal|high|urgent",
    },
    outputs: ["execution_id", "execution_status", "step_results"],
  },
]
