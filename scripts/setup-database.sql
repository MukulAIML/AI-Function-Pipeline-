-- AI Function Pipeline Database Setup
-- This script creates the necessary tables for storing pipeline execution history

-- Create database schema
CREATE SCHEMA IF NOT EXISTS ai_pipeline;

-- Pipeline executions table
CREATE TABLE IF NOT EXISTS ai_pipeline.pipeline_executions (
    id SERIAL PRIMARY KEY,
    query TEXT NOT NULL,
    reasoning TEXT,
    function_count INTEGER,
    execution_status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    error_message TEXT
);

-- Function calls table
CREATE TABLE IF NOT EXISTS ai_pipeline.function_calls (
    id SERIAL PRIMARY KEY,
    execution_id INTEGER REFERENCES ai_pipeline.pipeline_executions(id),
    function_name VARCHAR(255) NOT NULL,
    function_category VARCHAR(100),
    step_order INTEGER,
    inputs JSONB,
    outputs JSONB,
    execution_time_ms INTEGER,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Function library table (for storing available functions)
CREATE TABLE IF NOT EXISTS ai_pipeline.function_library (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    category VARCHAR(100),
    inputs JSONB,
    outputs JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_pipeline_executions_created_at 
ON ai_pipeline.pipeline_executions(created_at);

CREATE INDEX IF NOT EXISTS idx_function_calls_execution_id 
ON ai_pipeline.function_calls(execution_id);

CREATE INDEX IF NOT EXISTS idx_function_calls_function_name 
ON ai_pipeline.function_calls(function_name);

CREATE INDEX IF NOT EXISTS idx_function_library_category 
ON ai_pipeline.function_library(category);

-- Insert sample data for testing
INSERT INTO ai_pipeline.function_library (name, description, category, inputs, outputs) VALUES
('retrieve_invoices', 'Retrieve invoices from database based on date range or filters', 'Data', 
 '{"start_date": "YYYY-MM-DD", "end_date": "YYYY-MM-DD", "status": "paid|pending|overdue"}',
 '["invoice_list", "total_count"]'),
('send_email', 'Send email to specified recipients with content', 'Communication',
 '{"recipients": "email_list", "subject": "string", "body": "string"}',
 '["send_status", "delivery_confirmation"]'),
('generate_report', 'Generate reports in various formats', 'File',
 '{"data_source": "string", "report_type": "sales|financial", "format": "pdf|excel"}',
 '["report_file", "file_path"]');

-- Create a view for pipeline analytics
CREATE OR REPLACE VIEW ai_pipeline.pipeline_analytics AS
SELECT 
    DATE(pe.created_at) as execution_date,
    COUNT(*) as total_executions,
    AVG(pe.function_count) as avg_functions_per_query,
    COUNT(CASE WHEN pe.execution_status = 'completed' THEN 1 END) as successful_executions,
    COUNT(CASE WHEN pe.execution_status = 'error' THEN 1 END) as failed_executions
FROM ai_pipeline.pipeline_executions pe
GROUP BY DATE(pe.created_at)
ORDER BY execution_date DESC;
