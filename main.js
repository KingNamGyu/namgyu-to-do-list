let news = [];
let page = 1;
let total_pages = 0;
let searchButton = document.getElementById("search-button");
let url;
let menus = document.querySelectorAll("#menu-list button");
menus.forEach((menu) =>
  menu.addEventListener("click", (e) => getNewsByTopic(e))
);


//각 함수에서 필요한 url을 만든다
//api호출 함수를 부른다
const getNews = async () => {
  try {
    let header = new Headers({
      "x-api-key": "_grRTHnrByqVKmIltgadR01-JP5CxqJ2e0zyHOI_sFY",
    });
    url.searchParams.set("page", page);
    console.log("url은?", url);
    let response = await fetch(url, { headers: header }); // ajax, http, fetch
    let data = await response.json();
    if (response.status == 200) {
      if (data.total_hits == 0) {
        throw new Error("검색된 결과값이 없습니다.");
      }
      news = data.articles;
      total_pages = data.total_pages;
      console.log(news);
      render();
      pagenation();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("잡힌 에러는", error.message);
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10`
  );
  getNews();
};

const getNewsByTopic = async (event) => {
  let topic = event.target.textContent.toLowerCase();
  url = new URL(
    `https://api.newscatcherapi.com/v2/latest_headlines?countries=KR&page_size=10&topic=${topic}`
  );
  getNews();
};

const getNewsByKeyword = async () => {
  //1.검색 키워드 읽어오기
  //2.url에 검색 키워드 부치기 
  //3.헤더준비
  //4.url부르기
  //5.데이터 가져오기
  //6.데이터 보여주기


  let keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://api.newscatcherapi.com/v2/search?q=${keyword}&page_size=10`
  );
  if (document.getElementById("search-input").value == "") {
    alert("검색어를 입력해주세요.");
    return;
  }
  document.getElementById("search-input").value = "";
  getNews();
};


const render = () => {
  let newsHTML = "";
  newsHTML = news
    .map((item) => {
      return `<div class="row news">
        <div class="col-lg-4">
          <img
            class="news-img-size"
            src="${
              item.media ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
            }"
          />
        </div>
        <div class="col-lg-8">
          <h1>${item.title}</h1>
          <p>${
            item.summary == null || item.summary == ""
              ? "내용없음"
              : item.summary.length > 200
              ? item.summary.substring(0, 200) + "..."
              : item.summary
          }</p>
          <div>${item.rights || "no source"}  ${moment(
        item.published_date
      ).fromNow()} * ${item.published_date}</div>
        </div>
      </div>`;
    })
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (message) => {
  let errorHTML = `<div class="alert alert-danger text-center" role="alert">
${message}
</div>`;
  document.getElementById("news-board").innerHTML = errorHTML;
};

const pagenation = () => {
  let pagenationHTML = ``;
  //total_page
  //page
  //page group
  let pageGroup = Math.ceil(page / 5);
  //list
  let last = pageGroup * 5;
  if (last > total_pages) {
    //마지막 그룹이 5개 이하이면
    last = total_pages;
  }

  let first = last - 4 <= 0 ? 1 : last - 4; // 첫그룹이 5이하이면
  if (first >= 6) {
    pagenationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="pageClick(${page - 1})">
                        <a class="page-link" href='#js-bottom'>&lt;</a>
                      </li>`;
  }
  for (let i = first; i <= last; i++) {
    pagenationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
                        <a class="page-link" href='#js-bottom' onclick="pageClick(${i})" >${i}</a>
                       </li>`;
  }

  if (last < total_pages) {
    pagenationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
                        <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="pageClick(${total_pages})">
                        <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                       </li>`;
  }

  document.querySelector(".pagination").innerHTML = pagenationHTML;
};

const pageClick = (pageNum) => {
  //7.클릭이벤트 세팅
  page = pageNum;
  window.scrollTo({ top: 0, behavior: "smooth" });
  getNews();
};

const moveToPage = (pageNum) => {
  //1.이동하고싶은 페이지를 알고
  page = pageNum;

  //2.이동하고싶은 페이지를 가지고 api를 다시 호출해주자.
  getNews();
};

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  //검색창 누르면 보이고 다시 누르면 사라짐
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

function enterkey() {
  
  if (window.event.keyCode == 13) {
    
    getNewsByKeyword();
  }
}

searchButton.addEventListener("click", getNewsByKeyword);
getLatestNews();
