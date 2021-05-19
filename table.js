//1//

url='./'  //비동기 통신을 위한 URL 정보
option= {
    widthArray :[30,50,30]
    headerArray :['스팸유무','스팸종류','최초검색일','총 검색횟수','오늘','주간','월간',]
    tdTemplte : [
        '<td>@{existence}</td>',
        '<td>@{class}</td>',
        '<td>@{date}</td>',
        '<td>@{totalnomber}</td>',
        '<td>@{}</td>',
        '<td>@{today}</td>',
        '<td>@{week}</td>',
        '<td>@{month}</td>',
                ]
};

urlparams ={
    "pageSize":'10', //목록에 보여질 페이지 사이즈 
    "pageNO":'1', //페이지 번호
    //나머지 조건 값 
};
$(#'tableArea').tableMarker(option,url,urlParams,function($this){
    //tr이벤트
    $this.find('tr').off().on('click',function(){

    });
});

//////////2//////////// => 결과를 하나의 Object로 작업을 해야 한다면 (1)의 tableMarker => data.paging 변경

<code class="hljs">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"> $ </span>) </span>{
	$.fn.tableMaker = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">option, url, urlParams, callBack</span>) </span>{
		
		<span class="hljs-keyword">var</span> $<span class="hljs-keyword">this</span> = $(<span class="hljs-keyword">this</span>);
		
		<span class="hljs-keyword">var</span> _this = {
				
			<span class="hljs-comment">//비동기 통신</span>
			ajaxCall : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">url, urlParams, callBackFunc</span>)</span>{
				$.ajax({
					<span class="hljs-attr">url</span>: url,
					<span class="hljs-attr">cache</span>: <span class="hljs-literal">false</span>,
					<span class="hljs-attr">data</span>: urlParams,
					<span class="hljs-attr">method</span>: <span class="hljs-string">'POST'</span>,
					<span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
					<span class="hljs-attr">contentType</span>: <span class="hljs-string">'application/json;charset=UTF-8'</span>,
					<span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, textStatus, jqXHR</span>) </span>{
						<span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> callBackFunc == <span class="hljs-string">'function'</span>) {
							callBackFunc(data);
						}
					},
					<span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">jqXHR, textStatus, errorThrown</span>) </span>{
						<span class="hljs-built_in">console</span>.log(textStatus);
					}
				});
				
			},
		
			
			<span class="hljs-attr">init</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">urlParams</span>)</span>{
				<span class="hljs-comment">//테이블 초기화</span>
				$<span class="hljs-keyword">this</span>.html(<span class="hljs-string">''</span>);
				
				_this.ajaxCall(url, urlParams, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
					
					<span class="hljs-keyword">if</span> ( data.paging.totalCnt == <span class="hljs-number">0</span> ){
						<span class="hljs-comment">//검색 결과 없음.</span>
						<span class="hljs-keyword">var</span> html = <span class="hljs-string">'데이터가 존재하지 않습니다.'</span>;
                        $<span class="hljs-keyword">this</span>.html(html);
					}<span class="hljs-keyword">else</span>{
						<span class="hljs-comment">//테이블 표기</span>
						$<span class="hljs-keyword">this</span>.html(_this.drawTable(data));
					}
					
					<span class="hljs-comment">//페이징 이벤트 처리</span>
					$<span class="hljs-keyword">this</span>.find(<span class="hljs-string">'div.paging ul li a'</span>).off().on(<span class="hljs-string">'click'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
						<span class="hljs-keyword">var</span> pagingData = $(<span class="hljs-keyword">this</span>).attr(<span class="hljs-string">'paging-data'</span>);
						<span class="hljs-keyword">var</span> pageNo = <span class="hljs-number">1</span>;
						<span class="hljs-keyword">if</span> ( pagingData ){
							pageNo = pagingData;
						}<span class="hljs-keyword">else</span>{
							pageNo = $(<span class="hljs-keyword">this</span>).text();
						}
						urlParams.pageNo = pageNo;
						_this.init(urlParams);
					});
					callBack($<span class="hljs-keyword">this</span>,data);
				});
			},
		
			<span class="hljs-comment">//페이징 HTML 생성</span>
			drawPaging : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
				<span class="hljs-keyword">var</span> pagingHtml =<span class="hljs-string">''</span>;
				
				<span class="hljs-keyword">var</span> currentStartPage = <span class="hljs-built_in">Math</span>.ceil(data.paging.pageNo/<span class="hljs-number">10</span>)*<span class="hljs-number">10</span><span class="hljs-number">-9</span>;
				<span class="hljs-keyword">var</span> currentEndPage = currentStartPage + <span class="hljs-number">9</span>;
				<span class="hljs-keyword">var</span> totalPageCnt   = <span class="hljs-built_in">Math</span>.ceil(data.paging.totalCnt/data.paging.pageSize);
				
				<span class="hljs-keyword">if</span>(currentEndPage &gt; totalPageCnt ){
					currentEndPage = totalPageCnt;
				}
				
				pagingHtml += <span class="hljs-string">'&lt;div class="paging"&gt;'</span>;
				pagingHtml += <span class="hljs-string">'    &lt;ul&gt;'</span>;
				
				<span class="hljs-keyword">if</span> ( data.paging.pageNo &gt; <span class="hljs-number">1</span> ){
					pagingHtml += <span class="hljs-string">'        &lt;li class="go_first"&gt;&lt;a paging-data="1" href="javascript:;"&gt;&lt;i class="fa fa-angle-double-left"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;'</span>;
				}
				<span class="hljs-keyword">if</span> ( data.paging.pageNo &gt; <span class="hljs-number">1</span> ){
					pagingHtml += <span class="hljs-string">'        &lt;li class="go_prev"&gt;&lt;a paging-data="'</span>+(<span class="hljs-built_in">parseInt</span>(data.paging.pageNo)<span class="hljs-number">-1</span>)+<span class="hljs-string">'" href="javascript:;"&gt;&lt;i class="fa fa-angle-left"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;'</span>;
				}
				
				<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> i = currentStartPage ; i &lt;= currentEndPage ; i++){
					pagingHtml += <span class="hljs-string">'        &lt;li '</span> 
					pagingHtml +=	( i == data.paging.pageNo ) ? <span class="hljs-string">'class="on"&gt;'</span> : <span class="hljs-string">'&gt;'</span>
					pagingHtml +=	<span class="hljs-string">'&lt;a href="javascript:;"&gt;'</span>+i+<span class="hljs-string">'&lt;/a&gt;&lt;/li&gt;'</span>;
				}
				
				<span class="hljs-keyword">if</span>( data.paging.pageNo &lt; totalPageCnt){
					pagingHtml += <span class="hljs-string">'        &lt;li class="go_next"&gt;&lt;a paging-data="'</span>+(<span class="hljs-built_in">parseInt</span>(data.paging.pageNo)+<span class="hljs-number">1</span>)+<span class="hljs-string">'" href="javascript:;"&gt;&lt;i class="fa fa-angle-right"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;'</span>;
				}
				
				
				<span class="hljs-keyword">if</span>( currentEndPage &lt; totalPageCnt){
					pagingHtml += <span class="hljs-string">'        &lt;li class="go_last"&gt;&lt;a paging-data="'</span>+totalPageCnt+<span class="hljs-string">'" href="javascript:;"&gt;&lt;i class="fa fa-angle-double-right"&gt;&lt;/i&gt;&lt;/a&gt;&lt;/li&gt;'</span>;
				}
				pagingHtml += <span class="hljs-string">'    &lt;/ul&gt;'</span>;
				pagingHtml += <span class="hljs-string">'&lt;/div&gt;'</span>;
				<span class="hljs-keyword">return</span> pagingHtml;
			},
		
			<span class="hljs-comment">//table HTML 생성</span>
			drawTable : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
				<span class="hljs-keyword">var</span> templteHtml =<span class="hljs-string">''</span>;

				templteHtml += <span class="hljs-string">'        &lt;table&gt;'</span> 
				
<span class="hljs-comment">//				templteHtml += '&lt;caption&gt;';</span>
<span class="hljs-comment">//				templteHtml += data.paging.caption; </span>
<span class="hljs-comment">//				templteHtml += '&lt;/caption&gt;';</span>
				
				templteHtml += <span class="hljs-string">'            &lt;colgroup&gt;'</span>;
				option.widthArray.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,index</span>)</span>{
					templteHtml += <span class="hljs-string">'                &lt;col width="'</span>+value+<span class="hljs-string">'%;"&gt;'</span>;
				});
				templteHtml += <span class="hljs-string">'            &lt;/colgroup&gt;'</span>;
				templteHtml += <span class="hljs-string">'            &lt;thead&gt;'</span>;
				option.headerArray.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,index</span>)</span>{
					templteHtml += <span class="hljs-string">'                &lt;th&gt;'</span>+value+<span class="hljs-string">'&lt;/th&gt;'</span>;
				});
				templteHtml += <span class="hljs-string">'            &lt;/thead&gt;'</span>;
				templteHtml += <span class="hljs-string">'            &lt;tbody&gt;'</span>;
				
				data.result.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">rsValue,rsIndex</span>)</span>{
					templteHtml += <span class="hljs-string">'                &lt;tr&gt;'</span>;
					option.tdTemplte.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value,index</span>)</span>{
						<span class="hljs-keyword">var</span> check = <span class="hljs-literal">false</span>;
						<span class="hljs-keyword">do</span>{
							<span class="hljs-keyword">var</span> match = value.match(<span class="hljs-regexp">/\@\{(.+?)\}/</span>);
							<span class="hljs-keyword">if</span> ( match &amp;&amp; match.length &gt;= <span class="hljs-number">2</span> ){
								<span class="hljs-keyword">var</span> dat = <span class="hljs-string">''</span>;
								<span class="hljs-keyword">if</span> ( rsValue[match[<span class="hljs-number">1</span>]] ){
									dat = rsValue[match[<span class="hljs-number">1</span>]];
								}
								value = value.replace(<span class="hljs-regexp">/\@\{(.+?)\}/</span>, dat);
								check = <span class="hljs-literal">true</span>;
							}<span class="hljs-keyword">else</span>{
								check = <span class="hljs-literal">false</span>;
							}
						}<span class="hljs-keyword">while</span>(check);
						
						templteHtml += value;
					});
					templteHtml += <span class="hljs-string">'                &lt;/tr&gt;'</span>;
				});

				templteHtml += <span class="hljs-string">'            &lt;/tbody&gt;'</span>;
				templteHtml += <span class="hljs-string">'        &lt;/table&gt;'</span>;
				templteHtml += _this.drawPaging(data);
				<span class="hljs-keyword">return</span> templteHtml;
			}
		};
		
		_this.init(urlParams);
		
	}
}( jQuery ));</code>




/////////////////////3//////////////////////////////////

function pagination(){
    var req_num_row=7;
    var $tr=jQuery('tbody tr');
    var total_num_row=$tr.length;
    var num_pages=0;
    if(total_num_row % req_num_row ==0){
        num_pages=total_num_row / req_num_row;
    }
    if(total_num_row % req_num_row >=1){
        num_pages=total_num_row / req_num_row;
        num_pages++;
        num_pages=Math.floor(num_pages++);
    }

jQuery('.pagination').append("<li><a class=\"prev\">Previous</a></li>");

    for(var i=1; i<=num_pages; i++){
        jQuery('.pagination').append("<li><a>"+i+"</a></li>");
jQuery('.pagination li:nth-child(2)').addClass("active");
jQuery('.pagination a').addClass("pagination-link");
    }

jQuery('.pagination').append("<li><a class=\"next\">Next</a></li>");

    $tr.each(function(i){
jQuery(this).hide();
if(i+1 <= req_num_row){
            $tr.eq(i).show();
        }
    });

    jQuery('.pagination a').click('.pagination-link', function(e){
        e.preventDefault();
        $tr.hide();
        var page=jQuery(this).text();
        var temp=page-1;
        var start=temp*req_num_row;
var current_link = temp;

jQuery('.pagination li').removeClass("active");
        jQuery(this).parent().addClass("active");

        for(var i=0; i< req_num_row; i++){
            $tr.eq(start+i).show();
        }

if(temp >= 1){
    jQuery('.pagination li:first-child').removeClass("disabled");
}
else {
    jQuery('.pagination li:first-child').addClass("disabled");
}
        
    });

jQuery('.prev').click(function(e){
    e.preventDefault();
    jQuery('.pagination li:first-child').removeClass("active");
});

jQuery('.next').click(function(e){
    e.preventDefault();
    jQuery('.pagination li:last-child').removeClass("active");
});

}

jQuery('document').ready(function(){
pagination();

jQuery('.pagination li:first-child').addClass("disabled");

});