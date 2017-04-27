import React from 'react';

export const Loading = React.createClass({
	render: function(){
		return <div data-role="page" id="loading" className="il form white ui-page ui-page-theme-a ui-page-active" data-url="loading" tabIndex="0">
	    <div data-role="content" style={{padding: 0, height: "100vh"}} className="ui-content" role="main">
	      <div className="error-container">
	        <img src="../img/loading.png" alt="error" />
	        <h3>Идёт загрузка…</h3>
	        <span className="sub">Ищем оптимальный путь</span>
	      </div>
	    </div>
		</div>
	}
})