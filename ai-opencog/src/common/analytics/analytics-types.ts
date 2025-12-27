// *****************************************************************************
// Copyright (C) 2025 Copilot and others.
//
// This program and the accompanying materials are made available under the
// terms of the Eclipse Public License v. 2.0 which is available at
// http://www.eclipse.org/legal/epl-2.0.
//
// This Source Code may also be made available under the following Secondary
// Licenses when the conditions for such availability set forth in the Eclipse
// Public License v. 2.0 are satisfied: GNU General Public License, version 2
// with the GNU Classpath Exception which is available at
// https://www.gnu.org/software/classpath/license.html.
//
// SPDX-License-Identifier: EPL-2.0 OR GPL-2.0-only WITH Classpath-exception-2.0
// *****************************************************************************

/**
 * Core types and interfaces for Phase 7 Advanced Analytics & Insights
 */

/**
 * Code evolution metrics tracking changes over time
 */
export interface CodeEvolutionMetrics {
    timestamp: number;
    linesAdded: number;
    linesRemoved: number;
    linesModified: number;
    filesChanged: number;
    complexityDelta: number;
    codeQualityScore: number;
}

/**
 * Technical debt analysis result
 */
export interface TechnicalDebtAnalysis {
    totalDebt: number;
    debtByCategory: Map<string, number>;
    criticalIssues: DebtIssue[];
    recommendations: string[];
    trend: 'increasing' | 'decreasing' | 'stable';
}

/**
 * Individual technical debt issue
 */
export interface DebtIssue {
    id: string;
    category: 'code-smell' | 'duplication' | 'complexity' | 'deprecated' | 'security';
    severity: 'critical' | 'high' | 'medium' | 'low';
    location: string;
    description: string;
    estimatedEffort: number; // hours
    impact: number; // 0-100
}

/**
 * Architecture quality assessment
 */
export interface ArchitectureQualityMetrics {
    modularity: number; // 0-100
    cohesion: number; // 0-100
    coupling: number; // 0-100 (lower is better)
    maintainability: number; // 0-100
    testability: number; // 0-100
    overallScore: number; // 0-100
    weakPoints: string[];
    strengths: string[];
}

/**
 * Developer productivity metrics
 */
export interface DeveloperProductivityMetrics {
    period: string;
    commitsCount: number;
    linesWritten: number;
    featuresCompleted: number;
    bugsFixed: number;
    codeReviewsCompleted: number;
    averageCycleTime: number; // hours
    focusTimePercentage: number; // 0-100
    productivityScore: number; // 0-100
}

/**
 * Bug prediction result
 */
export interface BugPrediction {
    fileOrModule: string;
    probability: number; // 0-1
    confidence: number; // 0-1
    riskFactors: string[];
    recommendations: string[];
}

/**
 * Refactoring opportunity
 */
export interface RefactoringOpportunity {
    id: string;
    type: 'extract-method' | 'rename' | 'move' | 'simplify' | 'optimize';
    location: string;
    description: string;
    benefit: number; // 0-100
    effort: number; // hours
    priority: 'high' | 'medium' | 'low';
}

/**
 * Performance bottleneck prediction
 */
export interface PerformanceBottleneckPrediction {
    location: string;
    type: 'cpu' | 'memory' | 'io' | 'network';
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    estimatedImpact: number; // percentage slowdown
    recommendations: string[];
}

/**
 * Security vulnerability risk assessment
 */
export interface SecurityRiskAssessment {
    riskLevel: 'critical' | 'high' | 'medium' | 'low';
    vulnerabilityTypes: string[];
    affectedAreas: string[];
    recommendations: string[];
    cvssScore?: number;
}

/**
 * Cognitive performance metrics
 */
export interface CognitivePerformanceMetrics {
    timestamp: number;
    reasoningAccuracy: number; // 0-1
    reasoningLatency: number; // milliseconds
    learningConvergence: number; // 0-1
    predictionAccuracy: number; // 0-1
    knowledgeGraphSize: number;
    activePatterns: number;
}

/**
 * Reasoning engine performance
 */
export interface ReasoningEngineMetrics {
    engineId: string;
    accuracy: number; // 0-1
    averageConfidence: number; // 0-1
    averageLatency: number; // milliseconds
    successRate: number; // 0-1
    totalInferences: number;
    failedInferences: number;
}

/**
 * Learning algorithm performance
 */
export interface LearningAlgorithmMetrics {
    algorithmId: string;
    convergenceRate: number; // 0-1
    accuracy: number; // 0-1
    trainingTime: number; // milliseconds
    sampleSize: number;
    overfittingRisk: number; // 0-1
}

/**
 * User behavior adaptation metrics
 */
export interface UserAdaptationMetrics {
    userId: string;
    adaptationScore: number; // 0-100
    preferenceAccuracy: number; // 0-1
    workflowOptimization: number; // percentage improvement
    suggestionAcceptanceRate: number; // 0-1
    userSatisfaction: number; // 0-5
}

/**
 * Development velocity metrics
 */
export interface DevelopmentVelocityMetrics {
    period: string;
    storyPointsCompleted: number;
    velocityTrend: 'increasing' | 'decreasing' | 'stable';
    averageVelocity: number;
    predictedNextVelocity: number;
}

/**
 * Code quality trend
 */
export interface CodeQualityTrend {
    period: string;
    overallScore: number; // 0-100
    trend: 'improving' | 'declining' | 'stable';
    metrics: {
        complexity: number;
        duplication: number;
        coverage: number;
        maintainability: number;
    };
}

/**
 * Team collaboration metrics
 */
export interface TeamCollaborationMetrics {
    teamId: string;
    communicationScore: number; // 0-100
    codeReviewEfficiency: number; // 0-100
    knowledgeSharingScore: number; // 0-100
    collaborationPatterns: string[];
    blockers: string[];
}

/**
 * Generated insight
 */
export interface GeneratedInsight {
    id: string;
    category: 'performance' | 'quality' | 'productivity' | 'collaboration' | 'security';
    title: string;
    description: string;
    priority: 'critical' | 'high' | 'medium' | 'low';
    impact: number; // 0-100
    confidence: number; // 0-1
    recommendations: string[];
    supportingData: Record<string, unknown>;
    timestamp: number;
}

/**
 * Analytics dashboard configuration
 */
export interface AnalyticsDashboardConfig {
    widgets: DashboardWidget[];
    layout: LayoutConfig;
    refreshInterval: number; // milliseconds
    dataRetention: number; // days
}

/**
 * Dashboard widget configuration
 */
export interface DashboardWidget {
    id: string;
    type: 'chart' | 'metric' | 'list' | 'heatmap' | 'timeline';
    title: string;
    dataSource: string;
    config: Record<string, unknown>;
    position: { x: number; y: number; width: number; height: number };
}

/**
 * Dashboard layout configuration
 */
export interface LayoutConfig {
    columns: number;
    rows: number;
    responsive: boolean;
}

/**
 * Time series data point
 */
export interface TimeSeriesDataPoint {
    timestamp: number;
    value: number;
    metadata?: Record<string, unknown>;
}

/**
 * Analytics query
 */
export interface AnalyticsQuery {
    metric: string;
    timeRange: {
        start: number;
        end: number;
    };
    filters?: Record<string, unknown>;
    aggregation?: 'sum' | 'avg' | 'min' | 'max' | 'count';
    groupBy?: string[];
}

/**
 * Analytics query result
 */
export interface AnalyticsQueryResult {
    query: AnalyticsQuery;
    data: TimeSeriesDataPoint[];
    metadata: {
        totalRecords: number;
        processingTime: number;
        cached: boolean;
    };
}
