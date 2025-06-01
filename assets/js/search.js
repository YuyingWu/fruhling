// 搜索功能实现
document.addEventListener('DOMContentLoaded', function() {
    // 获取必要的DOM元素
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchInfo = document.getElementById('search-info');
    const searchResultsContainer = document.getElementById('search-results-container');
    const searchResultTemplate = document.getElementById('search-result-template');

    // 如果必要的元素不存在，则退出
    if (!searchInput || !searchResultsContainer || !searchResultTemplate) {
        console.error('搜索所需的DOM元素未找到');
        return;
    }

    // 搜索相关变量
    let fuse = null;
    let searchData = null;

    // 加载搜索索引
    const indexUrl = window.location.origin + '/index.json';
    console.log('正在加载搜索索引:', indexUrl);
    
    fetch(indexUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('网络响应错误: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('搜索数据加载成功');
            
            if (!data || !data.items || !Array.isArray(data.items)) {
                throw new Error('搜索索引格式错误');
            }
            
            searchData = data.items;
            
            // 初始化 Fuse.js，配置为精确匹配
            fuse = new Fuse(searchData, {
                keys: [
                    { name: 'title', weight: 0.7 },
                    { name: 'summary', weight: 0.3 },
                    { name: 'content', weight: 0.2 }
                ],
                includeScore: true,
                threshold: 0.0,           // 设置为0，要求完全匹配
                distance: 0,              // 设置为0，不允许字符间距
                useExtendedSearch: true,
                ignoreLocation: true,     // 忽略位置影响
                findAllMatches: true,     // 查找所有匹配项
                minMatchCharLength: 2,    // 最小匹配字符长度
                shouldSort: true,         // 按相关度排序
                tokenize: true,           // 将搜索词分词
                matchAllTokens: true      // 要求匹配所有分词
            });

            // 如果URL中有查询参数，自动执行搜索
            const urlParams = new URLSearchParams(window.location.search);
            const query = urlParams.get('q');
            if (query) {
                searchInput.value = query;
                performSearch(query);
            }
        })
        .catch(error => {
            console.error('加载搜索索引失败:', error);
            if (searchResultsContainer) {
                searchResultsContainer.innerHTML = '<div class="search-error">加载搜索索引失败，请稍后再试</div>';
            }
        });

    // 添加搜索输入事件监听器（带防抖）
    searchInput.addEventListener('input', debounce(function(event) {
        const query = event.target.value.trim();
        performSearch(query);
        
        // 更新URL查询参数
        const url = new URL(window.location);
        if (query) {
            url.searchParams.set('q', query);
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState({}, '', url);
    }, 300));

    // 执行搜索
    function performSearch(query) {
        // 如果查询太短，不执行搜索
        if (query.length < 2) {
            if (searchInfo) searchInfo.style.display = 'block';
            searchResultsContainer.innerHTML = '';
            return;
        }

        // 如果搜索引擎未初始化，退出
        if (!fuse) return;

        console.log('执行搜索:', query);
        
        // 将搜索词按空格分割
        const searchTerms = query.toLowerCase().split(/\s+/).filter(term => term.length >= 2);
        
        // 使用 Fuse.js 进行搜索
        const results = fuse.search({
            $and: searchTerms.map(term => ({
                $or: [
                    { title: term },
                    { summary: term },
                    { content: term }
                ]
            }))
        });
        
        console.log('搜索结果:', results);
        displayResults(results, query);
    }

    // 显示搜索结果
    function displayResults(results, query) {
        // 清空结果容器
        searchResultsContainer.innerHTML = '';
        
        // 隐藏搜索信息
        if (searchInfo) searchInfo.style.display = 'none';
        
        // 如果没有结果
        if (results.length === 0) {
            searchResultsContainer.innerHTML = `<div class="search-no-results">未找到与"${query}"相关的结果</div>`;
            return;
        }
        
        // 添加搜索统计
        const statsDiv = document.createElement('div');
        statsDiv.className = 'search-stats';
        statsDiv.textContent = `找到 ${results.length} 个相关结果`;
        searchResultsContainer.appendChild(statsDiv);
        
        // 添加每个结果
        results.forEach(result => {
            try {
                // 克隆模板
                const resultElement = searchResultTemplate.content.cloneNode(true);
                const item = result.item;
                
                // 设置标题和链接
                const titleElement = resultElement.querySelector('.search-result-title');
                if (titleElement) {
                    titleElement.textContent = item.title;
                }
                
                const linkElement = resultElement.querySelector('.search-result-link');
                if (linkElement) {
                    linkElement.href = item.url;
                }
                
                // 设置日期
                const dateElement = resultElement.querySelector('.search-result-date');
                if (dateElement) {
                    dateElement.textContent = item.date;
                }
                
                // 设置摘要，高亮匹配的文本
                const summaryElement = resultElement.querySelector('.search-result-summary');
                if (summaryElement) {
                    const summary = item.summary;
                    // 使用所有搜索词进行高亮
                    let highlightedSummary = summary;
                    query.toLowerCase().split(/\s+/).forEach(term => {
                        if (term.length >= 2) {
                            const regex = new RegExp(`(${term})`, 'gi');
                            highlightedSummary = highlightedSummary.replace(regex, '<mark>$1</mark>');
                        }
                    });
                    summaryElement.innerHTML = highlightedSummary;
                }
                
                // 添加到结果容器
                searchResultsContainer.appendChild(resultElement);
            } catch (error) {
                console.error('处理搜索结果时出错:', error);
            }
        });
    }

    // 防抖函数
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, delay);
        };
    }
}); 