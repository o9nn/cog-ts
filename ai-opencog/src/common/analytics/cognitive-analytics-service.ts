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
    CognitivePerformanceMetrics,
    ReasoningEngineMetrics,
    LearningAlgorithmMetrics,
    UserAdaptationMetrics
} from './analytics-types';

/**
 * Service path for Cognitive Analytics Service
 */
export const CognitiveAnalyticsServicePath = '/services/cognitive-analytics';

/**
 * Service interface for cognitive performance analytics
 */
export interface CognitiveAnalyticsService {
    /**
     * Get current cognitive performance metrics
     */
    getCognitivePerformanceMetrics(): Promise<CognitivePerformanceMetrics>;

    /**
     * Get performance metrics for a specific reasoning engine
     */
    getReasoningEngineMetrics(engineId: string): Promise<ReasoningEngineMetrics>;

    /**
     * Get all reasoning engine metrics
     */
    getAllReasoningEngineMetrics(): Promise<ReasoningEngineMetrics[]>;

    /**
     * Get performance metrics for a specific learning algorithm
     */
    getLearningAlgorithmMetrics(algorithmId: string): Promise<LearningAlgorithmMetrics>;

    /**
     * Get all learning algorithm metrics
     */
    getAllLearningAlgorithmMetrics(): Promise<LearningAlgorithmMetrics[]>;

    /**
     * Get user behavior adaptation metrics
     */
    getUserAdaptationMetrics(userId: string): Promise<UserAdaptationMetrics>;

    /**
     * Get optimization recommendations based on cognitive performance
     */
    getOptimizationRecommendations(): Promise<string[]>;

    /**
     * Track reasoning accuracy over time
     */
    trackReasoningAccuracy(timeRange: { start: number; end: number }): Promise<Array<{ timestamp: number; accuracy: number }>>;

    /**
     * Track learning convergence over time
     */
    trackLearningConvergence(algorithmId: string, timeRange: { start: number; end: number }): Promise<Array<{ timestamp: number; convergence: number }>>;

    /**
     * Get cognitive system health status
     */
    getCognitiveSystemHealth(): Promise<{
        status: 'healthy' | 'degraded' | 'critical';
        issues: string[];
        recommendations: string[];
    }>;
}

/**
 * Symbol for dependency injection
 */
export const CognitiveAnalyticsService = Symbol('CognitiveAnalyticsService');
