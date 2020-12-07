document.addEventListener('DOMContentLoaded', function() {
  // news options
  var elems = document.querySelectorAll('select');
  var options = document.querySelectorAll('option');
  var instances = M.FormSelect.init(elems, options);
});

// render news data
const newsitems = document.querySelector('.news-panel');
const renderNews = (item, index) => {
  const html = `
    <div class="card-panel newsItem white row" data-num="${index+1}">
      <span>${index+1}.</span>
      <img src="/img/news.png" alt="recipe thumb">
      <div class="item-details">
        <div class="item-title">
          <a target="_blank" href="${item.url}">${item.title}</a>
        </div>
        <div class="item-comments">
          <span>${item.points}</span>
          points by
          <a target="_blank" href="https://news.ycombinator.com/user?id=${item.author}">${item.author}</a>
          |
          <a target="_blank" href="https://news.ycombinator.com/item?id=${item.objectID}">${item.num_comments} comments</a>
        </div>
      </div>
    </div>
  `;
  newsitems.innerHTML += html;
};

// change News Type
function changeType(newsType){
  const api = '//hn.algolia.com/api/v1/search_by_date';
  //console.log("[document.readyState] api=", api);
  //console.log("[changeType] newsType=", newsType);
  
  fetch(api + '?tags=' + newsType, {})
  .then(response => response.json())  // 輸出成 json
  .then((newsJson) => {
    //console.log('[fetch] hits=', newsJson.hits);
    document.querySelector('.news-panel').innerHTML = null;
    if (newsJson.hits.length > 0) {
      newsJson.hits.forEach((element, index) => renderNews(element, index));
    }
  })
  .catch((err) => {
    console.log('[fetch] err=', err);
    M.toast({html: 'Failed to load ' + newsType, classes: 'rounded'})
  });

}

// a jQuery like $(document).ready() method
function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

docReady(function() {
  // DOM is loaded and ready for manipulation here

  const newTypes = document.querySelector('.newTypes');
  if (newTypes.length > 0){
    newTypes.addEventListener("change", evt => {
      //console.log("[newTypes] change", evt.target);
      var e = evt.target;
      var newType = e.options[e.selectedIndex].value;
      console.log("[newTypes] newType", newType);
      changeType(newType);
    });
  }

  changeType('story');
});