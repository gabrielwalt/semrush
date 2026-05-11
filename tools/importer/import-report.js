/**
 * Excel Report Generator
 * 
 * Compiles JSON report files into an Excel workbook with formatting and auto-sizing.
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import ExcelJS from 'exceljs';

/**
 * Flatten nested objects into dot-notation keys
 * Example: { a: { b: 1 } } => { 'a.b': 1 }
 * 
 * @param {Object} obj - The object to flatten
 * @param {string} prefix - The key prefix for recursion
 * @returns {Object} - Flattened object
 */
function flattenObject(obj, prefix = '') {
    const flattened = {};

    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key;

        if (value === null || value === undefined) {
            flattened[newKey] = value;
        } else if (Array.isArray(value)) {
            // Keep arrays as-is (will be stringified in Excel)
            flattened[newKey] = value;
        } else if (typeof value === 'object' && !(value instanceof Date)) {
            // Recursively flatten nested objects
            Object.assign(flattened, flattenObject(value, newKey));
        } else {
            flattened[newKey] = value;
        }
    }

    return flattened;
}

/**
 * Compile all report JSON files into an Excel workbook
 * 
 * @param {string} importScriptPath - Path to the import script to derive the Excel filename
 * @returns {Promise<void>}
 */
export async function compileReportsToExcel(importScriptPath) {
    const reportsDir = join(process.cwd(), 'tools', 'importer', 'reports');

    if (!existsSync(reportsDir)) {
        console.log('[Excel Export] No reports directory found. Skipping Excel compilation.');
        return;
    }

    const files = readdirSync(reportsDir, { recursive: true, withFileTypes: true });
    const reportFiles = files
        .filter(dirent => dirent.isFile() && dirent.name.endsWith('.report.json'))
        .map(dirent => join(dirent.path || dirent.parentPath, dirent.name));

    if (reportFiles.length === 0) {
        console.log('[Excel Export] No report files found. Skipping Excel compilation.');
        return;
    }

    console.log(`[Excel Export] Found ${reportFiles.length} report file(s). Compiling to Excel...`);

    // Derive Excel filename from import script name
    // Example: import-recipe-page-template.bundle.js → import-recipe-page-template.report.xlsx
    const scriptBasename = basename(importScriptPath);
    const scriptName = scriptBasename.replace(/\.bundle\.js$/, '').replace(/\.js$/, '');
    const excelFilename = `${scriptName}.report.xlsx`;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Import Reports');

    // Collect all unique keys from all reports to create comprehensive columns
    const allKeys = new Set();
    const reports = [];

    for (const reportPath of reportFiles) {
        try {
            const reportContent = readFileSync(reportPath, 'utf-8');
            const report = JSON.parse(reportContent);

            // Flatten nested objects for better Excel representation
            const flatReport = flattenObject(report);
            flatReport._reportFile = reportPath.replace(reportsDir + '/', '');

            reports.push(flatReport);
            Object.keys(flatReport).forEach(key => allKeys.add(key));
        } catch (error) {
            console.error(`[Excel Export] Failed to read ${reportPath}: ${error.message}`);
        }
    }

    // Create headers
    const headers = ['_reportFile', ...Array.from(allKeys).filter(k => k !== '_reportFile').sort()];

    // Style the header row
    const headerRow = worksheet.addRow(headers);
    headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    headerRow.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF0070D2' }
    };
    headerRow.alignment = { vertical: 'middle', horizontal: 'left' };

    // Add data rows
    for (const report of reports) {
        const row = headers.map(header => {
            const value = report[header];
            // Convert arrays and objects to JSON strings for Excel
            if (Array.isArray(value)) {
                return JSON.stringify(value);
            }
            if (typeof value === 'object' && value !== null) {
                return JSON.stringify(value);
            }
            return value ?? '';
        });
        worksheet.addRow(row);
    }

    // Auto-fit columns
    worksheet.columns.forEach((column, index) => {
        let maxLength = headers[index]?.length || 10;
        column.eachCell({ includeEmpty: false }, cell => {
            const cellValue = cell.value?.toString() || '';
            maxLength = Math.max(maxLength, cellValue.length);
        });
        column.width = Math.min(maxLength + 2, 50); // Cap at 50 characters
    });

    // Add filters
    worksheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: headers.length }
    };

    // Freeze header row
    worksheet.views = [
        { state: 'frozen', ySplit: 1 }
    ];

    // Save the workbook
    const outputPath = join(process.cwd(), 'tools', 'importer', 'reports', excelFilename);
    await workbook.xlsx.writeFile(outputPath);

    console.log(`[Excel Export] ✅ Compiled ${reports.length} reports to: ${outputPath}`);
}

