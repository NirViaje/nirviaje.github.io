// 脚本用于绘制图表和更新时间轴说明
document.addEventListener('DOMContentLoaded', function () {
    // 如果存在章节数量柱状图，则绘制
    var chartCanvas = document.getElementById('partChart');
    if (chartCanvas) {
        var ctx = chartCanvas.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['第一部分', '第二部分', '第三部分', '第四部分'],
                datasets: [{
                    label: '章节数量',
                    data: [8, 5, 11, 6],
                    backgroundColor: ['#4e79a7', '#f28e2c', '#e15759', '#76b7b2'],
                    borderColor: ['#3b5a82', '#c06e1e', '#b04343', '#5d8e8c'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: '篇章数量'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.parsed.y + ' 篇';
                            }
                        }
                    }
                }
            }
        });
    }

    // 如果存在第一部分的饼图，则绘制价值论/义务论章节分布
    var pie1 = document.getElementById('pieChartPart1');
    if (pie1) {
        var pctx1 = pie1.getContext('2d');
        new Chart(pctx1, {
            type: 'pie',
            data: {
                labels: ['价值论章节', '义务论章节'],
                datasets: [{
                    data: [5, 3],
                    backgroundColor: ['#59a14f', '#edc948']
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    // 第二部分的条形图：预测 vs 干预章节
    var bar2 = document.getElementById('barChartPart2');
    if (bar2) {
        var bctx2 = bar2.getContext('2d');
        new Chart(bctx2, {
            type: 'bar',
            data: {
                labels: ['预测与证据', '干预策略'],
                datasets: [{
                    data: [2, 3],
                    backgroundColor: ['#4e79a7', '#e15759']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 0
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // 第三部分的饼图：风险缓解/社会与其他
    var pie3 = document.getElementById('pieChartPart3');
    if (pie3) {
        var pctx3 = pie3.getContext('2d');
        new Chart(pctx3, {
            type: 'pie',
            data: {
                labels: ['风险缓解', '社会与文化', '其他'],
                datasets: [{
                    data: [5, 4, 2],
                    backgroundColor: ['#76b7b2', '#f28e2c', '#e15759']
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'bottom' } }
            }
        });
    }

    // 第四部分的条形图：不同议题数量
    var bar4 = document.getElementById('barChartPart4');
    if (bar4) {
        var bctx4 = bar4.getContext('2d');
        new Chart(bctx4, {
            type: 'bar',
            data: {
                labels: ['政治哲学', '问责机制', '社会风险', '经济学', '法律保护', '心理研究'],
                datasets: [{
                    data: [1, 1, 1, 1, 1, 1],
                    backgroundColor: ['#4e79a7','#f28e2c','#e15759','#76b7b2','#59a14f','#edc948']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 0
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // 时间轴滑块说明更新
    var slider = document.getElementById('timelineSlider');
    var desc = document.getElementById('timelineDescription');
    if (slider && desc) {
        var descriptions = [
            '第一部分评估长远主义的论证。前五篇论文聚焦价值论长远主义，后三篇探讨义务论视角【10568911847981†L620-L627】。',
            '第二部分聚焦预测和评估远期未来的困难，讨论我们如何在缺乏可靠预测的情况下作出决策【10568911847981†L883-L902】。',
            '第三部分讨论伦理优先事项，包括“历史关键点假说”、急迫与耐心长远主义，以及风险缓解的成本效益等【10568911847981†L1056-L1091】。',
            '第四部分探讨制度与社会，从政治哲学、追溯责任、社会风险偏好和学术改革等角度思考如何代表未来世代【10568911847981†L1425-L1492】。'
        ];
        function updateDescription() {
            var index = parseInt(slider.value);
            desc.innerHTML = descriptions[index];
        }
        slider.addEventListener('input', updateDescription);
        // 初始化显示
        updateDescription();
    }
});