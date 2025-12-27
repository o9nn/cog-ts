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

import { GeneratedInsight } from './analytics-types';

/**
 * Service path for Insight Generation Service
 */
export const InsightGenerationServicePath = '/services/insight-generation';

/**
 * Service interface for automated insight generation
 */
export interface InsightGenerationService {
    /**
     * Generate insights from current analytics data
     */
    generateInsights(): Promise<GeneratedInsight[]>;

    /**
     * Generate insights for a specific category
     */
    generateInsightsByCategory(category: 'performance' | 'quality' | 'productivity' | 'collaboration' | 'security'): Promise<GeneratedInsight[]>;

    /**
     * Get prioritized insights based on impact and confidence
     */
    getPrioritizedInsights(limit?: number): Promise<GeneratedInsight[]>;

    /**
     * Get personalized insights for a specific user
     */
    getPersonalizedInsights(userId: string): Promise<GeneratedInsight[]>;

    /**
     * Mark an insight as acknowledged
     */
    acknowledgeInsight(insightId: string): Promise<void>;

    /**
     * Provide feedback on an insight
     */
    provideInsightFeedback(insightId: string, helpful: boolean, comment?: string): Promise<void>;

    /**
     * Get insight recommendation acceptance rate
     */
    getInsightAcceptanceRate(): Promise<number>;

    /**
     * Get historical insights
     */
    getHistoricalInsights(timeRange: { start: number; end: number }): Promise<GeneratedInsight[]>;
}

/**
 * Symbol for dependency injection
 */
export const InsightGenerationService = Symbol('InsightGenerationService');
