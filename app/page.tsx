"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Play,
  Code,
  Database,
  Mail,
  FileText,
  Calculator,
  Calendar,
  Users,
  Settings,
  Search,
  Sparkles,
  Zap,
  Brain,
  ArrowRight,
  CheckCircle,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface FunctionCall {
  name: string
  description: string
  inputs: Record<string, any>
  outputs: string[]
  category: string
}

interface PipelineResult {
  query: string
  reasoning: string
  functionSequence: FunctionCall[]
  executionFlow: string
}

export default function AIFunctionPipeline() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<PipelineResult | null>(null)
  const [loading, setLoading] = useState(false)

  const exampleQueries = [
    "Retrieve all invoices for March, summarize the total amount, and send the summary to my email",
    "Find all customers who haven't made a purchase in the last 6 months and send them a promotional email",
    "Generate a monthly sales report, convert it to PDF, and upload it to cloud storage",
    "Calculate the average order value for each product category and create a visualization",
    "Search for duplicate customer records, merge them, and update the database",
  ]

  const processPipeline = async () => {
    if (!query.trim()) {
      toast({
        title: "Error",
        description: "Please enter a query to process",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      let response = await fetch("/api/pipeline", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      })

      if (!response.ok) {
        console.log("Main pipeline failed, trying AI-assisted version...")
        response = await fetch("/api/pipeline-ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        })
      }

      if (!response.ok) {
        throw new Error("Failed to process pipeline")
      }

      const data = await response.json()
      setResult(data)
      toast({
        title: "Success",
        description: "Pipeline processed successfully",
      })
    } catch (error) {
      console.error("Pipeline error:", error)
      toast({
        title: "Error",
        description: "Failed to process pipeline. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "data":
        return <Database className="h-4 w-4" />
      case "communication":
        return <Mail className="h-4 w-4" />
      case "file":
        return <FileText className="h-4 w-4" />
      case "calculation":
        return <Calculator className="h-4 w-4" />
      case "scheduling":
        return <Calendar className="h-4 w-4" />
      case "user":
        return <Users className="h-4 w-4" />
      case "system":
        return <Settings className="h-4 w-4" />
      case "search":
        return <Search className="h-4 w-4" />
      default:
        return <Code className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "data":
        return "from-blue-500 to-blue-600"
      case "communication":
        return "from-green-500 to-green-600"
      case "file":
        return "from-purple-500 to-purple-600"
      case "calculation":
        return "from-orange-500 to-orange-600"
      case "scheduling":
        return "from-pink-500 to-pink-600"
      case "user":
        return "from-indigo-500 to-indigo-600"
      case "system":
        return "from-gray-500 to-gray-600"
      case "search":
        return "from-yellow-500 to-yellow-600"
      default:
        return "from-slate-500 to-slate-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <Brain className="h-12 w-12 text-blue-600" />
              <motion.div
                className="absolute -top-1 -right-1"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sparkles className="h-6 w-6 text-yellow-500" />
              </motion.div>
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            AI Function Pipeline
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Transform natural language queries into structured function call sequences with the power of AI
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-6 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>50+ Functions</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ArrowRight className="h-4 w-4 text-blue-500" />
              <span>Real-time Processing</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <motion.div
                  className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="h-6 w-6 text-white" />
                </motion.div>
                Query Input
              </CardTitle>
              <CardDescription className="text-lg">
                Enter your natural language query to generate a function call sequence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Textarea
                  placeholder="Enter your query here... (e.g., 'Retrieve all invoices for March, summarize the total amount, and send the summary to my email')"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  rows={4}
                  className="resize-none text-lg border-2 border-gray-200 focus:border-blue-500 transition-all duration-300"
                />
              </motion.div>

              <div className="space-y-3">
                <span className="text-sm font-medium text-gray-700">Example queries:</span>
                <div className="grid gap-2">
                  {exampleQueries.map((example, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuery(example)}
                        className="text-left h-auto p-3 justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      >
                        <span className="text-xs text-gray-600 line-clamp-2">{example}</span>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={processPipeline}
                  disabled={loading || !query.trim()}
                  className="w-full h-14 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Processing Pipeline...
                    </>
                  ) : (
                    <>
                      <Play className="mr-3 h-5 w-5" />
                      Process Pipeline
                    </>
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Reasoning */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        className="p-2 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Brain className="h-5 w-5 text-white" />
                      </motion.div>
                      AI Reasoning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.p
                      className="text-gray-700 leading-relaxed text-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {result.reasoning}
                    </motion.p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Function Sequence */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Code className="h-5 w-5 text-white" />
                      </motion.div>
                      Function Call Sequence
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {result.functionSequence.length} functions identified for execution
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {result.functionSequence.map((func, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="relative"
                        >
                          <div className="border-2 border-gray-100 rounded-xl p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg hover:shadow-xl transition-all duration-300">
                            {/* Step connector line */}
                            {index < result.functionSequence.length - 1 && (
                              <motion.div
                                className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-gray-300 to-transparent"
                                initial={{ scaleY: 0 }}
                                animate={{ scaleY: 1 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                              />
                            )}

                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-4">
                                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                                  <Badge variant="outline" className="text-sm font-semibold px-3 py-1">
                                    Step {index + 1}
                                  </Badge>
                                </motion.div>

                                <div className="flex items-center gap-3">
                                  <motion.div
                                    className={`p-2 bg-gradient-to-br ${getCategoryColor(func.category)} rounded-lg shadow-md`}
                                    whileHover={{ rotate: 5, scale: 1.1 }}
                                  >
                                    {getCategoryIcon(func.category)}
                                  </motion.div>
                                  <div>
                                    <span className="font-bold text-lg text-gray-800">{func.name}</span>
                                    <Badge variant="secondary" className="ml-2 text-xs">
                                      {func.category}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <p className="text-gray-600 mb-4 text-base leading-relaxed">{func.description}</p>

                            <div className="grid md:grid-cols-2 gap-6">
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                              >
                                <h4 className="font-semibold text-sm mb-3 text-gray-700">Inputs:</h4>
                                <div className="bg-gray-50 rounded-lg p-4 border">
                                  <pre className="text-xs text-gray-700 overflow-x-auto">
                                    {JSON.stringify(func.inputs, null, 2)}
                                  </pre>
                                </div>
                              </motion.div>

                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                              >
                                <h4 className="font-semibold text-sm mb-3 text-gray-700">Expected Outputs:</h4>
                                <div className="flex flex-wrap gap-2">
                                  {func.outputs.map((output, idx) => (
                                    <motion.div
                                      key={idx}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 1 + index * 0.1 + idx * 0.05 }}
                                    >
                                      <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200">
                                        {output}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Execution Flow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="backdrop-blur-sm bg-white/80 border-0 shadow-xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <motion.div
                        className="p-2 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                      >
                        <ArrowRight className="h-5 w-5 text-white" />
                      </motion.div>
                      Execution Flow
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <motion.div
                      className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border-2 border-gray-100"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <pre className="text-sm whitespace-pre-wrap text-gray-700 leading-relaxed">
                        {result.executionFlow}
                      </pre>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
