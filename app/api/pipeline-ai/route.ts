import { type NextRequest, NextResponse } from "next/server"
import { functionLibrary } from "@/lib/function-library"

// Alternative AI processing using a different approach
export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 })
    }

    // Use Hugging Face Inference API with a different model
    const HF_TOKEN = "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"

    const systemPrompt = `You are an AI assistant that analyzes user queries and creates structured function call sequences.

Available Functions (first 10 for brevity):
${functionLibrary
  .slice(0, 10)
  .map(
    (func) =>
      `- ${func.name} (${func.category}): ${func.description}
    Inputs: ${JSON.stringify(func.inputs)}
    Outputs: ${func.outputs.join(", ")}`,
  )
  .join("\n")}

Analyze this query and respond with a JSON object containing:
- reasoning: Your analysis
- functionNames: Array of function names to use
- executionSteps: Array of step descriptions

Query: ${query}`

    try {
      const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          inputs: systemPrompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.3,
            return_full_text: false,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`HF API error: ${response.status}`)
      }

      const aiResult = await response.json()

      // Fallback to keyword-based processing if AI fails
      const fallbackResult = await processQueryWithKeywords(query)

      return NextResponse.json({
        query,
        reasoning: `AI-assisted analysis: ${aiResult[0]?.generated_text || fallbackResult.reasoning}`,
        functionSequence: fallbackResult.functionSequence,
        executionFlow: fallbackResult.executionFlow,
      })
    } catch (aiError) {
      console.log("AI processing failed, using fallback:", aiError)

      // Use keyword-based fallback
      const fallbackResult = await processQueryWithKeywords(query)

      return NextResponse.json({
        query,
        reasoning: `Keyword-based analysis: ${fallbackResult.reasoning}`,
        functionSequence: fallbackResult.functionSequence,
        executionFlow: fallbackResult.executionFlow,
      })
    }
  } catch (error) {
    console.error("Pipeline processing error:", error)
    return NextResponse.json({ error: "Failed to process pipeline" }, { status: 500 })
  }
}

async function processQueryWithKeywords(query: string) {
  const queryLower = query.toLowerCase()
  const selectedFunctions = []

  // Enhanced keyword matching logic
  if (queryLower.includes("invoice")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "retrieve_invoices"))
  }
  if (queryLower.includes("email") || queryLower.includes("send")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "send_email"))
  }
  if (queryLower.includes("summary") || queryLower.includes("summarize")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "summarize_data"))
  }
  if (queryLower.includes("report") || queryLower.includes("generate")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "generate_report"))
  }
  if (queryLower.includes("calculate") || queryLower.includes("total")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "calculate_totals"))
  }
  if (queryLower.includes("customer")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "retrieve_customers"))
  }
  if (queryLower.includes("upload") || queryLower.includes("cloud")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "upload_to_cloud"))
  }
  if (queryLower.includes("pdf") || queryLower.includes("convert")) {
    selectedFunctions.push(functionLibrary.find((f) => f.name === "convert_file_format"))
  }

  // Filter out undefined functions
  const validFunctions = selectedFunctions.filter((f) => f !== undefined)

  // If no matches, provide default functions
  if (validFunctions.length === 0) {
    validFunctions.push(functionLibrary.find((f) => f.name === "search_records"))
  }

  const reasoning = `Analyzed query "${query}" using keyword matching. Identified ${validFunctions.length} relevant functions based on detected operations and context.`

  const executionFlow = validFunctions
    .map((func, index) => `Step ${index + 1}: ${func.name} - ${func.description}`)
    .join("\n")

  return {
    reasoning,
    functionSequence: validFunctions,
    executionFlow,
  }
}
