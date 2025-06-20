import { type NextRequest, NextResponse } from "next/server"
import { functionLibrary } from "@/lib/function-library"

// Simple function to simulate AI processing with keyword matching
async function processQueryWithAI(query: string) {
  const queryLower = query.toLowerCase()
  const selectedFunctions = []

  // Enhanced keyword-based function selection
  const keywordMap = {
    // Data operations
    retrieve: ["retrieve_invoices", "retrieve_customers", "retrieve_products", "retrieve_orders"],
    get: ["retrieve_invoices", "retrieve_customers", "retrieve_products"],
    fetch: ["retrieve_invoices", "retrieve_customers", "retrieve_products"],
    find: ["search_records", "find_duplicates", "retrieve_customers"],
    search: ["search_records", "pattern_detection"],

    // Communication
    email: ["send_email"],
    send: ["send_email", "send_sms"],
    notify: ["create_notification", "schedule_reminder"],
    remind: ["schedule_reminder"],

    // File operations
    report: ["generate_report"],
    generate: ["generate_report", "generate_analytics"],
    convert: ["convert_file_format"],
    upload: ["upload_to_cloud"],
    backup: ["backup_data"],
    pdf: ["convert_file_format", "generate_report"],

    // Calculations
    calculate: ["calculate_totals", "financial_analysis"],
    sum: ["calculate_totals"],
    total: ["calculate_totals", "summarize_data"],
    average: ["calculate_totals", "statistical_analysis"],
    analyze: ["financial_analysis", "statistical_analysis", "generate_analytics"],

    // Data processing
    summarize: ["summarize_data"],
    summary: ["summarize_data"],
    filter: ["filter_data"],
    merge: ["merge_datasets"],
    validate: ["validate_data"],

    // User management
    user: ["create_user_account", "update_user_profile", "authenticate_user"],
    account: ["create_user_account", "manage_user_permissions"],
    permission: ["manage_user_permissions"],

    // Scheduling
    schedule: ["schedule_task", "create_calendar_event"],
    appointment: ["manage_appointments"],
    calendar: ["create_calendar_event"],

    // System
    monitor: ["monitor_system_health"],
    log: ["generate_logs"],
    maintain: ["execute_maintenance"],
    config: ["configure_settings"],

    // Security
    encrypt: ["encrypt_data"],
    audit: ["audit_security"],
    access: ["manage_access_control"],

    // Analytics
    dashboard: ["create_dashboard"],
    predict: ["predictive_analysis"],
    trend: ["pattern_detection", "predictive_analysis"],

    // Integration
    api: ["api_request"],
    webhook: ["webhook_handler"],
    sync: ["sync_data"],

    // Workflow
    workflow: ["create_workflow", "execute_workflow"],
    automate: ["create_workflow"],
  }

  // Find matching functions based on keywords
  const matchedFunctionNames = new Set()

  for (const [keyword, functions] of Object.entries(keywordMap)) {
    if (queryLower.includes(keyword)) {
      functions.forEach((func) => matchedFunctionNames.add(func))
    }
  }

  // Get function objects
  const matchedFunctions = Array.from(matchedFunctionNames)
    .map((name) => functionLibrary.find((f) => f.name === name))
    .filter((f) => f !== undefined)

  // If no matches, provide some default functions based on common patterns
  if (matchedFunctions.length === 0) {
    if (queryLower.includes("invoice")) {
      matchedFunctions.push(functionLibrary.find((f) => f.name === "retrieve_invoices"))
    }
    if (queryLower.includes("customer")) {
      matchedFunctions.push(functionLibrary.find((f) => f.name === "retrieve_customers"))
    }
    // Default fallback
    if (matchedFunctions.length === 0) {
      matchedFunctions.push(functionLibrary.find((f) => f.name === "search_records"))
    }
  }

  // Generate reasoning
  const reasoning = `Analyzed the query "${query}" and identified ${matchedFunctions.length} relevant functions based on keyword matching and context analysis. The system detected operations related to: ${Array.from(matchedFunctionNames).join(", ")}.`

  // Generate execution flow
  const executionFlow = matchedFunctions
    .map((func, index) => `Step ${index + 1}: Execute ${func.name} - ${func.description}`)
    .join("\n")

  return {
    reasoning,
    functionSequence: matchedFunctions,
    executionFlow,
  }
}

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Process the query using our enhanced keyword matching
    const result = await processQueryWithAI(query)

    return NextResponse.json({
      query,
      reasoning: result.reasoning,
      functionSequence: result.functionSequence,
      executionFlow: result.executionFlow,
    })
  } catch (error) {
    console.error("Pipeline processing error:", error)
    return NextResponse.json({ error: "Failed to process pipeline" }, { status: 500 })
  }
}
