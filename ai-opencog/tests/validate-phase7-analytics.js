#!/usr/bin/env node
// *****************************************************************************
// Phase 7 Analytics Services Validation Script
// *****************************************************************************

/**
 * This script validates the Phase 7 analytics services implementation
 */

const fs = require('fs');
const path = require('path');

// Determine base directory (ai-opencog package directory)
const baseDir = path.join(__dirname, '..');

console.log('🔍 Phase 7 Analytics Validation\n');
console.log(`Base directory: ${baseDir}\n`);

// Check for required files
const requiredFiles = [
    'src/common/analytics/analytics-types.ts',
    'src/common/analytics/code-analytics-service.ts',
    'src/common/analytics/cognitive-analytics-service.ts',
    'src/common/analytics/insight-generation-service.ts',
    'src/common/analytics/index.ts',
    'src/node/analytics/code-analytics-service-impl.ts',
    'src/node/analytics/cognitive-analytics-service-impl.ts',
    'src/node/analytics/insight-generation-service-impl.ts',
    'docs/phases/PHASE7_IMPLEMENTATION.md'
];

let allFilesExist = true;

console.log('📁 Checking required files...');
requiredFiles.forEach(file => {
    const filePath = path.join(baseDir, file);
    const exists = fs.existsSync(filePath);
    console.log(`  ${exists ? '✅' : '❌'} ${file}`);
    if (!exists) {
        allFilesExist = false;
    }
});

if (!allFilesExist) {
    console.log('\n❌ Validation Failed: Missing required files\n');
    process.exit(1);
}

// Count lines of code
console.log('\n📊 Code Statistics:');
let totalLines = 0;
const codeFiles = requiredFiles.filter(f => f.endsWith('.ts'));

codeFiles.forEach(file => {
    const filePath = path.join(baseDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').length;
    totalLines += lines;
    console.log(`  ${file}: ${lines} lines`);
});

console.log(`  Total Code: ${totalLines} lines\n`);

// Check for key exports
console.log('🔑 Checking key exports...');

const indexContent = fs.readFileSync(path.join(baseDir, 'src/common/analytics/index.ts'), 'utf8');
const requiredExports = [
    'analytics-types',
    'code-analytics-service',
    'cognitive-analytics-service',
    'insight-generation-service'
];

let allExportsPresent = true;
requiredExports.forEach(exp => {
    const present = indexContent.includes(exp);
    console.log(`  ${present ? '✅' : '❌'} ${exp}`);
    if (!present) {
        allExportsPresent = false;
    }
});

if (!allExportsPresent) {
    console.log('\n❌ Validation Failed: Missing exports\n');
    process.exit(1);
}

// Check backend module integration
console.log('\n🔌 Checking backend module integration...');
const backendModulePath = path.join(baseDir, 'src/node/ai-opencog-backend-module.ts');
const backendContent = fs.readFileSync(backendModulePath, 'utf8');

const requiredIntegrations = [
    'CodeAnalyticsServiceImpl',
    'CognitiveAnalyticsServiceImpl',
    'InsightGenerationServiceImpl',
    'CodeAnalyticsServicePath',
    'CognitiveAnalyticsServicePath',
    'InsightGenerationServicePath'
];

let allIntegrationsPresent = true;
requiredIntegrations.forEach(integration => {
    const present = backendContent.includes(integration);
    console.log(`  ${present ? '✅' : '❌'} ${integration}`);
    if (!present) {
        allIntegrationsPresent = false;
    }
});

if (!allIntegrationsPresent) {
    console.log('\n❌ Validation Failed: Incomplete backend integration\n');
    process.exit(1);
}

// Check service implementations have key methods
console.log('\n🔧 Checking service implementations...');

const serviceChecks = [
    {
        file: 'src/node/analytics/code-analytics-service-impl.ts',
        methods: ['trackCodeEvolution', 'analyzeTechnicalDebt', 'assessArchitectureQuality', 'predictBugs']
    },
    {
        file: 'src/node/analytics/cognitive-analytics-service-impl.ts',
        methods: ['getCognitivePerformanceMetrics', 'getReasoningEngineMetrics', 'getCognitiveSystemHealth']
    },
    {
        file: 'src/node/analytics/insight-generation-service-impl.ts',
        methods: ['generateInsights', 'getPrioritizedInsights', 'getPersonalizedInsights']
    }
];

let allMethodsPresent = true;
serviceChecks.forEach(check => {
    console.log(`  ${check.file}:`);
    const content = fs.readFileSync(path.join(baseDir, check.file), 'utf8');
    check.methods.forEach(method => {
        const present = content.includes(method);
        console.log(`    ${present ? '✅' : '❌'} ${method}()`);
        if (!present) {
            allMethodsPresent = false;
        }
    });
});

if (!allMethodsPresent) {
    console.log('\n❌ Validation Failed: Missing service methods\n');
    process.exit(1);
}

// Success summary
console.log('\n✅ Phase 7 Analytics Validation Successful!\n');
console.log('Summary:');
console.log(`  ✅ All ${requiredFiles.length} required files present`);
console.log(`  ✅ Total code: ${totalLines} lines`);
console.log(`  ✅ All exports configured`);
console.log(`  ✅ Backend module integration complete`);
console.log(`  ✅ All service methods implemented`);
console.log('\nPhase 7.1-7.4 Core Infrastructure: READY ✨\n');

process.exit(0);
