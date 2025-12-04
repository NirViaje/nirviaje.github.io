// 主要JavaScript功能文件

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCharts();
    initializeScrollEffects();
    initializeNavigation();
});

// 初始化动画效果
function initializeAnimations() {
    // 英雄区域文字动画
    anime({
        targets: '.floating-animation h1',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 500
    });

    anime({
        targets: '.floating-animation p',
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 800
    });

    // 卡片依次出现动画
    anime({
        targets: '.card-hover',
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 800,
        easing: 'easeOutExpo',
        delay: anime.stagger(200, {start: 1200})
    });

    // 导航栏滚动效果
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const nav = document.querySelector('nav');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

// 初始化图表
function initializeCharts() {
    // 时间线图表
    const timelineChart = echarts.init(document.getElementById('timeline-chart'));
    const timelineOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '10%',
            right: '10%',
            top: '20%',
            bottom: '20%'
        },
        xAxis: {
            type: 'category',
            data: ['农业革命', '工业革命', '信息时代', 'AI时代', '太空文明'],
            axisLine: { lineStyle: { color: '#ffffff40' } },
            axisLabel: { color: '#ffffff80', fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            name: '影响力',
            axisLine: { lineStyle: { color: '#ffffff40' } },
            axisLabel: { color: '#ffffff80' },
            splitLine: { lineStyle: { color: '#ffffff20' } }
        },
        series: [{
            data: [30, 60, 80, 95, 100],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#f59e0b',
                width: 3
            },
            itemStyle: {
                color: '#f59e0b',
                borderColor: '#ffffff',
                borderWidth: 2
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
                        { offset: 1, color: 'rgba(245, 158, 11, 0.05)' }
                    ]
                }
            }
        }],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#f59e0b',
            textStyle: { color: '#ffffff' }
        }
    };
    timelineChart.setOption(timelineOption);

    // 风险评估矩阵
    const riskChart = echarts.init(document.getElementById('risk-chart'));
    const riskData = [
        [20, 90, '气候变化', '#ef4444'],
        [30, 85, '核战争', '#dc2626'],
        [60, 70, 'AI风险', '#7c3aed'],
        [40, 60, '疫情', '#059669'],
        [70, 50, '经济危机', '#2563eb'],
        [80, 40, '社会动荡', '#f59e0b']
    ];
    
    const riskOption = {
        backgroundColor: 'transparent',
        grid: {
            left: '15%',
            right: '10%',
            top: '15%',
            bottom: '15%'
        },
        xAxis: {
            type: 'value',
            name: '发生概率',
            min: 0,
            max: 100,
            axisLine: { lineStyle: { color: '#ffffff40' } },
            axisLabel: { color: '#ffffff80' },
            splitLine: { lineStyle: { color: '#ffffff20' } }
        },
        yAxis: {
            type: 'value',
            name: '影响程度',
            min: 0,
            max: 100,
            axisLine: { lineStyle: { color: '#ffffff40' } },
            axisLabel: { color: '#ffffff80' },
            splitLine: { lineStyle: { color: '#ffffff20' } }
        },
        series: [{
            type: 'scatter',
            data: riskData.map(item => [item[0], item[1]]),
            symbolSize: function(data) {
                return Math.sqrt(data[1]) * 3;
            },
            itemStyle: {
                color: function(params) {
                    return riskData[params.dataIndex][3];
                },
                opacity: 0.8
            },
            label: {
                show: true,
                position: 'top',
                color: '#ffffff',
                fontSize: 10,
                formatter: function(params) {
                    return riskData[params.dataIndex][2];
                }
            }
        }],
        tooltip: {
            formatter: function(params) {
                const data = riskData[params.dataIndex];
                return `${data[2]}<br/>发生概率: ${data[0]}%<br/>影响程度: ${data[1]}%`;
            },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderColor: '#f59e0b',
            textStyle: { color: '#ffffff' }
        }
    };
    riskChart.setOption(riskOption);

    // 响应式调整
    window.addEventListener('resize', function() {
        timelineChart.resize();
        riskChart.resize();
    });
}

// 初始化滚动效果
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.card-hover, section > div').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 初始化导航功能
function initializeNavigation() {
    // 平滑滚动
    window.scrollToSection = function(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // 页面导航
    window.navigateTo = function(page) {
        // 添加页面切换动画
        anime({
            targets: 'body',
            opacity: [1, 0],
            duration: 300,
            easing: 'easeOutQuad',
            complete: function() {
                window.location.href = page;
            }
        });
    };

    // 移动端菜单切换
    const mobileMenuButton = document.querySelector('button.md\\:hidden');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // 这里可以添加移动端菜单的显示/隐藏逻辑
            console.log('Mobile menu toggle');
        });
    }
}

// 时间线交互功能（用于timeline.html）
function initializeTimelineInteraction() {
    const timelineData = [
        {
            year: -10000,
            title: '农业革命',
            description: '人类从狩猎采集转向农业社会，为文明发展奠定基础',
            impact: 30,
            category: 'society'
        },
        {
            year: -3000,
            title: '文字发明',
            description: '文字的出现使知识传承和文化发展成为可能',
            impact: 40,
            category: 'culture'
        },
        {
            year: 1750,
            title: '工业革命',
            description: '机械化生产改变了人类社会，带来了现代文明',
            impact: 60,
            category: 'technology'
        },
        {
            year: 1950,
            title: '信息时代',
            description: '计算机和互联网的普及开启了信息时代',
            impact: 80,
            category: 'technology'
        },
        {
            year: 2020,
            title: 'AI时代',
            description: '人工智能技术快速发展，重塑各行各业',
            impact: 95,
            category: 'technology'
        },
        {
            year: 2050,
            title: '太空文明',
            description: '人类开始在太空建立永久居住地',
            impact: 100,
            category: 'future'
        }
    ];

    // 创建时间线可视化
    const timelineContainer = document.getElementById('interactive-timeline');
    if (timelineContainer) {
        createInteractiveTimeline(timelineContainer, timelineData);
    }
}

// 风险评估交互功能（用于risks.html）
function initializeRiskAssessment() {
    const riskData = [
        {
            name: '气候变化',
            probability: 20,
            impact: 90,
            category: 'environment',
            description: '全球变暖导致的极端天气和海平面上升',
            mitigation: '减少碳排放，发展可再生能源'
        },
        {
            name: '核战争',
            probability: 30,
            impact: 85,
            category: 'political',
            description: '核武器使用导致的人类文明毁灭风险',
            mitigation: '加强国际合作，核裁军协议'
        },
        {
            name: '人工智能风险',
            probability: 60,
            impact: 70,
            category: 'technology',
            description: 'AI系统失控或恶意使用带来的威胁',
            mitigation: 'AI安全研究，伦理规范制定'
        },
        {
            name: '全球疫情',
            probability: 40,
            impact: 60,
            category: 'health',
            description: '新型传染病的全球传播',
            mitigation: '加强公共卫生系统，疫苗研发'
        },
        {
            name: '经济危机',
            probability: 70,
            impact: 50,
            category: 'economic',
            description: '全球性的金融系统崩溃',
            mitigation: '金融监管改革，经济多元化'
        },
        {
            name: '社会动荡',
            probability: 80,
            impact: 40,
            category: 'social',
            description: '社会不平等引发的大规模冲突',
            mitigation: '促进社会公平，加强对话机制'
        }
    ];

    const riskContainer = document.getElementById('risk-matrix');
    if (riskContainer) {
        createRiskMatrix(riskContainer, riskData);
    }
}

// 决策模拟器功能（用于actions.html）
function initializeDecisionSimulator() {
    const decisions = [
        {
            id: 'renewable-energy',
            title: '大力发展可再生能源',
            shortTerm: '初期投资大，能源成本上升',
            mediumTerm: '技术成熟，成本下降，就业增加',
            longTerm: '能源独立，环境改善，气候稳定',
            impact: { environment: +3, economy: +2, society: +2 }
        },
        {
            id: 'ai-regulation',
            title: '严格监管AI发展',
            shortTerm: '创新速度放缓，合规成本增加',
            mediumTerm: '更安全可靠的AI系统',
            longTerm: 'AI与人类和谐共存，避免极端风险',
            impact: { environment: 0, economy: -1, society: +3 }
        },
        {
            id: 'space-exploration',
            title: '加大太空探索投入',
            shortTerm: '巨额资金投入，回报周期长',
            mediumTerm: '技术创新，新资源发现',
            longTerm: '多行星文明，人类长期存续保障',
            impact: { environment: +1, economy: +2, society: +3 }
        }
    ];

    const simulatorContainer = document.getElementById('decision-simulator');
    if (simulatorContainer) {
        createDecisionSimulator(simulatorContainer, decisions);
    }
}

// 知识图谱功能（用于concepts.html）
function initializeKnowledgeGraph() {
    const concepts = [
        { id: 'longtermism', name: '长期主义', category: 'philosophy', x: 400, y: 300 },
        { id: 'ethics', name: '伦理学', category: 'philosophy', x: 300, y: 200 },
        { id: 'risk-assessment', name: '风险评估', category: 'methodology', x: 500, y: 200 },
        { id: 'future-studies', name: '未来研究', category: 'methodology', x: 600, y: 300 },
        { id: 'ai-safety', name: 'AI安全', category: 'technology', x: 500, y: 400 },
        { id: 'climate-change', name: '气候变化', category: 'environment', x: 300, y: 400 },
        { id: 'existential-risk', name: '生存风险', category: 'risk', x: 200, y: 300 },
        { id: 'global-cooperation', name: '全球合作', category: 'policy', x: 400, y: 100 }
    ];

    const connections = [
        { source: 'longtermism', target: 'ethics' },
        { source: 'longtermism', target: 'risk-assessment' },
        { source: 'longtermism', target: 'future-studies' },
        { source: 'risk-assessment', target: 'existential-risk' },
        { source: 'future-studies', target: 'ai-safety' },
        { source: 'future-studies', target: 'climate-change' },
        { source: 'ethics', target: 'global-cooperation' },
        { source: 'ai-safety', target: 'existential-risk' }
    ];

    const graphContainer = document.getElementById('knowledge-graph');
    if (graphContainer) {
        createKnowledgeGraph(graphContainer, concepts, connections);
    }
}

// 创建交互式时间线
function createInteractiveTimeline(container, data) {
    // 这里实现时间线的具体逻辑
    console.log('Creating interactive timeline with data:', data);
}

// 创建风险矩阵
function createRiskMatrix(container, data) {
    // 这里实现风险矩阵的具体逻辑
    console.log('Creating risk matrix with data:', data);
}

// 创建决策模拟器
function createDecisionSimulator(container, decisions) {
    // 这里实现决策模拟器的具体逻辑
    console.log('Creating decision simulator with decisions:', decisions);
}

// 创建知识图谱
function createKnowledgeGraph(container, concepts, connections) {
    // 这里实现知识图谱的具体逻辑
    console.log('Creating knowledge graph with concepts:', concepts, 'and connections:', connections);
}

// 工具函数：格式化数字
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

// 工具函数：获取颜色根据类别
function getColorByCategory(category) {
    const colors = {
        'philosophy': '#7c3aed',
        'methodology': '#2563eb',
        'technology': '#059669',
        'environment': '#dc2626',
        'risk': '#ef4444',
        'policy': '#f59e0b',
        'society': '#6b7280',
        'culture': '#8b5cf6',
        'economic': '#0891b2',
        'health': '#be185d',
        'future': '#3730a3'
    };
    return colors[category] || '#6b7280';
}

// 错误处理
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// 性能监控
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}