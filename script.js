const rssUrl = 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml';

async function fetchRSS() {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    const data = await response.json();
    const container = document.getElementById('news-container');
    container.innerHTML = '';

    data.items.slice(0, 10).forEach(item => {
      const newsItem = document.createElement('div');
      newsItem.className = 'bg-white p-6 rounded-xl shadow-md mb-6 hover:shadow-lg transition-shadow';

      const title = document.createElement('h2');
      title.className = 'text-xl font-semibold mb-2 text-blue-700';
      title.textContent = item.title;

      const link = document.createElement('a');
      link.href = item.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.className = 'text-blue-500 hover:underline';
      link.textContent = 'Читать далее';

      const description = document.createElement('p');
      description.className = 'text-gray-600 mt-2';
      description.innerHTML = item.description;

      newsItem.appendChild(title);
      newsItem.appendChild(description);
      newsItem.appendChild(link);
      container.appendChild(newsItem);
    });
  } catch (error) {
    console.error('Ошибка при загрузке новостей:', error);
    document.getElementById('news-container').innerHTML = '<p class="text-center text-red-500">Ошибка при загрузке новостей.</p>';
  }
}

fetchRSS();
setInterval(fetchRSS, 3600000);
