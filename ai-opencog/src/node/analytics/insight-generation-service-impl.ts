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

import { injectable, inject } from '@theia/core/shared/inversify';
import { InsightGenerationService, GeneratedInsight } from '../../common/analytics';
import { CodeAnalyticsService } from '../../common/analytics/code-analytics-service';
import { CognitiveAnalyticsService } from '../../common/analytics/cognitive-analytics-service';

/**
 * Implementation of Insight Generation Service
 */
@injectable()
export class InsightGenerationServiceImpl implements InsightGenerationService {

    private generatedInsights: Map<string, GeneratedInsight> = new Map();
    private insightFeedback: Map<string, { helpful: boolean; comment?: string }[]> = new Map();
    private acknowledgedInsights: Set<string> = new Set();

    constructor(
        @inject(CodeAnalyticsService) private readonly codeAnalytics: CodeAnalyticsService,
        @inject(CognitiveAnalyticsService) private readonly cognitiveAnalytics: CognitiveAnalyticsService
    ) {}

    async generateInsights(): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];

        // Generate insights from all categories
        insights.push(...await this.generatePerformanceInsights());
        insights.push(...await this.generateQualityInsights());
        insights.push(...await this.generateProductivityInsights());
        insights.push(...await this.generateSecurityInsights());

        // Store generated insights
        insights.forEach(insight => {
            this.generatedInsights.set(insight.id, insight);
        });

        return insights;
    }

    async generateInsightsByCategory(
        category: 'performance' | 'quality' | 'productivity' | 'collaboration' | 'security'
    ): Promise<GeneratedInsight[]> {
        switch (category) {
            case 'performance':
                return this.generatePerformanceInsights();
            case 'quality':
                return this.generateQualityInsights();
            case 'productivity':
                return this.generateProductivityInsights();
            case 'security':
                return this.generateSecurityInsights();
            case 'collaboration':
                return this.generateCollaborationInsights();
            default:
                return [];
        }
    }

    async getPrioritizedInsights(limit: number = 10): Promise<GeneratedInsight[]> {
        const allInsights = await this.generateInsights();

        // Sort by priority and impact
        const priorityWeight = { critical: 4, high: 3, medium: 2, low: 1 };
        
        const sorted = allInsights.sort((a, b) => {
            const aScore = priorityWeight[a.priority] * a.impact * a.confidence;
            const bScore = priorityWeight[b.priority] * b.impact * b.confidence;
            return bScore - aScore;
        });

        return sorted.slice(0, limit);
    }

    async getPersonalizedInsights(userId: string): Promise<GeneratedInsight[]> {
        // Generate personalized insights based on user behavior and preferences
        const allInsights = await this.generateInsights();
        
        // Filter and rank based on user context
        // In production, this would use user behavior data and ML models
        
        return allInsights.filter(insight => {
            // Filter out already acknowledged insights
            return !this.acknowledgedInsights.has(insight.id);
        }).slice(0, 5);
    }

    async acknowledgeInsight(insightId: string): Promise<void> {
        this.acknowledgedInsights.add(insightId);
    }

    async provideInsightFeedback(insightId: string, helpful: boolean, comment?: string): Promise<void> {
        if (!this.insightFeedback.has(insightId)) {
            this.insightFeedback.set(insightId, []);
        }
        
        this.insightFeedback.get(insightId)!.push({ helpful, comment });
    }

    async getInsightAcceptanceRate(): Promise<number> {
        let totalFeedback = 0;
        let helpfulCount = 0;

        this.insightFeedback.forEach(feedbackList => {
            feedbackList.forEach(feedback => {
                totalFeedback++;
                if (feedback.helpful) {
                    helpfulCount++;
                }
            });
        });

        return totalFeedback > 0 ? helpfulCount / totalFeedback : 0;
    }

    async getHistoricalInsights(timeRange: { start: number; end: number }): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];

        this.generatedInsights.forEach(insight => {
            if (insight.timestamp >= timeRange.start && insight.timestamp <= timeRange.end) {
                insights.push(insight);
            }
        });

        return insights.sort((a, b) => b.timestamp - a.timestamp);
    }

    // Private insight generation methods

    private async generatePerformanceInsights(): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];
        const cognitiveHealth = await this.cognitiveAnalytics.getCognitiveSystemHealth();

        if (cognitiveHealth.status === 'degraded' || cognitiveHealth.status === 'critical') {
            insights.push({
                id: `perf-${Date.now()}-1`,
                category: 'performance',
                title: 'Cognitive System Performance Degradation Detected',
                description: `The cognitive system is experiencing ${cognitiveHealth.status} performance. ${cognitiveHealth.issues.join('. ')}`,
                priority: cognitiveHealth.status === 'critical' ? 'critical' : 'high',
                impact: 85,
                confidence: 0.92,
                recommendations: cognitiveHealth.recommendations,
                supportingData: { health: cognitiveHealth },
                timestamp: Date.now()
            });
        }

        // Check for performance bottlenecks
        // Note: This would normally take a workspace root parameter
        // For now, using a placeholder
        const bottlenecks = await this.codeAnalytics.predictPerformanceBottlenecks('/workspace');
        
        if (bottlenecks.length > 0) {
            const criticalBottlenecks = bottlenecks.filter(b => b.severity === 'critical' || b.severity === 'high');
            
            if (criticalBottlenecks.length > 0) {
                insights.push({
                    id: `perf-${Date.now()}-2`,
                    category: 'performance',
                    title: `${criticalBottlenecks.length} Performance Bottleneck(s) Identified`,
                    description: `Critical performance issues detected that could impact application responsiveness. ${criticalBottlenecks[0].description}`,
                    priority: 'high',
                    impact: 75,
                    confidence: 0.85,
                    recommendations: criticalBottlenecks[0].recommendations,
                    supportingData: { bottlenecks: criticalBottlenecks },
                    timestamp: Date.now()
                });
            }
        }

        return insights;
    }

    private async generateQualityInsights(): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];

        // Analyze technical debt
        const debtAnalysis = await this.codeAnalytics.analyzeTechnicalDebt('/workspace');

        if (debtAnalysis.totalDebt > 40) {
            insights.push({
                id: `quality-${Date.now()}-1`,
                category: 'quality',
                title: 'High Technical Debt Detected',
                description: `Current technical debt is estimated at ${debtAnalysis.totalDebt} hours. Trend is ${debtAnalysis.trend}.`,
                priority: debtAnalysis.totalDebt > 80 ? 'critical' : 'high',
                impact: Math.min(100, debtAnalysis.totalDebt),
                confidence: 0.88,
                recommendations: debtAnalysis.recommendations,
                supportingData: { debt: debtAnalysis },
                timestamp: Date.now()
            });
        }

        // Check for critical debt issues
        if (debtAnalysis.criticalIssues.length > 0) {
            insights.push({
                id: `quality-${Date.now()}-2`,
                category: 'quality',
                title: `${debtAnalysis.criticalIssues.length} Critical Quality Issue(s) Found`,
                description: `Critical issues requiring immediate attention: ${debtAnalysis.criticalIssues[0].description}`,
                priority: 'critical',
                impact: 90,
                confidence: 0.95,
                recommendations: [`Fix critical issue in ${debtAnalysis.criticalIssues[0].location}`],
                supportingData: { issues: debtAnalysis.criticalIssues },
                timestamp: Date.now()
            });
        }

        return insights;
    }

    private async generateProductivityInsights(): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];

        // Analyze refactoring opportunities
        const refactoringOps = await this.codeAnalytics.identifyRefactoringOpportunities('/workspace');
        
        const highPriorityOps = refactoringOps.filter(op => op.priority === 'high');
        
        if (highPriorityOps.length > 0) {
            const totalBenefit = highPriorityOps.reduce((sum, op) => sum + op.benefit, 0);
            const avgBenefit = totalBenefit / highPriorityOps.length;

            insights.push({
                id: `productivity-${Date.now()}-1`,
                category: 'productivity',
                title: `${highPriorityOps.length} High-Value Refactoring Opportunit${highPriorityOps.length === 1 ? 'y' : 'ies'}`,
                description: `Refactoring opportunities with average benefit score of ${avgBenefit.toFixed(0)}%. ${highPriorityOps[0].description}`,
                priority: 'medium',
                impact: avgBenefit,
                confidence: 0.82,
                recommendations: [
                    `Start with ${highPriorityOps[0].type} refactoring at ${highPriorityOps[0].location}`,
                    'Allocate time for systematic technical improvement'
                ],
                supportingData: { opportunities: highPriorityOps },
                timestamp: Date.now()
            });
        }

        return insights;
    }

    private async generateSecurityInsights(): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];

        // Analyze security risks
        const securityRisks = await this.codeAnalytics.assessSecurityRisks('/workspace');

        if (securityRisks.riskLevel === 'critical' || securityRisks.riskLevel === 'high') {
            insights.push({
                id: `security-${Date.now()}-1`,
                category: 'security',
                title: `${securityRisks.riskLevel.toUpperCase()} Security Risk Detected`,
                description: `Security vulnerabilities found: ${securityRisks.vulnerabilityTypes.join(', ')}`,
                priority: securityRisks.riskLevel === 'critical' ? 'critical' : 'high',
                impact: 95,
                confidence: 0.90,
                recommendations: securityRisks.recommendations,
                supportingData: { security: securityRisks },
                timestamp: Date.now()
            });
        }

        return insights;
    }

    private async generateCollaborationInsights(): Promise<GeneratedInsight[]> {
        const insights: GeneratedInsight[] = [];

        // This would integrate with team collaboration metrics
        // Placeholder for now
        
        return insights;
    }
}
