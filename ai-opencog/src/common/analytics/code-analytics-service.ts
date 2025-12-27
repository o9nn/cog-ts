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

import {
    CodeEvolutionMetrics,
    TechnicalDebtAnalysis,
    ArchitectureQualityMetrics,
    DeveloperProductivityMetrics,
    BugPrediction,
    RefactoringOpportunity,
    PerformanceBottleneckPrediction,
    SecurityRiskAssessment
} from './analytics-types';

/**
 * Service path for Code Analytics Service
 */
export const CodeAnalyticsServicePath = '/services/code-analytics';

/**
 * Service interface for advanced code analytics and insights
 */
export interface CodeAnalyticsService {
    /**
     * Track code evolution metrics over time
     */
    trackCodeEvolution(workspaceRoot: string): Promise<CodeEvolutionMetrics[]>;

    /**
     * Analyze technical debt in the codebase
     */
    analyzeTechnicalDebt(workspaceRoot: string): Promise<TechnicalDebtAnalysis>;

    /**
     * Assess architecture quality
     */
    assessArchitectureQuality(workspaceRoot: string): Promise<ArchitectureQualityMetrics>;

    /**
     * Analyze developer productivity patterns
     */
    analyzeDeveloperProductivity(userId: string, period: string): Promise<DeveloperProductivityMetrics>;

    /**
     * Predict potential bugs based on code patterns
     */
    predictBugs(workspaceRoot: string): Promise<BugPrediction[]>;

    /**
     * Identify refactoring opportunities
     */
    identifyRefactoringOpportunities(workspaceRoot: string): Promise<RefactoringOpportunity[]>;

    /**
     * Predict performance bottlenecks
     */
    predictPerformanceBottlenecks(workspaceRoot: string): Promise<PerformanceBottleneckPrediction[]>;

    /**
     * Assess security vulnerability risks
     */
    assessSecurityRisks(workspaceRoot: string): Promise<SecurityRiskAssessment>;

    /**
     * Get code quality score for a specific file or directory
     */
    getCodeQualityScore(path: string): Promise<number>;

    /**
     * Get historical trends for a specific metric
     */
    getMetricTrend(metric: string, timeRange: { start: number; end: number }): Promise<Array<{ timestamp: number; value: number }>>;
}

/**
 * Symbol for dependency injection
 */
export const CodeAnalyticsService = Symbol('CodeAnalyticsService');
